import { getCookies } from "@/actions/cookies";
import { parseJwt } from "@/lib/decode-jwt";

import { HomeLayout } from "@/components/layouts/home-layout";

const userRole = (role: "ADMIN" | "USER") => {
  return role;
};

const Layout = async ({
  user,
  admin,
}: Readonly<{
  admin: React.ReactNode;
  user: React.ReactNode;
}>) => {
  const token = await getCookies("token_access");
  const decodedToken = parseJwt(token as string);

  const role = userRole(decodedToken?.role);
  return <HomeLayout>{role === "ADMIN" ? admin : user}</HomeLayout>;
};

export default Layout;
