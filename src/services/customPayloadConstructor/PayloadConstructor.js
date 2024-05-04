import moment from "moment";
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
  "contactIdentified",
];

const constructTravelObject = async (
  fieldsValue,
  localTravel,
  internationalTravel,
  contact = contactTracingKeys
) => {
  const extractedPropertiesLocalTravel = {};
  const extractedPropertiesInternationalTravel = {};
  const extractedPropertiesContact = {};
  const mergedTravel = [...localTravel, ...internationalTravel, ...contact];
  const tempValues = { ...fieldsValue };

  for (const key of mergedTravel) {
    if (key in tempValues) {
      if (localTravel.includes(key)) {
        extractedPropertiesLocalTravel[key] = tempValues[key];
      } else if (internationalTravel.includes(key)) {
        extractedPropertiesInternationalTravel[key] = tempValues[key];
      } else if (contact.includes(key)) {
        extractedPropertiesContact[key] = tempValues[key];
      }
      delete tempValues[key];
    }
  }

  const payloadToBeSubmitted = {
    ...tempValues,
    localTravel: { ...extractedPropertiesLocalTravel },
    internationalTravel: { ...extractedPropertiesInternationalTravel },
    contact: { ...extractedPropertiesContact },
  };

  return payloadToBeSubmitted;
};

