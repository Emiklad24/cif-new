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
import moment from "moment";
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
import PRSD from "./PRSD";

const { Option } = Select;
const placeDetectedData = ["Health Facility", "Home", "IDP Camp", "NYSC Camp"];
const notifiesBy = ["Hospital Informant", "Community Informant", "Others"];
const stateData = ["FCT", "Enugu"];
const facilityData = ["Federal Medical Center", "Jabi Clinic"];
const occupationData = ["Business", "Public Health"];
const educationData = ["PHD", "Master"];
const diseaseData = [
  "Cholera",
  "Yellow Fever",
  "Yaw",
  "Anthrax",
  "AFP",
  "PRSD",
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

const lgaData = {
  FCT: ["AMAC", "Bwari", "Kwali"],
  Enugu: ["Nsukka", "Enugu south", "Udi"],
};

const App = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { stateList } = useSelector(({ common }) => common);

  const { Panel } = Collapse;

  const [lga, setLga] = useState([]);
  const [program, setProgram] = useState("");
  const [place_of_detection, setPlaceOfDetection] = useState("");
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);

  const [ageYear, setAgeYear] = useState(0);
  const [ageMonth, setAgeMonth] = useState(0);
  const [dateOfBirth, setBirthDate] = useState(null);
  const [isYearDisabled, setIsYearDisabled] = useState(false);

  const handleStateChange = (value) => {
    setLga(lgaData[value]);
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

  const onFinish = async (fieldsValue) => {
    console.log(fieldsValue);
  };

  const onChangeDisease = (value) => {
    setProgram(value);
    form.resetFields();
    setFormValues({});
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
    Dengue: <Dengue form={form} />,
    CSM: <CSM form={form} />,
    "Buruli Ulcer": <BuruliUlcer form={form} />,
    PRSD: <PRSD form={form} />,
    "Perinatal Death": <PerinatalDeath form={form} />,
    "Maternal Death": <MaternalDeath form={form} />,
    Covid19: <Covid19 form={form} />,
  };

  const getProgram = () => {
    if (program && componentMap.hasOwnProperty(program)) {
      return componentMap[program];
    }
    return null;
  };

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12} xs={24}>
          <ClearableFormItem
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Disease name"
            name="diseaseName"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
            initialValue={program}
          >
            <Select
              showSearch
              value={program}
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
              options={diseaseData.map((disease, i) => ({
                key: disease,
                label: disease,
                value: disease,
              }))}
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
                  <Select
                    showSearch
                    allowClear
                    optionLabelProp="label"
                    placeholder={<>&nbsp; Select State</>}
                    onChange={handleStateChange}
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
                    {stateData.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
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
                  <Select
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
                  >
                    {lga.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </ClearableFormItem>
              </Col>
              <Col lg={8} md={12} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="Ward of reporting"
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
                  <Select
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
                  >
                    {lga.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
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
                    <Select
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
                      // onChange={handleStateChange}
                    >
                      {facilityData.map((item) => (
                        <Option label={item} value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
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
                  <Select
                    showSearch
                    allowClear
                    optionLabelProp="label"
                    // onChange={handleStateChange}
                  >
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
                    <Radio.Button value="female">Female</Radio.Button>
                    <Radio.Button value="male">Male</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              {formValues?.sex === "female" && (
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
                  <Select
                    showSearch
                    allowClear
                    optionLabelProp="label"
                    placeholder={<>&nbsp; Select State</>}
                    onChange={handleStateChange}
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
                    {stateData.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
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
                  <Select
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
                  >
                    {lga.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </ClearableFormItem>
              </Col>
              <Col lg={8} md={12} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="Ward of residence"
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
                  <Select
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
                  >
                    {lga.map((item) => (
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
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="Urban">Urban</Radio.Button>
                    <Radio.Button value="Rural">Rural</Radio.Button>
                  </Radio.Group>
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
                  <Select placeholder="Select an option" allowClear>
                    {occupationData.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
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
                  <Select placeholder="Select an option" allowClear>
                    {educationData.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </ClearableFormItem>
              </Col>
            </Row>
          </Panel>
        </Collapse>
        {getProgram()}
        <ContactTracing form={form} />
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <ClearableFormItem form={form} className="gx-m-2">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </ClearableFormItem>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default App;
