"use server";

import { getCookies } from "@/actions/cookies";

interface CreateSkillsResponse {
  message: string;
}

export const handleCreateSkills = async () => {
  const createSkills = `${process.env.NEXT_PUBLIC_HTTP_REQUEST}/createSkills`;
  const token_access = await getCookies("token_access");

  try {
    const response = await fetch(createSkills, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token_access}`,
      },
    });

    const { message } = (await response.json()) as CreateSkillsResponse;

    return {
      message,
      statusCode: response.status,
    };
  } catch (error) {
    throw error;
  }
};
