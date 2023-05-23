"use client";
import Playlists from "@/components/Playlists";
import { useSession } from "next-auth/react";

const PlaylistsPage = () => {
  const { data: session } = useSession();
  console.log(session?.accessToken)

  return <Playlists accessToken={session?.accessToken} />;
};

export default PlaylistsPage;
