"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useSidebar } from "@/zustand/sidebar-store";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { sidebarLinks } from "./constants";
import { SidebarItem } from "./sidebarItem";

interface SidebarNavProps {
  heading: React.ReactNode;
  ignoreCollapse?: boolean;
}

export const HomeSideBar = (): JSX.Element => {
  const { isOpen, toggle } = useSidebar((state) => state);

  return (
    <>
      <div
        aria-expanded={isOpen}
        className={cn(
          "relative hidden h-screen shrink-0 duration-300 md:block",
          isOpen ? "w-[264px]" : "w-[77px]",
        )}
      />
      <aside
        className={cn(
          `fixed top-0 z-50 hidden h-screen shrink-0 bg-card 
          transition-[width] duration-300 md:block left-0 border-r`,
          isOpen ? "w-[264px]" : "w-[77px]",
        )}
      >
        <button
          onClick={toggle}
          aria-label="toggle sidebar"
          className="absolute top-12 z-20 flex h-7 w-7 items-center 
          justify-center rounded-full border bg-card p-0 ring-offset-1 
          ring-offset-background focus:outline-none focus:ring-1 
          focus:ring-ring right-0 translate-x-1/2"
        >
          {isOpen ? (
            <ArrowLeft className="text-foreground" size={18} />
          ) : (
            <ArrowRight className="text-foreground" size={18} />
          )}
        </button>

        <SidebarNav
          heading={
            <div
              className="flex items-center gap-2 
              overflow-hidden border-b px-6 py-4"
            >
              <Image
                priority
                src={"/NEKI.webp"}
                width={28}
                height={28}
                alt="Neki Logo"
                decoding="async" // Asynchronous decoding for better performance
              />

              {isOpen && (
                <span className="whitespace-nowrap text-sm">NEKI</span>
              )}
            </div>
          }
        />
      </aside>
    </>
  );
};

export const SidebarNav = ({
  heading,
  ignoreCollapse,
}: SidebarNavProps): JSX.Element => {
  return (
    <nav className="max-h-screen overflow-y-auto">
      <div className="sticky top-0 z-10 bg-card">{heading}</div>
      <TooltipProvider delayDuration={0}>
        <div className="flex justify-center text-foreground">
          <ul className="w-full overflow-hidden px-3 py-4">
            {sidebarLinks.map((link, idx) => (
              <SidebarItem
                key={idx}
                link={link}
                ignoreCollapse={ignoreCollapse}
              />
            ))}
          </ul>
        </div>
      </TooltipProvider>
    </nav>
  );
};
