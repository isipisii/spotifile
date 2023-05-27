"use client"
import TopArtists from "@/components/TopArtists";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/slice/authSlice";
import { useSession } from "next-auth/react";

const TopArtistsPage = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  dispatch(setAccessToken(session?.accessToken));
  
  return (
    <section className="flex items-center justify-center relative">
      <div className="w-full max-w-[1200px] md:w-[92%] md:ml-[100px] flex flex-col gap-10 ">
        <TopArtists session={session} length={20}/>
      </div>
    </section>
  );
};

export default TopArtistsPage;
