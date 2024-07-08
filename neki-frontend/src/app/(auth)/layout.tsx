import { Metadata } from "next";
import { AuthLayout } from "@/components/layouts/auth-layout";

type AuthLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  robots: {
    follow: true,
    index: true,
  },
};

const Layout = ({ children }: AuthLayoutProps): JSX.Element => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
