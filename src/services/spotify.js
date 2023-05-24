import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken
      // If we have a token set in state, let's assume that we should be passing it.
      console.log(token)
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/me"
    }),
    getFollowing: builder.query({
      query: () =>"/me/following?type=artist"
    }),
    getRecentlyPlayed: builder.query({
      query: () => "/me/player/recently-played"
    }),
    getPlaylists: builder.query({
      query: () => "/me/playlists"
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
          url: `/recommendations?limit=${length}&seed_tracks=${topTrackIds.join(",")}`,
        };
      },
    }),
    getRecentlyPlayed: builder.query({
      query: () => "/me/player/recently-played",
    })
  }),
});

export const {
  useGetUserQuery,
  useGetFollowingQuery,
  useGetPlaylistsQuery,
  useGetRecentlyPlayedQuery,

  useGetRecentTopTracksQuery,
  useGetTopTracksOfAllTimeQuery,
  useGetLast6MonthsTopTracksQuery,
  useGetTrackRecommendationsQuery,

  useGetTopArtistsOfAllTimeQuery,
  useGetRecentTopArtistsQuery,
  useGetTopArtistsLast6MonthsQuery,

} = spotifyApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const spotifyApi = createApi({
//   reducerPath: "spotifyApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://api.spotify.com/v1",

//   }),
//   endpoints: (builder) => ({
//     getUser: builder.query({
//       query: (accessToken) => ({
//         url: "/me",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }),
//     }),
//     getFollowing: builder.query({
//       query: (accessToken) => ({
//         url: "/me/following?type=artist",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }),
//     }),
//     getRecentlyPlayed: builder.query({
//       query: (accessToken) => ({
//         url: "/me/player/recently-played",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }),
//     }),
//     getPlaylists: builder.query({
//       query: (accessToken) => ({
//         url: "/me/playlists",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }),
//     }),
//     getTopArtistsOfAllTime: builder.query({
//       query: (args) => {
//         const { accessToken, length } = args;
//         return {
//           url: `/me/top/artists?limit=${length}&time_range=long_term`,
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };
//       },
//     }),
//     getRecentTopArtists: builder.query({
//       query: (args) => {
//         const { accessToken, length } = args;
//         return {
//           url: `/me/top/artists?limit=${length}&time_range=short_term`,
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };
//       },
//     }),
//     getTopArtistsLast6Months: builder.query({
//       query: (args) => {
//         const { accessToken, length } = args;
//         return {
//           url: `/me/top/artists?limit=${length}&time_range=medium_term`,
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };
//       },
//     }),
//     getRecentTopTracks: builder.query({
//       query: (args) => {
//         const { accessToken, length } = args;
//         return {
//           url: `/me/top/tracks?limit=${length}&time_range=short_term`,
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };
//       },
//     }),
//     getLast6MonthsTopTracks: builder.query({
//       query: (args) => {
//         const { accessToken, length } = args;
//         return {
//           url: `/me/top/tracks?limit=${length}&time_range=medium_term`,
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };
//       },
//     }),
//     getTopTracksOfAllTime: builder.query({
//       query: (args) => {
//         const { accessToken, length } = args;
//         return {
//           url: `/me/top/tracks?limit=${length}&time_range=long_term`,
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };
//       },
//     }),
//     getTrackRecommendations: builder.query({
//       query: (args) => {
//         const { accessToken, length, topTrackIds } = args;
//         return {
//           url: `/recommendations?limit=${length}&seed_tracks=${topTrackIds.join(",")}`,
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         };
//       },
//     }),
//     getRecentlyPlayed: builder.query({
//       query: (accessToken) => ({
//         url: "/me/player/recently-played",
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       })
//     })
//   }),
// });

// export const {
//   useGetUserQuery,
//   useGetFollowingQuery,
//   useGetPlaylistsQuery,
//   useGetRecentlyPlayedQuery,

//   useGetRecentTopTracksQuery,
//   useGetTopTracksOfAllTimeQuery,
//   useGetLast6MonthsTopTracksQuery,
//   useGetTrackRecommendationsQuery,

//   useGetTopArtistsOfAllTimeQuery,
//   useGetRecentTopArtistsQuery,
//   useGetTopArtistsLast6MonthsQuery,

// } = spotifyApi;


