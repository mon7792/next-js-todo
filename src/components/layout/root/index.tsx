"use client";
import React, { useContext } from "react";

import { NavbarContext } from "@/context/navbar";

import Sidebar from "@/components/section/navbar/side";
import TopNavbar from "@/components/section/navbar/top";
import Main from "@/components/section/main";

type RTLayoutProps = {
  children: React.ReactNode;
};

export default function RTLayout({ children }: RTLayoutProps) {
  const { open, setOpen } = useContext(NavbarContext);
  return (
    <>
      <Sidebar isOpen={open} />
      <TopNavbar isSidebarOpen={open} setSidebarOpen={setOpen} />
      <Main isSidebarOpen={open}>{children}</Main>
    </>
  );
}
