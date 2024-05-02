import { Col, Collapse, DatePicker, Form, Input, Radio, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import "styles/pages/form.less";

const Epidemiological = ({ form }) => {
  const { Panel } = Collapse;
  const [isDatePickerDisabled] = useState(false);

  const onChange = (value) => {
    
  };

  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));

  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));

    if (
      formValues?.motherVaccinated === "no" ||
      formValues?.motherVaccinated === "unknown"
    ) {
      form.setFieldsValue({
        numberOfDoses: null,
      });
    }
    if (
      formValues?.motherReceivedAntenatalCare === "no" ||
      formValues?.motherReceivedAntenatalCare === "unknown"
    ) {
      form.setFieldsValue({
        locationOfAntenatalReceived: null,
      });
    }
    if (
      formValues?.locationOfBirth === "hospital" ||
      formValues?.locationOfBirth === "home trained attendant" ||
      formValues?.locationOfBirth === "home untrained attendant" ||
      formValues?.locationOfBirth === "home,no attendant" ||
      formValues?.locationOfBirth === "unknown" ||
      formValues?.locationOfBirth === "health center"
    ) {
      form.setFieldsValue({
        locationOfAntenatalReceived: null,
      });
    }
  };
  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Epidemiological Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Mother Vaccinated with TT"
              name="motherVaccinated"
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
                name="motherVaccinated"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          {formValues?.motherVaccinated === "yes" && (
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="If yes, number of doses"
                name="numberOfDoses"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Input
                  placeholder="Specify number of doses"
                  onChange={(e) => {}}
                  type="number"
                />
              </Form.Item>
            </Col>
          )}

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Date of last dose"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateOfLastDose"
              rules={[
                {
                  required: true,
                  message: "Select a date!",
                },
              ]}
            >
              <DatePicker
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="DD-MM-YYYY"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Source of Vaccination history"
              name="sourceOfVaccinationHistory"
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
                <Radio.Button value="card">Card</Radio.Button>
                <Radio.Button value="verbal">Verbal</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Vaccination status of mother prior to delivery"
              name="sourceOfVaccinationHistory"
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
                <Radio.Button value="up to date">Up to date</Radio.Button>
                <Radio.Button value="not up to date">
                  Not up to date
                </Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={24} md={24} sm={24}>
            <Form.Item
              label="Location of birth"
              name="locationOfBirth"
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
                name="locationOfBirth"
              >
                <Radio.Button value="hospital">Hospital</Radio.Button>
                <Radio.Button value="health center">Health center</Radio.Button>
                <Radio.Button value="home trained attendant">
                  Home trained attendant
                </Radio.Button>
                <Radio.Button value="home untrained attendant">
                  Home untrained attendant
                </Radio.Button>
                <Radio.Button value="home,no attendant">
                  home, no attendant
                </Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          {formValues.locationOfBirth === "hospital" && (
            <Col lg={24} md={24} sm={24}>
              <Form.Item
                label="If birth in institution, name of institution"
                name="nameOfBirthInstitution"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Input
                  placeholder="Specify institution of birth"
                  onChange={(e) => {}}
                  type="text"
                />
              </Form.Item>
            </Col>
          )}

          <Col lg={12} md={24} sm={24}>
            <Form.Item
              label="Cut cord with sterile blade"
              name="cutCordWithSterileBlade"
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

          <Col lg={12} md={24} sm={24}>
            <Form.Item
              label="Cord treated with anything"
              name="cordTreated"
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

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Describe Treatment"
              name="describeTreatment"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >
              <Input
                placeholder="Describe treatment"
                onChange={(e) => {}}
                type="text"
              />
            </Form.Item>
          </Col>

          <Col lg={12} md={24} sm={24}>
            <Form.Item
              label="Mother received antenatal care"
              name="motherReceivedAntenatalCare"
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
                name="motherReceivedAntenatalCare"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          {formValues?.motherReceivedAntenatalCare === "yes" && (
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="If yes, where ?"
                name="locationOfAntenatalReceived"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Input
                  placeholder="Specify location of antenatal care received"
                  onChange={(e) => {}}
                  type="text"
                />
              </Form.Item>
            </Col>
          )}

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="How many prenatal visits"
              name="numberOfPrenatalVisits"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >
              <Input
                placeholder="Specify number of prenatal visits"
                onChange={(e) => {}}
                type="number"
              />
            </Form.Item>
          </Col>

          <Col lg={12} md={24} sm={24}>
            <Form.Item
              label="Attended to by a Doctor ?"
              name="attendedByDoctor"
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

          <Col lg={12} md={24} sm={24}>
            <Form.Item
              label="Attended by a trained TBA/Midwife"
              name="attendedByTrainedTbaOrMidwife"
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
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
