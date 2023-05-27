const ArtistCardLoader = () => {
  return (
    <div className="bg-[#0000002d] flex rounded-[7px] flex-col gap-3 items-center max-w-[250px] p-5 ">
      <div className="animate-pulse bg-[#302e2ec0] w-[110px] h-[110px] xs:w-[135px] xs:h-[135px] sm:w-[135px] sm:h-[135px] md:h-[140px] md:w-[140px] lg:h-[150px] lg:w-[150px] rounded-[100%]"></div>
      <div className="animate-pulse bg-[#302e2ec0] rounded-sm h-4 w-[7.5rem]"></div>
      <div className="animate-pulse bg-[#302e2ec0] rounded-sm h-3 w-[7rem]"></div>
    </div>
  );
};

export default ArtistCardLoader;
