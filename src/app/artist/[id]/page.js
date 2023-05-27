"use client";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/slice/authSlice";
import ArtistDetails from "@/components/ArtistDetails";

const ArtistPage = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  dispatch(setAccessToken(session?.accessToken));

  return (
    <ArtistDetails />
  );
};

export default ArtistPage;
