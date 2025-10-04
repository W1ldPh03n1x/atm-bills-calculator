import React from "react";
import { BrowserRouter } from "react-router";

import { ThemeProvider } from "@/app/providers/ThemeProvider";

import type { ChildrenProp } from "@/shared/types";
export const Providers: React.FC<ChildrenProp> = ({ children }) => {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </>
  );
};
