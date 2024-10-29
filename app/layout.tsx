import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs";
import { cn, generateMetadata } from "@/utils";
import Provider from "./provider";

export const metadata = generateMetadata();

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scrollbar">
        <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased !font-default overflow-x-hidden",
          geistSans.variable
        )}
      >
        <Toaster richColors theme="dark" position="top-right" />
        <Provider>
          {children}
        </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}