"use client";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/slice/authSlice";
import { useSession } from "next-auth/react";
import { useGetAlbumDetailsQuery } from "@/services/spotify";
import { useParams } from "next/navigation";

const AlbumPage = () => {
  const { data: session } = useSession();
  const params = useParams();
  const dispatch = useDispatch();
  dispatch(setAccessToken(session?.accessToken));
  const { data } = useGetAlbumDetailsQuery(params.id);
  
  console.log(data);
  return <div>page</div>;
};

export default AlbumPage;
