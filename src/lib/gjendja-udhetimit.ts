export type StatusKerkese = "pending" | "accepted";

export type UdhPerGjendjen = {
  id: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  vende: number;
};

export type KerkeseShoferi = {
  id: string;
  udhetari: string;
  status: StatusKerkese;
};

export type GjendjaUdhetimit =
  | {
      roli: "shofer";
      udhetim: UdhPerGjendjen;
      kerkesat: KerkeseShoferi[];
    }
  | {
      roli: "udhetar";
      udhetim: UdhPerGjendjen;
      kerkesa: { id: string; status: StatusKerkese } | null;
    };
