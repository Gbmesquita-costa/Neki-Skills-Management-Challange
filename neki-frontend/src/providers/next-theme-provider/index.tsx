"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "next-themes";

interface NextThemeProviderProps {
  children: React.ReactNode;
}

export const NextThemeProvider = ({
  children,
}: NextThemeProviderProps): JSX.Element => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider enableSystem={true} defaultTheme="light" attribute="class">
      <NextTopLoader
        color="rgb(11, 178, 245)"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
      <Toaster richColors={true} position="top-right" />
      {children}
    </ThemeProvider>
  );
};
