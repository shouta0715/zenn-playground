import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Provider } from "@/providers";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Zenn Playground",
  description: "Zenn Playground",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>
          <div className="flex min-h-screen flex-col">
            <div className="mx-auto flex size-full max-w-7xl flex-1 items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
