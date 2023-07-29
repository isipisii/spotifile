"use client";
import moment from "moment";
import Link from "next/link";

const Track = ({
  track,
  index,
  renderCount,
  setCurrentTrackIndex,
  currentlyPlaying,
  isInAlbum,
  albumImage,
  showAlbum,
}) => {
  //if in playlist component only
  function isTrackPlaying() {
    if (
      track?.id === currentlyPlaying?.item?.id &&
      currentlyPlaying?.is_playing
    ) {
      return true;
    }
    return false;
  }

  // format artist's name with commas
  function formatArtistNames() {
    let artistsName = [];
    track?.artists.forEach((artist) => {
      artistsName.push(artist?.name);
    });

    return artistsName.join(", ");
  }

  return (
    <div
      className="flex justify-between hover:bg-[#5655556f] p-2 items-center md:gap-16 rounded-md relative cursor-pointer"
      onClick={() => setCurrentTrackIndex(index)}
    >
      <div className="flex gap-3 items-center justify-between">
        {renderCount && (
          <p className="text-[#bcbcbcab] text-[.6rem] sm:text-[.75rem] p-1 font-semibold">
            {index + 1}
          </p>
        )}
        {/* this condition will just work if the parent component of this component is the AlbumDetails */}
        <img
          loading="lazy"
          src={isInAlbum ? albumImage : track?.album?.images[0]?.url}
          className="w-[40px] h-[40px] sm:w-[45px] md:h-[45px] rounded-sm"
          alt=""
        />
        <div>
          <p
            className={`${
              isTrackPlaying() ? "text-green-400" : "text-white"
            } text-[.7rem] md:text-[.9rem] truncate w-[140px] sm:w-[180px] md:-[250px] lg:w-[350px] sm:truncate-none font-medium`}
          >
            {track?.name}
          </p>
          <p className="text-[#898585d0] text-[.6rem] md:text-[.8rem] truncate w-[150px] sm:w-[200px] md:-[250px] lg:w-[350px] sm:truncate-none">
            {formatArtistNames()}
          </p>
        </div>
      </div>
      {/* album name */}
      {/* the track's album wont show in playlist reco modal */}
      {!showAlbum && (
        <Link href={`/album/${track?.album?.id}`}>
          <p className="text-[#bbb4b4d0] text-[.8rem] text-left truncate w-[150px] sm:w-[200px] md:-[250px] lg:w-[350px] sm:truncate-none hidden sm:block hover:underline-offset-2 hover:underline">
            {track?.album?.name}
          </p>
        </Link>
      )}

      <p className="text-[#898585d0] text-[.6rem] md:text-[.8rem] font-semibold p-1">
        {moment
          .utc(moment.duration(track?.duration_ms).as("millisecond"))
          .format("m:ss")}
      </p>
    </div>
  );
};

export default Track;
