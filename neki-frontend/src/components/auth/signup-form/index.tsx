"use client";

import { useEffect } from "react";
import { toastMapping } from "@/toasts/status-codes";

import { useFormState, useFormStatus } from "react-dom";
import { SignupFormContainerProps, SignUpFormState } from "./dtos";

import { FormInput } from "../form-input";

import { handleSignUpUser } from "@/actions/signup-user";
import { Button } from "@/components/ui/button";

import { LockIcon, MailIcon, EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { useSignupForm } from "./hooks";

const SignUpFormContainer = ({
  state,
}: SignupFormContainerProps): JSX.Element => {
  const {
    toggleConfirmPasswordVisibility,
    togglePasswordVisibility,
    showPassword,
    confirmPassword,
  } = useSignupForm();

  const { pending } = useFormStatus();

  return (
    <>
      <div className="space-y-4 mb-6">
        <FormInput
          label={"E-mail"}
          htmlfor={"email"}
          name="email"
          type="email"
          errorName={state?.validationError?.email}
          placeholder={"E-mail"}
          icon={<MailIcon />}
          disabled={pending}
        />

        <div className="relative">
          <FormInput
            label={"Senha"}
            htmlfor={"senha"}
            name="password"
            type={showPassword ? "text" : "password"}
            errorName={state?.validationError?.password}
            placeholder={"Senha"}
            icon={<LockIcon />}
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

        <div className="relative">
          <FormInput
            label={"Confirme sua senha"}
            htmlfor={"confirm_password"}
            name="confirm_password"
            type={confirmPassword ? "text" : "password"}
            errorName={state?.validationError?.confirm_password}
            placeholder={"Confirme sua senha"}
            icon={<LockIcon />}
            disabled={pending}
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-3 h-full px-3 py-2 hover:bg-transparent"
            onClick={toggleConfirmPasswordVisibility}
            disabled={pending}
          >
            {confirmPassword ? (
              <EyeIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <EyeOffIcon className="h-6 w-6" aria-hidden="true" />
            )}
            <span className="sr-only">
              {confirmPassword
                ? "Esconder senha de confirmação"
                : "Mostrar senha de confirmação"}
            </span>
          </Button>
        </div>
      </div>

      <Button className="w-full" type="submit" disabled={pending}>
        {pending && (
          <div className="mr-2 animate-spin">
            <Loader />
          </div>
        )}
        Cadastre-se
      </Button>
    </>
  );
};

export const SignupForm: React.FC = () => {
  // Default value for state
  const defaultState: SignUpFormState = {};
  const [state, dispatch] = useFormState(handleSignUpUser, defaultState);

  useEffect(() => {
    const statusCode = state?.statusCode;

    if (statusCode && toastMapping[statusCode]) {
      toastMapping[statusCode](state.message as string);
    }
  }, [state]);

  return (
    <form action={dispatch}>
      <SignUpFormContainer state={state} />
    </form>
  );
};
