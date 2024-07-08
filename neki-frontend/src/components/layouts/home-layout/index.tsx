import { getCookies } from "@/actions/cookies";
import { SidebarProvider } from "@/zustand/sidebar-store";

import { HomeSideBar } from "@/components/home/home-sidebar";
import { HomeHeader } from "@/components/home/home-header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = async ({
  children,
}: HomeLayoutProps): Promise<JSX.Element> => {
  const sidebar_collapsed =
    (await getCookies("sidebar_collapsed")) === "false" ? false : true;

  return (
    <SidebarProvider isOpen={sidebar_collapsed}>
      <div className="flex min-h-screen">
        <HomeSideBar />
        <div className="flex w-full flex-col">
          <HomeHeader />
          <main className="container flex-grow py-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
