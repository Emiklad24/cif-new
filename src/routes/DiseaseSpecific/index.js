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

  const [age_year, setAgeYear] = useState(0);
  const [age_month, setAgeMonth] = useState(0);
  const [dateOfBirth, setBirthDate] = useState(null);
  const [isYearDisabled, setIsYearDisabled] = useState(false);

  const handleStateChange = (value) => {
    setLga(lgaData[value]);
  };

  /**
   * @function getDoBFromAge
   * @param {String} '1970-01-01'
   * @return {Object} {'53', '4'}
   */
  const getDoBFromAge = (arg) => {
    const dob = new Date(arg);
    const today = new Date();
    let ageYear = today.getFullYear() - dob.getFullYear();
    let ageMonth = today.getMonth() - dob.getMonth();

    if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < dob.getDate())) {
      ageYear--;
      ageMonth += 12;
    }

    return { ageYear, ageMonth };
  };

  /**
   * @function onChangeDoB
   * @description when the datepicker has a date calculate the year and month and update the fields and disable the year field else set them to empty and enable the year field
   */
  const onChangeDoB = (date, dateString) => {
    if (date) {
      const today = moment();
      const age = today.diff(date, "years");
      setAgeYear(age);
      setIsYearDisabled(true);
    } else {
      setAgeYear(null);
      setIsYearDisabled(false);
    }

    const { ageMonth } = getDoBFromAge(dateString);
    setBirthDate(dateString);
    setAgeMonth(ageMonth);
  };

  /**
   * @function onChangeYear
   * @description when the year field has a year calculate the date for the datepicker disable the datepicker field else set it to empty and enable the datepicker field
   */
  const onChangeYear = (e) => {
    const year = e.target.value;
    setAgeYear(year);
    if (year) {
      const calculatedDate = moment()
        .subtract(year, "years")
        .set({ month: 0, date: 1 });
      form.setFieldsValue({ dateOfBirth: calculatedDate });
      setBirthDate(calculatedDate.format("YYYY-MM-DD"));
      setIsDatePickerDisabled(true);
      setAgeMonth(0);
      return;
    }
    form.setFieldsValue({ dateOfBirth: null });
    setIsDatePickerDisabled(false);
  };

  useEffect(() => {
    dispatch(fetchStateList());
  }, [dispatch]);

  const onChangeMonth = (e) => {
    console.log(e.target);
  };

  const onChange = () => {
    console.log("Received values of form:");
  };

  const onFinish = async (fieldsValue) => {
    console.log(fieldsValue);
  };

  const onChangeDisease = (value) => {
    setProgram(value);
    form.resetFields();
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
                message: "Please select disease!",
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
              <Col lg={6} md={6} sm={24}>
                <ClearableFormItem
                  form={form}
                  label="Date of report"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  // initialValue={birth_date ? moment(birth_date) : null}
                  name="dateOfReport"
                  rules={[
                    {
                      required: true,
                      message: "Please input the date!",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateOfReport" />
                </ClearableFormItem>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="State of reporting"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="stateOfReporting"
                  rules={[
                    {
                      required: true,
                      message: "Please input the reporting state!",
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
              <Col lg={6} md={6} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="LGA of reporting"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="lgaOfReporting"
                  rules={[
                    {
                      required: true,
                      message: "Please input the reporting LGA!",
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
              <Col lg={6} md={6} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="Ward of reporting"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="wardOfReporting"
                  rules={[
                    {
                      required: true,
                      message: "Please input the reporting Ward!",
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
              <Col lg={6} md={6} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="Place of detection"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="placeOfDetection"
                  rules={[
                    {
                      required: true,
                      message: "Please select an option !",
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
                <Col lg={6} md={6} sm={12} xs={24}>
                  <ClearableFormItem
                    form={form}
                    label="Health facility"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="placeOfDetectionFacility"
                    rules={[
                      {
                        required: true,
                        message: "Please select option!",
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
                <Col lg={6} md={6} sm={24} xs={24}>
                  <ClearableFormItem
                    form={form}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label="Place description"
                    name="placeDescription"
                    rules={[
                      {
                        required: true,
                        message: "Please input patient id!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </ClearableFormItem>
                </Col>
              )}
              <Col lg={6} md={6} sm={24} xs={24}>
                <ClearableFormItem
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Epid number"
                  name="epidNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input epid number!",
                    },
                  ]}
                >
                  <Input size="large" />
                </ClearableFormItem>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="Notified by"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="notifiedBy"
                  rules={[
                    {
                      required: true,
                      message: "Please select",
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
              <Col lg={6} md={6} sm={24}>
                <ClearableFormItem
                  form={form}
                  label="Date of notification"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  // initialValue={birth_date ? moment(birth_date) : null}
                  name="dateOfNotification"
                  rules={[
                    {
                      required: true,
                      message: "Please input the date!",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateOfNotification" />
                </ClearableFormItem>
              </Col>
              <Col lg={6} md={6} sm={24}>
                <ClearableFormItem
                  form={form}
                  label="Date of investigation"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  // initialValue={birth_date ? moment(birth_date) : null}
                  name="dateOfInvestigation"
                  rules={[
                    {
                      required: true,
                      message: "Please input the date!",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateOfInvestigation" />
                </ClearableFormItem>
              </Col>
            </Row>
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={["1"]} onChange={onChange}>
          <Panel header="Patient Information" key="1">
            <Row>
              <Col lg={6} md={6} sm={24} xs={24}>
                <ClearableFormItem
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="First name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name",
                    },
                  ]}
                >
                  <Input size="large" />
                </ClearableFormItem>
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
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
              <Col lg={6} md={6} sm={24} xs={24}>
                <ClearableFormItem
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Last name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name",
                    },
                  ]}
                >
                  <Input size="large" />
                </ClearableFormItem>
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                <ClearableFormItem
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Patient/Caregiver phone number"
                  // initialValue={phone}
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input phone number",
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
              <Col lg={6} md={6} sm={24}>
                <ClearableFormItem
                  form={form}
                  label="Date of birth"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  initialValue={
                    dateOfBirth !== null ? moment(dateOfBirth) : null
                  }
                  name="dateOfBirth"
                  rules={[
                    {
                      required: true,
                      message: "Please input the date of birth!",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateOfBirth" />
                </ClearableFormItem>
              </Col>
              <Col lg={6} md={6} sm={24}>
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
                          title="Estimated Years"
                          arrowPointAtCenter
                        >
                          <Input
                            value={age_year}
                            onChange={onChangeYear}
                            placeholder="Estimated Years"
                            disabled={isYearDisabled}
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
                            value={age_month}
                            placeholder="Estimated Months"
                            onChange={onChangeMonth}
                            // disabled
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  </Input.Group>
                </ClearableFormItem>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="State of residence"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="stateOfResidence"
                  rules={[
                    {
                      required: true,
                      message: "Please input the residence state!",
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
              <Col lg={6} md={6} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="LGA of residence"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="lgaOfResidence"
                  rules={[
                    {
                      required: true,
                      message: "Please input the residence LGA!",
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
              <Col lg={6} md={6} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="Ward of residence"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="wardOfResidence"
                  rules={[
                    {
                      required: true,
                      message: "Please input the residence Ward!",
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
              <Col lg={6} md={6} sm={24}>
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
              <Col lg={6} md={6} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="Settlement type"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="settlementType"
                  rules={[
                    {
                      required: true,
                      message: "Please input the facility address!",
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="Urban">Urban</Radio.Button>
                    <Radio.Button value="Rural">Rural</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="Occupation"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="occupation"
                  rules={[
                    {
                      required: true,
                      message: "Please input the facility Type!",
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
              <Col lg={6} md={6} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  label="Education"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="education"
                  rules={[
                    {
                      required: true,
                      message: "Please input the facility Type!",
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
