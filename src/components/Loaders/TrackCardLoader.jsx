import React from "react";

const TrackCardLoader = () => {
  return (
    <div className="flex justify-between bg-[#0000002d] p-2 items-center rounded-md">
      <div className="flex gap-3 items-center">
        <div className="animate-pulse bg-[#302e2ec0] w-[45px] h-[45px] sm:w-[50px] md:h-[50px] rounded-sm"></div>
        {/* text */}
        <div className="flex gap-2 flex-col">
          <div className="animate-pulse bg-[#302e2ec0] rounded-sm h-3 w-[12rem]"></div>
          <div className="animate-pulse bg-[#302e2ec0] rounded-sm h-2 w-[11rem]"></div>
        </div>
      </div>
    </div>
  );
};

export default TrackCardLoader;
