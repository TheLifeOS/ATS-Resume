import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeATS Pro - AI-Powered Resume Optimizer",
  description: "Optimize your resume for ATS systems using AI. Get 3x more interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}