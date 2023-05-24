"use client"
import { useGetRecentlyPlayedQuery } from "@/services/spotify";
import Track from "./Track";
import { usePalette } from "@lauriys/react-palette";

const RecentlyPlayed = () => {
  const { data: recentlyPlayed } = useGetRecentlyPlayedQuery();
  const mostRecentTrackImage = recentlyPlayed?.items[0]?.track?.album?.images[0]?.url
  const {data: color} = usePalette(mostRecentTrackImage)

  return (
    <section
      className="flex items-center justify-center gradient-background"
      style={{
        "--from-color": color.darkVibrant,
        "--via-color": "#121212d1",
      }}
    >
      <div className="relative w-full max-w-[1200px] md:w-[92%] md:ml-[100px] flex flex-col gap-4 p-8">
        <div className="flex justify-between items-center ">
          <h1 className="text-white font-bold text-[1.6rem] text-center">
            Recently Played
          </h1>
        </div>
        {/* Tracks */}
        <div className="max-h-[750px] md:max-h-[550px] h-full overflow-y-auto mb-12 md:mb-0">
          {/* tracks container */}
          <div className="flex flex-col">
            {/* track */}
            {recentlyPlayed?.items.map((track, index) => (
              <Track track={track?.track} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyPlayed;
