"use client";
import TopTracks from "@/components/TopTracks";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/auth/authSlice";
import { useSession } from "next-auth/react";

const TopTracksPage = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  dispatch(setAccessToken(session?.accessToken));

  return <TopTracks />;
};

export default TopTracksPage;
