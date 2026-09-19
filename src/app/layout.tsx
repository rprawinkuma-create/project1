import type { Metadata } from "next";
import "./globals.css";
import { AccessibilityProvider } from "@/components/kiosk/AccessibilityProvider";

export const metadata: Metadata = {
  title: "MediKiosk — AI Clinical Intake & History Terminal",
  description: "Touch- and voice-enabled clinical history intake terminal for high-volume hospital OPDs in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-900">
        <AccessibilityProvider>{children}</AccessibilityProvider>
      </body>
    </html>
  );
}
