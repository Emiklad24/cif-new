/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Tooltip,
  notification,
} from "antd";
import {
  createSormasCaseAction,
  getSormasCaseAction,
  setUserRole,
  updateSormasCaseAction,
} from "appRedux/actions";
import ContactTracing from "components/ContactTracing/ContactTracing";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import DynamicSelect from "components/Custom/DynamicSelect";
import Initializing from "components/Loader/Initializing";
import { DATE_FORMAT, QUERY_PARAM, USER_ROLE } from "constants/ActionTypes";
import GenerateEpid from "constants/JSON/GenerateEpid.json";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import useFetchAllStates from "hooks/useFetchAllStates.hooks";
import useFetchAllLGA from "hooks/useFetchLga.hook";
import useFetchWard from "hooks/useFetchWard.hook";
import useGetHealthFacilities from "hooks/useGetHealthFacilities.hook";
import { usePostFormData } from "hooks/usePostFormData.hook";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import constructPayload from "services/customPayloadConstructor/PayloadConstructor";
import useFormStore from "store/useFormStore";
import "styles/pages/form.less";
import { useShallow } from "zustand/react/shallow";
import AFP from "./AFP";
import Anthrax from "./Anthrax";
import BuruliUlcer from "./BuruliUlcer";
import CSM from "./CSM";
import Cholera from "./Cholera";
import Covid19 from "./Covid19";
import Dengue from "./Dengue";
import Diphtheria from "./Diphtheria";
import Ebola from "./Ebola";
import GuineaWorm from "./GuineaWorm";
import Influenza from "./Influenza";
import LassaFever from "./LassaFever";
import MaternalDeath from "./MaternalDeath";
import Measles from "./Measles";
import Mpox from "./Mpox";
import NOMA from "./NOMA";
import PRDS from "./PRDS";
import PerinatalDeath from "./PerinatalDeath";
import Rubella from "./Rubella";
import Tetanus from "./Tetanus";
import Yaw from "./Yaw";
import YellowFever from "./YellowFever";

const { Option } = Select;
const { Panel } = Collapse;

const placeDetectedData = [
  "Health Facility",
  "Home",
  "IDP Camp",
  "NYSC Camp",
  "Others",
];
const notifiesBy = ["Hospital Informant", "Community Informant", "Others"];

