import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ThemeConfig from "./theme";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeConfig>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeConfig>
  </React.StrictMode>
);
