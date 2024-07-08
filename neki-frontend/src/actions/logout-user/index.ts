"use server";

import { deleteCookies } from "@/actions/cookies";
import { redirect } from "next/navigation";

export const handleLogOutUser = async () => {
  try {
    await deleteCookies("token_access");
    redirect("/login");
  } catch (error) {
    throw error;
  }
};
