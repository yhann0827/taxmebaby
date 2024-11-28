import React from "react";
// import { ThemeProvider } from "@mui/material";
import { Global } from "@emotion/react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your pages
import Dashboard from "./pages/Dashboard";
import Planning from "./pages/Planning";
import Invoice from "./pages/Invoice";
import Account from "./pages/Account";

// Define your routes
export const routes = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  PLANNING: "/planning",
  INVOICE: "/invoice",
  ACCOUNT: "/account",
};

function App() {
  return (
    <>
      <Global
        styles={{
          ".center": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
      <div className="App">
        <Routes>
          <Route path={routes.ROOT} element={<Navigate to={routes.DASHBOARD} replace />} />
          <Route path={routes.DASHBOARD} element={<Dashboard />} />
          <Route path={routes.PLANNING} element={<Planning />} />
          <Route path={routes.INVOICE} element={<Invoice />} />
          <Route path={routes.ACCOUNT} element={<Account />} />
          <Route path="*" element={<Navigate to={routes.DASHBOARD} replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;