"use client";
import SpotifyWebPlayer from "react-spotify-web-playback";

const SongPlayer = ({ accessToken, trackUris, currentTrackIndex }) => {

  return (
    <div className="fixed bottom-[4.3rem] md:bottom-0 left-0 w-full z-10">
      {trackUris() && (
        <SpotifyWebPlayer
          token={accessToken}
          magnifySliderOnHover={true}
          // will set the first index if the user hasnt clicked the song at first render
          offset={currentTrackIndex}
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
