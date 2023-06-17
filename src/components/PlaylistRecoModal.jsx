"use client";
import TrackCardLoader from "./Loaders/TrackCardLoader";
import Track from "./Track";


import {
  useGetTrackRecommendationsQuery,
  useCreatePlaylistMutation,
  useAddTracksToPlaylistMutation,
} from "@/services/spotify";

const PlaylistRecoModal = ({
  generateTrackIdsForRecommendation,
  fromPlaylistName,
  userId,
  setOpenRecoModal,
  makeNotification
}) => {
  const { data: trackRecommendation, isLoading: isTrackRecoLoading } =
    useGetTrackRecommendationsQuery({
      length: 50,
      trackIds: generateTrackIdsForRecommendation(),
    });
  const [createPlaylist] = useCreatePlaylistMutation();
  const [addTracksToPlaylist] = useAddTracksToPlaylistMutation();

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
      console.log(isSuccess);
    } catch (error) {
      console.log(error);
    } finally {
      makeNotification("Playlist saved successfully");
      setOpenRecoModal(false);
    }
  }

  return (
    <div className="max-w-[900px] w-[90%] fixed z-20  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#282828] p-6 rounded-xl flex flex-col gap-6">
      <h1 className="text-white font-bold text-[1.3rem]">
        Recommended playlist based on {fromPlaylistName}
      </h1>
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
    </div>
  );
};

export default PlaylistRecoModal;
