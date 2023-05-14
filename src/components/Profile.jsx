"use client";
import { useGetUserQuery } from "@/services/spotify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/token/tokenSlice";
import { useSession } from "next-auth/react";

const Profile = () => {
  const {data: session} = useSession();
  const { data, error, isLoading } = useGetUserQuery(session?.accessToken);
  
  console.log(data);

  return (
    <div>
      
    </div>
  )
}

export default Profile