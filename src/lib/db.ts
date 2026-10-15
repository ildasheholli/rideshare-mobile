import "server-only";
import { neon } from "@neondatabase/serverless";

export function getSql() {
  const databaseUrl = process.env.DATABASE_URL ?? process.env.STORAGE_POSTGRES_URL;
  if (!databaseUrl) throw new Error("Databaza nuk është konfiguruar.");
  return neon(databaseUrl);
}