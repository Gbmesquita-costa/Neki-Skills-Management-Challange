"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Image from "next/image";
import { MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { SidebarNav } from "..";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button
          className="size-9 px-1 py-1"
          variant="ghost"
          aria-label="menu toggle"
        >
          <MenuIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-card p-0">
        <SidebarNav
          ignoreCollapse
          heading={
            <SheetHeader>
              <div
                className="flex items-center gap-2 
                overflow-hidden border-b px-6 py-5"
              >
                <Image
                  priority
                  src={"/NEKI.webp"}
                  width={28}
                  height={28}
                  alt="Neki Logo"
                  decoding="async" // Asynchronous decoding for better performance
                />
                <span className="whitespace-nowrap text-sm">NEKI</span>
              </div>
            </SheetHeader>
          }
        />
      </SheetContent>
    </Sheet>
  );
};
