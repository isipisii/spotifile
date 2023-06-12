import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/me",
    }),
    getFollowing: builder.query({
      query: () => "/me/following?type=artist",
    }),
    getRecentlyPlayed: builder.query({
      query: () => "/me/player/recently-played",
    }),
    getPlaylists: builder.query({
      query: () => "/me/playlists",
    }),
    getTopArtistsOfAllTime: builder.query({
      query: (args) => {
        const { length } = args;
        return {
          url: `/me/top/artists?limit=${length}&time_range=long_term`,
        };
      },
    }),
    getRecentTopArtists: builder.query({
      query: (args) => {
        const { length } = args;
        return {
          url: `/me/top/artists?limit=${length}&time_range=short_term`,
        };
      },
    }),
    getTopArtistsLast6Months: builder.query({
      query: (args) => {
        const { length } = args;
        return {
          url: `/me/top/artists?limit=${length}&time_range=medium_term`,
        };
      },
    }),
    getRecentTopTracks: builder.query({
      query: (args) => {
        const { length } = args;
        return {
          url: `/me/top/tracks?limit=${length}&time_range=short_term`,
        };
      },
    }),
    getLast6MonthsTopTracks: builder.query({
      query: (args) => {
        const { length } = args;
        return {
          url: `/me/top/tracks?limit=${length}&time_range=medium_term`,
        };
      },
    }),
    getTopTracksOfAllTime: builder.query({
      query: (args) => {
        const { length } = args;
        return {
          url: `/me/top/tracks?limit=${length}&time_range=long_term`,
        };
      },
    }),
    getTrackRecommendations: builder.query({
      query: (args) => {
        const { length, topTrackIds } = args;
        return {
          url: `/recommendations?limit=${length}&seed_tracks=${topTrackIds.join(
            ","
          )}`,
        };
      },
    }),
    getRecentlyPlayed: builder.query({
      query: () => "/me/player/recently-played",
    }),
    getArtist: builder.query({
      query: (id) => `/artists/${id}`,
    }),
    getArtistsAlbum: builder.query({
      query: (id) => `/artists/${id}/albums`,
    }),
    getArtistsTopTracks: builder.query({
      query: (args) => {
        const { id, country } = args;
        return {
          url: `/artists/${id}/top-tracks?country=${country}`,
        };
      },
    }),
    getCheckIfUserFollows: builder.query({
      query: (args) => {
        const { id } = args;
        return {
          url: `/me/following/contains?type=artist&ids=${id}`,
        };
      },
    }),
    followArtist: builder.mutation({
      query: (id) => ({
        url: `me/following?type=artist&ids=${id}`,
        method: "PUT",
      }),
    }),
    unfollowArtist: builder.mutation({
      query: (id) => ({
        url: `me/following?type=artist&ids=${id}`,
        method: "DELETE",
      }),
    }),
    getRelatedArtists: builder.query({
      query: (id) => `/artists/${id}/related-artists`,
    }),
    getPlaylistDetails: builder.query({
      query: (id) => `/playlists/${id}`,
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    getAlbumDetails: builder.query({
      query: (id) => `/albums/${id}`,
    }),
    getCurrentlyPlayingTrack: builder.query({
      query: () => "/me/player/currently-playing",
    }),
  }),
});

export const {
  // for profile
  useGetUserQuery,
  useGetFollowingQuery,
  useGetPlaylistsQuery,
  useGetRecentlyPlayedQuery,

  // top tracks
  useGetRecentTopTracksQuery,
  useGetTopTracksOfAllTimeQuery,
  useGetLast6MonthsTopTracksQuery,
  useGetTrackRecommendationsQuery,

  // top artists
  useGetTopArtistsOfAllTimeQuery,
  useGetRecentTopArtistsQuery,
  useGetTopArtistsLast6MonthsQuery,

  // artist
  useGetArtistQuery,
  useGetArtistsAlbumQuery,
  useGetArtistsTopTracksQuery,
  useGetCheckIfUserFollowsQuery,
  useFollowArtistMutation,
  useUnfollowArtistMutation,
  useGetRelatedArtistsQuery,

  // playlist
  useGetPlaylistDetailsQuery,
  useGetUserByIdQuery,

  //album
  useGetAlbumDetailsQuery,
  useGetCurrentlyPlayingTrackQuery,
} = spotifyApi;
