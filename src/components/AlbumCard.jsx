"use client";

const AlbumCard = ({ album }) => {
  const albumType = album?.album_type
    .charAt(0)
    .toUpperCase()
    .concat(album?.album_type.slice(1));
  const year = album?.release_date.split("-")[0];

  return (
    <div className="bg-[#0000002d] flex rounded-[7px] flex-col gap-3  max-w-[250px] p-5 hover:bg-[#3534346f]">
      <img src={album?.images[0]?.url} alt="" className="rounded-[4px]" />
      <h2 className="text-white truncate w-[100px] sm:w-[150px] font-semibold text-left text-sm sm:text-base ">
        {album?.name}
      </h2>
      <h3 className="text-[#adaaaa] text-[.7rem] sm:text-xs font-medium">
        {albumType} • {year}
      </h3>
    </div>
  );
};

export default AlbumCard;
