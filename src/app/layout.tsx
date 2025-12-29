import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Menu from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Red Mascotas",
  description: "red mascotas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Navbar */}
        <Menu />

        {/* Contenido */}
        <main className="flex-1 w-full">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
