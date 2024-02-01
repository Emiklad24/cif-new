import {
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
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
const conTest = [
  "Positive",
  "Negative",
  "Indeterminate",
  "Not done",
  "Pending",
];
const infections = [
  "Cutaneous Anthrax",
  "Inhalation Anthrax",
  "Gastrointestinal Anthrax",
  "Injection Anthrax",
];
const refLabs = [
  "National Veterinary Research Institute (NVRI) Vom Jos, Plateau State",
  "National Reference Laboratory Gaduwa, Abuja",
  "Central Public Health Lab (CPHL), Yaba Lagos",
];

const LaboratoryInformation = ({ form }) => {
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

    if (formValues?.typeOfSpecimen !== "Others") {
      form?.setFieldsValue({
        otherspecimen: "",
      });
    }
    if (
      formValues?.hasSentinelLab === "yes" ||
      formValues?.hasSentinelLab === "indeterminate"
    ) {
      form?.setFieldsValue({
        dateSpecimenSentForConfirmation: null,
      });
    }
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
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
              label="Type of specimen"
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
                  label="Other specify"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    placeholder="Enter other specimen"
                    name="otherspecimen"
                    onChange={(e) => {}}
                  />
                </Form.Item>
              </Col>
            </>
          )}
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Date specimen sent to lab"
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
              label="Date sentinel lab received specimen"
              name="dateSentinelReceiveSpecimen"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="DD-MM-YYYY"
                id="dateSentinelReceiveSpecimen"
                name="dateSentinelReceiveSpecimen"
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
              label="Type of test"
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
              label="Has sentinel lab ruled out anthrax?"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please select",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="hasSentinelLab"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="indeterminate">Indeterminate</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          {formValues?.hasSentinelLab === "no" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label="If no/indeteGITrminate, date specimen sent to reference lab for confirmation"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <DatePicker
                    format="DD-MM-YYYY"
                    disabledDate={(current) =>
                      current.isAfter(moment()) || isDatePickerDisabled
                    }
                    style={{ width: "100%" }}
                    placeholder="DD-MM-YYYY"
                    name="dateSpecimenSentForConfirmation"
                    onChange={(_, dateString) =>
                      handleUpdateInputValues(
                        "dateSpecimenSentForConfirmation",
                        dateString
                      )
                    }
                  />
                </Form.Item>
              </Col>
            </>
          )}
          {/* {
            formValues?.hasSentinelLab === 'indeterminate' &&
            (
              <>
                <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="If no/indeteGITrminate, date specimen sent to reference lab for confirmation"
                      name="dateSpecimenSentForConfirmation"
                      labelCol={{span: 24}}
                      wrapperCol={{span: 24}}
                    >
                      <DatePicker
                      format="DD-MM-YYYY"
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{width: "100%"}}
                      placeholder="DD-MM-YYYY"
                      id="dateSpecimenSentForConfirmation"
                      name="dateSpecimenSentForConfirmation"
                      onChange={(_, dateString) => handleUpdateInputValues("dateSpecimenSentForConfirmation", dateString)}
                      />
                    </Form.Item>
                </Col>
              </>
            )
          } */}
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Name of reference lab specimen was sent"
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
              label="Anthrax confirmatory test result:"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="anthraxConfirmatoryTestResult"
              rules={[
                {
                  required: true,
                  message: "Please select Anthrax confirmatory test result:",
                },
              ]}
            >
              <Select
                placeholder="Select Option"
                allowClear
                name="anthraxConfirmatoryTestResult"
              >
                {conTest.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Definitive characterization of infection"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="characterizationOfInfection"
              rules={[
                {
                  required: true,
                  message: "Please select",
                },
              ]}
            >
              <Select
                placeholder="Select Option"
                allowClear
                name="characterizationOfInfection"
              >
                {infections.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
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
  );
};
export default LaboratoryInformation;
