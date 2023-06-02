"use client";
import moment from "moment";

const Track = ({ track, index, renderCount }) => {
  return (
    // <Link href={`/track/${track.id}`}>
    <div className="flex justify-between hover:bg-[#3534346f] p-2 items-center rounded-md">
      <div className="flex gap-3 items-center">
        {renderCount && (
          <p className="text-[#bcbcbcd0] text-xs sm:text-sm p-3 font-semibold">
            {index + 1}
          </p>
        )}
        <img
          loading="lazy"
          src={track?.album?.images[0]?.url}
          className="w-[40px] h-[40px] sm:w-[45px] md:h-[45px] rounded-sm"
        />
        <div>
          <p className="text-white text-[.85rem] md:text-[.9rem] truncate w-[150px] sm:w-[200px] sm:truncate-none font-medium">
            {track?.name}
          </p>
          <div className="flex truncate w-[150px] sm:w-[200px] gap-1">
            {track?.artists.map((artist, index) => (
              <p
                className="text-[#898585d0] text-[.7rem] md:text-[.8rem]"
                key={index}
              >
                {artist?.name} {track?.artists.length - 1 === index ? "" : ","}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-[10rem] items-center">
        <p className="text-[#bbb4b4d0] text-[.8rem] text-center truncate hidden sm:block">
          {track?.album?.name}
        </p>
        <p className="text-[#898585d0] text-[.6rem] md:text-[.8rem] font-semibold p-3">
          {moment
            .utc(moment.duration(track?.duration_ms).as("millisecond"))
            .format("m:ss")}
        </p>
      </div>
    </div>
    // </Link>
  );
};

export default Track;
