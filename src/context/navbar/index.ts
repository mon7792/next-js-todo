import { createContext } from "react";

export const NavbarContext = createContext({
  open: false,
  setOpen: (val:boolean) => {},
});
