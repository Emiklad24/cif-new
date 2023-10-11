import {
  Col,
  Form,
  Input,
  Collapse,
  DatePicker,
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
import { createCase, fetchStateList } from "appRedux/actions/Common";
import { useDispatch,useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

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
  const history = useHistory();
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

  console.log(stateList)

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

    let additionals = {};
    if (program === "Cholera") {
      additionals = {
        dateSpecimenCollected:
          fieldsValue["dateSpecimenCollected"].format("DD-MM-YYYY"),
        dateResultReleased:
          fieldsValue["dateResultReleased"].format("DD-MM-YYYY"),
        dateSpecimenTested:
          fieldsValue["dateSpecimenTested"].format("DD-MM-YYYY"),
        dateSpecimenSent: fieldsValue["dateSpecimenSent"].format("DD-MM-YYYY"),
        dateSpecimenReceivedStool:
          fieldsValue["dateSpecimenReceivedStool"].format("DD-MM-YYYY"),
        dateSpecimenReceivedRectalSwab:
          fieldsValue["dateSpecimenReceivedRectalSwab"].format("DD-MM-YYYY"),
        dateOfSymptomOnset:
          fieldsValue["dateOfSymptomOnset"].format("DD-MM-YYYY"),
        datePatientAdmittedAtLeastOneNight:
          fieldsValue["datePatientAdmittedAtLeastOneNight"].format(
            "DD-MM-YYYY"
          ),
        datePatientDischargedAtLeastOneNight:
          fieldsValue["datePatientDischargedAtLeastOneNight"].format(
            "DD-MM-YYYY"
          ),
      };
    } else if (program === "Lassa Fever") {
      additionals = {
        dateOfSymptomOnset:
          fieldsValue["dateOfSymptomOnset"].format("DD-MM-YYYY"),
        dateSpecimenCollected:
          fieldsValue["dateSpecimenCollected"].format("DD-MM-YYYY"),
        dateSampleSent: fieldsValue["dateSampleSent"].format("DD-MM-YYYY"),
        dateSpecimenReceived:
          fieldsValue["dateSpecimenReceived"].format("DD-MM-YYYY"),
        dateResultAvailable:
          fieldsValue["dateResultAvailable"].format("DD-MM-YYYY"),
        dateResultSentOut:
          fieldsValue["dateResultSentOut"].format("DD-MM-YYYY"),
        startDateTraveled:
          fieldsValue["startDateTraveled"].format("DD-MM-YYYY"),
        endDateTraveled: fieldsValue["endDateTraveled"].format("DD-MM-YYYY"),
        dateHospitalVisitOrAdmission:
          fieldsValue["dateHospitalVisitOrAdmission"].format("DD-MM-YYYY"),
        dateHospitalVisit:
          fieldsValue["dateHospitalVisit"].format("DD-MM-YYYY"),
        dateIsolationAdmission:
          fieldsValue["dateIsolationAdmission"].format("DD-MM-YYYY"),
        dateDischarge: fieldsValue["dateDischarge"].format("DD-MM-YYYY"),
        dateLabPositiveResult:
          fieldsValue["dateLabPositiveResult"].format("DD-MM-YYYY"),
      };
    } else if (program === "Anthrax") {
      additionals = {
        dateOfLastVaccination:
          fieldsValue["dateOfLastVaccination"].format("DD-MM-YYYY"),
        dateOfLastDose: fieldsValue["dateOfLastDose"].format("DD-MM-YYYY"),
        dateSeenAtHealthFacility:
          fieldsValue["dateSeenAtHealthFacility"].format("DD-MM-YYYY"),
        dateOfCaseInvestigation:
          fieldsValue["dateOfCaseInvestigation"].format("DD-MM-YYYY"),
        dateOfSymptomOnset:
          fieldsValue["dateOfSymptomOnset"].format("DD-MM-YYYY"),
        dateSpecimenCollected:
          fieldsValue["dateSpecimenCollected"].format("DD-MM-YYYY"),
      };
    } else if (program === "Buruli Ulcer") {
      additionals = {
        referralDate: fieldsValue["referralDate"].format("DD-MM-YYYY"),
        dateSpecimenCollected:
          fieldsValue["dateSpecimenCollected"].format("DD-MM-YYYY"),
        dateSpecimenSent: fieldsValue["dateSpecimenSent"].format("DD-MM-YYYY"),
        dateSpecimenReceived:
          fieldsValue["dateSpecimenReceived"].format("DD-MM-YYYY"),
        dateResultAvailable:
          fieldsValue["dateResultAvailable"].format("DD-MM-YYYY"),
        dateResultSent: fieldsValue["dateResultSent"].format("DD-MM-YYYY"),
      };
    } else if (program === "Yellow Fever") {
      additionals = {
        dateSpecimenCollected:
          fieldsValue["dateSpecimenCollected"].format("DD-MM-YYYY"),
        dateSpecimenSent: fieldsValue["dateSpecimenSent"].format("DD-MM-YYYY"),
        dateSpecimenReceivedBlood:
          fieldsValue["dateSpecimenReceivedBlood"].format("DD-MM-YYYY"),
        dateResultAvailableBlood:
          fieldsValue["dateResultAvailableBlood"].format("DD-MM-YYYY"),
        dateResultSentBlood:
          fieldsValue["dateResultSentBlood"].format("DD-MM-YYYY"),
        dateResultSentOutBlood:
          fieldsValue["dateResultSentOutBlood"].format("DD-MM-YYYY"),
        dateResultAvailable:
          fieldsValue["dateResultAvailable"].format("DD-MM-YYYY"),
        dateResultSentOut:
          fieldsValue["dateResultSentOut"].format("DD-MM-YYYY"),
        dateMicroscopyResultAvailableBlood:
          fieldsValue["dateMicroscopyResultAvailableBlood"].format(
            "DD-MM-YYYY"
          ),
        dateMicroscopyResultSentOutBlood:
          fieldsValue["dateMicroscopyResultSentOutBlood"].format("DD-MM-YYYY"),
        datepcrRtPcrResultResultAvailableBlood:
          fieldsValue["datepcrRtPcrResultResultAvailableBlood"].format(
            "DD-MM-YYYY"
          ),
        datecrRtPcrResultSentOutBlood:
          fieldsValue["datecrRtPcrResultSentOutBlood"].format("DD-MM-YYYY"),
        datefOnset: fieldsValue["datefOnset"].format("DD-MM-YYYY"),
      };

      
    } else if (program === "Covid19") {
      additionals = {
        dateOfSymptomOnset:
          fieldsValue["dateOfSymptomOnset"].format("DD-MM-YYYY"),
        dateSpecimenCollected:
          fieldsValue["dateSpecimenCollected"].format("DD-MM-YYYY"),
        dateSpecimenSent: fieldsValue["dateSpecimenSent"].format("DD-MM-YYYY"),
        dateSpecimenReceived:
          fieldsValue["dateSpecimenReceived"].format("DD-MM-YYYY"),
        dateResultAvailable:
          fieldsValue["dateResultAvailable"].format("DD-MM-YYYY"),
        dateResultSent: fieldsValue["dateResultSent"].format("DD-MM-YYYY"),
        selectDateOfFirstVaccination:
          fieldsValue["selectDateOfFirstVaccination"].format("DD-MM-YYYY"),
        selectDateSecondOfVaccination:
          fieldsValue["selectDateSecondOfVaccination"].format("DD-MM-YYYY"),
      };
    }
    else if (program === "CSM") {
      let _blood = fieldsValue['blood']
      let pcr_blood = fieldsValue['blood']['pcr']
      let rdt_blood = fieldsValue['blood']['rdt']
      let culture_blood = fieldsValue['blood']['culture']
      let _csf = fieldsValue['csf']
      let pcr_csf = fieldsValue['csf']['pcr']
      let rdt_csf = fieldsValue['csf']['rdt']
      let culture_csf = fieldsValue['csf']['culture']
      let _pcr, _rdt, _culture, _pcr_csf, _rdt_csf, _culture_csf = null


      if (pcr_csf) {
        _pcr_csf = {
          ...pcr_csf,
          'dateResultAvailable': pcr_csf['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': pcr_csf['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (rdt_csf) {
        _rdt_csf = {
          ...rdt_csf,
          'dateResultAvailable': rdt_csf['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': rdt_csf['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (culture_csf) {
        _culture_csf = {
          ...culture_csf,
          'dateResultAvailable': culture_csf['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': culture_csf['dateResultSent'].format('DD-MM-YYYY'),
        }
      }


      if (pcr_blood) {
        _pcr = {
          ...pcr_blood,
          'dateResultAvailable': pcr_blood['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': pcr_blood['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (rdt_blood) {
        _rdt = {
          ...rdt_blood,
          'dateResultAvailable': rdt_blood['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': rdt_blood['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (culture_blood) {
        _culture = {
          ...culture_blood,
          'dateResultAvailable': culture_blood['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': culture_blood['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      additionals = {
        // 'dateOfSymptomOnset': fieldsValue['dateOfSymptomOnset'].format('DD-MM-YYYY'),
        'dateSpecimenCollected': fieldsValue['dateSpecimenCollected'].format('DD-MM-YYYY'),
        'dateOfVaccination': fieldsValue['dateOfVaccination'].format('DD-MM-YYYY'),
        'dateSpecimenSent': fieldsValue['dateSpecimenSent'].format('DD-MM-YYYY'),
        'blood':{
                ..._blood,
                'dateSpecimenReceived': _blood['dateSpecimenReceived'].format('DD-MM-YYYY'),
                'pcr':_pcr,
                'rdt':_rdt,
                'culture':_culture
              },
        'csf':{
                ..._csf,
                'dateSpecimenReceived': _blood['dateSpecimenReceived'].format('DD-MM-YYYY'),
                'pcr':_pcr_csf,
                'rdt':_rdt_csf,
                'culture':_culture_csf
              },

      }
    }
    else if (program === "Mpox") {
      let _blood = fieldsValue['blood']
      let pcr_blood = fieldsValue['blood']['pcr']
      let seriology_blood = fieldsValue['blood']['seriology']
      let _swab = fieldsValue['swab']
      let pcr_swab = fieldsValue['swab']['pcr']
      let seriology_swab = fieldsValue['swab']['seriology']
      let _crust = fieldsValue['crust']
      let pcr_crust = fieldsValue['crust']['pcr']
      let seriology_crust = fieldsValue['crust']['seriology']
      let _pcr, _seriology, _pcr_swab, _seriology_swab, _pcr_crust, _seriology_crust  = null


      if (seriology_blood) {
        _seriology = {
          ...seriology_blood,
          'dateResultAvailable': seriology_blood['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': seriology_blood['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (pcr_blood) {
        _pcr = {
          ...pcr_blood,
          'dateResultAvailable': pcr_blood['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': pcr_blood['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (seriology_swab) {
        _seriology_swab = {
          ...seriology_swab,
          'dateResultAvailable': seriology_swab['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': seriology_swab['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (pcr_swab) {
        _pcr_swab = {
          ...pcr_swab,
          'dateResultAvailable': pcr_swab['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': pcr_swab['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (seriology_crust) {
        _seriology_crust = {
          ...seriology_crust,
          'dateResultAvailable': seriology_crust['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': seriology_crust['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (pcr_crust) {
        _pcr_crust = {
          ...pcr_crust,
          'dateResultAvailable': pcr_crust['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': pcr_crust['dateResultSent'].format('DD-MM-YYYY'),
        }
      }


      additionals = {
        'dateOfSymptomOnset': fieldsValue['dateOfSymptomOnset'].format('DD-MM-YYYY'),
        'dateSpecimenCollected': fieldsValue['dateSpecimenCollected'].format('DD-MM-YYYY'),
        'dateOfAnimalContact': fieldsValue['dateOfAnimalContact'].format('DD-MM-YYYY'),
        'dateOfFeverOnset': fieldsValue['dateOfFeverOnset'].format('DD-MM-YYYY'),
        'dateSpecimenSent': fieldsValue['dateSpecimenSent'].format('DD-MM-YYYY'),
        'blood':{
                ..._blood,
                'dateSpecimenReceived': _blood['dateSpecimenReceived'].format('DD-MM-YYYY'),
                'pcr':_pcr,
                'seriology':_seriology,
              },
        'swab':{
                ..._swab,
                'dateSpecimenReceived': _swab['dateSpecimenReceived'].format('DD-MM-YYYY'),
                'pcr':_pcr_swab,
                'seriology':_seriology_swab,
              },
        'crust':{
                ..._crust,
                'dateSpecimenReceived': _blood['dateSpecimenReceived'].format('DD-MM-YYYY'),
                'pcr':_pcr_crust,
                'seriology':_seriology_crust,
              },

      }
    }
    else if (program === "Diphtheria") {
      let _blood = fieldsValue['blood']
      let pcr_blood = fieldsValue['blood']['pcr']
      let seriology_blood = fieldsValue['blood']['seriology']
      let _swab = fieldsValue['swab']
      let pcr_swab = fieldsValue['swab']['pcr']
      let seriology_swab = fieldsValue['swab']['seriology']
      let _skinBiopsy = fieldsValue['skinBiopsy']
      let pcr_skinBiopsy = fieldsValue['skinBiopsy']['pcr']
      let seriology_skinBiopsy = fieldsValue['skinBiopsy']['seriology']
      let _pcr, _seriology, _pcr_swab, _seriology_swab, _pcr_skinBiopsy, _seriology_skinBiopsy  = null


      if (seriology_blood) {
        _seriology = {
          ...seriology_blood,
          'dateResultAvailable': seriology_blood['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': seriology_blood['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (pcr_blood) {
        _pcr = {
          ...pcr_blood,
          'dateResultAvailable': pcr_blood['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': pcr_blood['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (seriology_swab) {
        _seriology_swab = {
          ...seriology_swab,
          'dateResultAvailable': seriology_swab['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': seriology_swab['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (pcr_swab) {
        _pcr_swab = {
          ...pcr_swab,
          'dateResultAvailable': pcr_swab['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': pcr_swab['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (seriology_skinBiopsy) {
        _seriology_skinBiopsy = {
          ...seriology_skinBiopsy,
          'dateResultAvailable': seriology_skinBiopsy['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': seriology_skinBiopsy['dateResultSent'].format('DD-MM-YYYY'),
        }
      }
      if (pcr_skinBiopsy) {
        _pcr_skinBiopsy = {
          ...pcr_skinBiopsy,
          'dateResultAvailable': pcr_skinBiopsy['dateResultAvailable'].format('DD-MM-YYYY'),
          'dateResultSent': pcr_skinBiopsy['dateResultSent'].format('DD-MM-YYYY'),
        }
      }


      additionals = {
        'dateOfSymptomOnset': fieldsValue['dateOfSymptomOnset'].format('DD-MM-YYYY'),
        'dateSpecimenCollected': fieldsValue['dateSpecimenCollected'].format('DD-MM-YYYY'),
        'dateOfAnimalContact': fieldsValue['dateOfAnimalContact'].format('DD-MM-YYYY'),
        'dateOfFeverOnset': fieldsValue['dateOfFeverOnset'].format('DD-MM-YYYY'),
        'dateSpecimenSent': fieldsValue['dateSpecimenSent'].format('DD-MM-YYYY'),
        'blood':{
                ..._blood,
                'dateSpecimenReceived': _blood['dateSpecimenReceived'].format('DD-MM-YYYY'),
                'pcr':_pcr,
                'seriology':_seriology,
              },
        'swab':{
                ..._swab,
                'dateSpecimenReceived': _swab['dateSpecimenReceived'].format('DD-MM-YYYY'),
                'pcr':_pcr_swab,
                'seriology':_seriology_swab,
              },
        'crust':{
                ..._skinBiopsy,
                'dateSpecimenReceived': _blood['dateSpecimenReceived'].format('DD-MM-YYYY'),
                'pcr':_pcr_skinBiopsy,
                'seriology':_seriology_skinBiopsy,
              },

      }
    }
    const values = {
      ...fieldsValue,
      dateOfReport: fieldsValue["dateOfReport"].format("DD-MM-YYYY"),
      dateOfNotification:
        fieldsValue["dateOfNotification"].format("DD-MM-YYYY"),
      dateOfInvestigation:
        fieldsValue["dateOfInvestigation"].format("DD-MM-YYYY"),
      dateOfBirth: fieldsValue["dateOfBirth"].format("DD-MM-YYYY"),
      ...additionals,
    };
    console.log(values)

    await dispatch(createCase(values));
    setTimeout(() => {
      history.push("/disease_specific");
    }, 1000);
  };

  const onChangeDisease = (value) => {
    setProgram(value);
    form.resetFields();
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const getProgram = () => {
    if (program === "Yellow Fever") {
      return <YellowFever form={form} />;
    } else if (program === "Cholera") {
      return <Cholera form={form} />;
    } else if (program === "Yaw") {
      return <Yaw form={form} />;
    } else if (program === "Anthrax") {
      return <Anthrax form={form} />;
    } else if (program === "AFP") {
      return <AFP form={form} />;
    } else if (program === "Tetanus") {
      return <Tetanus form={form} />;
    } else if (program === "Rubella") {
      return <Rubella form={form} />;
    } else if (program === "NOMA") {
      return <NOMA form={form} />;
    } else if (program === "Mpox") {
      return <Mpox form={form} />;
    } else if (program === "Measles") {
      return <Measles form={form} />;
    } else if (program === "Lassa Fever") {
      return <LassaFever form={form} />;
    } else if (program === "Influenza") {
      return <Influenza form={form} />;
    } else if (program === "Guinea Worm") {
      return <GuineaWorm form={form} />;
    } else if (program === "Diphtheria") {
      return <Diphtheria form={form} />;
    } else if (program === "Ebola") {
      return <Ebola form={form} />;
    } else if (program === "Dengue") {
      return <Dengue form={form} />;
    } else if (program === "CSM") {
      return <CSM form={form} />;
    } else if (program === "Buruli Ulcer") {
      return <BuruliUlcer form={form} />;
    } else if (program === "Perinatal Death") {
      return <PerinatalDeath form={form} />;
    } else if (program === "Maternal Death") {
      return <MaternalDeath form={form} />;
    } else if (program === "Covid19") {
      return <Covid19 form={form} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12} xs={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Disease Name"
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
                key: i,
                label: disease,
                value: disease,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Collapse defaultActiveKey={["1"]} onChange={onChange}>
          <Panel header="Reporting Areas" key="1">
            <Row>
              <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date of Report"
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
                  <DatePicker
                    format="DD-MM-YYYY"
                    disabledDate={(current) =>
                      current.isAfter(moment()) || isDatePickerDisabled
                    }
                    style={{ width: "100%" }}
                    placeholder="DD-MM-YYYY"
                  />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Form.Item
                  label="State of Reporting"
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
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Form.Item
                  label="LGA of Reporting"
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
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Form.Item
                  label="Ward of Reporting"
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
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Form.Item
                  label="Place of Detection"
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
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {place_of_detection === "Health Facility" && (
                <Col lg={6} md={6} sm={12} xs={24}>
                  <Form.Item
                    label="Health Facility"
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
                        <Option label={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {(place_of_detection === "Home" ||
                place_of_detection === "IDP Camp" ||
                place_of_detection === "NYSC Camp") && (
                <Col lg={6} md={6} sm={24} xs={24}>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label="Place Description"
                    name="placeDescription"
                    rules={[
                      {
                        required: true,
                        message: "Please input patient id!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              )}
              <Col lg={6} md={6} sm={24} xs={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Epid Number"
                  name="epidNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input epid number!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Form.Item
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
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={24}>
                <Form.Item
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
                  <DatePicker
                    format="DD-MM-YYYY"
                    disabledDate={(current) =>
                      current.isAfter(moment()) || isDatePickerDisabled
                    }
                    style={{ width: "100%" }}
                    placeholder="DD-MM-YYYY"
                  />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date of Investigation"
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
                  <DatePicker
                    format="DD-MM-YYYY"
                    disabledDate={(current) =>
                      current.isAfter(moment()) || isDatePickerDisabled
                    }
                    style={{ width: "100%" }}
                    placeholder="DD-MM-YYYY"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={["1"]} onChange={onChange}>
          <Panel header="Patient Information" key="1">
            <Row>
              <Col lg={6} md={6} sm={24} xs={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Middle Name"
                  name="middleName"
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Patient/Caregiver Phone Number"
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
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date Of Birth"
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
                  <DatePicker
                    // format="DD-MM-YYYY"
                    onChange={onChangeDoB}
                    disabledDate={(current) =>
                      current.isAfter(moment()) || isDatePickerDisabled
                    }
                    style={{ width: "100%" }}
                    placeholder="DD-MM-YYYY"
                  />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={24}>
                <Form.Item
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
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Form.Item
                  label="State of Residence"
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
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Form.Item
                  label="LGA of Residence"
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
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Form.Item
                  label="Ward of Residence"
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
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Patient’s Residential address "
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
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Form.Item
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
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Form.Item
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
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <Form.Item
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
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Panel>
        </Collapse>
        {getProgram()}
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Form.Item className="gx-m-2">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default App;
