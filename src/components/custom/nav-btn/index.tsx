import { FC } from "react";
import Link from "next/link";
// icons
import { LucideProps } from "lucide-react";
// utils
import { cn } from "@/lib/utils";

// components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Icon } from "@/components/custom/icon";

type NavBtnProps = {
  icon: FC<LucideProps>;
  tip: string;
  href: string;
  isActive: boolean;
};

export const NavBtn = ({ icon, tip, href, isActive }: NavBtnProps) => {
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
