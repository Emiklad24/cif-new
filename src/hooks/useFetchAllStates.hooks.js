import { useQuery } from "react-query";

import { GET_ALL_STATES } from "../constants/queryKeys";
import getAllStates from "../services/getAllStates";
import AllStates from "../constants/JSON/AllStates.json";


const useFetchAllStates = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllStates,
    queryKey: [GET_ALL_STATES],
    initialData: AllStates,
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export default useFetchAllStates;
