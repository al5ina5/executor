import { createContext, useContext } from "react";

export const WindowContext = createContext({})

export const useWindowContext = () => useContext(WindowContext)