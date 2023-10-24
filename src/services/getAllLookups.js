import axios from "axios";

const getAllLookups = async () => {
  const res = await axios?.get(
    `http://staging.sormas.org.ng/sormas-integration-v1/api/lookup/all-look-ups`
  );

  return res?.data;
};

export default getAllLookups;
