import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jakarta_sans = Plus_Jakarta_Sans({
  variable: "--jakarta-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800" ],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "CarePulse",
  description: "A health care platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`min-h-screen bg-dark-300 fonr-sans antialiased ${jakarta_sans.variable}`)}>{children}</body>
    </html>
  );
}
