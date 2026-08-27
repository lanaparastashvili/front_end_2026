import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lana Parastashvili | Developer Portfolio",
  description:
    "Frontend & Full-Stack Developer Portfolio built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: ["Developer", "Frontend", "Next.js", "TypeScript", "React", "Tailwind CSS", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} scroll-smooth`}>
      <body className="bg-[#151515] text-white font-sans antialiased overflow-x-hidden selection:bg-[#4EE1A0] selection:text-[#151515] min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
