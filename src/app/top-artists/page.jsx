"use client";
import TopArtists from "@/components/TopArtists";
import { useSession } from "next-auth/react";

const TopArtistsPage = () => {
  const { data: session } = useSession();

  return (
    <section className="flex items-center justify-center">
      <div className="relative w-full max-w-[1200px] md:w-[92%] md:ml-[100px] flex flex-col gap-10 ">
        <TopArtists accessToken={session?.accessToken} length={20}/>
      </div>
    </section>
  );
};

export default TopArtistsPage;
