import type { ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";
import { Footer } from "../components/storefront/Footer";

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}