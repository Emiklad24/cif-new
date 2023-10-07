import React from 'react';
import "styles/pages/form.less";
import Epidemiological from "./Epidemiological";
import ContactTracing from "./ContactTracing";
import ClinicalHistory from "./ClinicalHistory";
import FinalClassification from "./FinalClassification";
import LaboratoryInformation from "./LaboratoryInformation";

const Influenza = ({form}) => {
  return (
    <>
      <Epidemiological form={form}/>
      <ClinicalHistory form={form}/>
      <LaboratoryInformation form={form}/>
      <FinalClassification form={form}/>
      <ContactTracing form={form}/>
    </>
  );
};
export default Influenza;
