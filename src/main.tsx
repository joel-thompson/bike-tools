import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { Toaster } from "./components/ui/sonner";
import { setFaviconFromIcon } from "./utils/favicon";

// Set the favicon
setFaviconFromIcon();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
