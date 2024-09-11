import { createContext, useContext } from "react";
import Data from "../Components/Type";

interface AppContextType {
    data: Data[] | null; 
    detailed: Data | null;
    borderCountryNames: string[] | null;
    handleCountryClick: (index:number)=>void;
    handleBorderCountry: (index:number) => void;
  }

export const AppContext = createContext<AppContextType | null>(null)

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
