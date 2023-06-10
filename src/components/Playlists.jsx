"use client";
import { useGetPlaylistsQuery } from "@/services/spotify";
import { useEffect } from "react";
import PlaylistCardLoader from "./Loaders/PlaylistCardLoader";
import Link from "next/link";

const Playlists = ({ session }) => {
  const {
    data: playLists,
    isLoading: isPlayListsLoading,
    refetch,
  } = useGetPlaylistsQuery(session?.accessToken && session); // the query will only run if the comparison of argument is true

  // refetch data when session changes and accessToken is available
  useEffect(() => {
    if (session?.accessToken) {
      refetch();
    }
  }, [session, refetch]);

  return (
    <section className="flex items-center justify-center">
      <div className="relative w-full max-w-[1400px] md:w-[92%] md:ml-[100px] flex flex-col gap-4 p-8">
        <div className="flex justify-between items-center ">
          <h1 className="text-white font-bold text-[1.6rem] text-center">
            Playlist
          </h1>
        </div>
        {/* Playlist */}
        {/* playlist container */}
        {isPlayListsLoading || !playLists ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {[...new Array(5)].map((_, index) => (
              <PlaylistCardLoader key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
            {playLists?.items.map((playList, index) => (
              <Link href={`/playlist/${playList?.id}`} key={index}>
                <div
                  className="bg-[#0000002d] flex rounded-[7px] flex-col gap-4 max-w-[250px] p-5 hover:bg-[#3534346f]"
                >
                  <img
                    loading="lazy"
                    className="rounded-[4px]"
                    src={playList?.images[0]?.url}
                  />
                  <h2 className="text-white font-semibold text-left text-xs sm:text-sm ">
                    {playList?.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Playlists;
