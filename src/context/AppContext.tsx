import { createContext, useContext } from "react";

export const AppContext = createContext({})

const useAppContext = () => useContext(AppContext)