"use client";
import Playlists from "@/components/Playlists";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/slice/authSlice";
import { useSession } from "next-auth/react";

const PlaylistsPage = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession(); 

  dispatch(setAccessToken(session?.accessToken));
  
  return <Playlists session={session}/>;
};

export default PlaylistsPage;
