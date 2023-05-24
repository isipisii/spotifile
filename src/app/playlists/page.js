"use client"
import Playlists from "@/components/Playlists";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/auth/authSlice";
import { useSession } from "next-auth/react";

const PlaylistsPage = () => {

  const dispatch = useDispatch();
  const { data: session } = useSession();
  dispatch(setAccessToken(session?.accessToken));
  
  return <Playlists />;
};

export default PlaylistsPage;
