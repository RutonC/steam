import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({ weight:"400",subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comunika STEAM",
  description: "Desperte o inventor dentro de você! Com as ferramentas certas, você criará e programará robôs que trarão inovação e diversão ao seu aprendizado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>{children}</ThemeProvider>
      </body>
    </html>
  );
}
