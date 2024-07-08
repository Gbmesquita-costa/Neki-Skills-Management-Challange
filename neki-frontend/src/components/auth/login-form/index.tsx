"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { toastMapping } from "@/toasts/status-codes";

import { useFormState, useFormStatus } from "react-dom";
import { LockIcon, MailIcon, EyeIcon, EyeOffIcon, Loader } from "lucide-react";

import { handleLoginUser } from "@/actions/login-user";
import { LoginFormContainerProps, LogInFormState } from "./dtos";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { FormInput } from "../form-input";
import { useLoginForm } from "./hooks";

const LoginFormContainer = ({
  state,
}: LoginFormContainerProps): JSX.Element => {
  const {
    togglePasswordVisibility,
    handleRememberMeChange,
    handlePassword,
    showPassword,
    rememberMe,
    password,
  } = useLoginForm();

  const { pending } = useFormStatus();

  return (
    <>
      <div className="space-y-4">
        <FormInput
          label={"Email"}
          htmlfor={"email"}
          name="email"
          type="email"
          errorName={state?.error?.email}
          placeholder={"E-mail"}
          icon={<MailIcon />}
          disabled={pending}
        />

        <div className="relative">
          <FormInput
            label={"Senha"}
            htmlfor={"password"}
            name="password"
            type={showPassword ? "text" : "password"}
            errorName={state?.error?.password}
            placeholder={"Senha"}
            icon={<LockIcon />}
            onChange={(event) => handlePassword(event.target.value)}
            value={password}
            disabled={pending}
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-3 h-full px-3 py-2 hover:bg-transparent"
            onClick={togglePasswordVisibility}
            disabled={pending}
          >
            {showPassword ? (
              <EyeIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <EyeOffIcon className="h-6 w-6" aria-hidden="true" />
            )}
            <span className="sr-only">
              {showPassword ? "Esconder senha" : "Mostrar senha"}
            </span>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5">
        <Checkbox
          checked={rememberMe}
          onCheckedChange={(checked) =>
            handleRememberMeChange(checked as boolean)
          }
        />

        <span
          className="text-sm font-medium leading-none 
          peer-disabled:cursor-not-allowed peer-disabled:opacity-70 
          text-muted-foreground"
        >
          Gravar senha
        </span>
      </div>

      <div className="mt-7">
        <Button className="w-full" type="submit" disabled={pending}>
          {pending && (
            <div className="mr-2 animate-spin">
              <Loader />
            </div>
          )}
          Login
        </Button>
      </div>
    </>
  );
};

export const LoginForm: React.FC = () => {
  const { push } = useRouter();

  // Default value for state
  const defaultState: LogInFormState = {};
  const [state, dispatch] = useFormState(handleLoginUser, defaultState);

  useEffect(() => {
    const statusCode = state?.statusCode;

    if (statusCode && toastMapping[statusCode]) {
      if (statusCode === 200) {
        push("/home");
      }

      toastMapping[statusCode](state.message as string);
    }
  }, [state]);

  return (
    <form action={dispatch}>
      <LoginFormContainer state={state} />
    </form>
  );
};
