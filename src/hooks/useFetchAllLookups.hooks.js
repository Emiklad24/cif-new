import { useQuery } from "react-query";
import getAllLookups from "../services/getAllLookups";
import { GET_ALL_LOOK_UPS } from "../constants/queryKeys";
// import GetAllLookups from "../constants/JSON/GetAllLookup.json";

const useFetchAllLookup = (initialData) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllLookups,
    queryKey: [GET_ALL_LOOK_UPS],
    // initialData: initialData || GetAllLookups,
  });
  
  return {
    data,
    isLoading,
    isError,
  };
};

export default useFetchAllLookup;
