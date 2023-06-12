"use client";
import { useGetAlbumDetailsQuery } from "@/services/spotify";
import { useParams } from "next/navigation";
import { usePalette } from "@lauriys/react-palette";
import DetailLoader from "./Loaders/DetailLoader";
import Track from "./Track";
import TrackCardLoader from "./Loaders/TrackCardLoader";

//todoooooooo
const AlbumDetails = ({ accessToken }) => {
  const params = useParams();
  const { data: albumDetails, isLoading: isAlbumDetailsLoading } =
    useGetAlbumDetailsQuery(params.id);
  const albumImage = albumDetails?.images[0]?.url;
  const { data: color } = usePalette(albumImage);


  return (
    <section className="flex relative items-center justify-center">
      <div
        className="playlist-background"
        style={{
          "--from-color": color.darkVibrant,
          "--via-color": "#121212d1",
        }}
      />
      <div className="w-full max-w-[1400px] md:w-[92%] md:ml-[100px] flex flex-col gap-9 p-8 mb-[200px] md:mb-[90px]">
        {/* Upper part */}
        <div className="flex flex-col md:items-end md:flex-row gap-4 md:gap-8 mt-8">
          {isAlbumDetailsLoading || !albumDetails ? (
            <DetailLoader />
          ) : (
            <>
              <img
                src={albumImage}
                className=" object-cover h-[200px] w-[200px] md:h-[250px] md:w-[250px] shadow-xl shadow-[#0202024d]"
              />
              <div>
                <p className="text-[#ffffffba] font-light text-xs sm:text-sm md:text-base">
                  Album
                </p>
                <h1
                  className={`text-white ${
                    albumDetails?.name.length > 18
                      ? "text-[1.8rem] sm:text-[3rem] lg:text-[3.5rem]"
                      : "text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem]"
                  } font-[800] text-shadow-md`}
                >
                  {albumDetails?.name}
                </h1>
              </div>
            </>
          )}
        </div>

        {/* tracks */}
        <div>
          <h1
            className="text-white font-semibold
                text-[1.1rem] md:text-[1.3rem] mb-4"
          >
            Tracks
          </h1>
          {isAlbumDetailsLoading || !albumDetails ? (
            <div className="flex flex-col gap-1">
              {[...new Array(20)].map((_, index) => (
                <TrackCardLoader key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {/* track */}
              {albumDetails?.tracks?.items.map((track, index) => (
                <Track
                  track={track}
                  key={index}
                  isInAlbum={true}
                  albumImage={albumImage}
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

export default AlbumDetails;
