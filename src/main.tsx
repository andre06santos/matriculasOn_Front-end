import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AdminProvider } from "./modules/administradores/views/administrador-provider.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminProvider>
      <App />
      <ToastContainer position="top-center" autoClose={5000} />
    </AdminProvider>
  </StrictMode>
);
