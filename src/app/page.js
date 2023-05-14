"use client";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Profile from "@/components/Profile";

const Home = () => {
  const { data: session } = useSession();

  console.log(session)

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
