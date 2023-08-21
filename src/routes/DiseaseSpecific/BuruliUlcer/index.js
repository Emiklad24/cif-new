import React from 'react';
import "styles/pages/form.less";
import Epidemiological from "./Epidemiological";
import ContactTracing from "./ContactTracing";
import ClinicalHistory from "./ClinicalHistory";
import FinalClassification from "./FinalClassification";
import LaboratoryInformation from "./LaboratoryInformation";
import Referral from './Referral';

const BuruliUlcer = () => {
  return (
    <>
     <Epidemiological/>
      <ClinicalHistory/>
      <LaboratoryInformation/>
      <FinalClassification/>
      <ContactTracing/>
      <Referral/>
    </>
  );
};
export default BuruliUlcer;
