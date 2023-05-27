import React from "react";

const PlaylistCardLoader = () => {
  return (
    <div className="bg-[#0000002d] flex rounded-[7px] flex-col gap-2 items-center min-w-[200px]  max-w-[250px] p-4">
      <div className="animate-pulse bg-[#302e2ec0] w-[90%] h-[160px] sm:h-[180px] sm:w-[180px] rounded-[4px]"></div>
      <div className="animate-pulse bg-[#302e2ec0] w-[100px] h-4 rounded-sm"></div>
    </div>
  );
};

export default PlaylistCardLoader;
