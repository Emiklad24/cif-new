import { useQuery } from "react-query";
import { GET_HEALTH_FACILITIES } from "../constants/queryKeys";
import getHealthFacilities from "../services/getHealthFacilities";
import AllHealthFacilities from "../constants/JSON/AllHealthFacility.json";



const useGetHealthFacilities = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getHealthFacilities,
    queryKey: [GET_HEALTH_FACILITIES],
    initialData: AllHealthFacilities,
  });
  
  return {
    data,
    isLoading,
    isError,
  };
};

export default useGetHealthFacilities;
