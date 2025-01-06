import { useContext } from "react";
import { AdminContext } from "../administrador-provider";

export const useAdmin = () => {
  const value = useContext(AdminContext);

  if (!value) {
    throw new Error("You must wrap your component with AdminProvider");
  }

  return value;
};
