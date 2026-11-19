import "server-only";
import { getSql } from "./db";

export async function lexoPreferimet(githubId: string): Promise<string[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT udhetim_id
    FROM udhetimet_preferuara
    WHERE github_id = ${githubId}
    ORDER BY created_at
  `;
  return rows.map((row) => String(row.udhetim_id));
}

export async function shtoPreferimin(githubId: string, udhetimId: string): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO udhetimet_preferuara (github_id, udhetim_id)
    VALUES (${githubId}, ${udhetimId})
    ON CONFLICT (github_id, udhetim_id) DO NOTHING
  `;
}
