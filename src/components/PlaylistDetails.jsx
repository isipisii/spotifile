"use client";
import { useParams } from "next/navigation";
import {
  useGetPlaylistDetailsQuery,
  useGetUserByIdQuery,
} from "@/services/spotify";
import { usePalette } from "@lauriys/react-palette";
import TrackCardLoader from "./Loaders/TrackCardLoader";
import Track from "./Track";

const PlaylistDetails = ({ session }) => {
  const params = useParams();
  const { data: playlistDetails, isLoading: isPlaylistLoading } =
    useGetPlaylistDetailsQuery(params.id);
  const { data: userDetails } = useGetUserByIdQuery(playlistDetails?.owner?.id);
  const playlistImage = playlistDetails?.images[0]?.url;
  const { data: color } = usePalette(playlistImage);

  console.log(session?.accessToken);

  return (
    <section className="flex relative items-center justify-center">
      <div
        className="playlist-background"
        style={{
          "--from-color": color.darkVibrant,
          "--via-color": "#121212d1",
        }}
      />
      <div className="w-full max-w-[1200px] md:w-[92%] md:ml-[100px] flex flex-col gap-9 p-8">
        {/* Upper part */}
        <div className="flex flex-col md:items-end md:flex-row gap-4 md:gap-8 my-8">
          <img
            src={playlistDetails?.images[0]?.url}
            className=" object-cover h-[200px] w-[200px] md:h-[250px] md:w-[250px] shadow-xl shadow-[#0202024d]"
          />
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-[#ffffffba] font-light text-xs sm:text-sm md:text-base">
                Playlist
              </p>
              <h1
                className={`text-white ${
                  playlistDetails?.name.length > 18
                    ? "text-[1.8rem] sm:text-[3rem] lg:text-[3.5rem]"
                    : "text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem]"
                } font-[800] text-shadow-md`}
              >
                {playlistDetails?.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={userDetails?.images[0]?.url}
                alt=""
                className="rounded-full h-[30px] w-[30px]"
              />
              <p className="text-white">
                {playlistDetails?.owner?.display_name}
              </p>
            </div>
          </div>
        </div>
        {/* end of upper part */}

        {/* tracks */}
        <div>
          <h1
            className="text-white font-semibold
                text-[1.1rem] md:text-[1.3rem] mb-4"
          >
            Tracks
          </h1>
          {isPlaylistLoading || !playlistDetails ? (
            <div className="flex flex-col gap-1">
              {[...new Array(20)].map((_, index) => (
                <TrackCardLoader key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {/* track */}
              {playlistDetails?.tracks?.items.map((track, index) => (
                <Track
                  track={track?.track}
                  key={index}
                  index={index}
                  renderCount={true}
                />
              ))}
            </div>
          )}
        </div>
        {/* end of tracks */}
      </div>
    </section>
  );
};

export default PlaylistDetails;
