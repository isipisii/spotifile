"use client"
import RecentlyPlayed from "@/components/RecentlyPlayed";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/auth/authSlice";
import { useSession } from "next-auth/react";

const Recent = () => {
  
  const dispatch = useDispatch();
  const { data: session } = useSession();
  dispatch(setAccessToken(session?.accessToken));
  
  return <RecentlyPlayed />;
};

export default Recent;
