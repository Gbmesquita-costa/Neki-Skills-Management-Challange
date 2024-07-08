"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = (): JSX.Element => {
  const { push } = useRouter();

  return (
    <div
      className="w-full h-screen flex flex-col
      justify-center items-center"
    >
      <div
        className="flex items-center bg-primary 
        w-fit p-2 max-h-8 lg:px-4 lg:h-9 rounded"
      >
        <span
          className="text-xs lg:text-xl whitespace-nowrap
          text-primary-foreground font-medium font-mono"
        >
          Página 404 | Não encontrada 😢
        </span>
      </div>

      <h1
        className="font-display text-4xl font-bold 
        tracking-normal sm:text-5xl mt-6"
      >
        Não foi possível encontrar a página
      </h1>

      <p className="text-center mt-8">
        A página que você está procurando não existe ou foi movida.
      </p>

      <div className="mt-10">
        <Button
          variant={"outline"}
          aria-label="Voltar para a tela de login"
          type="button"
          onClick={() => push("/")}
        >
          Voltar Agora
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
