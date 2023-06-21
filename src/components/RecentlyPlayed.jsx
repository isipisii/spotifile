"use client";
import { useGetRecentlyPlayedQuery } from "@/services/spotify";
import { useEffect } from "react";
import Track from "./Track";
import { usePalette } from "@lauriys/react-palette";
import TrackCardLoader from "./Loaders/TrackCardLoader";

const RecentlyPlayed = ({ session }) => {
  const {
    data: recentlyPlayed,
    isLoading,
    refetch,
  } = useGetRecentlyPlayedQuery(session?.accessToken && session);
  const mostRecentTrackImage =
    recentlyPlayed?.items[0]?.track?.album?.images[0]?.url;
  const { data: color } = usePalette(mostRecentTrackImage);

  // refetch data when session changes and accessToken is available
  useEffect(() => {
    if (session?.accessToken) {
      refetch();
    }
  }, [session, refetch]);

  return (
    <section
      className="flex items-center justify-center gradient-background"
      style={{
        "--from-color": color.darkVibrant,
        "--via-color": "#121212d1",
      }}
    >
      <div className="relative w-full max-w-[1400px] md:w-[92%] md:ml-[100px] flex flex-col gap-4 p-8">
        <div className="flex justify-between items-center ">
          <h1 className="text-white font-bold text-[1.6rem] text-center">
            Recently Played
          </h1>
        </div>
        {/* Tracks */}
        <div className="max-h-[700px] md:max-h-[600px] h-full overflow-y-auto mb-12 md:mb-0">
          {/* tracks container */}

          {/* track */}
          {isLoading || !recentlyPlayed ? (
            <div className="flex flex-col gap-1">
              {[...new Array(20)].map((_, index) => (
                <TrackCardLoader key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {recentlyPlayed?.items.map((track, index) => (
                <Track track={track?.track} key={index} renderCount={false} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentlyPlayed;
