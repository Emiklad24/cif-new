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
// import "styles/pages/form.less";
import moment from "moment";

const { Option } = Select;

const stateData = ["FCT", "Enugu"];
const facilityData = ["Federal Medical Center", "Jabi Clinic"];
const diseaseData = ["COVID-19", "Cholera", "Yellow Fever"];
const lgaData = {
  FCT: ["AMAC", "Bwari", "Kwali"],
  Enugu: ["Nsukka", "Enugu south", "Udi"],
};

const Epidemiological = () => {
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

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  console.log("form values", formValues);

  return (
    
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Epidemiological Information" key="1">
          <Row>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Have you Travelled within the Last 3 Weeks before becoming Ill"
                name="travelledWithinLastThreeweeks"
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
                  name="travelledWithinLastThreeweeks"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.travelledWithinLastThreeweeks === "yes" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Start Date"
                    name="startDateTraveled"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Select Start Date of Travel!",
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
                    label="End Date"
                    name="endDateTraveled"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Select End Date of Travel!",
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
                    label="State"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="stateOfTravel"
                    rules={[
                      {
                        required: true,
                        message: "Select State of Travel!",
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
                        <Option label={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="LGA"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="lgaOfTravel"
                    rules={[
                      {
                        required: true,
                        message: "Select Travel LGA!",
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
                        <Option label={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Travel Address"
                    name="clientTravelAddress"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Address Visited"
                      id="address"
                      name="address"
                      onChange={(e) => { }}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Contact with Rodent"
                name="contactRodent"
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
                label="Contact with Suspected or Confirmed Case"
                name="contactWithSuspectedConfirmedCase"
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
                  name="contactWithSuspectedConfirmedCase"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.contactWithSuspectedConfirmedCase === "yes" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Details of the case"
                    name="epidOrNameOfCase"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Epid Number or Name of case"
                      id="epidOrNameOfCase"
                      name="epidOrNameOfCase"
                      onChange={(e) => { }}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="In the last 3 Weeks did You Participate in any Form of Burial Rite"
                name="participateInBurialrite"
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
                label="Have you Visited or been Admitted to any Inpatient Health Facility"
                name="visitedOrAdmittedInpatient"
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
                  name="visitedOrAdmittedInpatient"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.visitedOrAdmittedInpatient ===
              "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Date of Visit or Admission?"
                      name="dateHospitalVisitOrAdmission"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Select Date of Visit or Admission!",
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
                      label="Address of Hospital Visited or Admitted in?"
                      name="addressHospitalVisitedOrAdmitted"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
                        placeholder="Enter Address"
                        id="addressHospitalVisitedOrAdmitted"
                        name="addressHospitalVisitedOrAdmitted"
                        onChange={(e) => { }}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Have you Visited any Outpatient Health Facility"
                name="visitOutpatient"
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
                  name="visitOutpatient"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.visitOutpatient ===
              "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Date of Visit"
                      name="dateHospitalVisit"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Select Date of Visit!",
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
                      label="Address of Hospital Visited"
                      name="addressHospitalVisited"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
                        placeholder="Enter Address"
                        id="addressHospitalVisited"
                        name="addressHospitalVisited"
                        onChange={(e) => { }}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Have you been Admitted in the Isolation ward?"
                name="admittedInTheIsolationWard"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                  name="admittedInTheIsolationWard"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.admittedInTheIsolationWard === "yes" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Name of Isolation Ward"
                    name="nameIsolationWard"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Isolation Ward Name"
                      id="nameIsolationWard"
                      name="nameIsolationWard"
                      onChange={(e) => { }}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date of admission?"
                    name="dateIsolationAdmission"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Select a Date!",
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
                    label="Date of Discharge"
                    name="dateDischarge"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Select a Date!",
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
                    label="Patient Outcome at Discharge"
                    name="patientOutcomeDischarge"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="Alive">Alive</Radio.Button>
                      <Radio.Button value="Dead">Dead</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>


              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Have You ever had a Laboratory Positive Result"
                name="hadLabPositiveResult"
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
                  name="hadLabPositiveResult"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>

            {formValues?.hadLabPositiveResult ===
              "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Date of Laboratory Positive Result"
                      name="dateLabPositiveResult"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Select Date Had Positive Result!",
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
                  </>
              )}
              </Row>

        </Panel>
      </Collapse>
  );
};
export default Epidemiological;
