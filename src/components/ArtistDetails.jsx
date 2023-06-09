"use client";
import {
  useGetArtistQuery,
  useGetArtistsAlbumQuery,
  useGetArtistsTopTracksQuery,
  useGetUserQuery,
  useGetCheckIfUserFollowsQuery,
  useFollowArtistMutation,
  useUnfollowArtistMutation,
  useGetRelatedArtistsQuery,
} from "@/services/spotify";
import { useParams } from "next/navigation";
import { usePalette } from "@lauriys/react-palette";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Track from "./Track";
import TrackCardLoader from "./Loaders/TrackCardLoader";
import AlbumCard from "./AlbumCard";
import PlaylistCardLoader from "./Loaders/PlaylistCardLoader";
import ArtistCard from "./ArtistCard";
import DetailLoader from "./Loaders/DetailLoader";
import { useNotify } from "@/hooks/useNotify";

const ArtistDetails = ({ session }) => {
  const params = useParams();
  const { data: userData, refetch: refetchUserData } = useGetUserQuery(
    session?.accessToken && session
  );
  const { data: artistAlbums, isLoading: isArtistAlbumLoading } =
    useGetArtistsAlbumQuery(params.id);

  const {
    data: artistTopTracks,
    isLoading: isTopTracksLoading,
    refetch: refetchTopTracks,
  } = useGetArtistsTopTracksQuery({
    id: params.id,
    country: userData?.country,
  });

  const { data: artist, isLoading: isArtistLoading } = useGetArtistQuery(
    params.id
  );
  const {
    data: isFollowing,
    refetch: refetchIsFollowing,
    isLoading: isFollowingLoading,
  } = useGetCheckIfUserFollowsQuery({
    id: params.id,
  });

  const { data: relatedArtists } = useGetRelatedArtistsQuery(params.id);

  // mutations
  const [followArtist] = useFollowArtistMutation();
  const [unfollowArtist] = useUnfollowArtistMutation();

  const artistImage = artist?.images[0]?.url;
  const { data: color } = usePalette(artistImage); //extract color
  const [albumCount, setAlbumCount] = useState(10);
  const [notificationMessage, makeNotification] = useNotify();

  // add commas to the followers count
  const addCommas = (num) => {
    let chars = num.toString().split("");
    let reversedChars = chars.reverse();

    let result = [];
    for (let i = 0; i < reversedChars.length; i++) {
      if (i > 0 && i % 3 === 0) {
        result.push(", ");
      }
      result.push(reversedChars[i]);
    }
    // reverse the resulting array and join it back into a string
    let formattedNumber = result.reverse().join("");
    return formattedNumber;
  };

  // to refetch the data when refreshed
  useEffect(() => {
    if (session?.accessToken) {
      refetchUserData();
      refetchIsFollowing();
      refetchTopTracks();
    }
  }, []);

  function handleSeeMore() {
    setAlbumCount((prev) => prev + 10);
  }

  function handleSeeLess() {
    setAlbumCount((prev) => prev - 10);
  }

  //on click handler of follow button
  function handleFollowArtist() {
    // check is the isFollowing is true in order to unfollow the artist
    if (isFollowing && isFollowing[0]) {
      unfollowArtist(params.id).then(() => {
        refetchIsFollowing();
        makeNotification("Artist removed from your following");
      });
    } else {
      followArtist(params.id).then(() => {
        refetchIsFollowing();
        makeNotification("Artist added to your following");
      });
    }
  }

  return (
    <section className="flex relative items-center justify-center">
      {/* gradient bg */}
      <div
        className="artist-background"
        style={{
          "--from-color": color.darkVibrant,
          "--via-color": "#121212d1",
        }}
      />
      <div className="w-full max-w-[1400px] md:w-[92%] md:ml-[100px] relative flex flex-col gap-9 p-8">
        {/* POP UP */}
        {/* notification */}
        <AnimatePresence>
          {notificationMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="z-20 w-[200px] md:w-[250px] text-center fixed bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blur-sm bg-green-600 rounded-md py-3 md:py-4"
            >
              <p className="text-white text-[.6rem] sm:text-[.7rem] font-bold">
                {notificationMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:items-end md:flex-row gap-4 md:gap-8 mt-8">
          {(isFollowingLoading && isArtistLoading) || !artist ? (
            <DetailLoader isInArtist={true} />
          ) : (
            <>
              <img
                src={artistImage}
                alt="artist"
                className=" object-cover h-[200px] w-[200px] md:h-[250px] md:w-[250px] shadow-xl rounded-full shadow-[#0202024d]"
              />
              <div>
                <h1 className="text-white font-[800] text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] text-shadow-md">
                  {artist?.name}
                </h1>
                <p className="text-[#ffffffa7] mb-2 text-sm">
                  Followers:{" "}
                  <span>{artist && addCommas(artist?.followers?.total)}</span>
                </p>
                <p className="text-[#ffffffa7] text-sm mb-4">
                  Popularity: <span>{artist && artist?.popularity}%</span>
                </p>
                <button
                  onClick={handleFollowArtist}
                  className={`text-white ${
                    isFollowing && isFollowing[0]
                      ? "border-white font-semibold"
                      : "border-[#817d7d] hover:border-white"
                  } font-medium text-sm py-2 px-8 md:py-2 md:px-10 border-[2px] rounded-full`}
                >
                  {isFollowing && isFollowing[0] ? "Following" : "Follow"}
                </button>
              </div>
            </>
          )}
        </div>

        {/*Popular tracks  */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h1
              className="text-white font-semibold
                text-[1.1rem] md:text-[1.3rem]"
            >
              Popular Tracks
            </h1>
          </div>
          {/* top tracks  */}
          {/*top tracks container */}
          <div className="max-h-[300px] overflow-y-auto mb-8 md:mb-0">
            {/* tracks container */}
            {isTopTracksLoading || !artistTopTracks ? (
              <div className="flex flex-col gap-1">
                {[...new Array(5)].map((_, index) => (
                  <TrackCardLoader key={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col">
                {/* track */}
                {artistTopTracks?.tracks.map((track, index) => (
                  <Track track={track} key={index} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* end of top tracks */}

        {/* Related artists */}
        <div className="my-4">
          <h1 className="text-white font-semibold text-[1.1rem] md:text-[1.3rem] mb-4">
            Artists you may like
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedArtists?.artists.slice(0, 5).map((artist, index) => (
              <ArtistCard artist={artist} key={index} index={index} />
            ))}
          </div>
        </div>

        {/* Albums */}
        <div className="mt-4 mb-14 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h1
              className="text-white font-semibold
              text-[1.1rem] md:text-[1.3rem]"
            >
              Albums
            </h1>
            {albumCount > 10 ? (
              <p
                onClick={handleSeeLess}
                className="text-[#cdc8c8] cursor-pointer text-xs md:text-sm font-semibold hover:underline-offset-2 hover:underline"
              >
                See less
              </p>
            ) : (
              <p
                onClick={handleSeeMore}
                className="text-[#cdc8c8] cursor-pointer text-xs md:text-sm font-semibold hover:underline-offset-2 hover:underline"
              >
                See more
              </p>
            )}
          </div>

          {isArtistAlbumLoading || !artistAlbums ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[...new Array(10)].map((_, index) => (
                <PlaylistCardLoader key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {artistAlbums?.items.slice(0, albumCount).map((album, index) => (
                <AlbumCard album={album} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArtistDetails;
