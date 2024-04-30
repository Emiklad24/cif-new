import React from "react";
import "styles/pages/form.less";
import ClinicalHistory from "./ClinicalHistory";
import Epidemiological from "./Epidemiological";
import FinalClassification from "./FinalClassification";
import LaboratoryInformation from "./LaboratoryInformation";

const YellowFever = ({ form }) => {
  return (
    <>
      <Epidemiological form={form} />
      <ClinicalHistory form={form} />
      <LaboratoryInformation form={form} />
      <FinalClassification form={form} />
    </>
  );
};
export default YellowFever;
