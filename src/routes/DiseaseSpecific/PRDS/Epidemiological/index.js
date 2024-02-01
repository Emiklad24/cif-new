import { Col, Collapse, Divider, Input, Radio, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import DynamicSelect from "components/Custom/DynamicSelect";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import React, { useState } from "react";
import "styles/pages/form.less";

const Epidemiological = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));
  const { data: allLookup } = useFetchAllLookup();

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
              label="Influenza vaccination status"
              name="vaccinationStatusInfluenza"
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
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="vaccinationStatusInfluenza"
              >
                <Radio.Button value="vaccinated">Vaccinated</Radio.Button>
                <Radio.Button value="notVaccinated">
                  Not Vaccinated
                </Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="COVID-19 vaccination status"
              name="vaccinationStatusCovid"
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
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="vaccinationStatusCovid"
              >
                <Radio.Button value="vaccinated">Vaccinated</Radio.Button>
                <Radio.Button value="notVaccinated">
                  Not Vaccinated
                </Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.vaccinationStatusInfluenza === "vaccinated" && (
            <Row>
              <Divider/>
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
                      message: "This field is required",
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
                  name="dateFirstVaccinationInfluenza"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker
                    form={form}
                    name="dateFirstVaccinationInfluenza"
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label=" Date of second vaccination"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateSecondVaccinationInfluenza"
                >
                  <CustomDatePicker
                    form={form}
                    name="dateSecondVaccinationInfluenza"
                  />
                </ClearableFormItem>
              </Col>
            </Row>
          )}

          {formValues?.vaccinationStatusCovid === "vaccinated" && (
            <Row>
              <Divider/>
              <Col lg={12} md={12} sm={12} xs={24}>
                <ClearableFormItem
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Vaccine type"
                  name="vaccineType"
                  form={form}
                  setFormValues={setFormValues}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <DynamicSelect
                    showSearch
                    placeholder="Select a vaccine"
                    optionFilterProp="children"
                    name="vaccineType"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        ?.toLowerCase()
                        .localeCompare(optionB.children?.toLowerCase())
                    }
                    valueProperty="id"
                    labelProperty="value"
                    options={allLookup?.vaccine_type || []}
                  />
                </ClearableFormItem>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  label="Number of vaccine doses"
                  form={form}
                  name="numberofCovidVaccineDoses"
                  setFormValues={setFormValues}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid" name="numberofCovidVaccineDoses">
                    <Radio.Button value="1">1</Radio.Button>
                    <Radio.Button value="2+">2+</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>



              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  label=" Date of first vaccination"
                  labelCol={{ span: 24 }}
                  form={form}
                  setFormValues={setFormValues}
                  wrapperCol={{ span: 24 }}
                  name="dateOfFirstVaccinationCovid"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker
                    name="dateOfFirstVaccinationCovid"
                    form={form}

                  />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  label=" Date of second vaccination"
                  form={form}
                  setFormValues={setFormValues}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateOfSecondVaccinationCovid"
                >
                  <CustomDatePicker
                    name="dateOfSecondVaccinationCovid"
                    form={form}
                  />
                </ClearableFormItem>
              </Col>
              <Divider/>
            </Row>
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
                  message: "This field is required",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
                name="returnedFromLocalTravel14Days"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.returnedFromLocalTravel14Days === "YES" && (
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
                      message: "This field is required",
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
                  message: "This field is required",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
                name="returnedFromInternationalTravel14Days"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>
          {formValues?.returnedFromInternationalTravel14Days === "YES" && (
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
                      message: "This field is required",
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
                  message: "This field is required",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
                name="contactWithSuspectedConfirmed"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>
          {formValues?.contactWithSuspectedConfirmed === "YES" && (
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
                      message: "This field is required",
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
                  message: "This field is required",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
                name="attendedAnyEvent"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>
          {formValues?.attendedAnyEvent === "YES" && (
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
                      message: "This field is required",
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
                  message: "This field is required",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
                name="admittedInpatient"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>
          {formValues?.admittedInpatient === "YES" && (
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
                      message: "This field is required",
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
                  message: "This field is required",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="visitOutpatient"
              />
            </ClearableFormItem>
          </Col>
          {formValues?.visitOutpatient === "YES" && (
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
                      message: "This field is required",
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
              label="Outcome"
              name="outcome"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                labelProperty="value"
                valueProperty="id"
                options={allLookup?.present_condition_type || []}
                name="outcome"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.outcome === "DEAD" && (
            <Col lg={8} md={8} sm={24}>
              <ClearableFormItem
                setFormValues={setFormValues}
                form={form}
                label="Date of date"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
                name="dateOfDeathOutcom"
              >
                <CustomDatePicker form={form} name="dateOfDeathOutcom" />
              </ClearableFormItem>
            </Col>
          )}

          <Col lg={24} md={24} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Pre-existing medical conditions"
              name="comobiditypreexistingMedicalConditions"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group
                buttonStyle="solid"
                name="comobiditypreexistingMedicalConditions"
              >
                <Radio.Button value="asthma">Asthma</Radio.Button>
                <Radio.Button value="recurrent chest pain">
                  Recurrent chest pain
                </Radio.Button>
                <Radio.Button value="Immuno-compromised conditions">
                  Immuno-compromised conditions
                </Radio.Button>
                <Radio.Button value="heart disease">Heart disease</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Does patient smoke?"
              name="patientSmoke"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_type || []}
                labelProperty="value"
                valueProperty="id"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="patientSmoke"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Chronic liver disease?"
              name="chronicLiverDisease"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_type || []}
                labelProperty="value"
                valueProperty="id"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="chronicLiverDisease"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Chronic renal disease?"
              name="chronicRenalDisease"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_type || []}
                labelProperty="value"
                valueProperty="id"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="chronicRenalDisease"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="HIV/AIDS"
              name="hivAids"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_type || []}
                labelProperty="value"
                valueProperty="id"
                name="hivAids"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Pregnancy?"
              name="pregnancy"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_type || []}
                labelProperty="value"
                valueProperty="id"
                name="pregnancy"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Diabetes"
              name="diabetes"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_type || []}
                labelProperty="value"
                valueProperty="id"
                name="diabetes"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
