import React from 'react';
import "styles/pages/form.less";
import Epidemiological from "./Epidemiological";
import ClinicalHistory from "./ClinicalHistory";
import FinalClassification from "./FinalClassification";
import LaboratoryInformation from "./LaboratoryInformation";

const Cholera = () => {
  return (
    <>
     <Epidemiological/>
      <ClinicalHistory/>
      <LaboratoryInformation/>
      <FinalClassification/>
    </>
  );
};
export default Cholera;
