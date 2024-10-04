import { Moon, Sun,Citrus,Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { useTheme } from "./themeProvider"
import { useState } from "react"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className=" absolute h-[1.2rem] w-[1.2rem] transition-all light:scale-100    dark:scale-0  Orange:scale-0  Green:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all   light:scale-0  dark:scale-100 Orange:scale-0  Green:scale-0" />
          <Citrus className="absolute h-[1.2rem] w-[1.2rem] transition-all   light:scale-0  dark:scale-0 Orange:scale-100 Green:scale-0"/>
          <Leaf className="absolute h-[1.2rem] w-[1.2rem] transition-all   light:scale-0  dark:scale-0   Orange:scale-0 Green:scale-100"/>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("Orange")}>
          orange
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("Green")}>
          Green
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
