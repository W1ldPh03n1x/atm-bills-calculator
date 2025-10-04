import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Providers } from "@/app/providers";

import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
