import { Theme } from "@/components/theme";
import { getCookies } from "@/actions/cookies";

import { UserNav } from "../user-nav";
import { MobileSidebar } from "../home-sidebar/mobileSideBar";

interface UserAuthenticatedResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const HomeHeader = async (): Promise<JSX.Element> => {
  const getUserAuthenticated = `${process.env.NEXT_PUBLIC_HTTP_REQUEST}/me`;
  const token_access = await getCookies("token_access");

  const response = await fetch(getUserAuthenticated, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token_access}`,
    },
    cache: "no-store",
  });

  const { user } = (await response.json()) as UserAuthenticatedResponse;

  return (
    <header
      className="flex h-16 items-center 
      justify-between border-b bg-background px-7"
    >
      <div>
        <div className="md:hidden">
          <MobileSidebar />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Theme />
        <UserNav user={user} />
      </div>
    </header>
  );
};
