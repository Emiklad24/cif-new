/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Col,
  Form,
  Input,
  Collapse,
  Row,
  Tooltip,
  Select,
  Button,
  Radio,
} from "antd";
import React, { useState, useEffect } from "react";
import "styles/pages/form.less";
import YellowFever from "./YellowFever";
import Cholera from "./Cholera";
import Yaw from "./Yaw";
import Anthrax from "./Anthrax";
import AFP from "./AFP";
import Tetanus from "./Tetanus";
import Rubella from "./Rubella";
import PerinatalDeath from "./PerinatalDeath";
import NOMA from "./NOMA";
import Mpox from "./Mpox";
import Measles from "./Measles";
import MaternalDeath from "./MaternalDeath";
import LassaFever from "./LassaFever";
import Influenza from "./Influenza";
import GuineaWorm from "./GuineaWorm";
import Ebola from "./Ebola";
import Diphtheria from "./Diphtheria";
import Dengue from "./Dengue";
import CSM from "./CSM";
import Covid19 from "./Covid19";
import BuruliUlcer from "./BuruliUlcer";
import { fetchStateList } from "appRedux/actions/Common";
import { useDispatch, useSelector } from "react-redux";
import ClearableFormItem from "../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../components/Custom/CustomDatePicker";
import ContactTracing from "../../components/ContactTracing/ContactTracing";
import PRDS from "./PRDS";
import useFetchAllLookup from "../../hooks/useFetchAllLookups.hooks";
import useFetchAllStates from "../../hooks/useFetchAllStates.hooks";
import useFetchAllLGA from "../../hooks/useFetchLga.hook";
import DynamicSelect from "../../components/Custom/DynamicSelect";
import useFetchWard from "../../hooks/useFetchWard.hook";
import useGetHealthFacilities from "../../hooks/useGetHealthFacilities.hook";
import useGetAllSettlementType from "../../hooks/useGetAllSettlementType.hook";
import DynamicRadio from "../../components/Custom/DynamicRadio";
import useFormStore from "../../store/useFormStore";
import { useShallow } from "zustand/react/shallow";
import { usePostFormData } from "../../hooks/usePostFormData.hook";
import { v4 as uuidv4 } from "uuid";
import mutateCovidPayloadForSpecimen from "../../services/customPayloadConstructor/CovidPayloadConstructor";

const { Option } = Select;
const placeDetectedData = ["Health Facility", "Home", "IDP Camp", "NYSC Camp"];
const notifiesBy = ["Hospital Informant", "Community Informant", "Others"];

const diseaseData = [
  "Cholera",
  "Yellow Fever",
  "Yaw",
  "Anthrax",
  "AFP",
  "PRDS",
  "Tetanus",
  "Rubella",
  "Perinatal Death",
  "NOMA",
  "Mpox",
  "Measles",
  "Maternal Death",
  "Lassa Fever",
  "Influenza",
  "Guinea Worm",
  "Ebola",
  "Diphtheria",
  "Dengue",
  "CSM",
  "Covid19",
  "Buruli Ulcer",
];

