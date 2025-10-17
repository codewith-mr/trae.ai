import type { Metadata } from "next";
import { Open_Sans, Nunito } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-body",
});


export const metadata: Metadata = {
  title: "TBS - Think. Build. Scale.",
  description: "An action-oriented learning hub that helps users learn practical skills that convert directly into income.",
  keywords: "freelancing, YouTube growth, trading, courses, learning, skills",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${nunito.variable} font-body antialiased bg-background text-text`}
      >
        {children}
      </body>
    </html>
  );
}
