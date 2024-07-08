"use server";

import { cookies } from "next/headers";
import { parseJwt } from "@/lib/decode-jwt";

async function setCookies(cookieName: string, token: string) {
  try {
    const setCookie = cookies();
    const decodedToken = parseJwt(token);

    const nowInSeconds = Math.floor(Date.now() / 1000);
    const expiresIn = decodedToken.exp - nowInSeconds;

    setCookie.set(cookieName, token, {
      httpOnly: true,
      secure: true,
      maxAge: expiresIn,
      sameSite: "strict",
      path: "/",
    });
  } catch (error) {
    throw error;
  }
}

async function deleteCookies(cookieName: string) {
  try {
    const deleteCookie = cookies();
    deleteCookie.delete(cookieName);
  } catch (error) {
    throw error;
  }
}

async function getCookies(cookieName: string) {
  try {
    const getUserCookie = cookies();
    const userCookie = getUserCookie.get(cookieName)?.value;

    return userCookie;
  } catch (error) {
    throw error;
  }
}

export { setCookies, deleteCookies, getCookies };
