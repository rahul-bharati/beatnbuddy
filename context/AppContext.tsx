import { Context, createContext, ReactNode } from "react";

export const AppContext: Context<{}> = createContext({});

interface Props {
  children: JSX.Element;
}

export const AppContextProvider = ({ children }: Props) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
