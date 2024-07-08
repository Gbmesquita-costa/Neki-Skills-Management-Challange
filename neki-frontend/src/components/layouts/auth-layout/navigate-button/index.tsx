"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const NavigateButton: React.FC = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const routePathName = (path: string) => pathname.endsWith(path);

  return (
    <div className="absolute right-6">
      <Button
        aria-label="login ou cadastre-se"
        onClick={() =>
          routePathName("/signup") ? push("/login") : push("/signup")
        }
        variant={"ghost"}
      >
        {routePathName("/signup") ? "Login" : "Cadastre-se"}
      </Button>
    </div>
  );
};
