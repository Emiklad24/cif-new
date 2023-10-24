/* eslint-disable no-unused-vars */
import { Col, Collapse, Row, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
// import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

const Epidemiological = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Epidemiological Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Exposure details known"
              name="exposureDetails"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label=" Activity details"
              name="activityDetails"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Living or working in an area with high risk of transmission"
              name="livingOrWorkingInHighRiskEnvironment"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Residing or traveled to areas with high risk"
              name="areasWithHighRisk"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Contact with source case known"
              name="contactWithSourceCase"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {/* <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
            form={form}
            setFormValues={setFormValues}
              label="Vaccination status"
              name="vaccinationStatus"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                name="vaccinationStatus"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col> */}

          {/* {formValues?.vaccinationStatus === "yes" && (
            <>
              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                  label="Vaccination dose"
                  name="vaccinationDose"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Radio.Group
                    buttonStyle="solid"
                    name="vaccinationDose"
                    onChange={(e) =>
                      handleUpdateInputValues(e.target.name, e.target.value)
                    }
                  >
                    <Radio.Button value="firstDose">First Dose</Radio.Button>
                    <Radio.Button value="secondDose">Second Dose</Radio.Button>
                    <Radio.Button value="thirdDose">Third Dose</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                  label="Name of vaccine"
                  name="vaccinationName"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Name of Vaccine" />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                  label="Date of vaccine"
                  name="vaccinationDate"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker
                  form={form}
                  name="vaccinationDate"
                    
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
            form={form}
            setFormValues={setFormValues}
              label="Travel history"
              name="travelHistory"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                name="travelHistory"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.travelHistory === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                  label="Name of village where the patient fell ill"
                  name="villageName"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Input placeholder="Name of Village" />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                  label="Did the patient travel anytime in the three weeks before becoming ill"
                  name="patientTravelInThreeWeeks"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Radio.Group
                    buttonStyle="solid"
                    name="patientTravelInThreeWeeks"
                  >
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="no">No</Radio.Button>
                    <Radio.Button value="unknown">Unknown</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
            form={form}
            setFormValues={setFormValues}
              label="Contact history"
              name="contactHistory"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                name="contactHistory"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.contactHistory === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                  label="Did the patient travel during illness"
                  name="patientTravelIll"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid" name="patientTravelIll">
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="no">No</Radio.Button>
                    <Radio.Button value="unknown">Unknown</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              <Col lg={24} md={24} sm={24}>
                <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                  label="During the three weeks preceding the onset of symptoms, did the patient have contact with one or more persons who had with similar symptoms"
                  name="travelWithinThreeWeeksPreceeding"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Radio.Group
                    buttonStyle="solid"
                    name="travelWithinThreeWeeksPreceeding"
                  >
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="no">No</Radio.Button>
                    <Radio.Button value="unknown">Unknown</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                  label="Date of contact"
                  name="contactDate"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker
                  form={form}
                  name="contactDate"
                    
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
            form={form}
            setFormValues={setFormValues}
              label="Risk factors"
              name="riskFactors"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input placeholder="risk factors" />
            </ClearableFormItem>
          </Col> */}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
