import { useQuery } from "react-query";
import { GET_SETTLEMENT_TYPE } from "../constants/queryKeys";
import getSettlementType from "../services/getSettlementTypes";

const useGetAllSettlementType = (initialData) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getSettlementType,
    queryKey: [GET_SETTLEMENT_TYPE],
    initialData,
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export default useGetAllSettlementType;
