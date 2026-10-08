import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RideShare · Udhëtime për AAB",
  description: "Shiko nisjet e përbashkëta për në AAB.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sq">
      <body>{children}</body>
    </html>
  );
}
