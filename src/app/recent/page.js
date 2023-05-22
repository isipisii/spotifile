"use client";
import { useSession } from "next-auth/react";
import RecentlyPlayed from "@/components/RecentlyPlayed";

const Recent = () => {
  const { data: session } = useSession();

  return <RecentlyPlayed accessToken={session?.accessToken} />;
};

export default Recent;
