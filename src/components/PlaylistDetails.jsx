"use client";
import { useParams } from "next/navigation";
import {
  useGetPlaylistDetailsQuery,
  useGetUserByIdQuery,
  useGetCurrentlyPlayingTrackQuery,
} from "@/services/spotify";
import { usePalette } from "@lauriys/react-palette";
import { useState, useEffect } from "react";

import DetailLoader from "./Loaders/DetailLoader";
import TrackCardLoader from "./Loaders/TrackCardLoader";
import Track from "./Track";
import SongPlayer from "./SongPlayer";

const PlaylistDetails = ({ session }) => {
  const params = useParams();
  const {
    data: playlistDetails,
    isLoading: isPlaylistLoading,
    refetch: refetchPlaylistDetails,
  } = useGetPlaylistDetailsQuery(params.id, session?.accessToken && session);
  const {
    data: userDetails,
    isLoading: isUserLoading,
    refetch: refetchUserDetails,
  } = useGetUserByIdQuery(
    playlistDetails?.owner?.id,
    session?.accessToken && session
  );
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const { data: currentlyPlaying } = useGetCurrentlyPlayingTrackQuery(null, {
    pollingInterval: 1000,
  });

  const playlistImage = playlistDetails?.images[0]?.url;
  const { data: color } = usePalette(playlistImage);

  console.log(currentlyPlaying);

  useEffect(() => {
    if (session?.accessToken) {
      refetchPlaylistDetails();
      refetchUserDetails();
    }
  }, [session?.accessToken]);

  //for collecting the uris of different tracks inside the playlist
  function getSongUris() {
    const uris = [];
    playlistDetails?.tracks?.items?.forEach((track) => {
      uris.push(track?.track?.uri);
    });
    return uris;
  }

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
        {/* Player */}
        <SongPlayer
          accessToken={session?.accessToken}
          trackUris={getSongUris}
          currentTrackIndex={currentTrackIndex}
        />

        <div className="flex flex-col md:items-end md:flex-row gap-4 md:gap-8 my-8">
          {isPlaylistLoading || !playlistDetails ? (
            <DetailLoader />
          ) : (
            <>
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
            </>
          )}
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
                  setCurrentTrackIndex={setCurrentTrackIndex}
                  currentlyPlaying={currentlyPlaying}
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
