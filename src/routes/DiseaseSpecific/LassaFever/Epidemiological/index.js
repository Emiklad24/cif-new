import { Col, Input, Collapse, Row, Select, Radio } from "antd";
import React, { useState } from "react";
// import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

const { Option } = Select;

const stateData = ["FCT", "Enugu"];
const lgaData = {
  FCT: ["AMAC", "Bwari", "Kwali"],
  Enugu: ["Nsukka", "Enugu south", "Udi"],
};

const Epidemiological = ({ form }) => {
  const [lga, setLga] = useState([]);
  const { Panel } = Collapse;

  const handleStateChange = (value) => {
    setLga(lgaData[value]);
  };

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
              label="Have you travelled within the last 3 weeks before becoming ill?"
              name="travelledWithinLastThreeweeks"
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
                name="travelledWithinLastThreeweeks"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.travelledWithinLastThreeweeks === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Travel start date"
                  name="startDateTraveled"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="startDateTraveled" />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Travel end date"
                  name="endDateTraveled"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="endDateTraveled" />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="State"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="stateOfTravel"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear
                    optionLabelProp="label"
                    placeholder={<>&nbsp; Select State</>}
                    onChange={handleStateChange}
                  >
                    {stateData.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </ClearableFormItem>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="LGA"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="lgaOfTravel"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear
                    optionLabelProp="label"
                    placeholder={<>&nbsp; Select LGA</>}
                  >
                    {lga.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </ClearableFormItem>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Travel address"
                  name="clientTravelAddress"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    placeholder="Enter address visited"
                    id="address"
                    name="address"
                    onChange={(e) => {}}
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Contact with rodent(rat)?"
              name="contactRodent"
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
                name="contactRodent"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.contactRodent === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Did you hunt any rodent(rat) in the last three weeks before becoming ill? "
                  name="huntAnyRodent"
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
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Did you eat any rodent(Rat) in the last three weeks before becoming ill? "
                  name="eatAnyRodent"
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
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Have you noticed any rodent(rat) or rodent's urine/faeces around the house? "
                  name="noticedRodentOrRodentUrineOrFaeces"
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
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Do you or your family dry foodstuffs in the open? "
                  name="dryFoodstuffsInTheOpen"
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
                  </Radio.Group>
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Contact with suspected or confirmed case?"
              name="contactWithSuspectedConfirmedCase"
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
                name="contactWithSuspectedConfirmedCase"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.contactWithSuspectedConfirmedCase === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Details of the case"
                  name="nameOrAddressOfCase"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    placeholder="Enter name or address of case"
                    id="nameOrAddressOfCase"
                    name="nameOrAddressOfCase"
                    onChange={(e) => {}}
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
              name="visitedOrAdmittedInpatient"
              labelCol={{ span: 27 }}
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
                name="visitedOrAdmittedInpatient"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.visitedOrAdmittedInpatient === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Date of visit or admission"
                  name="dateHospitalVisitOrAdmission"
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
                    name="dateHospitalVisitOrAdmission"
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Name/address of health facility visited or admitted in"
                  name="nameorAddressOfHealthFacilityVisitedOrAdmitted"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    placeholder="Enter name/Address"
                    id="nameorAddressOfHealthFacilityVisitedOrAdmitted"
                    name="nameorAddressOfHealthFacilityVisitedOrAdmitted"
                    onChange={(e) => {}}
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Have you visited any outpatient health facility?"
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
                  label="Date of visit"
                  name="dateOutpatientVisit"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateOutpatientVisit" />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Name/address of outpatient health facility visited"
                  name="nameOrAddressOfOutpatientHealthFacilityVisited"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    placeholder="Enter Name/Address"
                    id="nameOrAddressOfOutpatientHealthFacilityVisited"
                    name="nameOrAddressOfOutpatientHealthFacilityVisited"
                    onChange={(e) => {}}
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="In the last 3 weeks did you participate in any form of burial rite?"
              name="participateInBurialrite"
              labelCol={{ span: 27 }}
              wrapperCol={{ span: 24 }}
              colon={false}
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
              setFormValues={setFormValues}
              form={form}
              label="Have you ever had a laboratory positive result?"
              name="hadLabPositiveResult"
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
                name="hadLabPositiveResult"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.hadLabPositiveResult === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Date of laboratory positive result"
                  name="dateLabPositiveResult"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <CustomDatePicker form={form} name="dateLabPositiveResult" />
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
                  message: "This field is required",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="presentCondition"
              >
                <Radio.Button value="alive">Alive</Radio.Button>
                <Radio.Button value="dead">Dead</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.presentCondition === "dead" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Where did the patient die?"
                  name="wherePatientDied"
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
                    <Radio.Button value="diedAtHome">Died at home</Radio.Button>
                    <Radio.Button value="diedAtHealthFacility">
                      Died at health facility
                    </Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Mode of burial"
                  name="modeOfBurial"
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
                    <Radio.Button value="safe">Safe</Radio.Button>
                    <Radio.Button value="unsafe">Unsafe</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>
            </>
          )}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
