import { useQuery } from "react-query";
import { GET_WARD } from "../constants/queryKeys";
import getWard from "../services/getWard";

const useFetchWard = (lgaId) => {
  const getWardQuery = useQuery({
    queryFn: () => getWard(lgaId),
    queryKey: [GET_WARD, lgaId],
    enabled: lgaId ? true : false,
    retry: 6,
    refetchOnWindowFocus: false,
  });

  return getWardQuery;
};

export default useFetchWard;
