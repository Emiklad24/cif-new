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

const { Option } = Select;

const signs = ["Blister", "Itching", "Swelling", "Others"];
const emergence = ["Yes", "No", "Unknown"];
const firstGuinea = ["Yes", "No", "Unknown"];
const caseDetected = ["Yes", "No", "Unknown"];
const education = ["Yes", "No", "Unknown"];
const waters = ["Yes", "No", "Unknown"];
const placeManage = ['CCC', 'Home','Health Center','Hospitals'];


const ClinicalHistory = () => {
  const [form] = Form.useForm();
  //const [lga, setLga] = useState([]);
  const { Panel } = Collapse;
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);

  // const handleStateChange = (value) => {
  //   setLga(lgaData[value]);
  // };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Clinical history: Sign and Symptoms" key="1">
          <Row>
            <Col lg={10} md={10} sm={24}>
              <Form.Item
                label="First sign/symptom before the emergence of worm"
                name="firstSignSymptom"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  {signs.map((item) => (
                    <Radio.Button value={item}>{item}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Specify"
                name="clientaddress"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Specify"
                  id="specify"
                  name="specify"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            <Col lg={6} md={6} sm={24}>
              <Form.Item
                label="Emergence of Guinea Worm"
                name="firstOfGuineaWorm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                {emergence.map((item) => (
                    <Radio.Button value={item}>{item}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Number of Worms"
                name="NumberOfWorms"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Number of Worms"
                  id="no_worms"
                  name="no_worms"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Is this the first Guinea Worm emerged this year?"
                name="isThisTheFirstGuineaWorm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  {firstGuinea.map((item) => (
                    <Radio.Button value={item}>{item}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date the First guinea worm emerged"
                name="dateTheFirstGuineaWormEmerged"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateTheFirstGuineaWormEmerged"
                  name="dateTheFirstGuineaWormEmerged"
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Was the case detected before Worm emerged?"
                name="wasTheCaseDetectedBefore"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  {caseDetected.map((item) => (
                    <Radio.Button value={item}>{item}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Received any Health Education?"
                name="healthEducation"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  {education.map((item) => (
                    <Radio.Button value={item}>{item}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Patient entered any Water Source?"
                name="waterSource"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  {waters.map((item) => (
                    <Radio.Button value={item}>{item}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={9} md={9} sm={24}>
              <Form.Item
                label="Place Managed"
                name="placeManaged"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  {placeManage.map((item) => (
                    <Radio.Button value={item}>{item}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={9} md={9} sm={24}>
              <Form.Item
                label="Name of Health Facility/Health Center/Other Centers if patient was hospitalized"
                name="name_of_health_facility"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Name of Health Facility/Health Center/Other"
                  id="nameOfHealthFacility"
                  name="nameOfHealthFacility"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            <Col lg={6} md={6} sm={24}>
              <Form.Item
                label="Admission Date"
                name="admission_date"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="admissionDate"
                  name="admissionDate"
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Discharged Date"
                name="discharged_date"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dischargedDate"
                  name="dischargedDate"
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Location of Worm?"
                name="worm_location"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Location of Worm?"
                  id="wormLocation"
                  name="wormLocation"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date Worm detected"
                name="date_worm_detected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateWormDetected"
                  name="dateWormDetected"
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date Worm completely expelled"
                name="dateWormExpelled"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateWormExpelled"
                  name="dateWormExpelled"
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
