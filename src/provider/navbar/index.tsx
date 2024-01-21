"use client";
import { useState, ReactNode } from "react";
import { NavbarContext } from "@/context/navbar";

interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider = ({ children }: NavbarProviderProps) => {
  const [open, setOpen] = useState(true);

  return (
    <NavbarContext.Provider value={{ open, setOpen }}>
      {children}
    </NavbarContext.Provider>
  );
};
