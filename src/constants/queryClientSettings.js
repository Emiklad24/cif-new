const queryClientSettings = {
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnMount: false, // "always",
      refetchOnWindowFocus: false, // "always",
      refetchOnReconnect: false, // "always",
      cacheTime: 2.628e9,
      refetchInterval: 30000,
      refetchIntervalInBackground: false,
      suspense: false,
      staleTime: 2.628e9,
    },
    mutations: {
      retry: 2,
    },
  },
};

export default queryClientSettings;
