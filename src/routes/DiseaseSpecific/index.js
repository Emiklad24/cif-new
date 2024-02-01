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
import { fetchStateList } from "appRedux/actions/Common";
import ContactTracing from "components/ContactTracing/ContactTracing";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import DynamicSelect from "components/Custom/DynamicSelect";
import { SORMAS_ROLE, SORMAS_UUID, USER_ROLE } from "constants/ActionTypes";
import GenerateEpid from "constants/JSON/GenerateEpid.json";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import useFetchAllStates from "hooks/useFetchAllStates.hooks";
import useFetchAllLGA from "hooks/useFetchLga.hook";
import useFetchWard from "hooks/useFetchWard.hook";
import useGetAllSettlementType from "hooks/useGetAllSettlementType.hook";
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

const placeDetectedData = ["Health Facility", "Home", "IDP Camp", "NYSC Camp"];
const notifiesBy = ["Hospital Informant", "Community Informant", "Others"];

const App = () => {
  const dispatch = useDispatch();

  const { labFormName } = useFormStore(
    useShallow((state) => ({
      labFormName: state.labFormName,
    }))
  );
  const [form] = Form.useForm();
  const { loading, sormasCase } = useSelector(({ common }) => common);
  const { error, isSuccess, isLoading, mutate } = usePostFormData();

  const [componentDisabled, setComponentDisabled] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLga, setSelectedLga] = useState(null);
  const [program, setProgram] = useState("");
  const [place_of_detection, setPlaceOfDetection] = useState("");
  const [ageYear, setAgeYear] = useState(0);
  const [ageMonth, setAgeMonth] = useState(0);
  const [epidNumberIsDisabled, setEpidNumberIsDisabled] = useState(false);
  const [residenceLga, setResidenceLga] = useState("");
  const [epidNumberAddon, setEpidNumberAddon] = useState("");
  // const [formValues, setFormValues] = useState({});
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));

  const urlParams = new URLSearchParams(window.location.search);
  const sormasCaseUuid = urlParams.get(SORMAS_UUID);
  const userRoleFromUrl = urlParams.get(SORMAS_ROLE);

  const { data: allLookup, isLoading: allLookupLoading } = useFetchAllLookup();
  const { data: allStates } = useFetchAllStates();
  const lgaOfReportingQuery = useFetchAllLGA(selectedState?.stateOfReporting);
  const lgaOfResidenceQuery = useFetchAllLGA(selectedState?.stateOfResidence);
  const wardQuery = useFetchWard(selectedLga?.lgaOfReporting);
  const wardOfResidenceQuery = useFetchWard(selectedLga?.lgaOfResidence);
  const AllHealthFacilitiesQuery = useGetHealthFacilities();
  const AllSettlementTypeQuery = useGetAllSettlementType(
    allLookup?.settlement_type
  );

  /**
   * -----------------------------------------
   * @function handleStateChange
   * @description Handle state change
   */
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
  // -----------------------------------------

  /**
   * -----------------------------------------
   * @function handleLgaChange
   * @description Handle LGA change
   */
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

  /**
   * -----------------------------------------
   * @function getDoBFromAge
   * @description Get date of birth from age
   */
  const getDoBFromAge = (dateString) => {
    if (dateString) {
      const formattedDate =
        typeof dateString === "string"
          ? dateString
          : moment(dateString).format("DD-MM-YYYY");
      // Assuming arg is in the format DD-MM-YYYY
      const parts = formattedDate.split("-");
      // if (parts.length !== 3) {
      //   throw new Error("Invalid date format. Please use DD-MM-YYYY.");
      // }

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
   * -----------------------------------------
   * @function onFinish
   * @description On finish submit form
   */
  const isUpdate = sormasCaseUuid && sormasCase?.applicationUuid;
  const onFinish = async (fieldsValue) => {
    setFormIsLoading(true);

    // Attach epidAddOn to epidNumber if epidNumber is not empty
    if (fieldsValue.epidNumber) {
      fieldsValue.epidNumber = `${epidNumberAddon}${fieldsValue.epidNumber}`;
    }

    // construct payload
    const reconstructedPayload = await constructPayload(
      fieldsValue,
      program?.id,
      labFormName
    );

    try {
      // Update or create sormas case
      const updateAction = isUpdate
        ? updateSormasCaseAction(sormasCaseUuid, { ...reconstructedPayload })
        : createSormasCaseAction({ ...reconstructedPayload });

      const response = await dispatch(updateAction);

      notification.success({
        message: response?.message ?? "Success",
        description: isUpdate
          ? "Case updated successfully"
          : "Case created successfully",
      });

      if (!isUpdate) resetForm();
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

    if (!reset) return;
    resetForm();
  };

  const resetForm = () => {
    setSelectedLga(null);
    setSelectedState(null);
    setFormValues({});
    setAgeYear(0);
    setAgeMonth(0);
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
    PRDS: <PRDS form={form} />,
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

    handleStateChange(sormasCase.stateOfResidence, "stateOfResidence");
    handleLgaChange(sormasCase.lgaOfResidence, "lgaOfResidence");
    handleStateChange(sormasCase.stateOfReporting, "stateOfReporting");
    handleLgaChange(sormasCase.lgaOfReporting, "lgaOfReporting");
    onChangeDisease(sormasCase?.diseaseName, false);

    getDoBFromAge(sormasCase?.dateOfBirthPersonalInformation);
    form.setFieldsValue({
      ...sormasCase,
      specimenCollected: sormasCase?.specimenCollected || "NO",
    });

    if (sormasCase?.epidNumber) {
      setEpidNumberAddon(sormasCase?.epidNumber?.slice(0, -3));
      form.setFieldsValue({
        epidNumber: sormasCase?.epidNumber?.split("-")[4],
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

  useEffect(() => {
    dispatch(fetchStateList());
    getDoBFromAge(formValues?.dateOfBirthPersonalInformation);
  }, [dispatch, formValues]);

  useEffect(() => {
    populateForm();
  }, [sormasCase]);

  useEffect(() => {
    if (!sormasCaseUuid) {
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?role=edit`
      );
      return;
    }
    dispatch(getSormasCaseAction(sormasCaseUuid));
  }, [sormasCaseUuid]);

  useEffect(() => {
    if (!userRoleFromUrl) return;
    dispatch(setUserRole(userRoleFromUrl));
    if (userRoleFromUrl === USER_ROLE.EDIT) {
      setComponentDisabled(false);
    } else {
      setComponentDisabled(true);
    }
  }, [userRoleFromUrl]);

  useEffect(() => {
    if (residenceLga === "") return;
    generateEpidNumberVal();
  }, [residenceLga, program]);

  const onChange = () => {};
  const onSearch = () => {};

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12} xs={24}>
          <DynamicSelect
            showSearch
            value={program?.value}
            placeholder="Select a disease"
            optionFilterProp="children"
            onChange={(e) => onChangeDisease(e, true)}
            onSearch={onSearch}
            allowClear
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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
          />
        </Col>
      </Row>

      {sormasCaseUuid && !sormasCase?.applicationUuid ? (
        <div className="card_loading_container">
          <div className="card_loading gx-shadow">
            <div className="spinner" /> Populating Form ....
          </div>
        </div>
      ) : (
        <Form
          form={form}
          name="register"
          disabled={componentDisabled}
          onFinish={onFinish}
          scrollToFirstError
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
                      onChange={(value) => {
                        handleLgaChange(value, "lgaOfReporting");
                      }}
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
                <Button
                  loading={formIsLoading}
                  type="primary"
                  htmlType="submit"
                  disabled={isLoading}
                >
                  {formIsLoading
                    ? isUpdate
                      ? "Updating Case ..."
                      : "Creating Case ..."
                    : isUpdate
                    ? "Update Case"
                    : "Create Case"}
                </Button>
              </ClearableFormItem>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};
export default App;
