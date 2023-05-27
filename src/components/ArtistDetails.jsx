"use client";
import {
  useGetArtistQuery,
  useGetArtistsAlbumQuery,
  useGetArtistsTopTracksQuery,
} from "@/services/spotify";
import { useParams } from "next/navigation";
import { usePalette } from "@lauriys/react-palette";
import { useCallback } from "react";

const ArtistDetails = () => {
  const params = useParams();
  const { data: artist } = useGetArtistQuery(params.id);
  const { data: artistAlbums } = useGetArtistsAlbumQuery(params.id);
  const { data: artistTopTracks } = useGetArtistsTopTracksQuery(params.id);
  const artistImage = artist?.images[0]?.url;
  const { data: color } = usePalette(artistImage); //extracted color

  console.log(artist);

  const addCommas = useCallback(
    (num) => {
      let chars = num.toString().split("");
      let reversedChars = chars.reverse();
      // Insert commas every three digits
      let result = [];
      for (let i = 0; i < reversedChars.length; i++) {
        if (i > 0 && i % 3 === 0) {
          result.push(", ");
        }
        result.push(reversedChars[i]);
      }
      // Reverse the resulting array and join it back into a string
      let formattedNumber = result.reverse().join("");
      return formattedNumber;
    },
    [params.id]
  );

  return (
    <section
      className="flex relative items-center justify-center gradient-background"
      // style={{
      //   "--from-color": color.darkVibrant,
      //   "--via-color": "#121212d1",
      // }}
    >
      <div className="w-full max-w-[1200px] md:w-[92%] md:ml-[100px] flex flex-col gap-4 p-8">
        <div
          className="artist-background"
          style={{
            "--from-color": color.darkVibrant,
            "--via-color": "#121212d1",
          }}
        />

        <div className="flex gap-8 mt-12">
          <img
            src={artistImage}
            alt="artist"
            className=" object-cover h-[250px] w-[250px] drop-shadow-md"
          />
          <div>
            <h1 className="text-white font-[800] text-[5rem] text-shadow-md">
              {artist?.name}
            </h1>
            <p className="text-[#ffffffa7] mb-2">
              Followers:{" "}
              <span>{artist && addCommas(artist?.followers?.total)}</span>
            </p>
            <p className="text-[#ffffffa7]">
              Popularity:{" "}
              <span>{artist && artist?.popularity}%</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistDetails;
