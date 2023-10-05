import React from 'react';
import "styles/pages/form.less";
import Epidemiological from "./Epidemiological";
import ClinicalHistory from "./ClinicalHistory";
import FinalClassification from "./FinalClassification";
import LaboratoryInformation from "./LaboratoryInformation";
import ContactTracing from "../BuruliUlcer/ContactTracing";

const Cholera = ({form}) => {
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
export default Cholera;
