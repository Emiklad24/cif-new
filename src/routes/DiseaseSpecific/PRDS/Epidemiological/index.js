import { Col, Input, Collapse, Row, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

const Epidemiological = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Epidemiological Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Vaccination status"
              name="vaccinationStatus"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please choose one!",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="vaccinationStatus"
              >
                <Radio.Button value="vaccinated">Vaccinated</Radio.Button>
                <Radio.Button value="notVaccinated">
                  Not Vaccinated
                </Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          {formValues?.vaccinationStatus === "vaccinated" && (
            <>
              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Number of COVID 19 doses"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "select an option!",
                    },
                  ]}
                  name="numberofCovidDoses"
                >
                  <Radio.Group buttonStyle="solid" name="numberofCovidDoses">
                    <Radio.Button value="1">1</Radio.Button>
                    <Radio.Button value="2">2</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>
              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Number of influenza doses"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="numberofinfluenzaDoses"
                  rules={[
                    {
                      required: true,
                      message: "select an Option!",
                    },
                  ]}
                >
                  <Radio.Group
                    buttonStyle="solid"
                    name="numberofinfluenzaDoses"
                  >
                    <Radio.Button value="1">1</Radio.Button>
                    <Radio.Button value="2">2</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>
              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label=" Date of first vaccination"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateFirstVaccination"
                >
                  <CustomDatePicker form={form} name="dateFirstVaccination" />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label=" Date of second vaccination"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateSecondVaccination" 
                >
                  <CustomDatePicker form={form} name="dateSecondVaccination" />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Have you returned from a local travel within the last 14 days?"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="returnedFromLocalTravel14Days"
              rules={[
                {
                  required: true,
                  message: "Please input the date!",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                name="returnedFromLocalTravel14Days"
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

          {formValues?.returnedFromLocalTravel14Days === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Location of local travel"
                  name="additionalTravelhistory"
                  rules={[
                    {
                      required: true,
                      message: "Please input the location!",
                    },
                  ]}
                >
                  <Input
                    placeholder="If yes specify"
                    name="additionalTravelhistory"
                    onChange={(e) =>
                      handleUpdateInputValues(e.target.name, e.target.value)
                    }
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Have you returned from international travel within the last 14 days?"
              name="returnedFromInternationalTravel14Days"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input the date!",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="returnedFromInternationalTravel14Days"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          {formValues?.returnedFromInternationalTravel14Days === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Location of international travel"
                  name="specifyReturnedFromInternationalTravel14Days"
                  rules={[
                    {
                      required: true,
                      message: "Please input the location!",
                    },
                  ]}
                >
                  <Input
                    placeholder="If yes, specify location"
                    name="specifyReturnedFromInternationalTravel14Days"
                    onChange={(e) =>
                      handleUpdateInputValues(e.target.name, e.target.value)
                    }
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="In the past 14 days, have you had contact with suspected or confirmed Covid-19?"
              name="contactWithSuspectedConfirmed"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input the contact details!",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="contactWithSuspectedConfirmed"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          {formValues?.contactWithSuspectedConfirmed === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Name of contact"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="specifycontactWithSuspectedConfirmed"
                  rules={[
                    {
                      required: true,
                      message: "Please input the date!",
                    },
                  ]}
                >
                  <Input
                    placeholder="If yes specify"
                    name="specifycontactWithSuspectedConfirmed"
                    onChange={(e) =>
                      handleUpdateInputValues(e.target.name, e.target.value)
                    }
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="In the past 14 days, have you attended an event?"
              name="attendedAnyEvent"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input the date!",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="attendedAnyEvent"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          {formValues?.attendedAnyEvent === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Location of event"
                  labelCol={{ span: 24 }}
                  name="specifyContactWithSuspectedConfirmed"
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Please input the date!",
                    },
                  ]}
                >
                  <Input
                    placeholder="If yes specify"
                    name="specifyContactWithSuspectedConfirmed"
                    onChange={(e) =>
                      handleUpdateInputValues(e.target.name, e.target.value)
                    }
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Have you visited or been admitted to any inpatient health facility?"
              name="admittedInpatient"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input the date!",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="admittedInpatient"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          {formValues?.admittedInpatient === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Name of inpatient health facility"
                  labelCol={{ span: 24 }}
                  name="specifyAdmittedInpatient"
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Please input the date!",
                    },
                  ]}
                >
                  <Input
                    placeholder="If yes specify"
                    name="specifyAdmittedInpatient"
                    onChange={(e) =>
                      handleUpdateInputValues(e.target.name, e.target.value)
                    }
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Have you visited any outpatient treatment facility?"
              name="visitOutpatient"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              
              rules={[
                {
                  required: true,
                  message: "Please input the date!",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="visitOutpatient"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          {formValues?.visitOutpatient === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Name of outpatient facility"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="specifyVisitOutpatient"
                  rules={[
                    {
                      required: true,
                      message: "Please input the date!",
                    },
                  ]}
                >
                  <Input
                    placeholder="If yes specify"
                    name="specifyVisitOutpatient"
                    onChange={(e) =>
                      handleUpdateInputValues(e.target.name, e.target.value)
                    }
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Present condition"
              name="presentCondition"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input the date!",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="Alive">Alive</Radio.Button>
                <Radio.Button value="Dead">Dead</Radio.Button>
                <Radio.Button value="Hospitalized">Hospitalized</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={24} md={24} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Pre-existing medical conditions"
              name="comobiditypreexistingMedicalConditions"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Checkbox.Group
                buttonStyle="solid"
                options={[
                  { label: "Asthma", value: "asthma" },
                  {
                    label: "Recurrent chest pain ",
                    value: "recurrent chest pain",
                  },
                  {
                    label: "Immuno-compromised conditions",
                    value: "Immuno-compromised conditions",
                  },
                  { label: "Heart disease", value: "heart disease" },
                ]}
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Does patient smoke?"
              name="patientSmoke"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Radio.Group
                buttonStyle="solid"
                name="patientSmoke"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Chronic liver disease?"
              name="chronicLiverDisease"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Radio.Group
                buttonStyle="solid"
                name="chronicLiverDisease"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Chronic renal disease?"
              name="chronicRenalDisease"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Radio.Group
                buttonStyle="solid"
                name="chronicRenalDisease"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="HIV/AIDS"
              name="hivAids"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Radio.Group
                buttonStyle="solid"
                name="hivAids"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Pregnancy?"
              name="pregnancy"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Radio.Group
                buttonStyle="solid"
                name="pregnancy"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Diabetes"
              name="diabetes"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Radio.Group
                buttonStyle="solid"
                name="diabetes"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
