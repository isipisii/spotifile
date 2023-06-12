"use client";
import { useSession } from "next-auth/react";
import Profile from "@/components/Profile";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/slice/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  dispatch(setAccessToken(session?.accessToken));

  return <Profile session={session} />;
};

export default Home;
