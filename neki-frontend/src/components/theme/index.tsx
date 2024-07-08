"use client";

import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { MoonStar, SunMedium } from "lucide-react";

export const Theme: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const themes = ["light", "dark", "system"];

  return (
    <Select onValueChange={setTheme} defaultValue={theme}>
      <SelectTrigger
        aria-label="Selecione o tema"
        className="flex w-11 justify-center 
        bg-transparent"
      >
        <div>
          <MoonStar width={18} height={18} className="hidden dark:block" />
          <SunMedium width={18} height={18} className="dark:hidden" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem key={theme} value={theme} className="capitalize">
            {theme}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
