import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login",
    description: "Página de login",
    robots: {
      index: true,
      follow: true,
    },
  };
}

const Login = async (): Promise<JSX.Element> => {
  return (
    <>
      <div className="mb-7 grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">
          Entre com sua conta para continuar
        </p>
      </div>

      <LoginForm />
    </>
  );
};

export default Login;
