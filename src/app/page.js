"use client";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Profile from "@/components/Profile";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/slice/authSlice";
import { useRouter } from "next/navigation";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session  } = useSession();
  dispatch(setAccessToken(session?.accessToken));

  if (!session && !session?.accessToken) {
    router.push("/sign-in");
  }

  return (
    <div className="w-full items-center justify-center">
      <Profile session={session}/>
    </div>
  );
};

export default Home;
