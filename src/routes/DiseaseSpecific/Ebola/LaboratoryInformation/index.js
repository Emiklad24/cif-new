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

const nameOfTestingLaboratory = ["YDML", "NRL", "UNTH", "UBTH"];

const { Option } = Select;

const stateData = ["FCT", "Enugu"];
const facilityData = ["Federal Medical Center", "Jabi Clinic"];
const diseaseData = ["COVID-19", "Cholera", "Yellow Fever"];

const lgaData = {
  FCT: ["AMAC", "Bwari", "Kwali"],
  Enugu: ["Nsukka", "Enugu south", "Udi"],
};

const LaboratoryInformation = () => {
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

  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Laboratory information" key="1">
          <Row>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Sample Collected?"
                name="sampleCollected"
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

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date Specimen Collected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={sample_date ? moment(sample_date) : null}
                name="dateOfSampling"
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
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

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Type of Specimen collected?"
                name="typeOfSampleCollected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "tick single/multiple fields!",
                  },
                ]}
              >
                <CheckboxGroup
                  options={[
                    { label: "Swab", value: "swab" },
                    { label: "Blood", value: "blood" },
                    { label: "Saliva", value: "saliva" },
                    { label: "Skin Biopsy", value: "skin_biopsy" },
                  ]}
                  name="sample_type"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date specimen sent to laboratory"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={sample_date ? moment(sample_date) : null}
                name="dateSpecimenSent"
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
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

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date Laboratory Received Specimen"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={sample_date ? moment(sample_date) : null}
                name="dateLaboratoryReceivedSpecimen"
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
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

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Laboratory ID"
                name="laboratoryId"
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
                  placeholder="Laboratory ID"
                  id="id"
                  name="labId"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Specimen Condition"
                name="specimenCondition"
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
                  <Radio.Button value="adequateyes">Adequate</Radio.Button>
                  <Radio.Button value="notAdequate">Not adequate</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Name of Testing Laboratory"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="nameOfTestingLaboratory"
                rules={[
                  {
                    required: true,
                    message: "Select a laboratory!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  onChange={nameOfTestingLaboratory}
                >
                  {nameOfTestingLaboratory.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Specify Other Organisms Cultured"
                name="specifyOtherOrganismsCultured"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter name of organism"
                  id="organismName"
                  name="organismName"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="PCR Result"
                name="pcrResult"
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
                  <Radio.Button value="positive">Positive</Radio.Button>
                  <Radio.Button value="negative">Negative</Radio.Button>
                  <Radio.Button value="Indeterminate">
                    Indeterminate
                  </Radio.Button>
                  <Radio.Button value="pending">Pending</Radio.Button>
                  <Radio.Button value="notDone">Not done</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Why was sample not collected?"
                name="whySampleNotCollected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter Reason"
                  id="reason"
                  name="reason"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default LaboratoryInformation;
