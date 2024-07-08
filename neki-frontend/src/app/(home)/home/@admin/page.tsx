"use client";

import { useEffect } from "react";
import { useFormStatus, useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { handleCreateSkills } from "@/actions/create-skills";

import { toastMapping } from "@/toasts/status-codes";
import { Loader } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-72"
      variant={"outline"}
      type="submit"
      disabled={pending}
    >
      {pending && (
        <div className="mr-2 animate-spin">
          <Loader />
        </div>
      )}
      Criar Habilidades
    </Button>
  );
};

const AdminHome = (): JSX.Element => {
  const [state, dispatch] = useFormState(handleCreateSkills, null);

  useEffect(() => {
    const statusCode = state?.statusCode;

    if (statusCode && toastMapping[statusCode]) {
      toastMapping[statusCode](state.message as string);
    }
  }, [state]);

  return (
    <form
      action={dispatch}
      className="mt-10 flex flex-col items-center 
      justify-center gap-5 text-center"
    >
      <h1 className="text-3xl font-bold">Página Administrativa</h1>

      <SubmitButton />
    </form>
  );
};

export default AdminHome;
