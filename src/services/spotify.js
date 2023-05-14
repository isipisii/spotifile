import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1",
    // prepareHeaders: ({ headers }, { getState }) => {
    //   const accessToken  = getState().token.accessToken;
    //   if (accessToken) {
    //     headers.set("Authorization", `Bearer ${accessToken}`);
    //   }
    //   return { headers };
    // },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (accessToken) => ({
        url: "/me",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
    }),
  }),
});

export const { useGetUserQuery } = spotifyApi;
