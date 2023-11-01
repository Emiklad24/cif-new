const queryClientSettings = {
    defaultOptions: {
      queries: {
        retry: 5,
        refetchOnMount: "always",
        refetchOnWindowFocus: "always",
        refetchOnReconnect: "always",
        cacheTime: 2.628e9,
        refetchInterval: 30000,
        refetchIntervalInBackground: false,
        suspense: false,
        staleTime: 2.628e9,
      },
      mutations: {
        retry: 7,
      },
    },
  }

  export default  queryClientSettings