import React from 'react';
import "styles/pages/form.less";
import Epidemiological from "./Epidemiological";
import ContactTracing from "./ContactTracing";
import ClinicalHistory from "./ClinicalHistory";
import FinalClassification from "./FinalClassification";
import LaboratoryInformation from "./LaboratoryInformation";

const CSM = ({ formValues }) => {


  return (
    <>
      <Epidemiological formValues={formValues} />
      <ClinicalHistory formValues={formValues} />
      <LaboratoryInformation formValues={formValues} />
      <FinalClassification formValues={formValues} />
      <ContactTracing formValues={formValues} />
    </>
  );
};
export default CSM;
