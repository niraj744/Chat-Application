"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const Toast = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default Toast;