const App = () => {
  const dispatch = useDispatch();

  const { labFormName, setDiseaseProgramName } = useFormStore(
    useShallow((state) => ({
      labFormName: state.labFormName,
      setDiseaseProgramName: state.setDiseaseProgramName,
    }))
  );
  const [form] = Form.useForm();
  const { loading, sormasCase } = useSelector(({ common }) => common);
  const { isLoading } = usePostFormData();

  const [componentDisabled, setComponentDisabled] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLga, setSelectedLga] = useState(null);
  const [program, setProgram] = useState("");
  const [place_of_detection, setPlaceOfDetection] = useState("");
  const [ageYear, setAgeYear] = useState();
  const [ageMonth, setAgeMonth] = useState();
  const [ageDay, setAgeDay] = useState();
  const [epidNumberIsDisabled, setEpidNumberIsDisabled] = useState(false);
  const [residenceLga, setResidenceLga] = useState("");
  const [epidNumberAddon, setEpidNumberAddon] = useState("");
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);
  const [isYearDisabled, setIsYearDisabled] = useState(false);

  // QUERY PARAMS
  const urlParams = new URLSearchParams(window.location.search);
  const sormasCaseUuid = urlParams.get(QUERY_PARAM.SORMAS_UUID);
  const userRoleFromUrl = urlParams.get(QUERY_PARAM.SORMAS_ROLE);
  const userId = urlParams.get(QUERY_PARAM.USER_ID);
  const userStateId = urlParams.get(QUERY_PARAM.STATE_ID);
  const userLgaId = urlParams.get(QUERY_PARAM.LGA_ID);
  const userWardId = urlParams.get(QUERY_PARAM.WARD_ID);
  const userFacilityId = urlParams.get(QUERY_PARAM.FACILITY_ID);

  // ==========================================================

  const { data: allLookup, isLoading: allLookupLoading } = useFetchAllLookup();
  const { data: allStates } = useFetchAllStates();
  const lgaOfReportingQuery = useFetchAllLGA(selectedState?.stateOfReporting);
  const lgaOfResidenceQuery = useFetchAllLGA(selectedState?.stateOfResidence);
  const wardQuery = useFetchWard(selectedLga?.lgaOfReporting);
  const wardOfResidenceQuery = useFetchWard(selectedLga?.lgaOfResidence);

  const AllHealthFacilitiesQuery = useGetHealthFacilities();
  const AllSettlementTypeQuery = allLookup?.settlement_type ?? [];

  /**
   * -----------------------------------------
   * @function handleStateChange
   * @description Handle state change
   */
  const handleStateChange = async (value, name) => {
    setSelectedState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
    if (name === "stateOfReporting") {
      setSelectedLga(null);
      form.setFieldsValue({
        lgaOfReporting: null,
        wardOfReporting: null,
      });
    }
    if (name === "stateOfResidence") {
      setSelectedLga(null);
      form.setFieldsValue({
        lgaOfResidence: null,
        wardOfResidence: null,
      });
    }
  };
  // -----------------------------------------

  /**
   * -----------------------------------------
   * @function handleLgaChange
   * @description Handle LGA change
   */
  const handleLgaChange = async (value, name) => {
    setSelectedLga((previousState) => ({
      ...previousState,
      [name]: value,
    }));

    if (name === "lgaOfReporting") {
      form.setFieldsValue({
        wardOfReporting: null,
      });
    }
    if (name === "lgaOfResidence") {
      form.setFieldsValue({
        wardOfResidence: null,
      });
    }
  };

  /**
   * -----------------------------------------
   * @function getAgeFromDob
   * @description Get date of birth from age
   */
  const getAgeFromDob = (dateString, notInitialLoad = true) => {
    if (!dateString) return;

    const formattedDate =
      typeof dateString === "string"
        ? dateString
        : moment(dateString).format(DATE_FORMAT);
    // Assuming arg is in the format DD-MM-YYYY
    const parts = formattedDate.split("-");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JavaScript
    const year = parseInt(parts[2], 10);

    const dob = new Date(year, month, day);
    const today = new Date();
    let ageYear = today.getFullYear() - dob.getFullYear();
    let ageMonth = today.getMonth() - dob.getMonth();
    let ageDay = today.getDate() - dob.getDate();

    if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < dob.getDate())) {
      ageYear--;
      ageMonth += 12;
    }

    if (ageDay < 0) {
      ageMonth--;
      ageDay += 30;
    }

    setAgeMonth(ageMonth);
    setAgeDay(ageDay);
    // update this field if it is not the initial load
    if (notInitialLoad) {
      setAgeYear(ageYear);

      form.setFieldsValue({
        age: ageYear,
      });
    }

    return { ageYear, ageMonth, ageDay };
  };

  /**
   * @function generateDobFromAge
   * @description when the year field has a year calculate the date for the datepicker disable the datepicker field else set it to empty and enable the datepicker field
   */
  const generateDobFromAge = async (e) => {
    const year = e.target.value;
    setAgeYear(year);
    if (year) {
      const calculatedDate = moment()
        .subtract(year, "years")
        .set({ month: 0, date: 1 });
      setIsDatePickerDisabled(true);
      setAgeMonth(0);
      setAgeDay(0);
      // convert the date to the format DD-MM-YYYY
      const formattedDate = moment(calculatedDate).format(DATE_FORMAT);
      form.setFieldsValue({
        dateOfBirthPersonalInformation: formattedDate,
        age: year,
      });
      return;
    }
    form.setFieldsValue({ dateOfBirthPersonalInformation: null });
    setIsDatePickerDisabled(false);
  };

  /**
   * -----------------------------------------
   * @function validateNumber
   * @description Validate number
   */
  const validateNumber = (rule, value, callback) => {
    const numberPattern = /^[0-9]*$/;
    if (!value || numberPattern.test(value)) {
      if (value && value.length > 11) {
        callback("Number must have a maximum of 11 digits.");
      } else if (value && value.length < 8) {
        callback("Number must have a minimum of 8 digits.");
      } else {
        callback();
      }
    } else {
      callback("Please enter a valid number.");
    }
  };

  /**
   * @function isDateBefore
   * @description Function to check if date1 is before date2
   */
  function isDateBefore(date1, date2) {
    // Split the dates into day, month, and year
    const [day1, month1, year1] = date1?.split("-")?.map(Number);
    const [day2, month2, year2] = date2?.split("-")?.map(Number);

    // Create Date objects for comparison
    const dateObj1 = new Date(year1, month1 - 1, day1); // Month is 0-based
    const dateObj2 = new Date(year2, month2 - 1, day2); // Month is 0-based

    // Compare the dates
    return dateObj1 < dateObj2;
  }

  /**
   * @function checkDatesAndWarn
   * @description: Function to check if date1 is before date2 and show a warning message
   */
  function checkDatesAndWarn(fieldsValue, field1, field2, warningMessage) {
    if (
      fieldsValue?.[field1] &&
      fieldsValue?.[field2] &&
      isDateBefore(fieldsValue[field1], fieldsValue[field2])
    ) {
      notification.warning({
        message: `Date of ${warningMessage}`,
      });
      setFormIsLoading(false);
      return true;
    }
    return false;
  }

  /**
   * -----------------------------------------
   * @function onFinish
   * @description On finish submit form
   */
  const isUpdate = sormasCaseUuid && sormasCase?.applicationUuid;
  const _notAuthorized =
    userRoleFromUrl !== USER_ROLE.EDIT &&
    userRoleFromUrl !== USER_ROLE.SUPER &&
    !sormasCaseUuid;

  const onFinish = async (fieldsValue) => {
    console.log(fieldsValue)
    setFormIsLoading(true);
    // if (fieldsValue.epidNumber) {
    //   fieldsValue.epidNumber = `${epidNumberAddon}${fieldsValue.epidNumber}`;
    // }

    // if epid number is "" or null, or undefined, construct the epid number
    if (!isUpdate) {
      fieldsValue.epidNumber = "";
    }

    // construct payload
    const reconstructedPayload = await constructPayload(
      fieldsValue,
      program?.id,
      labFormName
    );

    // VALIDATE DATE OF NOTIFICATION AND DATE OF REPORT

    if (
      fieldsValue?.dateOfNotificationReportingAreas &&
      fieldsValue?.dateOfReportReportingAreas &&
      isDateBefore(
        fieldsValue?.dateOfNotificationReportingAreas,
        fieldsValue?.dateOfReportReportingAreas
      )
    ) {
      notification.warning({
        message: "Date of report cannot be before the date of notification",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateSpecimenCollected &&
      fieldsValue?.dateOfReportReportingAreas &&
      isDateBefore(
        fieldsValue?.dateSpecimenCollected,
        fieldsValue?.dateOfReportReportingAreas
      )
    ) {
      notification.warning({
        message:
          "Date of specimen collected cannot be before the date of report",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateSpecimenSent &&
      fieldsValue?.dateOfReportReportingAreas &&
      isDateBefore(
        fieldsValue?.dateSpecimenSent,
        fieldsValue?.dateOfReportReportingAreas
      )
    ) {
      notification.warning({
        message: "Date of specimen sent cannot be before the date of report",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateSpecimenSent &&
      fieldsValue?.dateSpecimenCollected &&
      isDateBefore(
        fieldsValue?.dateSpecimenSent,
        fieldsValue?.dateSpecimenCollected
      )
    ) {
      notification.warning({
        message:
          "Date of specimen sent cannot be before the date of specimen collected",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateSpecimenReceivedCsf &&
      fieldsValue?.dateSpecimenSent &&
      isDateBefore(
        fieldsValue?.dateSpecimenReceivedCsf,
        fieldsValue?.dateSpecimenSent
      )
    ) {
      notification.warning({
        message:
          "Date of specimen received cannot be before the date of specimen sent",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateResultReleasedCsfPcr &&
      fieldsValue?.dateSpecimenSent &&
      isDateBefore(
        fieldsValue?.dateResultReleasedCsfPcr,
        fieldsValue?.dateSpecimenSent
      )
    ) {
      notification.warning({
        message:
          "Date of result released cannot be before the date of specimen sent",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateOfLastVaccination &&
      fieldsValue?.dateOfBirthPersonalInformation &&
      isDateBefore(
        fieldsValue?.dateOfLastVaccination,
        fieldsValue?.dateOfBirthPersonalInformation
      )
    ) {
      notification.warning({
        message: "Date of last vaccination cannot be before the date of birth",
      });
      setFormIsLoading(false);
      return;
    }
    if (
      fieldsValue?.dateOfFirstVaccination &&
      fieldsValue?.dateOfBirthPersonalInformation &&
      isDateBefore(
        fieldsValue?.dateOfFirstVaccination,
        fieldsValue?.dateOfBirthPersonalInformation
      )
    ) {
      notification.warning({
        message: "Date of first vaccination cannot be before the date of birth",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateOfSecondVaccination &&
      fieldsValue?.dateOfBirthPersonalInformation &&
      isDateBefore(
        fieldsValue?.dateOfSecondVaccination,
        fieldsValue?.dateOfBirthPersonalInformation
      )
    ) {
      notification.warning({
        message:
          "Date of second vaccination cannot be before the date of birth",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateFirstVaccinationInfluenza &&
      fieldsValue?.dateOfBirthPersonalInformation &&
      isDateBefore(
        fieldsValue?.dateFirstVaccinationInfluenza,
        fieldsValue?.dateOfBirthPersonalInformation
      )
    ) {
      notification.warning({
        message: "Date of first vaccination cannot be before the date of birth",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateOfFirstVaccinationCovid &&
      fieldsValue?.dateOfBirthPersonalInformation &&
      isDateBefore(
        fieldsValue?.dateOfFirstVaccinationCovid,
        fieldsValue?.dateOfBirthPersonalInformation
      )
    ) {
      notification.warning({
        message: "Date of first vaccination cannot be before the date of birth",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateOfFirstVaccinationCovid &&
      fieldsValue?.dateOfBirthPersonalInformation &&
      isDateBefore(
        fieldsValue?.dateOfFirstVaccinationCovid,
        fieldsValue?.dateOfBirthPersonalInformation
      )
    ) {
      notification.warning({
        message: "Date of first vaccination cannot be before the date of birth",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateSecondVaccinationInfluenza &&
      fieldsValue?.dateOfBirthPersonalInformation &&
      isDateBefore(
        fieldsValue?.dateSecondVaccinationInfluenza,
        fieldsValue?.dateOfBirthPersonalInformation
      )
    ) {
      notification.warning({
        message:
          "Date of second vaccination cannot be before the date of birth",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateOfSecondVaccinationCovid &&
      fieldsValue?.dateOfBirthPersonalInformation &&
      isDateBefore(
        fieldsValue?.dateOfSecondVaccinationCovid,
        fieldsValue?.dateOfBirthPersonalInformation
      )
    ) {
      notification.warning({
        message:
          "Date of second vaccination cannot be before the date of birth",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateOfLastVaccination &&
      fieldsValue?.dateOfBirthPersonalInformation &&
      isDateBefore(
        fieldsValue?.dateOfLastVaccination,
        fieldsValue?.dateOfBirthPersonalInformation
      )
    ) {
      notification.warning({
        message: "Date of last vaccination cannot be before the date of birth",
      });
      setFormIsLoading(false);
      return;
    }

    if (
      fieldsValue?.dateOfVaccination &&
      fieldsValue?.dateOfBirthPersonalInformation &&
      isDateBefore(
        fieldsValue?.dateOfVaccination,
        fieldsValue?.dateOfBirthPersonalInformation
      )
    ) {
      notification.warning({
        message: "Date of vaccination cannot be before the date of birth",
      });
      setFormIsLoading(false);
      return;
    }

    try {
      // Update or create sormas case
      const updateAction = isUpdate
        ? updateSormasCaseAction(sormasCaseUuid, { ...reconstructedPayload })
        : createSormasCaseAction({ userId, ...reconstructedPayload });

      // Api call
      const response = await dispatch(updateAction);

      notification.success({
        message: response?.message ?? "Success",
        description: isUpdate
          ? "Case updated successfully"
          : "Case created successfully",
      });

      if (!isUpdate) resetForm();
      setFormIsLoading(false);
    } catch (error) {
      const { message, validationMessages } = error;

      if (validationMessages) {
        validationMessages.forEach((item) => {
          notification.error({
            message: message ?? "Validation Error",
            description: item,
          });
        });
      } else {
        notification.error({
          message: error?.message ?? "Error",
          description: isUpdate
            ? "Error updating case"
            : "Failed to create case",
        });
      }
    } finally {
      setFormIsLoading(false);
    }
  };

  /**
   * -----------------------------------------
   * @function onChangeDisease
   * @description On change disease
   */
  const onChangeDisease = async (value, reset = true) => {
    setProgram({
      value: allLookup?.disease_id?.find((item) => item?.id === value)?.value,
      id: value,
    });
    setDiseaseProgramName({
      value: allLookup?.disease_id?.find((item) => item?.id === value)?.value,
      id: value,
    });

    if (!reset) return;
    resetForm();
  };

  const resetForm = () => {
    setSelectedLga(null);
    setSelectedState(null);
    setFormValues({});
    setAgeYear(0);
    setAgeMonth(0);
    setAgeDay(0);
    setEpidNumberAddon("");
    setFormValues({});
    setResidenceLga("");
    setPlaceOfDetection("");
    setComponentDisabled(false);
    form.resetFields();
  };

  /**
   * -----------------------------------------
   * @function componentMap
   * @description Component map for the different diseases
   */
  const componentMap = {
    "Yellow Fever": <YellowFever form={form} />,
    Cholera: <Cholera form={form} />,
    Yaw: <Yaw form={form} />,
    Anthrax: <Anthrax form={form} />,
    AFP: <AFP form={form} />,
    Tetanus: <Tetanus form={form} />,
    Rubella: <Rubella form={form} />,
    NOMA: <NOMA form={form} />,
    Mpox: <Mpox form={form} />,
    Measles: <Measles form={form} />,
    "Lassa Fever": <LassaFever form={form} />,
    Influenza: <Influenza form={form} />,
    "Guinea Worm": <GuineaWorm form={form} />,
    Diphtheria: <Diphtheria form={form} />,
    Ebola: <Ebola form={form} />,
    "Dengue Fever": <Dengue form={form} />,
    CSM: <CSM form={form} />,
    "Buruli Ulcer": <BuruliUlcer form={form} />,
    "Pan Respiratory Disease Surveillance (PRDS)": <PRDS form={form} />,
    "Perinatal Death": <PerinatalDeath form={form} />,
    "Maternal Death": <MaternalDeath form={form} />,
    "COVID-19": <Covid19 form={form} />,
  };

  /**
   * -----------------------------------------
   * @function getProgram
   * @description Get program
   */
  const getProgram = () => {
    if (program?.value && componentMap.hasOwnProperty(program?.value)) {
      return componentMap[program?.value];
    }
    return null;
  };

  /**
   * -----------------------------------------
   * @function generateEpidNumberVal
   * @description Generate Epid Number
   */
  const generateEpidNumberVal = async (_lgaId = null) => {
    const _reportingLga = _lgaId ?? residenceLga;

    const filteredGenerateEpid = GenerateEpid.filter(
      (item) => item.lgaid === _reportingLga
    );
    // get the current year, i.e 24
    const year = new Date().getFullYear().toString().slice(-2);
    const EpidNumber = `${filteredGenerateEpid[0].stateepidcode}-${filteredGenerateEpid[0].lgaepidcode}-${year}-`;

    setEpidNumberAddon(EpidNumber);
  };

  /**
   * -----------------------------------------
   * @function populateForm
   * @description Populate form with data from sormas gotten from the sormas case uuid
   */

  const populateForm = async () => {
    if (!sormasCase?.applicationUuid || loading) return;

    await handleStateChange(sormasCase.stateOfResidence, "stateOfResidence");
    await handleLgaChange(sormasCase.lgaOfResidence, "lgaOfResidence");
    await handleStateChange(sormasCase.stateOfReporting, "stateOfReporting");
    await handleLgaChange(sormasCase.lgaOfReporting, "lgaOfReporting");
    await onChangeDisease(sormasCase?.diseaseName, false);

    getAgeFromDob(sormasCase?.dateOfBirthPersonalInformation, false);
    setAgeYear(sormasCase?.age);
    setIsYearDisabled(true);

    form.setFieldsValue({
      ...sormasCase,
      specimenCollected: sormasCase?.specimenCollected || "NO",
      age: sormasCase?.age,
    });

    const spiltByHyphen = sormasCase?.epidNumber.split("-");
    // use the first 4 items in the array to get the prefix
    const _prefix = spiltByHyphen.slice(0, 4).join("-");
    const _epidValue = spiltByHyphen[5] ?? "";

    if (sormasCase?.epidNumber) {
      setEpidNumberAddon(`${_prefix}-`);
      form.setFieldsValue({
        epidNumber: _epidValue,
      });
    }

    if (sormasCase?.specimenCollected) {
      form.setFieldsValue({
        specimenCollected: sormasCase?.specimenCollected,
      });
    }

    if (!sormasCase?.epidNumber && sormasCase?.lgaOfResidence) {
      generateEpidNumberVal(sormasCase?.lgaOfResidence);
    }
    setPlaceOfDetection(sormasCase?.placeOfDetection);
  };

  /**
   * @function getGeoLocation
   * @description Get geo location
   * TODO: to be used later
   */
  const getGeoLocation = async () => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Get current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback
          const { latitude, longitude } = position.coords;
        },
        (error) => {
          // Error callback
          // console.error(`Error getting geolocation: ${error.message}`);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.error("An unknown error occurred.");
              break;
            default:
              console.error("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      // Geolocation is not supported
      console.error("Geolocation is not supported by your browser");
    }
  };

  /**
   * @function getCaseByUuid
   * @description Get case by uuid
   */
  const getCaseByUuid = async () => {
    if (!sormasCaseUuid) return;
    try {
      await dispatch(getSormasCaseAction(sormasCaseUuid));
    } catch (error) {
      notification.error({
        message: "Error",
        description: error ?? "Error fetching case",
      });
    }
  };

  /**
   * -----------------------------------------
   * watch for changes in the date of birth field, and calculate the age
   */
  useEffect(() => {
    getAgeFromDob(formValues?.dateOfBirthPersonalInformation);

    // disable the age field if the year is set
    if (formValues?.dateOfBirthPersonalInformation) {
      setIsYearDisabled(true);
    } else {
      setIsYearDisabled(false);
      setAgeYear();
    }
  }, [formValues?.dateOfBirthPersonalInformation]);

  /**
   * -----------------------------------------
   * watch for changes in the sormasCase object from the store and allLookupLoading, and populate the form
   */
  useEffect(() => {
    if (allLookupLoading) return;
    populateForm();
  }, [sormasCase, allLookupLoading]);

  /**
   * -----------------------------------------
   * watch for changes in the sormasCaseUuid and userRoleFromUrl, and get the case by uuid
   */
  useEffect(() => {
    if (!userRoleFromUrl) return;
    getGeoLocation();
    getCaseByUuid();
  }, [sormasCaseUuid]);

  /**
   * -----------------------------------------
   * watch for changes in the userRoleFromUrl, and set the user role, and disable the component if the user role is not edit or super
   */
  useEffect(() => {
    if (!userRoleFromUrl) return;
    dispatch(setUserRole(userRoleFromUrl));
    if (
      userRoleFromUrl === USER_ROLE.EDIT ||
      userRoleFromUrl === USER_ROLE.SUPER
    ) {
      setComponentDisabled(false);
    } else {
      setComponentDisabled(true);
    }
  }, [userRoleFromUrl]);

  /**
   * -----------------------------------------
   * watch for changes in the residenceLga and program, and generate the epid number
   */
  useEffect(() => {
    if (residenceLga === "") return;
    generateEpidNumberVal();
  }, [residenceLga, program]);

  /**
   * @function getStateDataByQueryId
   * @description Get state data by query id
   */
  const getStateDataByQueryId = async () => {
    await handleStateChange(userStateId, "stateOfReporting");
    await handleLgaChange(userLgaId, "lgaOfReporting");

    form.setFieldsValue({
      stateOfReporting: Number(userStateId),
    });

    if (userLgaId) {
      form.setFieldsValue({
        lgaOfReporting: Number(userLgaId),
      });
    }
    return;
  };

  // set the state and lga of reporting if the state and lga id is present
  useEffect(() => {
    if (sormasCase?.applicationUuid) return;
    if (sormasCase?.applicationUuid || !userStateId) return;
    getStateDataByQueryId();
  }, [userStateId]);

  // set the ward of reporting if the lga id is present
  useEffect(() => {
    if (sormasCase?.applicationUuid) return;
    if (!userWardId) return;
    if (wardQuery?.isFetched) {
      form.setFieldsValue({
        wardOfReporting: Number(userWardId),
      });
    }
  }, [wardQuery?.isFetched, userWardId]);

  // set the place of detection if the health facility id is present
  useEffect(() => {
    if (sormasCase?.applicationUuid) return;
    if (!userFacilityId) return;
    if (AllHealthFacilitiesQuery?.data?.length > 0) {
      form.setFieldsValue({
        placeOfDetectionFacility: Number(userFacilityId),
        placeOfDetection: "Health Facility",
      });
      setPlaceOfDetection("Health Facility");
    }
  }, [AllHealthFacilitiesQuery?.data?.length, userFacilityId]);
  // place_of_detection,

  const onChange = () => {};
  const onSearch = () => {};

  const _isLoading = allLookupLoading || isLoading;

  return (
    <>
      {_notAuthorized ? (
        <div className="gx-text-center gx-d-flex gx-h-75 gx-align-items-center gx-justify-content-center">
          <h3>Sorry, you are not authorized to view this page</h3>
        </div>
      ) : (
        <>
          <Row>
            <Col lg={12} md={12} sm={12} xs={24}>
              <DynamicSelect
                showSearch
                value={program?.value}
                placeholder={allLookupLoading ? "Loading..." : "Select Disease"}
                optionFilterProp="children"
                onChange={(e) => onChangeDisease(e, true)}
                onSearch={onSearch}
                allowClear
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={allLookup?.disease_id}
                valueProperty="id"
                labelProperty="value"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="gx-w-100 gx-mb-3"
                loading={allLookupLoading}
                disabled={isUpdate}
              />
            </Col>
          </Row>

          {_isLoading ? (
            <div className="card_loading_container">
              <div className="card_loading gx-shadow">
                <Initializing />
                <h3 className="gx-mb-0">
                  {sormasCaseUuid ? "Populating Form ...." : "Preparing form"}
                </h3>
              </div>
            </div>
          ) : (
            <Form
              form={form}
              name="sormasCaseForm"
              disabled={componentDisabled}
              onFinish={onFinish}
              scrollToFirstError={true}
              initialValues={sormasCase?.applicationUuid ? sormasCase : {}}
            >
              <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                <Panel header="Reporting Areas" key="1">
                  <Row>
                    <Col lg={8} md={12} sm={24}>
                      <Form.Item
                        form={form}
                        label="Date of report"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="dateOfReportReportingAreas"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <CustomDatePicker
                          form={form}
                          name="dateOfReportReportingAreas"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label="State of reporting"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="stateOfReporting"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <DynamicSelect
                          showSearch
                          allowClear
                          optionLabelProp="label"
                          placeholder={<>&nbsp; Select State</>}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          onChange={(value) =>
                            handleStateChange(value, "stateOfReporting")
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={allStates}
                          valueProperty="id"
                          labelProperty="name"
                          disabled={userStateId}
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label="LGA of reporting"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="lgaOfReporting"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <DynamicSelect
                          showSearch
                          allowClear
                          optionLabelProp="label"
                          placeholder={<>&nbsp; Select LGA</>}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={lgaOfReportingQuery?.data || []}
                          valueProperty="id"
                          labelProperty="name"
                          onChange={(value) => {
                            handleLgaChange(value, "lgaOfReporting");
                          }}
                          disabled={userStateId && userLgaId}
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label={`Ward of reporting ${
                          wardQuery?.isLoading ? "Loading..." : ""
                        }`}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="wardOfReporting"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <DynamicSelect
                          showSearch
                          allowClear
                          optionLabelProp="label"
                          placeholder={<>&nbsp; Select Ward</>}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={
                            wardQuery?.isLoading
                              ? []
                              : wardQuery?.data?.[selectedLga?.lgaOfReporting]
                          }
                          valueProperty="id"
                          labelProperty="name"
                          disabled={userStateId && userLgaId && userWardId}
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label="Place of detection"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="placeOfDetection"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          allowClear
                          optionLabelProp="label"
                          onChange={setPlaceOfDetection}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          disabled={
                            userStateId &&
                            userLgaId &&
                            userWardId &&
                            userFacilityId
                          }
                        >
                          {placeDetectedData.map((item) => (
                            <Option label={item} value={item} key={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </ClearableFormItem>
                    </Col>
                    {place_of_detection === "Health Facility" && (
                      <Col lg={8} md={12} sm={12} xs={24}>
                        <ClearableFormItem
                          form={form}
                          label="Health facility"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="placeOfDetectionFacility"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <DynamicSelect
                            showSearch
                            allowClear
                            optionLabelProp="label"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={AllHealthFacilitiesQuery?.data}
                            valueProperty="id"
                            labelProperty="name"
                            disabled={
                              userStateId &&
                              userLgaId &&
                              userWardId &&
                              userFacilityId
                            }
                          />
                        </ClearableFormItem>
                      </Col>
                    )}
                    {["Home", "IDP Camp", "NYSC Camp", "Others"].includes(
                      place_of_detection
                    ) && (
                      <Col lg={8} md={12} sm={24} xs={24}>
                        <ClearableFormItem
                          form={form}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          label="Place description"
                          name="placeDescription"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input size="large" />
                        </ClearableFormItem>
                      </Col>
                    )}
                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label="Notified by"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="notifiedBy"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Select showSearch allowClear optionLabelProp="label">
                          {notifiesBy.map((item) => (
                            <Option label={item} value={item} key={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </ClearableFormItem>
                    </Col>
                    <Col lg={8} md={12} sm={24}>
                      <ClearableFormItem
                        form={form}
                        label="Date of notification"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name="dateOfNotificationReportingAreas"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <CustomDatePicker
                          form={form}
                          name="dateOfNotificationReportingAreas"
                          onChange
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={8} md={12} sm={24}>
                      <ClearableFormItem
                        form={form}
                        label="Date of investigation"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="dateOfInvestigationReportingAreas"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <CustomDatePicker
                          isToday={true}
                          form={form}
                          name="dateOfInvestigationReportingAreas"
                        />
                      </ClearableFormItem>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
              <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                <Panel header="Patient Information" key="1">
                  <Row>
                    <Col md={12} sm={24} xs={24}>
                      <ClearableFormItem
                        form={form}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        label="First name"
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input size="large" />
                      </ClearableFormItem>
                    </Col>

                    <Col md={12} sm={24} xs={24}>
                      <ClearableFormItem
                        form={form}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        label="Last name"
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input size="large" />
                      </ClearableFormItem>
                    </Col>

                    <Col lg={8} sm={24}>
                      <ClearableFormItem
                        form={form}
                        setFormValues={setFormValues}
                        label="Date of birth"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="dateOfBirthPersonalInformation"
                        rules={[
                          {
                            required: false,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <CustomDatePicker
                          form={form}
                          name="dateOfBirthPersonalInformation"
                          setFormValues={setFormValues}
                          disabled={isDatePickerDisabled}
                          keepValue={true}
                        />
                      </ClearableFormItem>
                    </Col>

                    <Col lg={16} sm={24}>
                      <ClearableFormItem
                        form={form}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        tooltip="Estimated age in years, months and days"
                        label="Age"
                        name="age"
                        rules={[
                          {
                            required: false,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input.Group size="large">
                          <Row gutter={8}>
                            <Col span={8}>
                              <Tooltip
                                placement="topLeft"
                                title="Estimated years"
                                arrowPointAtCenter
                              >
                                <Input
                                  placeholder="0"
                                  value={ageYear}
                                  onChange={generateDobFromAge}
                                  disabled={isYearDisabled}
                                  addonAfter={"Est. Years"}
                                />
                              </Tooltip>
                            </Col>
                            <Col span={8}>
                              <Tooltip
                                placement="topLeft"
                                title="Est. Months"
                                arrowPointAtCenter
                              >
                                <Input
                                  placeholder="0"
                                  value={ageMonth}
                                  disabled
                                  addonAfter={"Est. Month"}
                                />
                              </Tooltip>
                            </Col>
                            <Col span={8}>
                              <Tooltip
                                placement="topLeft"
                                title="Est. days"
                                arrowPointAtCenter
                              >
                                <Input
                                  placeholder="0"
                                  value={ageDay}
                                  disabled
                                  addonAfter={"Est. Days"}
                                />
                              </Tooltip>
                            </Col>
                          </Row>
                        </Input.Group>
                      </ClearableFormItem>
                    </Col>

                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label="State of residence"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="stateOfResidence"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <DynamicSelect
                          showSearch
                          allowClear
                          optionLabelProp="label"
                          placeholder={<>&nbsp; Select State</>}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={allStates}
                          valueProperty="id"
                          labelProperty="name"
                          onChange={(value) =>
                            handleStateChange(value, "stateOfResidence")
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label="LGA of residence"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="lgaOfResidence"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <DynamicSelect
                          showSearch
                          allowClear
                          optionLabelProp="label"
                          placeholder={<>&nbsp; Select LGA</>}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          onChange={(value) => {
                            handleLgaChange(value, "lgaOfResidence");
                            setResidenceLga(value);
                          }}
                          options={lgaOfResidenceQuery?.data}
                          valueProperty="id"
                          labelProperty="name"
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label={`Ward of residence ${
                          wardOfResidenceQuery?.isLoading ? "Loading..." : ""
                        }`}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="wardOfResidence"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <DynamicSelect
                          showSearch
                          allowClear
                          optionLabelProp="label"
                          placeholder={<>&nbsp; Select Ward</>}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={
                            wardOfResidenceQuery?.isLoading
                              ? []
                              : wardOfResidenceQuery?.data?.[
                                  selectedLga?.lgaOfResidence
                                ]
                          }
                          valueProperty="id"
                          labelProperty="name"
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={8} md={12} sm={24} xs={24}>
                      <div className="gx-d-flex gx-align-items-center">
                        <Checkbox
                          color="primary"
                          className="gx-pr-2"
                          checked={epidNumberIsDisabled}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEpidNumberIsDisabled(e.target.checked);
                          }}
                          value="epidNumberIsDisabled"
                          disabled={userRoleFromUrl !== USER_ROLE.EDIT}
                        />
                        <ClearableFormItem
                          form={form}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          label="Epid number"
                          name="epidNumber"
                          help={
                            <small>Check the box to edit the Epid Number</small>
                          }
                          rules={[
                            {
                              required: false,
                              message: "Required Field",
                            },
                            {
                              pattern: /^[0-9]*$/,
                              message: "Only Numbers",
                            },
                          ]}
                        >
                          <Input
                            addonBefore={epidNumberAddon || " "}
                            size="large"
                            disabled={
                              !epidNumberIsDisabled || epidNumberAddon === ""
                            }
                          />
                        </ClearableFormItem>
                      </div>
                    </Col>

                    <Col lg={8} md={12} sm={24}>
                      <ClearableFormItem
                        form={form}
                        label="Patient’s residential address "
                        name="patientResidentialAddress"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "Required Field",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter Address"
                          id="address"
                          name="address"
                          onChange={(e) => {}}
                        />
                      </ClearableFormItem>
                    </Col>

                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label="Occupation"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="occupation"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <DynamicSelect
                          placeholder="Select an option"
                          allowClear
                          options={allLookup?.occupation_type || []}
                          valueProperty="id"
                          labelProperty="value"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            optionA.children
                              ?.toLowerCase()
                              .localeCompare(optionB.children?.toLowerCase())
                          }
                        />
                      </ClearableFormItem>
                    </Col>

                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label="Education"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="education"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <DynamicSelect
                          placeholder="Select an option"
                          allowClear
                          options={allLookup?.educational_levels || []}
                          valueProperty="id"
                          labelProperty="value"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            optionA.children
                              ?.toLowerCase()
                              .localeCompare(optionB.children?.toLowerCase())
                          }
                        />
                      </ClearableFormItem>
                    </Col>

                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label="Settlement type"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="settlementType"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <DynamicRadio
                          buttonStyle="solid"
                          options={AllSettlementTypeQuery}
                          valueProperty="id"
                          labelProperty="value"
                        />
                      </ClearableFormItem>
                    </Col>

                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        form={form}
                        label="Sex"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="sex"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Radio.Group
                          buttonStyle="solid"
                          name="sex"
                          onChange={(e) =>
                            setFormValues((previousState) => ({
                              ...previousState,
                              sex: e.target.value,
                            }))
                          }
                        >
                          <Radio.Button value="MALE">Male</Radio.Button>
                          <Radio.Button value="FEMALE">Female</Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>

                    {formValues?.sex === "FEMALE" && ageYear >= 10 && (
                      <Col lg={8} md={12} sm={12} xs={24}>
                        <ClearableFormItem
                          form={form}
                          label="Pregnancy status"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="pregnancyStatus"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Radio.Group
                            buttonStyle="solid"
                            onChange={(e) =>
                              setFormValues((previousState) => ({
                                ...previousState,
                                pregnancyStatus: e.target.value,
                              }))
                            }
                          >
                            <Radio.Button value="pregnant">
                              Pregnant
                            </Radio.Button>
                            <Radio.Button value="not pregnant">
                              Not Pregnant
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>
                    )}

                    <Col lg={8} md={12} sm={24} xs={24}>
                      <ClearableFormItem
                        form={form}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        label="Patient/Caregiver phone number"
                        // initialValue={phone}
                        name="phoneNumber"
                        rules={[
                          {
                            pattern: /^[0-9]*$/,
                            message: "Please input a valid phone number",
                          },

                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          type="phone"
                          size="large"
                          // onChange={(e) => setPhone(e.target.value)}
                        />
                      </ClearableFormItem>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
              {getProgram()}
              {!["Yellow Fever", "NOMA", "Measles"].includes(
                program?.value
              ) && <ContactTracing form={form} />}
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <ClearableFormItem form={form} className="gx-m-2">
                    <Button
                      loading={formIsLoading}
                      type="primary"
                      htmlType="submit"
                      disabled={isLoading}
                    >
                      {formIsLoading
                        ? isUpdate
                          ? "Updating Case ..."
                          : "Submitting Case ..."
                        : isUpdate
                        ? "Update Case"
                        : "Submit Case"}
                    </Button>
                  </ClearableFormItem>
                </Col>
              </Row>
            </Form>
          )}
        </>
      )}
    </>
  );
};
export default App;
