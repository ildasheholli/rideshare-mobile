import "server-only";
import { neon } from "@neondatabase/serverless";

export type Udhetim = {
  id: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  vendtakimi: string;
  vende: number;
};

function getSql() {
  const databaseUrl = process.env.DATABASE_URL ?? process.env.STORAGE_POSTGRES_URL;
  if (!databaseUrl) throw new Error("Databaza nuk është konfiguruar.");
  return neon(databaseUrl);
}

export async function lexoUdhetimet(): Promise<Udhetim[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, nisja, destinacioni, ora, vendtakimi, vende
    FROM udhetimet ORDER BY id
  `;
  return rows as Udhetim[];
}

export async function gjejUdhetimin(id: string): Promise<Udhetim | undefined> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, nisja, destinacioni, ora, vendtakimi, vende
    FROM udhetimet WHERE id = ${id}
  `;
  return rows[0] as Udhetim | undefined;
}