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

const exposures = ["Yes", "No", "Unknown"];
const associated = ["Yes", "No", "Unknown"];
const sources = ["Yes", "No", "Unknown"];
const kindAnimals = ["Goat", "Sheep", "Dog", "Monkey", "Lion", "Beer"];
const probablePlace = ["Yes", "No", "Unknown"];
const contacts = ["Yes", "No", "Unknown"];
const route = ["Yes", "No", "Unknown"];
const doese = [1, 2, 3, 4, 5];


const Epidemiological = ({ form }) => {
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
      formValues?.vaccinatedWithAnthrax === "no" ||
      formValues?.vaccinatedWithAnthrax === "unknown"
    ) {
      form?.setFieldsValue({
        nameOfVaccine: "",
      });
    }
    if (
      formValues?.contactWithAnimalProduct === "no" ||
      formValues?.contactWithAnimalProduct === "unknown"
    ) {
      form?.setFieldsValue({
        whatKindOfAnimal: null,
      });
    }
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Epidemiological Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Vaccinated with anthrax vaccine"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="vaccinatedWithAnthrax"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          {formValues?.vaccinatedWithAnthrax === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label="If yes, name of vaccine"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    placeholder="Name of Vaccine"
                    name="nameOfVaccine"
                    onChange={(e) => {}}
                  />
                </Form.Item>
              </Col>
            </>
          )}
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Route of vaccine administration"
              name="routeOfVaccineAdministration"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                {route.map((item) => (
                  <Radio.Button value={item}>{item}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Number of anthrax vaccine doses"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="numberOfAnthraxVaccineDoses"
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
              >
                {doese.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Date of last vaccination"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateOfLastVaccination"
              rules={[
                {
                  required: true,
                  message: "Please select Type of Specimen",
                },
              ]}
            >
              <DatePicker
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="DD-MM-YYYY"
                id="dateOfLastVaccination"
                name="dateOfLastVaccination"
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Date of last booster dose"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateOfLastDose"
              rules={[
                {
                  required: true,
                  message: "Please select Type of Specimen",
                },
              ]}
            >
              <DatePicker
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="DD-MM-YYYY"
                id="dateOfLastDose"
                name="dateOfLastDose"
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Close contact with suspected or confirmed human case of anthrax"
              name="closeContactWithSuspectedOrConfirmedCase"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                {contacts.map((item) => (
                  <Radio.Button value={item}>{item}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Associated with an outbreak"
              name="associatedWithAnOutbreak"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                {associated.map((item) => (
                  <Radio.Button value={item}>{item}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Contact with animals or animal products"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="contactWithAnimalProduct"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          {formValues?.contactWithAnimalProduct === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label="If yes to above, what kind of animal?"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "If yes to above, what kind of animal?",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Option"
                    allowClear
                    name="whatKindOfAnimal"
                    onChange={(value) =>
                      handleUpdateInputValues("whatKindOfAnimal", value)
                    }
                  >
                    {kindAnimals.map((item) => (
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </>
          )}
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Most probable place of exposure to anthrax and contact"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="placeOfExposureToAnthrax"
              rules={[
                {
                  required: true,
                  message:
                    "Most probable place of exposure to Anthrax and contact",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                {probablePlace.map((item) => (
                  <Radio.Button value={item}>{item}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Source confirmed positive for anthrax"
              name="sourceConfirmedPositiveForAnthrax"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                {sources.map((item) => (
                  <Radio.Button value={item}>{item}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Human exposures in the 14 days before illness onset"
              name="humanExposures"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                {exposures.map((item) => (
                  <Radio.Button value={item}>{item}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
