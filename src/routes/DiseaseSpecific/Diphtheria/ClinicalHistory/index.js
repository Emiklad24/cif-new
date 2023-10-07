import {
  Col,
  Form,
  Input,
  Collapse,
  DatePicker,
  Row,
  Tooltip,
  Select,
  Radio,
} from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import moment from "moment";
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

const { Option } = Select;

const stateData = ["FCT", "Enugu"];
const facilityData = ["Federal Medical Center", "Jabi Clinic"];
const diseaseData = ["COVID-19", "Cholera", "Yellow Fever"];

const lgaData = {
  FCT: ["AMAC", "Bwari", "Kwali"],
  Enugu: ["Nsukka", "Enugu south", "Udi"],
};

const ClinicalHistory = () => {
  const [form] = Form.useForm();
  const [lga, setLga] = useState([]);
  const { Panel } = Collapse;
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);

  const handleStateChange = (value) => {
    setLga(lgaData[value]);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const [patientFevervalue, setPatientFevervalue] = useState(""); // Store the selected value in state

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  console.log("form values", formValues);

  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Clinical history: Sign and Symptoms" key="1">
          <Row>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Fever (≥38 °C)"
                name="fever"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date Of Fever Onset"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={feveronset_date ? moment(feveronset_date) : null}
                name="dateOfFeverOnset"
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
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
            
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date Seen at the Health Facility"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={hf_visit_date ? moment(visit_date) : null}
                name="dateOfVisitToHealthFacility"
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Neck swelling"
                name="neckSwelling"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Pharyngitis/Tonsilitis"
                name="pharyngitisTonsilitis"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Presence of Adherent pseudo-membrane ?"
                name="presenceOfAdherentPseudoMembrane"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Location of adherent pseudo-membrane?"
                name="locationOfAdherentPseudoMembrane"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <CheckboxGroup
                  options={[
                    { label: "Throat", value: "throat" },
                    { label: "Pharynx", value: "pharynx" },
                    { label: "Larynx", value: "larynx" },
                  ]}
                  name="locationAdherentPseudoMembrane"
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Laryngitis"
                name="laryngitis"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Bleeding (from orifices)"
                name="bleeding"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="skin leisions"
                name="skinLeisions"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Others (Specify)"
                name="others"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter other symptoms"
                  id="specifyOthers"
                  name="specifyOthers"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of symptom onset"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateOfOnset"
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date Health facility Notified LGA"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateHealthFacilityNotifiedLga"
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of hopsitalization"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateOfHospitalization"
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Antibiotics administered"
                name="antibioticsAdministered"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Name antibiotics"
                name="nameAntibiotics"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter name of antibiotics"
                  id="address"
                  name="antibioticsName"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of first dose"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={birth_date ? moment(first_dose_date) : null}
                name="dateOfFirstDose"
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Antitoxin Administered?"
                name="antitoxinAdministered"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of antitoxin"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={birth_date ? moment(first_dose_date) : null}
                name="date_of_antitoxin"
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default ClinicalHistory;
