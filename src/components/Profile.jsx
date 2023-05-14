"use client";
import { useGetUserQuery, useGetFollowingQuery, useGetPlaylistsQuery } from "@/services/spotify";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  const { data: userData } = useGetUserQuery(session?.accessToken);
  const { data: followingData } = useGetFollowingQuery(session?.accessToken);
  const { data: playlistsData } = useGetPlaylistsQuery(session?.accessToken);
  console.log(userData)
  console.log(playlistsData)
  return (  
    <section className="flex justify-end">
      <div className="border-white border w-full md:w-[92%] md:ml-[100px] p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-[2rem]">Profile</h1>
          <button className="font-medium text-white text-sm rounded-full py-2 px-5 transition-all duration-300 hover:text-black hover:bg-white border border-[#dad4d4]" onClick={signOut}>Log out</button>
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <a href={userData?.external_urls?.spotify}>
              <img
                className="rounded-full h-[150px] w-[150px]"
                src={userData?.images[0]?.url}
                alt={`${userData?.display_name}'s profile`}
              />
            </a>
            <h1 className="text-center text-white text-[4rem] font-bold">
              {userData?.display_name}
            </h1>
            <div>
              <p className="text-center text-sm font-medium text-white">
                {userData?.followers?.total} Follower {" "}  • {" "} {followingData?.artists?.total} Following • {" "} {playlistsData?.total} Playlists
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Profile;
