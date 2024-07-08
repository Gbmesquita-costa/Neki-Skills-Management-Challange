"use server";

import { LogInFormState } from "@/components/auth/login-form/dtos";
import { validateLoginUserFormSchema } from "@/schemas/login-schema";

import { setCookies } from "../cookies";

interface LogInUserProps {
  message: string;
  token: string;
}

export const handleLoginUser = async (
  state: any,
  loginValues: FormData,
): Promise<LogInFormState> => {
  const logInUser = `${process.env.NEXT_PUBLIC_HTTP_REQUEST}/session`;

  const loginValidation = validateLoginUserFormSchema.safeParse({
    email: loginValues.get("email"),
    password: loginValues.get("password"),
  });

  if (loginValidation.error) {
    const formatError = loginValidation.error.flatten();

    return {
      error: formatError.fieldErrors,
    };
  }

  const { email, password } = loginValidation.data;

  const logInBody = {
    email,
    password: password,
  };

  try {
    const response = await fetch(logInUser, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInBody),
    });

    const { message, token } = (await response.json()) as LogInUserProps;

    if (response.status === 200) {
      await setCookies("token_access", token);
    }

    return {
      message,
      statusCode: response.status,
    };
  } catch (error) {
    throw error;
  }
};
