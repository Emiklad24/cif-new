import React from 'react';
import "styles/pages/form.less";
import Epidemiological from "./Epidemiological";
import ContactTracing from "./ContactTracing";
import ClinicalHistory from "./ClinicalHistory";
import FinalClassification from "./FinalClassification";
import LaboratoryInformation from "./LaboratoryInformation";

const Anthrax = () => {
  return (
    <>
     <Epidemiological/>
      <ClinicalHistory/>
      <LaboratoryInformation/>
      <FinalClassification/>
      <ContactTracing/>
    </>
  );
};
export default Anthrax;
