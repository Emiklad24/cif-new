import { useQuery } from "react-query";
import { GET_ALL_LGA } from "../constants/queryKeys";
import getLga from "../services/getLga";
import AllLgas from "../constants/JSON/AllLgas.json";

const useFetchAllLGA = (selectedState) => {
  const getAllStateQueries = useQuery({
    queryFn: () => getLga(selectedState),
    queryKey: [GET_ALL_LGA, selectedState],
    initialData: AllLgas[selectedState],
    enabled: selectedState ? true : false,
  });

  return getAllStateQueries;
};

export default useFetchAllLGA;
