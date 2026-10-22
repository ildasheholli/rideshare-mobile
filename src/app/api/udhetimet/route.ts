import { connection } from "next/server";
import { lexoUdhetimet } from "@/lib/udhetimet";

export async function GET() {
  await connection();

  try {
    const rows = await lexoUdhetimet();
    const trips = rows.map(({ id, nisja, destinacioni, ora, vendtakimi, vende }) => ({
      id,
      nisja,
      destinacioni,
      ora,
      vendtakimi,
      vende,
    }));

    return Response.json(
      { trips },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Lista publike e udhëtimeve nuk mund të lexohet.", error);
    return Response.json(
      { error: "Lista nuk mund të lexohet tani." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
