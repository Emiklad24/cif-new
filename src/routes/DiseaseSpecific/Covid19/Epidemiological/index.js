import {
  Col,
  Form,
  Input,
  Collapse, DatePicker,
  Row, Tooltip,
  Select, Radio,
} from 'antd';
import React, { useState } from 'react';
import "styles/pages/form.less";
import moment from "moment";
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group

const { Option } = Select;


const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const vaccineType = ['Ad26.COV2.S', 'Novavax', 'Oxford–AstraZeneca', 'Pfizer–BioNTech', 'Sanofi-GSK', 'Unknown'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
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
    console.log('Received values of form: ', values);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
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
    <>
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header="Epidemiological Information" key="1">
          <Row>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Vaccination Status"
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

                <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} name="vaccinationStatus" >
                  <Radio.Button value="vaccinated">Vaccinated</Radio.Button>
                  <Radio.Button value="notVaccinated">Not Vaccinated</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>
            {

              formValues?.vaccinationStatus === "vaccinated" &&
              (
                <>

                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      label="Vaccine Type"
                      name="vaccineType"
                      rules={[
                        {
                          required: true,
                          message: "Please select disease!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select a vaccine"
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
                        options={vaccineType.map((disease) => ({
                          label: disease,
                          value: disease,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Number of vaccine doses"
                      name="numberofVaccineDoses"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "select an Option!",
                        },
                      ]}
                    >

                      <Radio.Group buttonStyle="solid">
                        <Radio.Button value="1">1</Radio.Button>
                        <Radio.Button value="2">2</Radio.Button>
                      </Radio.Group>
                    </Form.Item>

                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label=" Date of first Vaccination"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      // initialValue={birth_date ? moment(birth_date) : null}
                      name="selectDateOfFirstVaccination"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Input the date!",
                    //   },
                    // ]}
                    >
                      <DatePicker
                        disabledDate={(current) =>
                          current.isAfter(moment()) || isDatePickerDisabled
                        }
                        style={{ width: "100%" }}
                        placeholder="DD-MM-YYYY"

                        name="selectDateOfVaccination"
                        onChange={(_, dateString) => handleUpdateInputValues("selectDateOfVaccination", dateString)}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label=" Date of Second Vaccination"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      // initialValue={birth_date ? moment(birth_date) : null}
                      name="selectDateSecondOfVaccination"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Input the date!",
                    //   },
                    // ]}
                    >
                      <DatePicker
                        disabledDate={(current) =>
                          current.isAfter(moment()) || isDatePickerDisabled
                        }
                        style={{ width: "100%" }}
                        placeholder="DD-MM-YYYY"

                        name="selectDateOfVaccination"
                        onChange={(_, dateString) => handleUpdateInputValues("selectDateOfVaccination", dateString)}
                      />
                    </Form.Item>
                  </Col>

                  

                </>
              )

            }





            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Have you returned from a local travel within the last 14 days"
                name="returnedFromLocalTravel14Days"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} name="returnedFromLocalTravel14Days" >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>

            {

              formValues?.returnedFromLocalTravel14Days === "yes" &&
              (
                <>

                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      labelCol={{ span: 24 }}
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
                        name="additionalTravelhistory"
                        onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)}
                      />

                    </Form.Item>

                  </Col>
                </>
              )

            }


            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Have you returned from internation travel within the last 14days"
                name="returnedFromnIternationalTravel14Days"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} name="returnedFromnIternationalTravel14Days">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>
            {

              formValues?.returnedFromnIternationalTravel14Days === "yes" &&
              (
                <>

                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      labelCol={{ span: 24 }}
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
                        name="specifyReturnedFromnIternationalTravel14Days"
                        onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)}
                      />

                    </Form.Item>

                  </Col>
                </>
              )

            }



            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="In the past 14 days, have you had contact with suspected or confirmed Covid-19"
                name="contactWithSuspectedConfirmed"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} name="contactWithSuspectedConfirmed">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>
            {

              formValues?.contactWithSuspectedConfirmed === "yes" &&
              (
                <>

                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      labelCol={{ span: 24 }}
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
                        name="specifycontactWithSuspectedConfirmed"
                        onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)}
                      />

                    </Form.Item>

                  </Col>
                </>
              )

            }



            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="In the past 14 days, have you attended an event"
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
                <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} name="attendedAnyEvent" >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>
            {

              formValues?.attendedAnyEvent === "yes" &&
              (
                <>

                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      labelCol={{ span: 24 }}
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
                        onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)}
                      />

                    </Form.Item>

                  </Col>
                </>
              )

            }



            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Have you visited or been admitted to any inpatient health facility"
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
                <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} name="admittedInpatient" >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>
            {

              formValues?.admittedInpatient === "yes" &&
              (
                <>

                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      labelCol={{ span: 24 }}
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
                        onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)}
                      />

                    </Form.Item>

                  </Col>
                </>
              )

            }



            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Have you visited any outpatient treatment facility"
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
                <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} name="visitOutpatient" >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>
            {

              formValues?.visitOutpatient === "yes" &&
              (
                <>

                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      labelCol={{ span: 24 }}
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
                        name="specifyVisitOutpatient"
                        onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)}
                      />

                    </Form.Item>

                  </Col>
                </>
              )

            }

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Person Outcome"
                name="personOutcome"
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
              </Form.Item>

            </Col>

            <Col lg={24} md={24} sm={24}>
              <Form.Item
                label="Comorbidity??"
                name="comobidity"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Checkbox.Group buttonStyle="solid"
                  options={

                    [
                      { label: 'Hypertension', value: 'hypertension' },
                      { label: 'Diabetes ', value: 'diabetes' },
                      { label: 'Respiratory diseases ', value: 'respiratory_diseases' },
                      { label: 'Immunocompromised conditions', value: 'Immunocompromised conditions' },
                      { label: 'Obesity ', value: 'obesity' },
                      { label: 'Chronic kidney disease', value: 'Chronic kidney disease' },
                      { label: 'Liver diseases ', value: 'Liver disease' },
                      { label: 'Neurological conditions ', value: 'Neurological conditions' },
                    ]
                  }

                />
              </Form.Item>
            </Col>


          </Row>
        </Panel>
      </Collapse>


    </>
  );
};
export default Epidemiological;
