import { LayoutDashboardIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavLink {
  title: string;
  icon: LucideIcon;
  href: string;
  hrefAsIs?: boolean;
}

export type SidebarLinkItem = NavLink & {
  children?: Omit<NavLink, "icon" | "children">[];
  type?: never;
};

export type SidebarLink =
  | SidebarLinkItem
  | {
      type: "divider";
      title: string;
    };

export const sidebarLinks: SidebarLink[] = [
  {
    type: "divider",
    title: "dashboard",
  },
  {
    title: "dashboard",
    icon: LayoutDashboardIcon,
    href: "",
  },
];