const App = () => {
  const { labFormName } = useFormStore(
    useShallow((state) => ({
      labFormName: state.labFormName,
    }))
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { stateList } = useSelector(({ common }) => common);

  const { Panel } = Collapse;

  const [lga, setLga] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLga, setSelectedLga] = useState(null);
  const [program, setProgram] = useState("");
  const [place_of_detection, setPlaceOfDetection] = useState("");
  const [ageYear, setAgeYear] = useState(0);
  const [ageMonth, setAgeMonth] = useState(0);

  const handleStateChange = (value, name) => {
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

  const handleLgaChange = (value, name) => {
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

  const getDoBFromAge = (arg) => {
    if (arg) {
      // Assuming arg is in the format DD-MM-YYYY
      const parts = arg.split("-");
      if (parts.length !== 3) {
        throw new Error("Invalid date format. Please use DD-MM-YYYY.");
      }

      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JavaScript
      const year = parseInt(parts[2], 10);

      const dob = new Date(year, month, day);
      const today = new Date();
      let ageYear = today.getFullYear() - dob.getFullYear();
      let ageMonth = today.getMonth() - dob.getMonth();

      if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < dob.getDate())) {
        ageYear--;
        ageMonth += 12;
      }
      setAgeMonth(ageMonth);
      setAgeYear(ageYear);

      form.setFieldsValue({
        age: ageYear,
      });

      return { ageYear, ageMonth };
    }
    return 0;
  };

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

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    dispatch(fetchStateList());
    getDoBFromAge(formValues?.dateOfBirthPersonalInformation);
  }, [dispatch, formValues]);

  const onChange = () => {
    console.log("Received values of form:");
  };

  // const localTravel = [
  //   "returnedFromLocalTravel14Days",
  //   "dateOfLocalTravelStart",
  //   "dateOfTravelEndLocal",
  //   "stateOfTravel",
  //   "lgaOfTravel",
  //   "clientTravelAddressLocal",
  // ];

  // const internationalTravel = [
  //   "returnedFromnInternationalTravel14Days",
  //   "dateOfInternationalTravelStart",
  //   "dateOfInternationalTravelEnd",
  //   "countryOfTravel",
  //   "cityOfTravel",
  //   "clientTravelAddressInternational",
  // ];

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

  const { isLoading, mutate } = usePostFormData();

  
  const onFinish = async (fieldsValue) => {
    if (program?.value === "COVID-19") {
      const covidPayload = mutateCovidPayloadForSpecimen(fieldsValue, labFormName, program?.id)
      console.log(covidPayload)
      // mutate(covidPayload);
    } else {
      const payloadForSpecimen = mutatePayload(
        fieldsValue,
        labFormName,
        "specimen"
      );

      if (!["Yellow Fever", "NOMA", "Measles"].includes(program?.value)) {
        const payloadForContactTracing = mutatePayload(
          payloadForSpecimen,
          contactTracingKeys,
          "contact"
        );
        //make API call here
        mutate({
          applicationUuid: uuidv4(),
          diseaseName: program?.id,
          ...payloadForContactTracing,
        });
      } else {
        mutate({
          applicationUuid: uuidv4(),
          diseaseName: program?.id,
          ...payloadForSpecimen,
        });
      }
    }
  };

  // const mutateCovidPayload = (
  //   fieldsValue,
  //   localTravel,
  //   internationalTravel
  // ) => {
  //   const extractedPropertiesLocalTravel = {};
  //   const extractedPropertiesInternationalTravel = {};

  //   const tempFormValuesLocalTravel = { ...fieldsValue };
  //   const tempFormValuesInternationalTravel = { ...fieldsValue };

  //   for (const key of localTravel) {
  //     if (key in tempFormValuesLocalTravel) {
  //       extractedPropertiesLocalTravel[key] = tempFormValuesLocalTravel[key];
  //       delete tempFormValuesLocalTravel[key];
  //     }
  //   }

  //   for (const key of internationalTravel) {
  //     if (key in tempFormValuesInternationalTravel) {
  //       extractedPropertiesInternationalTravel[key] =
  //         tempFormValuesInternationalTravel[key];
  //       delete tempFormValuesInternationalTravel[key];
  //     }
  //   }

  //   const payloadToBeSubmitted = {
  //     ...tempFormValuesLocalTravel,
  //     localTravel: { ...extractedPropertiesLocalTravel },
  //     internationalTravel: { ...extractedPropertiesInternationalTravel },
  //   };

  //   // console.log(payloadToBeSubmitted)

  //   return payloadToBeSubmitted;
  // };

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

    console.log(payloadToBeSubmitted);

    return payloadToBeSubmitted;
  };

  const onChangeDisease = (value) => {
    setProgram({
      value: allLookup?.disease_id?.filter((item) => item?.id === value)[0]
        ?.value,
      id: value,
    });
    setSelectedLga(null);
    setSelectedState(null);
    form.resetFields();
    setFormValues({});
    setAgeYear(0);
    setAgeMonth(0);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

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
    PRDS: <PRDS form={form} />,
    "Perinatal Death": <PerinatalDeath form={form} />,
    "Maternal Death": <MaternalDeath form={form} />,
    "COVID-19": <Covid19 form={form} />,
  };

  const getProgram = () => {
    if (program?.value && componentMap.hasOwnProperty(program?.value)) {
      return componentMap[program?.value];
    }
    return null;
  };

  const { data: allLookup, isLoading: allLookupLoading } = useFetchAllLookup();
  const { data: allStates } = useFetchAllStates();
  const lgaOfReportingQuery = useFetchAllLGA(selectedState?.stateOfReporting);
  const lgaOfResidenceQuery = useFetchAllLGA(selectedState?.stateOfResidence);
  const wardQuery = useFetchWard(selectedLga?.lgaOfReporting);
  const wardOfResidenceQuery = useFetchWard(selectedLga?.lgaOfResidence);
  const AllHealthFacilitiesQuery = useGetHealthFacilities();
  const AllSettlementTypeQuery = useGetAllSettlementType();

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12} xs={24}>
          <ClearableFormItem
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label={`Disease name ${
              allLookupLoading ? "Loading please wait...": ""
            }`}
            name="diseaseName"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
            initialValue={program?.value}
          >
            <DynamicSelect
              showSearch
              value={program?.value}
              placeholder="Select a disease"
              optionFilterProp="children"
              onChange={onChangeDisease}
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
            />
          </ClearableFormItem>
        </Col>
      </Row>
      <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Collapse defaultActiveKey={["1"]} onChange={onChange}>
          <Panel header="Reporting Areas" key="1">
            <Row>
              <Col lg={8} md={12} sm={24}>
                <ClearableFormItem
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
                </ClearableFormItem>
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
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={allStates}
                    valueProperty="id"
                    labelProperty="name"
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
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={lgaOfReportingQuery?.data || []}
                    valueProperty="id"
                    labelProperty="name"
                    onChange={(value) =>
                      handleLgaChange(value, "lgaOfReporting")
                    }
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
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={
                      wardQuery?.isLoading
                        ? []
                        : wardQuery?.data?.[selectedLga?.lgaOfReporting]
                    }
                    valueProperty="id"
                    labelProperty="name"
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
                        .localeCompare((optionB?.label ?? "").toLowerCase())
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
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={AllHealthFacilitiesQuery?.data}
                      valueProperty="id"
                      labelProperty="name"
                    />
                  </ClearableFormItem>
                </Col>
              )}
              {(place_of_detection === "Home" ||
                place_of_detection === "IDP Camp" ||
                place_of_detection === "NYSC Camp") && (
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
              <Col lg={8} md={12} sm={24} xs={24}>
                <ClearableFormItem
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Epid number"
                  name="epidNumber"
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
              <Col lg={8} md={12} sm={24} xs={24}>
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
              <Col lg={8} md={12} sm={24} xs={24}>
                <ClearableFormItem
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Middle name"
                  name="middleName"
                >
                  <Input size="large" />
                </ClearableFormItem>
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
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
              <Col lg={8} md={12} sm={24} xs={24}>
                <ClearableFormItem
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Patient/Caregiver phone number"
                  // initialValue={phone}
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Number is required" },
                    { validator: validateNumber },
                  ]}
                >
                  <Input
                    type="phone"
                    size="large"
                    // onChange={(e) => setPhone(e.target.value)}
                  />
                </ClearableFormItem>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Date of birth"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateOfBirthPersonalInformation"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker
                    form={form}
                    name="dateOfBirthPersonalInformation"
                    setFormValues={setFormValues}
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  tooltip="Estimated age in years and months"
                  label="Age"
                  name="age"
                >
                  <Input.Group size="large">
                    <Row gutter={8}>
                      <Col span={12}>
                        <Tooltip
                          placement="topLeft"
                          title="Estimated years"
                          arrowPointAtCenter
                        >
                          <Input
                            placeholder="Estimated years"
                            disabled
                            value={ageYear}
                          />
                        </Tooltip>
                      </Col>
                      <Col span={12}>
                        <Tooltip
                          placement="topLeft"
                          title="Estimated Months"
                          arrowPointAtCenter
                        >
                          <Input
                            placeholder="Estimated months"
                            value={ageMonth}
                            disabled
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
                      <Radio.Button value="pregnant">Pregnant</Radio.Button>
                      <Radio.Button value="not pregnant">
                        Not Pregnant
                      </Radio.Button>
                    </Radio.Group>
                  </ClearableFormItem>
                </Col>
              )}

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
                        .localeCompare((optionB?.label ?? "").toLowerCase())
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
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    onChange={(value) =>
                      handleLgaChange(value, "lgaOfResidence")
                    }
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
                        .localeCompare((optionB?.label ?? "").toLowerCase())
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
              <Col lg={8} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  label="Patient’s residential address "
                  name="patientResidentialAddress"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
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
                    options={AllSettlementTypeQuery?.data || []}
                    valueProperty="id"
                    labelProperty="value"
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
            </Row>
          </Panel>
        </Collapse>
        {getProgram()}
        {!["Yellow Fever", "NOMA", "Measles"].includes(program?.value) && (
          <ContactTracing form={form} />
        )}
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <ClearableFormItem form={form} className="gx-m-2">
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                {isLoading ? "Please wait" : "Submit"}
              </Button>
            </ClearableFormItem>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default App;
