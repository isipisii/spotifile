"use client";

const ArtistCard = ({ artist, index }) => {
  
  return (
    <a href={artist?.external_urls?.spotify} target="_blank">
      <div className="flex rounded-[7px] flex-col gap-1 items-center max-w-[250px] bg-[#0000002d] p-5 hover:bg-[#3534346f] relative">
        <p className="absolute top-2 left-2  text-sm text-[#b8b2b2]">#{index + 1}</p>
        <img
          src={artist?.images[0]?.url}
          alt="artist-profile"
          className="rounded-[100%] shadow-md shadow-[#02020292] object-cover h-[100px] w-[100px] xs:h-[110px] xs:w-[110px] sm:w-[120px] sm:h-[120px] md:h-[150px] md:w-[150px] lg:h-[150px] lg:w-[150px]"
        />
        <h3 className="text-white text-[.8rem] sm:text-sm md:text-base mt-2 font-medium text-center">
          {artist?.name}
        </h3>
        <p className="text-[#cdc8c8] text-[.7rem] sm:text-xs md:text-sm">
          {artist?.type.charAt(0).toUpperCase() + artist?.type.slice(1)}
        </p>
      </div>
    </a>
  );
};

export default ArtistCard;
