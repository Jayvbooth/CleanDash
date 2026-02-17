import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AuthProvider } from "@/components/providers/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { GlobalLoader } from "@/components/ui/global-loader";

export const metadata: Metadata = {
  title: "OpenClaw Mission Control",
  description: "A mission-control interface for governing OpenClaw systems.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-app text-strong antialiased">
        <AuthProvider>
          <QueryProvider>
            <GlobalLoader />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
