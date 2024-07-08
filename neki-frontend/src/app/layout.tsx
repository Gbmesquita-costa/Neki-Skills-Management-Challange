import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

import { NextThemeProvider } from "@/providers/next-theme-provider";

const inter = Inter({ subsets: ["latin"] });
import "./globals.css";

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("http://localhost:3000"),
    title: {
      default: "Neki-FrontEnd",
      template: `%s | Neki-FrontEnd`,
    },
    description:
      "Aplicação para gerenciamento de habilidades dos usuários, incluindo login, cadastro, e listagem de skills com edição e exclusão.",
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const RootLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          `flex min-h-screen flex-col bg-background 
          text-foreground antialiased`,
          inter.className,
        )}
      >
        <NextThemeProvider>{children}</NextThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
