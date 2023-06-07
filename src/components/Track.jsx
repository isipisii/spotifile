"use client";
import { useCallback } from "react";

import moment from "moment";

const Track = ({ track, index, renderCount }) => {
  // format artists name with commas
  const formatArtistNames = useCallback(() => {
    let artistsName = [];
    track?.artists.forEach((artist) => {
      artistsName.push(artist?.name);
    });

    return artistsName.join(", ");
  }, [track]);

  return (
    // <Link href={`/track/${track.id}`}>
    <div className="flex justify-between hover:bg-[#5655556f] p-2 items-center rounded-md relative">
      <div className="flex gap-3 items-center justify-between">
        {renderCount && (
          <p className="text-[#bcbcbcab] text-xs sm:text-sm p-3 font-semibold">
            {index + 1}
          </p>
        )}
        <img
          loading="lazy"
          src={track?.album?.images[0]?.url}
          className="w-[40px] h-[40px] sm:w-[45px] md:h-[45px] rounded-sm"
        />
        <div>
          <p className="text-white text-[.85rem] md:text-[.9rem] truncate w-[150px] sm:w-[200px] md:-[250px] lg:w-[350px] sm:truncate-none font-medium">
            {track?.name}
          </p>
          <p className="text-[#898585d0] text-[.7rem] md:text-[.8rem] truncate w-[150px] sm:w-[200px] md:-[250px] lg:w-[350px] sm:truncate-none">
            {formatArtistNames()}
          </p>
        </div>
      </div>
      <p className="text-[#bbb4b4d0] text-[.8rem] text-left truncate w-[150px] sm:w-[200px] md:-[250px] lg:w-[350px] sm:truncate-none hidden sm:block">
        {track?.album?.name}
      </p>

      <p className="text-[#898585d0] text-[.6rem] md:text-[.8rem] font-semibold p-3">
        {moment
          .utc(moment.duration(track?.duration_ms).as("millisecond"))
          .format("m:ss")}
      </p>
    </div>
    // </Link>
  );
};

export default Track;
