"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const qclient = new QueryClient();
function CustomQueryClient({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={qclient}>{children}</QueryClientProvider>;
}

export default CustomQueryClient;
