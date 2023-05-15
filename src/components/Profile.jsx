"use client";
import {
  useGetUserQuery,
  useGetFollowingQuery,
  useGetPlaylistsQuery,
  useGetTopArtistsOfAllTimeQuery,
} from "@/services/spotify";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Profile = () => {
  const { data: session } = useSession();
  const { data: userData } = useGetUserQuery(session?.accessToken);
  const { data: followingData } = useGetFollowingQuery(session?.accessToken);
  const { data: playlistsData } = useGetPlaylistsQuery(session?.accessToken);
  const { data: topArtistOfAllTime } = useGetTopArtistsOfAllTimeQuery({
    accessToken: session?.accessToken,
    length: 10,
  });

  console.log(topArtistOfAllTime);

  return (
    <section className="flex justify-end">
      <div className="border-white border w-full md:w-[92%] md:ml-[100px] p-4 ">
        {/* top part */}
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-[2rem]">Profile</h1>
          <button
            className="font-medium text-white text-sm rounded-full py-2 px-5 transition-all duration-300 hover:text-black hover:bg-white border border-[#dad4d4]"
            onClick={signOut}
          >
            Log out
          </button>
        </div>

        {/* user profile part */}
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
                {userData?.followers?.total} Follower •{" "}
                {followingData?.artists?.total} Following •{" "}
                {playlistsData?.total} Playlists
              </p>
            </div>
          </div>
        </div>
        {/* end of user profile part */}

        {/* top artists and tracks */}
        <div className="my-8">
          {/* top artists */}
          <div className="flex items-center justify-between">
            <h1
              className="text-white font-semibold
                text-[1.3rem]"
            >
              Top Artists of all time
            </h1>
            <Link href="/top-artists" className="text-[#cdc8c8] text-sm font-semibold">
              See more
            </Link>
          </div>
          <div className="flex gap-4 flex-wrap justify-between mt-4">
            {topArtistOfAllTime?.items?.map((artist) => (
              <div className="flex rounded-[7px] flex-col gap-1 items-center bg-[#00000064] w-[195px] py-5">
                <img
                  src={artist?.images[0]?.url}
                  alt="artist-profile"
                  className="rounded-full h-[150px] w-[150px] object-cover"
                />
                <h3 className="text-white text-sm mt-2 font-semibold">
                  {artist?.name}
                </h3>
                <p className="text-[#cdc8c8] text-xs">
                  {artist?.type.charAt(0).toUpperCase() + artist?.type.slice(1)}
                </p>
              </div>
            ))}
          </div>
          {/* end of top artists */}


        </div>
      </div>
    </section>
  );
};

export default Profile;
