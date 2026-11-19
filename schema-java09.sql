CREATE TABLE IF NOT EXISTS udhetimet_preferuara (
  github_id TEXT NOT NULL
    REFERENCES profilet(github_id) ON DELETE CASCADE,
  udhetim_id TEXT NOT NULL
    REFERENCES udhetimet(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT udhetimet_preferuara_unike UNIQUE (github_id, udhetim_id)
);
