"use client";
import TopTracks from "@/components/TopTracks";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/slice/authSlice";
import { useSession } from "next-auth/react";

const TopTracksPage = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  dispatch(setAccessToken(session?.accessToken));

  return <TopTracks session={session} />;
};

export default TopTracksPage;
