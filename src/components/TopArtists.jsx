"use client";
import {
  useGetTopArtistsOfAllTimeQuery,
  useGetRecentTopArtistsQuery,
  useGetTopArtistsLast6MonthsQuery,
} from "@/services/spotify";
import Link from "next/link";
import ArtistCard from "./ArtistCard";
import { usePalette } from "@lauriys/react-palette";
import { useState } from "react";

const TopArtists = ({ accessToken, length, render }) => {
  const { data: topArtistOfAllTime } = useGetTopArtistsOfAllTimeQuery({
    accessToken,
    length,
  });

  const { data: topArtistRecent } = useGetRecentTopArtistsQuery({
    accessToken,
    length,
  });

  const { data: topArtistLast6Months } = useGetTopArtistsLast6MonthsQuery({
    accessToken,
    length,
  });

  const tabItems = [
    { label: "All time", data: topArtistOfAllTime, title: "Top Artists of all time"  },
    { label: "Last 6 months", data: topArtistLast6Months, title: "Top Artists Last 6 months" },
    { label: "Recent", data: topArtistRecent, title: "Recent Top Artists" },
  ];

  const [tabIndex, setTabIndex] = useState(0);
  const topArtistImage = tabItems[tabIndex].data?.items[0]?.images[0]?.url; // to get the image of the top artist and for extraction of its color
  const { data: color } = usePalette(topArtistImage);

  return (
    <div className={`mb-[4rem] relative ${!render ? "p-8 md:p-10" : null}`}>
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
      <div className={`flex justify-between items-center mb-4 gap-3 ${!render ? "flex-col md:flex-row" : null}`}>
        <h1
          className={`text-white 
               ${
                 !render
                   ? "text-[1.6rem] font-bold text-center" 
                   : "md:text-[1.3rem] font-semibold text-[1.1rem]"
               }`}
        >
          {render ? "Top Artists of all time" : tabItems[tabIndex].title}
        </h1>
        {/*it will only render in profile component */}
        {render && (
          <Link
            href="/top-artists"
            className="text-[#cdc8c8] text-xs md:text-sm font-semibold"
          >
            See more
          </Link>
        )}

        {/* tab chip */}
        {!render && (
          <div className="flex gap-2">
            {tabItems.map((tab, index) => (
              <p
                className={`${tabIndex === index ? "bg-white text-[#000000]" : undefined } text-white font-medium text-xs transition-all duration-300 hover:bg-white hover:text-black md:text-sm cursor-pointer px-3 py-1 border border-white rounded-full`}
                onClick={() => setTabIndex(index)}
              >
                {tab.label}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {tabItems[tabIndex].data?.items.map((artist, index) => (
          <ArtistCard artist={artist} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
