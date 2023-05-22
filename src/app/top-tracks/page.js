"use client"; 

import { useSession } from "next-auth/react";
import TopTracks from "@/components/TopTracks";

const TopTracksPage = () => {
  const { data: session } = useSession();
  return <TopTracks accessToken={session?.accessToken} />;
};

export default TopTracksPage;
