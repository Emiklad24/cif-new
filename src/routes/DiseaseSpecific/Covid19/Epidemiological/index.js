import { Col, Input, Collapse, Row, Select, Radio, Divider } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";
const { Option } = Select;
const countryData = ["China", "United Kingdom", "USA", "India", "Ghana"];
const gatheringType = [
  "Burial",
  "Religious gathering",
  "Sport events",
  "Wedding",
  "Others",
];
const stateData = ["FCT", "Enugu"];
const vaccineType = [
  "Ad26.COV2.S",
  "Novavax",
  "Oxford–AstraZeneca",
  "Pfizer–BioNTech",
  "Sanofi-GSK",
  "Unknown",
];
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

  function transformToCamelCase(inputString) {
    const words = inputString.split(" ");
    const camelCaseString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    return camelCaseString;
  }

  const comorbidityOption = [
    { label: "Hypertension", value: "hypertension" },
    { label: "Diabetes", value: "diabetes" },
    { label: "Respiratory diseases", value: "respiratory diseases" },
    {
      label: "Immunocompromised conditions",
      value: "immunocompromised conditions",
    },
    { label: "Obesity", value: "obesity" },
    { label: "Chronic kidney disease", value: "Chronic kidney disease" },
    { label: "Liver diseases", value: "Liver disease" },
    { label: "Neurological conditions", value: "Neurological conditions" },
  ];
  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Epidemiological Information" key="1">
          <Row>
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                label="Vaccination status"
                name="vaccinationStatus"
                form={form}
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
                    <Select
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
                      options={vaccineType.map((vaccine) => ({
                        label: vaccine,
                        value: vaccine,
                      }))}
                    />
                  </ClearableFormItem>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="Number of vaccine doses"
                    form={form}
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
                    <Radio.Group
                      buttonStyle="solid"
                      name="numberofVaccineDoses"
                    >
                      <Radio.Button value="1">1</Radio.Button>
                      <Radio.Button value="2">2</Radio.Button>
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
                    name="dateOfFirstVaccination"
                  >
                    <CustomDatePicker
                      name="dateOfFirstVaccination"
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
                    name="dateOfSecondVaccination"
                  >
                    <CustomDatePicker
                      name="dateOfSecondVaccination"
                      form={form}
                    />
                  </ClearableFormItem>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                label="Have you returned from a local travel within the last 14 days?"
                labelCol={{ span: 24 }}
                form={form}
                setFormValues={setFormValues}
                name="returnedFromLocalTravel14Days"
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
                  name="returnedFromLocalTravel14Days"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </ClearableFormItem>
            </Col>

            {formValues?.returnedFromLocalTravel14Days === "yes" && (
              <Row>
                <Divider />
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="Start date for local travel"
                    form={form}
                    setFormValues={setFormValues}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="dateOfLocalTravelStart"
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <CustomDatePicker
                      name="dateOfLocalTravelStart"
                      form={form}
                    />
                  </ClearableFormItem>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="End date for local travel"
                    labelCol={{ span: 24 }}
                    form={form}
                    setFormValues={setFormValues}
                    wrapperCol={{ span: 24 }}
                    name="dateOfTravelEndLocal"
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <CustomDatePicker name="dateOfTravelEndLocal" form={form} />
                  </ClearableFormItem>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="State"
                    labelCol={{ span: 24 }}
                    form={form}
                    setFormValues={setFormValues}
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
                    label="LGA"
                    labelCol={{ span: 24 }}
                    form={form}
                    setFormValues={setFormValues}
                    wrapperCol={{ span: 24 }}
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
                      name="clientTravelAddress"
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
                    label="Travel address"
                    form={form}
                    setFormValues={setFormValues}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter address visited"
                      id="address"
                      name="clientTravelAddressLocal"
                      onChange={(e) => {}}
                    />
                  </ClearableFormItem>
                </Col>
                <Divider />
              </Row>
            )}

            <Col lg={24} md={24} sm={24}>
              <ClearableFormItem
                label="Have you returned from international travel within the last 14days"
                name="returnedFromnInternationalTravel14Days"
                form={form}
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
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                  name="returnedFromnInternationalTravel14Days"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </ClearableFormItem>
            </Col>

            {formValues?.returnedFromnInternationalTravel14Days === "yes" && (
              <Row>
                <Divider />
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="Start date for international travel"
                    name="dateOfInternationalTravelStart"
                    form={form}
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
                    <CustomDatePicker
                      name="dateOfInternationalTravelStart"
                      form={form}
                    />
                  </ClearableFormItem>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="End date for international travel"
                    name="dateOfInternationalTravelEnd"
                    form={form}
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
                    <CustomDatePicker
                      name="dateOfInternationalTravelEnd"
                      form={form}
                    />
                  </ClearableFormItem>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="Country"
                    form={form}
                    setFormValues={setFormValues}
                    name="countryOfTravel"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
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
                      placeholder={<>&nbsp; Select country</>}
                      name="countryOfTravel"
                    >
                      {countryData?.map((item) => (
                        <Option label={item} value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </ClearableFormItem>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="Town/City"
                    form={form}
                    setFormValues={setFormValues}
                    name="cityOfTravel"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
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
                      name="cityOfTravel"
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
                    label="Travel address"
                    name="clientTravelAddressInternational"
                    form={form}
                    setFormValues={setFormValues}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Address Visited"
                      id="address"
                      name="clientTravelAddressInternational"
                    />
                  </ClearableFormItem>
                </Col>
                <Divider />
              </Row>
            )}

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                label="In the past 14 days, have you had contact with suspected or confirmed Covid-19"
                name="contactWithSuspectedConfirmedCase"
                form={form}
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
                    label="Details of the case"
                    form={form}
                    setFormValues={setFormValues}
                    name="epidOrNameOfCase"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Epid Number or Name of case"
                      id="epidOrNameOfCase"
                      name="epidOrNameOfCase"
                      onChange={(e) => {}}
                    />
                  </ClearableFormItem>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                label="In the past 14 days, have you attended an event"
                name="attendedAnyEvent"
                form={form}
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
              <Row>
                <Divider />
                <Col lg={12} md={12} sm={12} xs={24}>
                  <ClearableFormItem
                    labelCol={{ span: 24 }}
                    name="gatheringType"
                    form={form}
                    setFormValues={setFormValues}
                    wrapperCol={{ span: 24 }}
                    label="Type of gathering"
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select gathering type"
                      name="gatheringType"
                      optionFilterProp="children"
                      // onChange={onChangeDisease}
                      // onSearch={onSearch}
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
                      options={gatheringType.map((disease) => ({
                        label: disease,
                        value: disease,
                      }))}
                    />
                  </ClearableFormItem>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="Start date"
                    form={form}
                    setFormValues={setFormValues}
                    name="startDateEvent"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <CustomDatePicker name="startDateEvent" form={form} />
                  </ClearableFormItem>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="End date"
                    form={form}
                    setFormValues={setFormValues}
                    name="endDateEvent"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <CustomDatePicker name="endDateEvent" form={form} />
                  </ClearableFormItem>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="State"
                    name="stateOfEvent"
                    form={form}
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
                    <Select
                      showSearch
                      allowClear
                      optionLabelProp="label"
                      placeholder={<>&nbsp; Select State</>}
                      name="stateOfEvent"
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
                    label="LGA"
                    form={form}
                    setFormValues={setFormValues}
                    name="lgaOfEvent"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
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
                      name="lgaOfEvent"
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
                    form={form}
                    setFormValues={setFormValues}
                    label="Description of event"
                    name="descriptionzOfEvent"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Describe event"
                      id="event"
                      name="descriptionzOfEvent"
                      onChange={(e) => {}}
                    />
                  </ClearableFormItem>
                </Col>
              </Row>
            )}

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                label="Have you visited or been admitted to any inpatient health facility"
                name="visitedOrAdmittedInpatient"
                form={form}
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
                    label="Date of visit or admission?"
                    form={form}
                    setFormValues={setFormValues}
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
                      name="dateHospitalVisitOrAdmission"
                      form={form}
                    />
                  </ClearableFormItem>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="Address of hospital visited or admitted in?"
                    form={form}
                    setFormValues={setFormValues}
                    name="addressHospitalVisitedOrAdmitted"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Address"
                      id="addressHospitalVisitedOrAdmitted"
                      name="addressHospitalVisitedOrAdmitted"
                      onChange={(e) => {}}
                    />
                  </ClearableFormItem>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                label="Have you visited any outpatient health facility"
                name="visitOutpatient"
                form={form}
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
                    label="Date of visit"
                    form={form}
                    setFormValues={setFormValues}
                    name="dateHospitalVisit"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <CustomDatePicker name="dateHospitalVisit" form={form} />
                  </ClearableFormItem>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="Address of hospital visited"
                    form={form}
                    setFormValues={setFormValues}
                    name="addressHospitalVisited"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Address"
                      id="addressHospitalVisited"
                      name="addressHospitalVisited"
                      onChange={(e) => {}}
                    />
                  </ClearableFormItem>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                label="Person outcome"
                form={form}
                setFormValues={setFormValues}
                name="personOutcome"
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
                  name="personOutcome"
                  onChange={(e) => {
                    handleUpdateInputValues(e.target.name, e.target.value);
                  }}
                >
                  <Radio.Button value="alive">Alive</Radio.Button>
                  <Radio.Button value="dead">Dead</Radio.Button>
                </Radio.Group>
              </ClearableFormItem>
            </Col>

            {formValues?.personOutcome === "dead" && (
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  label="Date of death"
                  name="dateOfDeathOutcome"
                  form={form}
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
                  <CustomDatePicker name="dateOfDeathOutcome" form={form} />
                </ClearableFormItem>
              </Col>
            )}

            <Divider>Co-morbidity</Divider>

            <Col span={24} className="gx-text-center"></Col>
            {comorbidityOption.map((el, i) => (
              <Col lg={8} md={12} sm={24} id={i} key={el.label}>
                <ClearableFormItem
                  label={el.label}
                  name={`comorbidity${transformToCamelCase(el.value)}`}
                  form={form}
                  setFormValues={setFormValues}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Radio.Group buttonStyle="solid" name={el.value}>
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="no">No</Radio.Button>
                    <Radio.Button value="unknown">Unknown</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>
            ))}
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default Epidemiological;
