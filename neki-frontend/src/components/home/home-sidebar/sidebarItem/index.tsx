"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarLink, SidebarLinkItem } from "../constants";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button, buttonVariants } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { useSidebar } from "@/zustand/sidebar-store";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface SidebarItemProps {
  link: SidebarLink;
  ignoreCollapse?: boolean;
}

export const SidebarItem = ({
  link,
  ignoreCollapse,
}: SidebarItemProps): JSX.Element | null => {
  const isOpen = useSidebar((state) => state.isOpen) || ignoreCollapse;

  if (link.type === "divider") {
    if (!isOpen) return null;

    return (
      <li className="my-3">
        <span
          className="block text-xs font-semibold 
          uppercase text-accent-foreground/70"
        >
          {link.title}
        </span>
      </li>
    );
  }

  if (link.children)
    return (
      <motion.li
        transition={{ duration: 0.3 }}
        layout="position"
        className="relative mb-2"
      >
        <SidebarItemAccordion link={link} ignoreCollapse={ignoreCollapse} />
      </motion.li>
    );

  return (
    <motion.li
      transition={{ duration: 0.3 }}
      layout="position"
      className="mb-2"
    >
      <SidebarNavLink link={link} ignoreCollapse={ignoreCollapse} />
    </motion.li>
  );
};

type NavLinkProps = { link: SidebarLinkItem; ignoreCollapse?: boolean };

const SidebarNavLink = ({ link, ignoreCollapse }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = `/home${link.href}` === pathname;

  const isOpen = useSidebar((state) => state.isOpen) || ignoreCollapse;
  const href = link.hrefAsIs ? link.href : `/home${link.href}`;

  if (!isOpen)
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild className="duration-0">
          <Link
            href={href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "relative flex h-12 justify-start hover:bg-accent focus:bg-accent",
              isActive && "bg-muted",
            )}
          >
            <link.icon size={20} className="shrink-0 text-accent-foreground" />
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={12}
          className="flex items-center gap-2"
        >
          {link.title}
        </TooltipContent>
      </Tooltip>
    );

  return (
    <Link
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "relative flex h-12 justify-start hover:bg-accent focus:bg-accent",
        isActive && "group bg-accent text-primary",
      )}
      href={href}
    >
      <link.icon
        size={20}
        className="shrink-0 text-accent-foreground group-[]:text-primary"
      />
      <span className="absolute capitalize left-11">{link.title}</span>
    </Link>
  );
};

const SidebarItemAccordion = ({ link, ignoreCollapse }: NavLinkProps) => {
  const isOpen = useSidebar((state) => state.isOpen) || ignoreCollapse;

  if (!isOpen) {
    return (
      <DropdownMenu>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild className="duration-0">
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative flex h-12 justify-between duration-0 hover:bg-accent focus:bg-accent"
              >
                <link.icon
                  size={20}
                  className="shrink-0 text-accent-foreground"
                />
                <span className="sr-only">{link.title}</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent sideOffset={12} className="flex items-center gap-2">
            {link.title}
            <ChevronRight size={16} />
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent sideOffset={8} align="start">
          <DropdownMenuLabel>{link.title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {link.children!.map((child) => (
            <DropdownMenuItem key={child.title + child.href} asChild>
              <Link
                href={
                  child.hrefAsIs ? child.href : `/home${link.href}${child.href}`
                }
              >
                <span>{child.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Accordion key={link.href} type="single" collapsible>
      <AccordionItem value={link.title} className="border-b-0">
        <AccordionTrigger
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "relative flex h-12 justify-between duration-0 hover:bg-accent focus:bg-accent",
          )}
        >
          <div>
            <link.icon size={20} className="shrink-0 text-accent-foreground" />
          </div>
          <span className="absolute capitalize left-11">{link.title}</span>
        </AccordionTrigger>
        <AccordionContent className="mt-3 space-y-2 pb-1 pl-4 pr-1">
          {link.children!.map((child) => (
            <Link
              href={
                child.hrefAsIs ? child.href : `/home${link.href}${child.href}`
              }
              key={child.title}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "relative flex h-10 w-full justify-start gap-3 hover:bg-accent focus:bg-accent",
              )}
            >
              <div className="size-2 rounded-full border bg-accent-foreground" />
              <span>{child.title}</span>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
