import React from 'react';
import "styles/pages/form.less";
import ClinicalHistory from "./ClinicalHistory";
import Epidemiological from "./Epidemiological";
import FinalClassification from "./FinalClassification";
import LaboratoryInformation from "./LaboratoryInformation";

const Anthrax = () => {
  return (
    <>
     <Epidemiological/>
      <ClinicalHistory/>
      <LaboratoryInformation/>
      <FinalClassification/>
    </>
  );
};
export default Anthrax;
