"use client";

const DetailLoader = ({ isInArtist }) => {
  return (
    <>
      <div className={`animate-pulse bg-[#302e2ec0] h-[200px] w-[200px] md:h-[250px] md:w-[250px] ${isInArtist ? "rounded-full" : null}`}></div>

      <div className="flex flex-col gap-3">
        <div className="animate-pulse bg-[#302e2ec0] h-[0.75rem] sm:h-[0.875rem] md:h-[1rem] w-[3rem]" />
        <div className="animate-pulse bg-[#302e2ec0] h-[3.5rem] w-[250px]  md:w-[400px] " />
      </div>
    </>
  );
};

export default DetailLoader;
