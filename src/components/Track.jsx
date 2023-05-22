"use client";
import Link from "next/link";
import moment from "moment";

const Track = ({ track }) => {
  return (
    <Link href={`/track/${track.id}`}>
      <div className="flex justify-between hover:bg-[#3534346f] p-2 items-center rounded-md">
        <div className="flex gap-3 items-center">
          <img
            src={track?.album?.images[0]?.url}
            alt="album image"
            className="w-[45px] h-[45px] sm:w-[50px] md:h-[50px] rounded-sm"
          />
          <div>
            <p className="text-white text-[.85rem] md:text-[.9rem] truncate w-[200px] sm:w-auto sm:truncate-none font-medium">
              {track?.name}
            </p>
            <div className="flex truncate w-[200px] gap-1">
              {track?.artists.map((artist, index) => (
                <p
                  className="text-[#898585d0] text-[.7rem] md:text-[.8rem]"
                  key={index}
                >
                  {artist?.name}{" "}
                  {track?.artists.length - 1 === index ? "" : ","}
                </p>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[#898585d0] text-[.85rem] md:text-[.87rem] font-semibold">
          {moment
            .utc(moment.duration(track?.duration_ms).as("millisecond"))
            .format("m:ss")}
        </p>
      </div>
    </Link>
  );
};

export default Track;
