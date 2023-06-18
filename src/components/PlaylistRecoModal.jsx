"use client";
import TrackCardLoader from "./Loaders/TrackCardLoader";
import Track from "./Track";
import { CgClose } from "react-icons/cg";
import { motion } from "framer-motion";

import {
  useGetTrackRecommendationsQuery,
  useCreatePlaylistMutation,
  useAddTracksToPlaylistMutation,
} from "@/services/spotify";

import { useMemo } from "react";

const PlaylistRecoModal = ({
  generateTrackIdsForRecommendation,
  fromPlaylistName,
  userId,
  setOpenRecoModal,
  makeNotification,
  openRecoModal,
}) => {
  const cachedTrackRecommendation = useMemo(
    () => generateTrackIdsForRecommendation(),
    [openRecoModal]
  );
  const { data: trackRecommendation, isLoading: isTrackRecoLoading } =
    useGetTrackRecommendationsQuery({
      length: 50,
      trackIds: cachedTrackRecommendation,
    });
  const [createPlaylist, { isSuccess: isPlaylistSuccess }] =
    useCreatePlaylistMutation();
  const [addTracksToPlaylist, { isSuccess: isTracksSuccess }] =
    useAddTracksToPlaylistMutation();

  function getTrackRecommendedUris() {
    return trackRecommendation?.tracks?.map((track) => track?.uri);
  }

  async function saveRecommendedTrack(id) {
    try {
      const createdPlaylistPayload = await createPlaylist(id).unwrap();

      if (createdPlaylistPayload) {
        await addTracksToPlaylist({
          playlistId: createdPlaylistPayload?.id,
          trackUris: getTrackRecommendedUris(),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      makeNotification("Playlist saved successfully");
      setOpenRecoModal(false);
    }
  }

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <motion.div 
        className="max-w-[900px] w-[90%] z-50 bg-[#282828] p-6 rounded-xl flex flex-col gap-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{type: "tween"}}
      >
        <div className="flex  items-center justify-between">
          <h1 className="text-white font-bold text-[1.3rem]">
            Recommended playlist based on {fromPlaylistName}
          </h1>
          <div
            className=" hover:bg-[#ffffff18] rounded-full p-2"
            onClick={() => setOpenRecoModal(false)}
          >
            <CgClose className="text-[#a8a5a5] text-[1.3rem]" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="max-h-[300px] overflow-y-auto mb-8 md:mb-0">
            {/* tracks container */}
            {isTrackRecoLoading || !trackRecommendation ? (
              <div className="flex flex-col gap-1">
                {[...new Array(5)].map((_, index) => (
                  <TrackCardLoader key={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col">
                {/* track */}
                {trackRecommendation?.tracks.map((track, index) => (
                  <Track track={track} key={index} showAlbum={true} />
                ))}
              </div>
            )}
          </div>
          <button
            className="text-black self-end font-semibold bg-white rounded-full py-3 px-4 text-[.9rem]"
            onClick={() => saveRecommendedTrack(userId)}
          >
            Save to Spotify
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PlaylistRecoModal;
