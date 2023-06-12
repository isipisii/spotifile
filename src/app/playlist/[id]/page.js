"use client";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/slice/authSlice";
import PlaylistDetails from "@/components/PlaylistDetails";

const PlaylistPage = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  dispatch(setAccessToken(session?.accessToken));

  return <PlaylistDetails session={session}/>;
};

export default PlaylistPage;
