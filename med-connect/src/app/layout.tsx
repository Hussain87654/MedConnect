import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "MedConnect - Your Healthcare Platform",
  description:
    "MedConnect is a modern healthcare platform that connects patients with doctors for seamless medical appointments and health management.",
  keywords: [
    "healthcare",
    "medical",
    "appointments",
    "doctors",
    "patients",
    "telemedicine",
  ],
  authors: [{ name: "MedConnect Team" }],
  openGraph: {
    title: "MedConnect - Your Healthcare Platform",
    description:
      "Connect with doctors, manage appointments, and access your medical records all in one place.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
