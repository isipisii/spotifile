"use client"
import RecentlyPlayed from "@/components/RecentlyPlayed";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/slice/authSlice";
import { useSession } from "next-auth/react";

const Recent = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  dispatch(setAccessToken(session?.accessToken));
  
  return <RecentlyPlayed session={session} />;
};

export default Recent;
