import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { MainContextProvider } from "./context/main.context";


const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comunika STEAM",
  description:
    "Desperte o inventor dentro de você! Com as ferramentas certas, você criará e programará robôs que trarão inovação e diversão ao seu aprendizado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <MainContextProvider>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          <Analytics />
          {children}
        </ThemeProvider>
          </MainContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
