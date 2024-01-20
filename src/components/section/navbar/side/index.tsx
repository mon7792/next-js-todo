"use client"
import { Lightbulb, Bell, Trash2 } from "lucide-react";
import { NavBtn } from "@/components/custom/nav-btn";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathName = usePathname();
 
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-0 left-0 z-40 w-[72px] h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto border-r-2">
        <div className="space-y-2 font-medium">
          {/* Notes */}
          <NavBtn icon={Lightbulb} tip="Notes" href="/" isActive={"/" === pathName} />
          {/* Reminder */}
          <NavBtn icon={Bell} tip="Reminder" href="/reminder" isActive={"/reminder" === pathName} />
          {/* Trash */}
          <NavBtn icon={Trash2} tip="Trash" href="/trash" isActive={"/trash" === pathName} />
        </div>
      </div>
    </aside>
  );
}
