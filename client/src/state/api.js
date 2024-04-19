import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { importMeta } from "vite";

const reactAppBaseUrl = process.env.REACT_APP_BASE_URL;

const DEFAULT_HEADERS = {
  Authorization: `Bearer ${
    JSON.parse(localStorage.getItem("tokenExpensio"))?.token
  }`,
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: reactAppBaseUrl }),
  // prepareHeaders: (headers, { getState }) => {
  // 	const token = JSON.parse(localStorage.getItem("userInfoEcoTrack"))?.token; // Optional chaining for nullish coalescing
  // 	console.log(token);
  // 	// console.log("Above should be the token");
  // 	if (token) {
  // 		headers.set("Authorization", `Bearer ${token}`);
  // 	}

  // 	return headers;
  // },
  reducerPath: "adminApi",
  tagTypes: ["User", "Dashboard"],
  endpoints: (build) => ({
    expenseTest: build.query({
      query: () => ({
        url: "expense/test",
        method: "GET",
        headers: DEFAULT_HEADERS,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,

  useGetUserQuery,

  useExpenseTestQuery,
} = api;
