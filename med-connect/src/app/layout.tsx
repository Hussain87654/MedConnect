import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