const constructPayload = async (fieldsValue, programId, labFormName) => {
  const newFieldsValue = await constructTravelObject(
    fieldsValue,
    localTravel,
    internationalTravel
  );

  const newSpecimenData = {
    nameOfTestingLaboratory: newFieldsValue?.nameOfTestingLaboratory,
    dateSpecimenCollected: newFieldsValue?.dateSpecimenCollected,
    specimenCollected: newFieldsValue?.specimenCollected,
    specimenType: newFieldsValue?.specimenType,
    dateSpecimenSent: newFieldsValue?.dateSpecimenSent,
    laboratoryIdNasalThroatNp: newFieldsValue?.laboratoryIdNasalThroatNp,

    nameOfTestingLaboratoryStool: newFieldsValue?.nameOfTestingLaboratoryStool,
    dateSpecimenSentStool: newFieldsValue?.dateSpecimenSentStool,
    nameOfTestingLaboratoryRectalSwab:
      newFieldsValue?.nameOfTestingLaboratoryRectalSwab,
    dateSpecimenSentRectalSwab: newFieldsValue?.dateSpecimenSentRectalSwab,

    nasalSwab: newFieldsValue?.specimenType?.includes("nasalSwab")
      ? {
          nSwabSpecimenReceived: newFieldsValue?.nSwabSpecimenReceived,
          testConductedNasal: newFieldsValue?.testConductedNasal,
          specimenConditionNasalThroatNp:
            newFieldsValue?.specimenConditionNasalThroatNp,
          pcrResult: {
            pcrResultNasalThroatNp: newFieldsValue?.pcrResultNasalThroatNp,
            dateResultReleasedPcr: newFieldsValue?.dateResultReleasedPcr,
          },
          rdtResult: {
            rdtResultNasalThroatNp: newFieldsValue?.rdtResultNasalThroatNp,
            dateResultReleasedRdt: newFieldsValue?.dateResultReleasedRdt,
            genoSequencingRdt: newFieldsValue?.genoSequencingRdt,
          },
        }
      : null,
    throatSwab: newFieldsValue?.specimenType?.includes("throatSwab")
      ? {
          tSwabSpecimenReceived: newFieldsValue?.tSwabSpecimenReceived,
          specimenConditionNasalThroatNp:
            newFieldsValue?.specimenConditionNasalThroatNp,
          pcrResult: {
            pcrResultNasalThroatNp: newFieldsValue?.pcrResultNasalThroatNp,
            dateResultReleasedPcr: newFieldsValue?.dateResultReleasedPcr,
          },
          rdtResult: {
            rdtResultNasalThroatNp: newFieldsValue?.rdtResultNasalThroatNp,
            dateResultReleasedRdt: newFieldsValue?.dateResultReleasedRdt,
          },
        }
      : null,
    nasopharyngeal: newFieldsValue?.specimenType?.includes("nasopharyngeal")
      ? {
          dateSpecimenReceivedNasalThroatNp:
            newFieldsValue?.dateSpecimenReceivedNasalThroatNp,
          npSwabSpecimenReceived: newFieldsValue?.npSwabSpecimenReceived,
          specimenConditionNasalThroatNp:
            newFieldsValue?.specimenConditionNasalThroatNp,
          reasonSampleConditionThroatNp:
            newFieldsValue?.reasonSampleConditionThroatNp,

          nasopharyngealSampleReceived:
            newFieldsValue?.nasopharyngealSampleReceived,
          dateSpecimenReceivednasopharyngeal:
            newFieldsValue?.dateSpecimenReceivednasopharyngeal,
          laboratoryIdnasopharyngeal:
            newFieldsValue?.laboratoryIdnasopharyngeal,
          specimenConditionnasopharyngeal:
            newFieldsValue?.specimenConditionnasopharyngeal,
          reasonSampleConditionnasopharyngeal:
            newFieldsValue?.reasonSampleConditionnasopharyngeal,
          testConductedSwab: newFieldsValue?.testConductedSwab,

          pcrResult: {
            pcrResultNasalThroatNp: newFieldsValue?.pcrResultNasalThroatNp,
            genoSequencingPcr: newFieldsValue?.genoSequencingPcr,
            dateResultReleasedPcr: newFieldsValue?.dateResultReleasedPcr,
          },

          rdtResult: {
            rdtResultNasalThroatNp: newFieldsValue?.rdtResultNasalThroatNp,
            genoSequencingThroatNp: newFieldsValue?.genoSequencingThroatNp,
            genoSequencingRdt: newFieldsValue?.genoSequencingRdt,
            dateResultReleasedRdt: newFieldsValue?.dateResultReleasedRdt,
          },

          skinBiopsyPCRResult: {
            resultSwabPcr: newFieldsValue?.resultSwabPcr,
            dateResultReleasedSwabPcr:
              newFieldsValue?.dateResultReleasedSwabPcr,
          },

          skinBiopsyCultureResult: {
            resultnasopharyngealCulture:
              newFieldsValue?.resultnasopharyngealCulture,
            specifyBacterianasopharyngealCulture:
              newFieldsValue?.specifyBacterianasopharyngealCulture,
            resultnasopharyngealElek: newFieldsValue?.resultnasopharyngealElek,
            dateResultReleasedNasopharyngealCultureElek:
              newFieldsValue?.dateResultReleasedNasopharyngealCultureElek,
          },
        }
      : null,
    blood: newFieldsValue?.specimenType?.includes("blood")
      ? {
          bloodSpecimenReceived: newFieldsValue?.bloodSpecimenReceived,
          dateSpecimenReceivedBlood: newFieldsValue?.dateSpecimenReceivedBlood,
          laboratoryIdBlood: newFieldsValue?.laboratoryIdBlood,
          specimenConditionBlood: newFieldsValue?.specimenConditionBlood,
          reasonSampleConditionNotAdequateBlood:
            newFieldsValue?.reasonSampleConditionNotAdequateBlood,
          testConductedBlood: newFieldsValue?.testConductedBlood,

          pcrResult: {
            resultBloodPcr: newFieldsValue?.resultBloodPcr,
            dateResultReleasedBloodPcr:
              newFieldsValue?.dateResultReleasedBloodPcr,
          },

          rdtResult: {
            resultBloodRdt: newFieldsValue?.resultBloodRdt,
            dateResultReleasedBloodRdt:
              newFieldsValue?.dateResultReleasedBloodRdt,
          },

          cultureResult: {
            resultBloodCulture: newFieldsValue?.resultBloodCulture,
            dateResultReleasedBloodCulture:
              newFieldsValue?.dateResultReleasedBloodCulture,
          },

          serologyResult: {
            serologyResultBlood: newFieldsValue?.serologyResultBlood,
            dateResultReleasedBloodSerology:
              newFieldsValue?.dateResultReleasedBloodSerology,
          },

          microscopyResult: {
            microscopyResultBlood: newFieldsValue?.microscopyResultBlood,
            dateResultReleasedBloodMicroscopy:
              newFieldsValue?.dateResultReleasedBloodMicroscopy,
          },

          prntResult: {
            prntResultBlood: newFieldsValue?.prntResultBlood,
            dateResultReleasedBloodPrnt:
              newFieldsValue?.dateResultReleasedBloodPrnt,
          },

          igmResult: {
            igmResultBlood: newFieldsValue?.igmResultBlood,
            dateResultReleasedBloodIgm:
              newFieldsValue?.dateResultReleasedBloodIgm,
          },

          iggAcuteResult: {
            iggAcuteResultBlood: newFieldsValue?.iggAcuteResultBlood,
            dateResultReleasedBloodIggA:
              newFieldsValue?.dateResultReleasedBloodIggA,
          },
        }
      : null,
    stool: newFieldsValue?.specimenType?.includes("stool")
      ? {
          stoolSwabSpecimenReceived: newFieldsValue?.stoolSwabSpecimenReceived,
          dateSpecimenReceivedStool: newFieldsValue?.dateSpecimenReceivedStool,
          specimenConditionStool: newFieldsValue?.specimenConditionStool,
          stoolNotAdequateReason: newFieldsValue?.stoolNotAdequateReason,
          typeOfTestDoneStool: newFieldsValue?.typeOfTestDoneStool,
          testResultStoolMicroscopy: newFieldsValue?.testResultStoolMicroscopy,
          dateSpecimenTestedStool: newFieldsValue?.dateSpecimenTestedStool,
          dateResultReleasedStool: newFieldsValue?.dateResultReleasedStool,
        }
      : null,
    rectalSwab: newFieldsValue?.specimenType?.includes("rectalSwab")
      ? {
          rectalSwabSpecimenReceived:
            newFieldsValue?.rectalSwabSpecimenReceived,
          dateSpecimenReceivedRectalSwab:
            newFieldsValue?.dateSpecimenReceivedRectalSwab,
          specimenConditionRectalSwab:
            newFieldsValue?.specimenConditionRectalSwab,
          rectalSwabNotAdequateReason:
            newFieldsValue?.rectalSwabNotAdequateReason,
          typeOfTestDoneRectalSwab: newFieldsValue?.typeOfTestDoneRectalSwab,
          dateResultReleasedRectalSwabMicroscopy:
            newFieldsValue?.dateResultReleasedRectalSwabMicroscopy,
          testResultRectalSwabMicroscopy:
            newFieldsValue?.testResultRectalSwabMicroscopy,
          testResultRectalSwabCulture:
            newFieldsValue?.testResultRectalSwabCulture,
          dateSpecimenTestedRectalSwab:
            newFieldsValue?.dateSpecimenTestedRectalSwab,
          testResultRectalSwab: newFieldsValue?.testResultRectalSwab,
          dateResultReleasedRectalSwab:
            newFieldsValue?.dateResultReleasedRectalSwab,
        }
      : null,
    crust: newFieldsValue?.specimenType?.includes("crust")
      ? {
          crustSampleReceived: newFieldsValue?.crustSampleReceived,
          dateSpecimenReceivedCrust: newFieldsValue?.dateSpecimenReceivedCrust,
          laboratoryIdCrust: newFieldsValue?.laboratoryIdCrust,
          specimenConditionCrust: newFieldsValue?.specimenConditionCrust,
          reasonSpecimenNotAdequateCrustSpecimen:
            newFieldsValue?.reasonSpecimenNotAdequateCrustSpecimen,
          testConductedCrust: newFieldsValue?.testConductedCrust,
          resultCrustPcr: newFieldsValue?.resultCrustPcr,
          dateResultReleasedCrustPcr:
            newFieldsValue?.dateResultReleasedCrustPcr,
          resultCrustSerology: newFieldsValue?.resultCrustSerology,
          dateResultReleasedCrustSerology:
            newFieldsValue?.dateResultReleasedCrustSerology,
        }
      : null,
    swab: newFieldsValue?.specimenType?.includes("swab")
      ? {
          swabSampleReceived: newFieldsValue?.swabSampleReceived,
          dateSpecimenReceivedSwab: newFieldsValue?.dateSpecimenReceivedSwab,
          laboratoryIdSwab: newFieldsValue?.laboratoryIdSwab,
          specimenConditionSwab: newFieldsValue?.specimenConditionSwab,
          reasonSpecimenNotAdequateSwabSpecimen:
            newFieldsValue?.reasonSpecimenNotAdequateSwabSpecimen,
          testConductedSwab: newFieldsValue?.testConductedSwab,
          resultSwabPcr: newFieldsValue?.resultSwabPcr,
          dateResultReleasedSwabPcr: newFieldsValue?.dateResultReleasedSwabPcr,
          resultSwabSerology: newFieldsValue?.resultSwabSerology,
          dateResultReleasedSwabSerology:
            newFieldsValue?.dateResultReleasedSwabSerology,
        }
      : null,
    breastMilk: newFieldsValue?.specimenType?.includes("breastMilk")
      ? {
          breastMilkSpecimenReceived:
            newFieldsValue?.breastMilkSpecimenReceived,
          breastMilkDateSpecimenReceived:
            newFieldsValue?.breastMilkDateSpecimenReceived,
          breastMilkSpecimenCondition:
            newFieldsValue?.breastMilkSpecimenCondition,
          reasonSpecimenNotAdequateBreastMilkSpecimen:
            newFieldsValue?.reasonSpecimenNotAdequateBreastMilkSpecimen,
          breastMilkLaboratoryId: newFieldsValue?.breastMilkLaboratoryId,
          breastMilkPcrResult: newFieldsValue?.breastMilkPcrResult,
          reasonBreastMilkPcrNotDone:
            newFieldsValue?.reasonBreastMilkPcrNotDone,
          breastMilkDateResultReleased:
            newFieldsValue?.breastMilkDateResultReleased,
        }
      : null,
    cerebrospinalFluid: newFieldsValue?.specimenType?.includes(
      "cerebrospinalFluid"
    )
      ? {
          csfSampleReceived: newFieldsValue?.csfSampleReceived,
          dateSpecimenReceivedCsf: newFieldsValue?.dateSpecimenReceivedCsf,
          laboratoryIdCsf: newFieldsValue?.laboratoryIdCsf,
          specimenConditionCsf: newFieldsValue?.specimenConditionCsf,
          reasonSampleConditionNotAdequateCsf:
            newFieldsValue?.reasonSampleConditionNotAdequateCsf,
          testConductedCsf: newFieldsValue?.testConductedCsf,
          resultCsfPcr: newFieldsValue?.resultCsfPcr,
          final_interpretation: newFieldsValue?.final_interpretation,
          dateResultReleasedCsfPcr: newFieldsValue?.dateResultReleasedCsfPcr,
          rdtResultCsfRdt: newFieldsValue?.rdtResultCsfRdt,
          dateResultReleasedCsfRdt: newFieldsValue?.dateResultReleasedCsfRdt,
          resultCsfCulture: newFieldsValue?.resultCsfCulture,
          dateResultReleasedCsfCulture:
            newFieldsValue?.dateResultReleasedCsfCulture,
        }
      : null,
    serum: newFieldsValue?.specimenType?.includes("serum")
      ? {
          serumSpecimenReceived: newFieldsValue?.serumSpecimenReceived,
          dateSerumSpecimenReceived: newFieldsValue?.dateSerumSpecimenReceived,
          specimenConditionSerum: newFieldsValue?.specimenConditionSerum,
          testConductedSerum: newFieldsValue?.testConductedSerum,
          igmResultSerum: newFieldsValue?.igmResultSerum,
          dateResultReleasedSerumIgm:
            newFieldsValue?.dateResultReleasedSerumIgm,
          iggAcuteResultSerum: newFieldsValue?.iggAcuteResultSerum,
          dateResultReleasedSerumIgga:
            newFieldsValue?.dateResultReleasedSerumIgga,
          iggConvalescentResultSerum:
            newFieldsValue?.iggConvalescentResultSerum,
          dateResultReleasedSerumIggc:
            newFieldsValue?.dateResultReleasedSerumIggc,
          microscopyResultSerum: newFieldsValue?.microscopyResultSerum,
          dateResultReleasedSerumMicroscopy:
            newFieldsValue?.dateResultReleasedSerumMicroscopy,
          pcrResultSerum: newFieldsValue?.pcrResultSerum,
          dateResultReleasedSerumPcr:
            newFieldsValue?.dateResultReleasedSerumPcr,
          prntResultSerum: newFieldsValue?.prntResultSerum,
          dateResultReleasedSerumPrnt:
            newFieldsValue?.dateResultReleasedSerumPrnt,
        }
      : null,
    oropharyngeal: newFieldsValue?.specimenType?.includes("oropharyngeal")
      ? {
          opSwabSpecimenReceived: newFieldsValue?.opSwabSpecimenReceived,
          dateSpecimenReceivedNasalThroatNp:
            newFieldsValue?.dateSpecimenReceivedNasalThroatNp,
          specimenConditionNasalThroatNp:
            newFieldsValue?.specimenConditionNasalThroatNp,
          reasonSampleConditionNasalThroatNp:
            newFieldsValue?.reasonSampleConditionNasalThroatNp,
          testConductedNasal: newFieldsValue?.testConductedNasal,
          pcrResultNasalThroatNp: newFieldsValue?.pcrResultNasalThroatNp,
          dateResultSentPCR: newFieldsValue?.dateResultSentPCR,
          rdtResultNasalThroatNp: newFieldsValue?.rdtResultNasalThroatNp,
          dateResultSentOutNasal: newFieldsValue?.dateResultSentOutNasal,
        }
      : null,
    bloodSerum: newFieldsValue?.specimenType?.includes("bloodSerum")
      ? {
          bloodSerumSampleReceived: newFieldsValue?.bloodSerumSampleReceived,
          bloodSerumDateSpecimenReceived:
            newFieldsValue?.bloodSerumDateSpecimenReceived,
          bloodSerumLaboratoryId: newFieldsValue?.bloodSerumLaboratoryId,
          bloodSerumSpecimenCondition:
            newFieldsValue?.bloodSerumSpecimenCondition,
          bloodSerumReasonSampleCondition:
            newFieldsValue?.bloodSerumReasonSampleCondition,
          bloodSerumTestConducted: newFieldsValue?.bloodSerumTestConducted,

          bloodSerumResult: {
            bloodSerumMeaslesSerologyResult:
              newFieldsValue?.bloodSerumMeaslesSerologyResult,
            dateResultReleasedMeasles:
              newFieldsValue?.dateResultReleasedMeasles,

            bloodSerumRubellaSerologyResult:
              newFieldsValue?.bloodSerumRubellaSerologyResult,
            dateResultReleasedRubella:
              newFieldsValue?.dateResultReleasedRubella,

            prntResultBloodSerum: newFieldsValue?.prntResultBloodSerum,
            dateResultReleasedBloodSerumPrnt:
              newFieldsValue?.dateResultReleasedBloodSerumPrnt,

            resultBloodSerumPcr: newFieldsValue?.resultBloodSerumPcr,
            dateResultReleasedBloodSerumPcr:
              newFieldsValue?.dateResultReleasedBloodSerumPcr,

            iggConvalescentResultBloodSerum:
              newFieldsValue?.iggConvalescentResultBloodSerum,
            dateResultReleasedBloodSerumIggc:
              newFieldsValue?.dateResultReleasedBloodSerumIggc,

            resultBloodSerumIggAcute: newFieldsValue?.resultBloodSerumIggAcute,
            dateResultReleasedBloodIggA:
              newFieldsValue?.dateResultReleasedBloodIggA,

            resultBloodSerumIgm: newFieldsValue?.resultBloodSerumIgm,
            dateResultReleasedBloodSerumIgm:
              newFieldsValue?.dateResultReleasedBloodSerumIgm,

            // Regional Lab Result
            dateResultReleasedRegionalLab:
              newFieldsValue?.dateResultReleasedRegionalLab,
            regionalLabResultIgm: newFieldsValue?.regionalLabResultIgm,
            regionalLabResultPcr: newFieldsValue?.regionalLabResultPcr,
            regionalLabResultPrnt: newFieldsValue?.regionalLabResultPrnt,
            regionalLabResultDengueFever:
              newFieldsValue?.regionalLabResultDengueFever,
            regionalLabResultWestNile:
              newFieldsValue?.regionalLabResultWestNile,
            regionalLabResultChikungunya:
              newFieldsValue?.regionalLabResultChikungunya,
          },
        }
      : null,

    skinBiopsy: newFieldsValue?.specimenType?.includes("skinBiopsy")
      ? {
          skinBiopsySampleReceived: newFieldsValue?.skinBiopsySampleReceived,
          dateSpecimenReceivedSkinBiopsy:
            newFieldsValue?.dateSpecimenReceivedSkinBiopsy,
          laboratoryIdSkinBiopsy: newFieldsValue?.laboratoryIdSkinBiopsy,
          specimenConditionSkinBiopsy:
            newFieldsValue?.specimenConditionSkinBiopsy,
          reasonSampleConditionSkinBiopsy:
            newFieldsValue?.reasonSampleConditionSkinBiopsy,
          testConductedSkinBiopsy: newFieldsValue?.testConductedSkinBiopsy,

          skinBiopsyPCRResult: {
            resultSkinBiopsyPcr: newFieldsValue?.resultSkinBiopsyPcr,
            dateResultReleasedSkinBiopsyPcr:
              newFieldsValue?.dateResultReleasedSkinBiopsyPcr,
          },

          skinBiopsyCultureResult: {
            resultSkinBiopsyCulture: newFieldsValue?.resultSkinBiopsyCulture,
            specifyBacteriaSkinBiopsyCulture:
              newFieldsValue?.specifyBacteriaSkinBiopsyCulture,
            resultSkinBiopsyElek: newFieldsValue?.resultSkinBiopsyElek,
            dateResultReleasedSkinBiopsyCultureElek:
              newFieldsValue?.dateResultReleasedSkinBiopsyCultureElek,
          },
        }
      : null,
  };

  // remove null or undefined values from the object newSpecimenData
  const _newSpecimenData = Object.keys(newSpecimenData).reduce(
    (object, key) => {
      if (newSpecimenData[key] != null) {
        object[key] = newSpecimenData[key];
      }
      return object;
    },
    {}
  );

  // get dob from newFieldsValue?.dateOfBirthOfContact and calculate age in years using moment
  const dob = newFieldsValue?.contact?.dateOfBirthOfContact;
  const ageInYears = dob ? moment().diff(dob, "years") : null;
  // put age in years in newFieldsValue contact object
  newFieldsValue.contact.contactEstimatedAge = ageInYears;
  // if contactEstimatedAge is null, delete it from newFieldsValue contact object
  if (!newFieldsValue.contact.contactEstimatedAge) {
    delete newFieldsValue.contact.contactEstimatedAge;
  }

  // remove the keys in the keysToBeRemoved array from newFieldsValue
  const keysToBeRemoved = [
    "nameOfTestingLaboratory",
    "dateSpecimenCollected",
    "specimenCollected",
    "specimenType",
    "dateSpecimenSent",
    "laboratoryIdNasalThroatNp",
    "bloodSpecimenReceived",
  ];
  keysToBeRemoved.forEach((key) => delete newFieldsValue[key]);

  // return the payload to be submitted

  return {
    applicationUuid: uuidv4(),
    diseaseName: programId,
    ...newFieldsValue,
    specimen: _newSpecimenData,
  };
};

export default constructPayload;
