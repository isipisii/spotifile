"use client";
import {
  useGetUserQuery,
  useGetFollowingQuery,
  useGetPlaylistsQuery,
  useGetTrackRecommendationsQuery,
  useGetRecentTopTracksQuery,
} from "@/services/spotify";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePalette } from "@lauriys/react-palette";
import TopArtists from "./TopArtists";
import Track from "./Track";

const Profile = () => {
  const { data: session } = useSession();
  const { data: userData } = useGetUserQuery(session?.accessToken);
  const { data: followingData } = useGetFollowingQuery(session?.accessToken);
  const { data: playlistsData } = useGetPlaylistsQuery(session?.accessToken);
  const { data: topTracks } = useGetRecentTopTracksQuery({
    accessToken: session?.accessToken,
    length: 10,
  });
  const { data: trackRecommendation } = useGetTrackRecommendationsQuery({
    accessToken: session?.accessToken,
    topTrackIds: generateTopTrackIds(),
    length: 10,
  });
  const { data: color } = usePalette(userData?.images[0]?.url);

  // to get the ids of the top tracks and able to get the track recommendations
  function generateTopTrackIds(){
    const topTrackIds = []
    for(let i = 1; i <= 5; i++){
      topTrackIds.push(topTracks?.items[i]?.id)
    }
    return topTrackIds;
  }

  return (
    <section
      className="flex items-center justify-center gradient-background"
      style={{
        "--from-color": color.darkVibrant,
        "--via-color": "#121212d1",
      }}
    >
      <div className="relative w-full max-w-[1200px] md:w-[92%] md:ml-[100px] flex flex-col gap-10 p-8 ">
        {/* top part */}
        <div className="flex items-center justify-between ">
          <h1 className="text-white font-bold text-[1.6rem]">Profile</h1>
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
        <div className="my-6 flex flex-col">
          {/* top artists */}
          <TopArtists
            accessToken={session?.accessToken}
            length={10}
            render={true}
          />
          {/* end of top artists */}
          {/* top tracks */}
          <div className="mb-8">
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
            <div className="max-h-[200px] overflow-y-auto mb-8 md:mb-0">
              {/* tracks container */}
              <div className="flex flex-col">
                {/* track */}
                {topTracks?.items.map((track, index) => (
                  <Track track={track} key={index} />
                ))}
              </div>
            </div>
          </div>
          {/* end of top tracks */}

           {/* track recommendations */}
           <div>
            <div className="flex justify-between items-center mb-4">
              <h1
                className="text-white font-semibold
                text-[1.1rem] md:text-[1.3rem]"
              >
                Tracks recommended for you
              </h1>
            </div> 
            {/* Track recos */}
            <div className="max-h-[200px] overflow-y-auto mb-8 md:mb-0">
              {/* track reco container */}
              <div className="flex flex-col">
                {/* track reco */}
                {trackRecommendation?.tracks.map((track, index) => (
                  <Track track={track} key={index} />
                ))}
              </div>
            </div>
          </div>
          {/* end of track recommendations */}
        </div>
      </div>
    </section>
  );
};

export default Profile;
