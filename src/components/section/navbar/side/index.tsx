import { FC } from "react";
import Link from "next/link";
// icons
import { LucideProps, Lightbulb, Bell, Trash2 } from "lucide-react";
// utils
import { cn } from "@/lib/utils";

// components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";



type IconProps = {
  icon: FC<LucideProps>;
  size: number;
  className: string;
};
const Icon = ({ icon: Icon, className, size }: IconProps) => {
  return <Icon size={size} className={className} />;
};

type NavBtnProps = {
  icon: FC<LucideProps>;
  tip: string;
  href: string;
  isActive: boolean;
};

const NavBtn = ({ icon, tip, href, isActive }: NavBtnProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className="flex w-12 h-12 group">
            <div
              className={cn(
                "flex items-center justify-center w-12 h-12 transition-all duration-300",
                isActive
                  ? "bg-primary rounded-lg"
                  : "bg-accent rounded-full group-hover:rounded-lg group-hover:bg-primary"
              )}
            >
              <Icon
                icon={icon}
                size={32}
                className={cn(
                  "transition-all duration-300",
                  isActive
                    ? "stroke-white"
                    : "stroke-primary group-hover:stroke-white"
                )}
              />
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default function SideBar() {
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-0 left-0 z-40 w-[72px] h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto border-r-2">
        <div className="space-y-2 font-medium">
          {/* Notes */}
          <NavBtn icon={Lightbulb} tip="Notes" href="/" isActive={true} />
          {/* Reminder */}
          <NavBtn icon={Bell} tip="Reminder" href="/" isActive={false} />
          {/* Trash */}
          <NavBtn icon={Trash2} tip="Trash" href="/" isActive={false} />
        </div>
      </div>
    </aside>
  );
}
