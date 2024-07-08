"use server";

import { validateSignUpUserFormSchema } from "@/schemas/signup-schema";
import { SignUpFormState } from "@/components/auth/signup-form/dtos";

interface SignUpUserProps {
  message: string;
}

export const handleSignUpUser = async (
  state: any,
  loginValues: FormData,
): Promise<SignUpFormState> => {
  const signUpUser = `${process.env.NEXT_PUBLIC_HTTP_REQUEST}/user`;

  const signUpValidation = validateSignUpUserFormSchema.safeParse({
    email: loginValues.get("email"),
    password: loginValues.get("password"),
    confirm_password: loginValues.get("confirm_password"),
  });

  if (signUpValidation.error) {
    const formatError = signUpValidation.error.flatten();

    return {
      validationError: formatError.fieldErrors,
    };
  }

  const { email, confirm_password } = signUpValidation.data;

  const signUpBody = {
    email,
    password: confirm_password,
  };

  try {
    const response = await fetch(signUpUser, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpBody),
    });

    const { message } = (await response.json()) as SignUpUserProps;

    return {
      message,
      statusCode: response.status,
    };
  } catch (error) {
    throw error;
  }
};
