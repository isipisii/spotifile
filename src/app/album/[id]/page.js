"use client";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/slice/authSlice";
import { useSession } from "next-auth/react";
import AlbumDetails from "@/components/AlbumDetails";

const AlbumPage = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  dispatch(setAccessToken(session?.accessToken));
  
  return <AlbumDetails session={session} />;
};

export default AlbumPage;
