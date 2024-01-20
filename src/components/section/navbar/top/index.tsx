import Link from "next/link";

import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function TopNavbar() {
  return (
    <nav className="flex flex-row justify-between items-center w-full p-4 border-b-2">
      <Menu />
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
    </nav>
  );
}
