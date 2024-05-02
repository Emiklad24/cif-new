import { v4 as uuidv4 } from "uuid";

const localTravel = [
  "returnedFromLocalTravel14Days",
  "dateOfLocalTravelStart",
  "dateOfTravelEndLocal",
  "stateOfTravel",
  "lgaOfTravel",
  "clientTravelAddressLocal",
];

const internationalTravel = [
  "returnedFromInternationalTravel14Days",
  "dateOfInternationalTravelStart",
  "dateOfInternationalTravelEnd",
  "countryOfTravel",
  "cityOfTravel",
  "clientTravelAddressInternational",
];

const contactTracingKeys = [
  "contactFirstNameContact",
  "contactLastName",
  "dateOfBirthOfContact",
  "contactEstimatedAge",
  "contactSex",
  "contactPregnancyStatus",
  "contactStateOfResidence",
  "contactLgaOfResidence",
  "contactWardOfResidence",
  "contactResidentialAddress",
  "relationshipWithCase",
  "contactCategorization",
  "isContactAHealthWorker",
  "nameOfHwHealthFacility",
];

const mutateCovidPayload = (fieldsValue, localTravel, internationalTravel) => {
  const extractedPropertiesLocalTravel = {};
  const extractedPropertiesInternationalTravel = {};

  const tempFormValuesLocalTravel = { ...fieldsValue };
  const tempFormValuesInternationalTravel = { ...fieldsValue };

  for (const key of localTravel) {
    if (key in tempFormValuesLocalTravel) {
      extractedPropertiesLocalTravel[key] = tempFormValuesLocalTravel[key];
      delete tempFormValuesLocalTravel[key];
    }
  }

  for (const key of internationalTravel) {
    if (key in tempFormValuesInternationalTravel) {
      extractedPropertiesInternationalTravel[key] =
        tempFormValuesInternationalTravel[key];
      delete tempFormValuesInternationalTravel[key];
    }
  }

  const payloadToBeSubmitted = {
    ...tempFormValuesLocalTravel,
    localTravel: { ...extractedPropertiesLocalTravel },
    internationalTravel: { ...extractedPropertiesInternationalTravel },
  };

  

  return payloadToBeSubmitted;
};

const mutatePayload = (fieldsValue, arrayOfKeys, newObjectName) => {
  const extractedProperties = {};
  const tempFormValues = { ...fieldsValue };

  for (const key of arrayOfKeys) {
    if (key in tempFormValues) {
      extractedProperties[key] = tempFormValues[key];
      delete tempFormValues[key];
    }
  }
  const payloadToBeSubmitted = {
    ...tempFormValues,
    [newObjectName]: { ...extractedProperties },
  };

 

  return payloadToBeSubmitted;
};

const mutateCovidPayloadForSpecimen = (fieldsValue, labFormName, programId) => {
  const data = mutateCovidPayload(
    fieldsValue,
    localTravel,
    internationalTravel
  );
  const payloadForSpecimen = mutatePayload(data, labFormName, "specimen");
  const payloadForMutation = mutatePayload(
    payloadForSpecimen,
    contactTracingKeys,
    "contact"
  );

  const specimenData = payloadForMutation["specimen"];

  const newSpecimenData = {
    legacySpecimenData: specimenData,

    nameOfTestingLaboratory: specimenData?.nameOfTestingLaboratory,
    dateSpecimenCollected: specimenData?.dateSpecimenCollected,
    specimenCollected: specimenData?.specimenCollected,

    nasalSwab: specimenData?.specimenType?.includes("nasalSwab") && {
      nSwabSpecimenReceived: specimenData?.nSwabSpecimenReceived,
      testConductedNasal: specimenData?.testConductedNasal,
      dateSecimenReceivedNasalThroatNp:
        specimenData?.dateSecimenReceivedNasalThroatNp,
      laboratoryIdNasalThroatNp: specimenData?.laboratoryIdNasalThroatNp,
      specimenConditionNasalThroatNp:
        specimenData?.specimenConditionNasalThroatNp,
      pcrResult: {
        pcrResultNasalThroatNp: specimenData?.pcrResultNasalThroatNp,
        dateResultReleasedPcr: specimenData?.dateResultReleasedPcr,
      },
      rdtResult: {
        rdtResultNasalThroatNp: specimenData?.rdtResultNasalThroatNp,
        dateResultReleasedRdt: specimenData?.dateResultReleasedRdt,
        genoSequencingRdt: specimenData?.genoSequencingRdt,
      },
    },

    throatSwab: specimenData?.specimenType?.includes("throatSwab") && {
      dateSecimenReceivedNasalThroatNp:
        specimenData?.dateSecimenReceivedNasalThroatNp,
      laboratoryIdNasalThroatNp: specimenData?.laboratoryIdNasalThroatNp,
      specimenConditionNasalThroatNp:
        specimenData?.specimenConditionNasalThroatNp,
      pcrResult: {
        pcrResultNasalThroatNp: specimenData?.pcrResultNasalThroatNp,
        dateResultReleasedPcr: specimenData?.dateResultReleasedPcr,
      },
      rdtResult: {
        rdtResultNasalThroatNp: specimenData?.rdtResultNasalThroatNp,
        dateResultReleasedRdt: specimenData?.dateResultReleasedRdt,
      },
    },

    nasopharyngeal: specimenData?.specimenType?.includes("nasopharyngeal") && {
      dateSecimenReceivedNasalThroatNp:
        specimenData?.dateSecimenReceivedNasalThroatNp,
      laboratoryIdNasalThroatNp: specimenData?.laboratoryIdNasalThroatNp,
      specimenConditionNasalThroatNp:
        specimenData?.specimenConditionNasalThroatNp,
      pcrResult: {
        pcrResultNasalThroatNp: specimenData?.pcrResultNasalThroatNp,
        dateResultReleasedPcr: specimenData?.dateResultReleasedPcr,
      },
      rdtResult: {
        rdtResultNasalThroatNp: specimenData?.rdtResultNasalThroatNp,
        dateResultReleasedRdt: specimenData?.dateResultReleasedRdt,
      },
    },

    blood: {
      specimenConditionBlood: specimenData?.specimenConditionBlood,
      serologyResult: {
        serologyResultBlood: specimenData?.serologyResultBlood,
      },
    },
  };

  return {
    applicationUuid: uuidv4(),
    diseaseName: programId,
    ...payloadForMutation,
    specimen: newSpecimenData,
  };
};

export default mutateCovidPayloadForSpecimen;
