import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
});

export const userSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/user/add-user",
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: "/user/login-user",
        method: "POST",
        body: user,
      }),
    }),

    order: builder.mutation({
      query: (user) => {
        const item = localStorage.getItem("token");
        return {
          url: "/order/add-order",
          method: "POST",
          headers: {
            Authorization: `Bearer ${item}`,
          },
          body: user,
        };
      },
    }),
    getorder: builder.mutation({
      query: (data) => {
        const item = localStorage.getItem("token");
        return {
          method: "GET",
          url: "order/get-order",
          headers: {
            Authorization: `Bearer ${item}`,
          },
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useOrderMutation,
  useGetorderMutation,
} = userSlice;
export default userSlice;
