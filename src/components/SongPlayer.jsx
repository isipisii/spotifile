"use client";
import SpotifyWebPlayer from "react-spotify-web-playback";

const SongPlayer = ({ accessToken, trackUris }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-10">
      {/* TODO */}
      {trackUris() && (
        <SpotifyWebPlayer
          token={accessToken}
          uris={trackUris()}
          styles={{
            activeColor: "#fff",
            bgColor: "#000000",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#fff",
            sliderTrackColor: "#ffffff82",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
            height: 50,
            sliderHandleColor: "#fff",
          }}
        />
      )}
    </div>
  );
};

export default SongPlayer;
