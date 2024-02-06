const queryClientSettings = {
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnMount: false, // "always",
      refetchOnWindowFocus: false, // "always",
      refetchOnReconnect: false, // "always",
      cacheTime: 86_400_000,
      refetchInterval: 30_000,
      refetchIntervalInBackground: false,
      suspense: false,
      // staletime of 1 day
      staleTime: 86_400_000 //2.628e9,
    },
    mutations: {
      retry: 2,
    },
  },
};

export default queryClientSettings;
