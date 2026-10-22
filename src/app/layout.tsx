import type { Metadata, Viewport } from "next";
import Pwa from "@/components/Pwa";
import "./globals.css";

export const metadata: Metadata = {
  title: "RideShare · Udhëtime për AAB",
  description: "Shiko nisjet e përbashkëta për në AAB.",
  applicationName: "RideShare AAB",
};

export const viewport: Viewport = {
  themeColor: "#be3455",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sq">
      <body>
        <Pwa />
        {children}
      </body>
    </html>
  );
}
