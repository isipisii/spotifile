"use client";
import {
  useGetRecentTopTracksQuery,
  useGetLast6MonthsTopTracksQuery,
  useGetTopTracksOfAllTimeQuery,
} from "@/services/spotify";
import Track from "./Track";
import { usePalette } from "@lauriys/react-palette";
import { useState } from "react";

const TopTracks = ({ accessToken }) => {
  const { data: topTracksRecent } = useGetRecentTopTracksQuery({
    accessToken,
    length: 50,
  });
  const { data: topTracksLast6Months } = useGetLast6MonthsTopTracksQuery({
    accessToken,
    length: 50,
  });
  const { data: topTracksOfAllTime } = useGetTopTracksOfAllTimeQuery({
    accessToken,
    length: 50,
  });

  const tabItems = [
    {
      label: "All time",
      data: topTracksOfAllTime,
      title: "Top Tracks of all time",
    },
    {
      label: "Last 6 months",
      data: topTracksLast6Months,
      title: "Top Tracks last 6 months",
    },
    { label: "This month", data: topTracksRecent, title: "Top Tracks this month" },
  ];
  const [tabIndex, setTabIndex] = useState(0);

  const topTrackImage = tabItems[tabIndex].data?.items[0]?.album.images[0]?.url;
  const { data: color } = usePalette(topTrackImage);

  console.log(color);
  console.log(topTracksRecent);

  return (
    <section
      className="flex items-center justify-center gradient-background"
      style={{
        "--from-color": color.darkVibrant,
        "--via-color": "#121212d1",
      }}
    >
      <div className="relative w-full max-w-[1200px] md:w-[92%] md:ml-[100px] flex flex-col gap-4 p-8">
        <div className="flex justify-between items-center mb-4 gap-3 flex-col md:flex-row">
          <h1 className="text-white font-bold text-[1.6rem] text-center">
            {tabItems[tabIndex].title}
          </h1>
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
        </div>
        {/* Tracks */}
        <div className="max-h-[550px] md:max-h-[400px] overflow-y-auto mb-12 md:mb-0">
          {/* tracks container */}
          <div className="flex flex-col">
            {/* track */}
            {tabItems[tabIndex].data?.items.map((track, index) => (
              <Track track={track} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopTracks;
