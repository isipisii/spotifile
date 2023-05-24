"use client";
import { useGetPlaylistsQuery } from "@/services/spotify";

const Playlists = () => {
  const { data: playLists } = useGetPlaylistsQuery();

  return (
    <section className="flex items-center justify-center">
      <div className="relative w-full max-w-[1200px] md:w-[92%] md:ml-[100px] flex flex-col gap-4 p-8">
        <div className="flex justify-between items-center ">
          <h1 className="text-white font-bold text-[1.6rem] text-center">
            Playlist
          </h1>
        </div>
        {/* Playlist */}
        {/* playlist container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {playLists?.items.map((playList, index) => (
            <div key={index} className="bg-[#0000002d] flex rounded-[7px] flex-col gap-1 items-center max-w-[250px] p-4 hover:bg-[#3534346f] ">
                <img className="object-fit h-[160px] w-[160px] sm:h-[180px] sm:w-[180px] rounded-[4px]" src={playList?.images[0]?.url} alt="" />
                <h3 className="text-white text-center text-[.8rem]" >{playList?.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Playlists;
