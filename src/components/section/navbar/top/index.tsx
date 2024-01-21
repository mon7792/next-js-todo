"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TopNavbarProps = {
  className?: string;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
};

export default function TopNavbar({isSidebarOpen, setSidebarOpen}: TopNavbarProps) {
  const toggle = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={cn(isSidebarOpen ? "ml-[72px]" : "ml-0", "transition-transform")}
    >
      <nav className="w-full border-b-2 ">
        <div className="flex flex-row justify-between items-center w-full p-4">
          <Button size="icon" variant={"ghost"} onClick={toggle}>
            <Menu />
          </Button>

          <Link href="/">
            <div className="flex flex-row items-center">
              <div className="text-2xl font-bold">Digi</div>
              <div className="text-3xl ml-1">🦔</div>
            </div>
          </Link>
          <div className="flex flex-row items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>
    </div>
  );
}
// className="fixed z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
