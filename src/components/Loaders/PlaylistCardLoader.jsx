"use client"

const PlaylistCardLoader = () => {
  return (
    <div className="bg-[#0000002d] flex rounded-[7px] flex-col gap-4 min-w-[150px]  max-w-[250px] p-5">
      <div className="animate-pulse bg-[#302e2ec0] w-[100%]  h-[120px] sm:h-[180px]  rounded-[4px]"></div>
      <div className="animate-pulse bg-[#302e2ec0] w-[100px] h-4 rounded-sm"></div>
      <div className="animate-pulse bg-[#302e2ec0] w-[90px] h-3 rounded-sm"></div>
    </div>
  );
};

export default PlaylistCardLoader;
