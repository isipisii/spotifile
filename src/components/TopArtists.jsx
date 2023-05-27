"use client";
import {
  useGetTopArtistsOfAllTimeQuery,
  useGetRecentTopArtistsQuery,
  useGetTopArtistsLast6MonthsQuery,
} from "@/services/spotify";
import Link from "next/link";
import ArtistCard from "./ArtistCard";
import { usePalette } from "@lauriys/react-palette";
import { useState, useEffect } from "react";
import ArtistCardLoader from "./Loaders/ArtistCardLoader";

const TopArtists = ({ length, render, session }) => {
  const {
    data: topArtistsOfAllTime,
    refetch: refetchTopArtistsOfAllTime,
    isLoading: isTopArtistLoading,
  } = useGetTopArtistsOfAllTimeQuery(
    { length },
    session?.accessToken && session
  );
  const {
    data: topArtistsRecent,
    refetch: refetchTopArtistsRecent,
    isLoading: isTopArtistRecentLoading,
  } = useGetRecentTopArtistsQuery({ length }, session?.accessToken && session);
  const {
    data: topArtistsLast6Months,
    refetch: refetchTopArtistsLast6Months,
    isLoading: isTopArtist6MonthsLoading,
  } = useGetTopArtistsLast6MonthsQuery(
    { length },
    session?.accessToken && session
  );

  const tabItems = [
    {
      label: "All time",
      data: topArtistsOfAllTime,
      title: "Top Artists of all time",
      isLoading: isTopArtistLoading,
    },
    {
      label: "Last 6 months",
      data: topArtistsLast6Months,
      title: "Top Artists Last 6 months",
      isLoading: isTopArtist6MonthsLoading,
    },
    {
      label: "This month",
      data: topArtistsRecent,
      title: "Top Artists this month",
      isLoading: isTopArtistRecentLoading,
    },
  ];

  const [tabIndex, setTabIndex] = useState(0);
  const topArtistImage = tabItems[tabIndex].data?.items[0]?.images[0]?.url; // to get the image of the top artist and for extraction of its color
  const { data: color } = usePalette(topArtistImage);

  function refetchTopArtists() {
    refetchTopArtistsRecent();
    refetchTopArtistsLast6Months();
    refetchTopArtistsOfAllTime();
  }

  useEffect(() => {
    if (session?.accessToken) {
      refetchTopArtists();
    }
  }, [session?.accessToken]);

  return (
    <div className={`mb-[4rem] ${!render ? "p-8" : null}`}>
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
      <div
        className={`flex justify-between items-center mb-4 gap-3 ${
          !render ? "flex-col md:flex-row" : null
        }`}
      >
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
            className="text-[#cdc8c8] text-xs md:text-sm font-semibold hover:underline-offset-2 hover:underline"
          >
            See more
          </Link>
        )}

        {/* tab chip */}
        {!render && (
          <div className="flex gap-2">
            {tabItems.map((tab, index) => (
              <p
                className={`${
                  tabIndex === index ? "bg-white text-[#000000]" : "text-white"
                }  font-medium text-xs transition-all duration-300 hover:bg-white hover:text-black md:text-sm cursor-pointer px-3 py-1 border border-white rounded-full`}
                onClick={() => setTabIndex(index)}
                key={index}
              >
                {tab.label}
              </p>
            ))}
          </div>
        )}
      </div>
      {tabItems[tabIndex].isLoading || !tabItems[tabIndex].data ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[... new Array(10)].map((_, index) => (
            <ArtistCardLoader key={index} />
          ))}
        </div>
        ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {tabItems[tabIndex].data?.items.map((artist, index) => (
            <ArtistCard artist={artist} key={index} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopArtists;
