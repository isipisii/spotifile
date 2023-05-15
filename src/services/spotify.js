import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (accessToken) => ({
        url: "/me",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    getFollowing: builder.query({
      query: (accessToken) => ({
        url: "/me/following?type=artist",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    getRecentlyPlayed: builder.query({
      query: (accessToken) => ({
        url: "/me/player/recently-played",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    getPlaylists: builder.query({
      query: (accessToken) => ({
        url: "/me/playlists",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    getTopArtistsOfAllTime: builder.query({
      query: (args) => {
        const { accessToken, length } = args;
        return {
          url: `/me/top/artists?limit=${length}&time_range=long_term`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetFollowingQuery,
  useGetPlaylistsQuery,
  useGetRecentlyPlayedQuery,
  useGetTopArtistsOfAllTimeQuery,
} = spotifyApi;
