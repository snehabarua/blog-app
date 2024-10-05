"use client";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    //show light afer opening the page
    return value || "light";
  }
};
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage();
  });
  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  //also store in localstorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  //need a value to pass to children

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
