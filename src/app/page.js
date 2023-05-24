"use client";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Profile from "@/components/Profile";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  dispatch(setAccessToken(session?.accessToken));

  if (!session) {
    return <Login />;
  }

  return (
    <div className="w-full items-center justify-center">
      <Profile />
    </div>
  );
};

export default Home;
