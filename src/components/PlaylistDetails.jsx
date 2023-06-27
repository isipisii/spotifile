"use client";
import { useParams } from "next/navigation";
import {
  useGetPlaylistDetailsQuery,
  useGetUserByIdQuery,
  useGetCurrentlyPlayingTrackQuery,
} from "@/services/spotify";
import { usePalette } from "@lauriys/react-palette";
import { useState, useEffect } from "react";
import { useNotify } from "@/hooks/useNotify";
import { openRecoModal } from "@/slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import DetailLoader from "./Loaders/DetailLoader";
import TrackCardLoader from "./Loaders/TrackCardLoader";
import Track from "./Track";
import PlaylistRecoModal from "./PlaylistRecoModal";
import SongPlayer from "./SongPlayer";
import { AnimatePresence, motion } from "framer-motion";

const PlaylistDetails = ({ session }) => {
  const params = useParams();
  const { isRecoModalOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
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
  const [notificationMessage, makeNotification] = useNotify();

  const { data: currentlyPlaying } = useGetCurrentlyPlayingTrackQuery(null, {
    pollingInterval: 1000,
  });

  // const { data: currentlyPlaying } = useGetCurrentlyPlayingTrackQuery();

  const playlistImage = playlistDetails?.images[0]?.url;
  const { data: color } = usePalette(playlistImage);

  useEffect(() => {
    if (session?.accessToken) {
      refetchPlaylistDetails();
      refetchUserDetails();
    }
  }, [session]);

  //for collecting the uris of different tracks to be played
  function getSongUris() {
    return playlistDetails?.tracks?.items?.map((track) => track?.track?.uri);
  }

  //this generates random track ids for track recommendation playlist reco
  function generateTrackIdsForRecommendation() {
    const trackIds = [];
    for (let i = 0; i < 5; i++) {
      let randomIndex = Math.floor(
        Math.random() * playlistDetails?.tracks?.items.length
      );
      trackIds.push(playlistDetails?.tracks?.items[randomIndex]?.track?.id);
    }
    return trackIds;
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
      <div className="w-full max-w-[1400px] md:w-[92%] md:ml-[100px] flex flex-col gap-9 p-8 mb-[200px] md:mb-[90px] relative">
        {/* POP UPS */}
        {/* Recommended playlist modal */}
        <AnimatePresence>
          {isRecoModalOpen && (
            <PlaylistRecoModal
              generateTrackIdsForRecommendation={
                generateTrackIdsForRecommendation
              }
              fromPlaylistName={playlistDetails?.name}
              userId={userDetails?.id}
              makeNotification={makeNotification}
              isRecoModalOpen={isRecoModalOpen}
            />
          )}

          {notificationMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="z-20 fixed bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blur-sm bg-green-600 rounded-md p-3 md:p-4"
            >
              <p className="text-white text-[.6rem] sm:text-[.7rem] font-bold">
                {notificationMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => dispatch(openRecoModal())}
          className="font-medium absolute right-4 top-4 text-xs text-white rounded-full py-2 px-5 transition-all duration-300 hover:text-black hover:bg-white border border-[#dad4d4]"
        >
          Get Recommendation
        </button>

        {/* Upper part */}
        {/* Player */}
        <SongPlayer
          accessToken={session?.accessToken}
          trackUris={getSongUris}
          currentTrackIndex={currentTrackIndex}
        />

        <div className="flex flex-col md:items-end md:flex-row gap-4 md:gap-8 my-8">
          {isPlaylistLoading || !playlistDetails || isUserLoading ? (
            <DetailLoader />
          ) : (
            <>
              <img
                src={playlistDetails?.images[0]?.url}
                className=" object-cover h-[200px] w-[200px] md:h-[250px] md:w-[250px] shadow-xl shadow-[#0202024d]"
                alt=""
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
