import { useQuery } from "react-query";
import AllHealthFacilities from "../constants/JSON/AllHealthFacility.json";
import { GET_HEALTH_FACILITIES } from "../constants/queryKeys";
import getHealthFacilities from "../services/getHealthFacilities";

const useGetHealthFacilities = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getHealthFacilities,
    queryKey: [GET_HEALTH_FACILITIES],
    initialData: AllHealthFacilities,
    // ?? additional options
    refetchOnWindowFocus: false,
    staleTime: Infinity, // Cache data indefinitely
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export default useGetHealthFacilities;
