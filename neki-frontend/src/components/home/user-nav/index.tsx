"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Loader, LogOut } from "lucide-react";

import { getCookies } from "@/actions/cookies";
import { handleLogOutUser } from "@/actions/logout-user";

interface UserAuthenticatedProps {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const UserNav = ({ user }: UserAuthenticatedProps): JSX.Element => {
  const [hasTokenAccess, setHasTokenAccess] = useState(false);

  useEffect(() => {
    const tokenAccess = async () => {
      const token = await getCookies("token_access");

      if (token) {
        setHasTokenAccess(true);
      } else {
        setHasTokenAccess(false);
      }
    };

    tokenAccess();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          {hasTokenAccess ? (
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="@neki" />
              <AvatarFallback>NK</AvatarFallback>
            </Avatar>
          ) : (
            <div className="animate-spin">
              <Loader />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52" sideOffset={8}>
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <div className="text-sm">Gabriel Mesquita</div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div onClick={async () => await handleLogOutUser()}>
            <span className="grow">Log out</span>
            <DropdownMenuShortcut>
              <LogOut size={20} />
            </DropdownMenuShortcut>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
