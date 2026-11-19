CREATE TABLE IF NOT EXISTS udhetim_kerkesat (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  udhetar_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  CONSTRAINT udhetim_kerkesat_perdorues_udhetim_unike
    UNIQUE (udhetim_id, udhetar_id)
);

CREATE INDEX IF NOT EXISTS udhetim_kerkesat_udhetim_status_idx
  ON udhetim_kerkesat (udhetim_id, status, created_at);

CREATE OR REPLACE FUNCTION prano_udhetim_kerkesen(
  p_kerkesa_id BIGINT,
  p_shofer_id TEXT
)
RETURNS TABLE (rezultati TEXT, vende INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
  v_udhetim_id TEXT;
  v_status TEXT;
  v_vende INTEGER;
BEGIN
  SELECT kerkesa.udhetim_id, kerkesa.status, udhetim.vende
  INTO v_udhetim_id, v_status, v_vende
  FROM udhetim_kerkesat AS kerkesa
  JOIN udhetimet AS udhetim ON udhetim.id = kerkesa.udhetim_id
  WHERE kerkesa.id = p_kerkesa_id
    AND udhetim.shofer_id = p_shofer_id
  FOR UPDATE OF kerkesa, udhetim;

  IF NOT FOUND THEN
    RETURN QUERY SELECT 'missing'::TEXT, NULL::INTEGER;
    RETURN;
  END IF;

  IF v_status = 'accepted' THEN
    RETURN QUERY SELECT 'already_accepted'::TEXT, v_vende;
    RETURN;
  END IF;

  IF v_vende <= 0 THEN
    RETURN QUERY SELECT 'no_seats'::TEXT, v_vende;
    RETURN;
  END IF;

  UPDATE udhetimet AS udhetim
  SET vende = udhetim.vende - 1
  WHERE udhetim.id = v_udhetim_id
    AND udhetim.vende > 0
  RETURNING udhetim.vende INTO v_vende;

  IF NOT FOUND THEN
    RETURN QUERY SELECT 'no_seats'::TEXT, 0;
    RETURN;
  END IF;

  UPDATE udhetim_kerkesat
  SET status = 'accepted', accepted_at = now()
  WHERE id = p_kerkesa_id
    AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'The request could not be accepted after locking.';
  END IF;

  RETURN QUERY SELECT 'accepted'::TEXT, v_vende;
END;
$$;
