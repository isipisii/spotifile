"use client";

import { SessionProvider } from "next-auth/react";

const SeshProvider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SeshProvider;
