import { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cadastrar-se",
    description: "Página de cadastro",
    robots: {
      index: true,
      follow: true,
    },
  };
}

const SignUp = async (): Promise<JSX.Element> => {
  return (
    <>
      <div className="mb-7 grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Cadastre-se</h1>
        <p className="text-muted-foreground">
          Cadastre-se para entrar na plataforma
        </p>
      </div>
      <SignupForm />
    </>
  );
};

export default SignUp;
