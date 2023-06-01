"use client";
import { useGetPlaylistDetailsQuery } from "@/services/spotify";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/slice/authSlice";
import { useParams } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const params = useParams();
  const dispatch = useDispatch();
  dispatch(setAccessToken(session?.accessToken));

  const { data: playlistDetails } = useGetPlaylistDetailsQuery(params.id);

  return <div>page</div>;
};

export default page;
