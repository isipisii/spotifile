"use client";
import {
  useGetUserQuery,
  useGetFollowingQuery,
  useGetPlaylistsQuery,
  useGetTopArtistsOfAllTimeQuery,
  useGetUserTopTracksQuery,
} from "@/services/spotify";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import moment from "moment";
import { usePalette } from "@lauriys/react-palette";
import TopArtists from "./TopArtists";

const Profile = () => {
  const { data: session } = useSession();
  const { data: userData } = useGetUserQuery(session?.accessToken);
  const { data: followingData } = useGetFollowingQuery(session?.accessToken);
  const { data: playlistsData } = useGetPlaylistsQuery(session?.accessToken);
  const { data: topTracks } = useGetUserTopTracksQuery({
    accessToken: session?.accessToken,
    length: 10,
  });

  const { data: color } = usePalette(userData?.images[0]?.url);

  return (
    <section className="flex items-center justify-center">
      <div className="relative w-full max-w-[1200px] md:w-[92%] md:ml-[100px] flex flex-col gap-10">
        {/* top part */}
        <div
          className="gradient-background"
          style={{
            "--from-color": color.darkVibrant,
            "--via-color": "#121212d1",
          }}
        />
        <div className="flex items-center justify-between p-6 ">
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
          <div className="flex flex-col items-center ">
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
        <div className="my-6 flex flex-col p-6">
          {/* top artists */}
          <TopArtists
            accessToken={session?.accessToken}
            length={10}
            render={true}
          />
          {/* end of top artists */}
          {/* top tracks */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1
                className="text-white font-semibold
                text-[1.1rem] md:text-[1.3rem]"
              >
                Top tracks this month
              </h1>
              <Link
                href="/top-artists"
                className="text-[#cdc8c8] text-xs md:text-sm font-semibold"
              >
                See more
              </Link>
            </div>

            {/* Tracks */}
            <div className="relative ">
              {/* fade */}
              {/* top */}
              {/* {isOverflowed && (
                <div
                  className="absolute inset-x-0 w-full h-[2rem] left-0 top-0 bg-gradient-to-b 
              from-[#121212] via-[#121212d1] to-transparent z-[2] fade-element"
                />
              )} */}
              {/* bottom */}
              {/* {isOverflowed && (
                <div
                  className="absolute inset-x-0 w-full h-[2rem] left-0 bottom-0 bg-gradient-to-t 
              from-[#121212] via-[#121212d1] to-transparent z-[2] fade-element"
                />
              )} */}
              <div className="max-h-[200px] overflow-y-auto mb-8 md:mb-0">
                {/* tracks container */}
                <div className="flex flex-col gap-4">
                  {/* track */}
                  {topTracks?.items.map((track, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="flex gap-3 items-center">
                        <img
                          src={track?.album?.images[0]?.url}
                          alt="album image"
                          className="w-[60px] h-[60px] md:w-[60px] md:h-[60px]"
                        />
                        <div>
                          <p className="text-white text-sm md:text-base  font-medium">
                            {track?.name}
                          </p>
                          <div className="flex gap-1">
                            {track?.artists.map((artist, index) => (
                              <p
                                className="text-[#898585d0] text-xs md:text-sm"
                                key={index}
                              >
                                {artist?.name}{" "}
                                {track?.artists.length - 1 === index ? "" : ","}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-[#898585d0] md:text-sm text-xs font-semibold">
                        {moment
                          .utc(
                            moment
                              .duration(track?.duration_ms)
                              .as("millisecond")
                          )
                          .format("m:ss")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* end of top tracks */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
