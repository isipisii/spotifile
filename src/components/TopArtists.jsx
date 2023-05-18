"use client";
import { useGetTopArtistsOfAllTimeQuery } from "@/services/spotify";
import Link from "next/link";
import ArtistCard from "./ArtistCard";
import { usePalette } from "@lauriys/react-palette";

const TopArtists = ({ accessToken, length, render }) => {
  const { data: topArtistOfAllTime } = useGetTopArtistsOfAllTimeQuery({
    accessToken,
    length,
  });

  const topArtistImage = topArtistOfAllTime?.items[0]?.images[0]?.url;
  const { data: color } = usePalette(topArtistImage);

  return (
    <div className={`mb-[4rem] relative ${!render ? "p-6" : null}`}>
      {/* to avoid rendering in the profile component */}
      {!render && (
        <div
          className="top-artist-background"
          style={{
            "--from-color": color.darkVibrant,
            "--via-color": "#121212d1",
          }}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h1
          className={`text-white 
              text-[1.1rem] ${
                !render
                  ? "md:text-[2rem] font-bold"
                  : "md:text-[1.3rem] font-semibold"
              }`}
        >
          Top Artists of all time
        </h1>
        {render && (
          <Link
            href="/top-artists"
            className="text-[#cdc8c8] text-xs md:text-sm font-semibold"
          >
            See more
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {topArtistOfAllTime?.items.map((artist, index) => (
          <ArtistCard artist={artist} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
