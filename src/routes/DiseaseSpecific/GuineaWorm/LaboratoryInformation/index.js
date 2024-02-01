import {
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import "styles/pages/form.less";

const { Option } = Select;

const typeSpecimen = [
  "Blood",
  "Swab",
  "Body Fluid",
  "Tissue",
  "Stool",
  "Others",
];
const specimen = ["Adequate", "Inadequate"];
const tests = ["Serology", "Culture", "Others"];
const gwTests = ["Positive", "Negative", "Not done"];
const refLabs = [
  "National Veterinary Research Institute (NVRI) Vom Jos, Plateau State",
  "National Reference Laboratory Gaduwa, Abuja",
  "Central Public Health Lab (CPHL), Yaba Lagos",
];

const LaboratoryInformation = ({ form }) => {
  // const [form] = Form.useForm();
  const { Panel } = Collapse;
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));

  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));

    if (
      formValues?.specimenPreserved === "yes" ||
      formValues?.specimenPreserved === "indeterminate"
    ) {
      form?.setFieldsValue({
        specify: "",
      });
    }
    if (formValues?.typeOfSpecimen !== "Others") {
      form?.setFieldsValue({
        specifyIfOthers: "",
      });
    }
  };

  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Laboratory information" key="1">
          <Row>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Was a specimen (worm) saved and preserved in alcohol?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                  name="specimenPreserved"
                >
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            {formValues?.specimenPreserved === "No" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="If No, Why?"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="If No, Why?"
                      name="ifNoWhy"
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                </Col>
              </>
            )}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date of specimen collection"
                name="dateSpecimenCollection"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateSpecimenCollection"
                  name="dateSpecimenCollection"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Type of Specimen"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please select Type of Specimen",
                  },
                ]}
              >
                <Select
                  placeholder="Select Option"
                  allowClear
                  name="typeOfSpecimen"
                  onChange={(value) =>
                    handleUpdateInputValues("typeOfSpecimen", value)
                  }
                >
                  {typeSpecimen.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {formValues?.typeOfSpecimen === "Others" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Specify"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Specify"
                      name="specifyIfOthers"
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                </Col>
              </>
            )}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date Specimen sent to lab"
                name="dateSpecimenLab"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateSpecimenLab"
                  name="dateSpecimenLab"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date lab received specimen"
                name="dateSpecimenReceive"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateSpecimenReceive"
                  name="dateSpecimenReceive"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Specimen condition"
                name="specimenCondition"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  {specimen.map((item) => (
                    <Radio.Button value={item}>{item}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Type of Test"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="typeOfTest"
                rules={[
                  {
                    required: true,
                    message: "Please select Type of Test",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  {tests.map((item) => (
                    <Radio.Button value={item}>{item}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="If No/Indeterminate, Date Specimen sent to Reference lab for confirmation"
                name="dateSpecimenSentForConfirmation"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateSpecimenSentForConfirmation"
                  name="dateSpecimenSentForConfirmation"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Name of Reference Lab Specimen was sent"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="nameReferenceLabSpecimen"
                rules={[
                  {
                    required: true,
                    message:
                      "Please select Name of Reference Lab Specimen was sent",
                  },
                ]}
              >
                <Select
                  placeholder="Select Option"
                  allowClear
                  name="nameReferenceLabSpecimen"
                >
                  {refLabs.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Guinea Worm Test Result"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="guineaWormTestResult"
                rules={[
                  {
                    required: true,
                    message: "Please select Guinea Worm Test Result",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  {gwTests.map((item) => (
                    <Radio.Button value={item}>{item}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date confirmatory lab result sent out"
                name="dateConfirmatoryLabResult"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateConfirmatoryLabResult"
                  name="dateConfirmatoryLabResult"
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
