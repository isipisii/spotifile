"use client";
import moment from "moment";

const Track = ({ track }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3 items-center">
        <img
          src={track?.album?.images[0]?.url}
          alt="album image"
          className="w-[60px] h-[60px] md:w-[60px] md:h-[60px]"
        />
        <div>
          <p className="text-white text-sm md:text-base  font-medium">
            {track?.name}
          </p>
          <div className="flex gap-1">
            {track?.artists.map((artist, index) => (
              <p className="text-[#898585d0] text-xs md:text-sm" key={index}>
                {artist?.name} {track?.artists.length - 1 === index ? "" : ","}
              </p>
            ))}
          </div>
        </div>
      </div>
      <p className="text-[#898585d0] md:text-sm text-xs font-semibold">
        {moment
          .utc(moment.duration(track?.duration_ms).as("millisecond"))
          .format("m:ss")}
      </p>
    </div>
  );
};

export default Track;
