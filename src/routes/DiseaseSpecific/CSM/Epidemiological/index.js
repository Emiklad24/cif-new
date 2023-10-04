import {
  Col,
  Form,
  Input,
  Collapse, DatePicker, Segmented,
  Row, Tooltip,
  Select, Radio,
} from 'antd';
import React, { useState } from 'react';
import "styles/pages/form.less";
import moment from "moment";
// const [value, setValue] = useState('Map');
//   return <Segmented options={['Map', 'Transit', 'Satellite']} value={value} onChange={setValue} />;

const { Option } = Select;

const stateData = ['FCT', 'Enugu'];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const Epidemiological = () => {

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

    console.log(inputName, value)

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value

    }))


  }

  console.log('form values', formValues)


  return (
    <>

      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header="Epidemiological Information" key="1">
          <Row>



            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Patient Ever Received Any Meningococaal Vaccine?"
                name="patientEverReceivedAnyMeningococalVaccine"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an Option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} name="patientEverReceivedAnyMeningococalVaccine" >
                 <Radio.Button value="vaccinated">Vaccinated</Radio.Button>
                  <Radio.Button value="notVaccinated">Not Vaccinated</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>

            {
              formValues?.patientEverReceivedAnyMeningococalVaccine === "vaccinated" &&
              (
                <>

                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label=" Date of Vaccination"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      // initialValue={birth_date ? moment(birth_date) : null}
                      name="selectDateOfVaccination"
                      rules={[
                        {
                          required: true,
                          message: "Input the date!",
                        },
                      ]}
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
                        <Radio.Button value="3">3</Radio.Button>
                        <Radio.Button value="4">4</Radio.Button>
                      </Radio.Group>
                    </Form.Item>

                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Source of Vaccination History"
                      name="sourceOfVaccinationHistory"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Select an Option ",
                        },
                      ]}
                    >
                      <Radio.Group buttonStyle="solid">
                        <Radio.Button value="card">Card</Radio.Button>
                        <Radio.Button value="verbal">Verbal</Radio.Button>
                        <Radio.Button value="no">No</Radio.Button>
                      </Radio.Group>
                    </Form.Item>

                  </Col>

                </>
              )

            }

            {
              formValues?.vaccinationStatus === "notVaccinated" &&

              (

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="If not vaccinated, indicate reason"
                    name="noVaccine"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Enter Reason ",
                      },
                    ]}
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="religious_exemption"> Religious_Exemption</Radio.Button>
                      <Radio.Button value="medical_contraindication">Medical_Contraindication</Radio.Button>
                      <Radio.Button value="under_age">Under_age</Radio.Button>
                      <Radio.Button value="parental_refusal">Parental_Refusal</Radio.Button>
                      <Radio.Button value="unknown">Unknown</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                </Col>
              )
            }

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="History of travel in the last 10 days "
                name="travelInLast10Days"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Enter Travel History ",
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

            ``

            <Col lg={6} md={6} sm={24}>
              <Form.Item
                label="If yes to above, where?"
                name="travelLocation"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}

              >
                <Input
                  placeholder="Enter Address"
                  id="addresstravel"
                  name="travelAddress"
                  onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)}
                />
              </Form.Item>
            </Col>


            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Have you had contact with anyone with similar symptoms/confirmed case in the last 10 days"
                name="contactWithAnyoneWithSymtomsOrConfirmed"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an Option ",
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

            <Col lg={6} md={6} sm={24}>
              <Form.Item
                label="Location Of Contact(s)"
                name="contactLocation"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Enter Contact Location ",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Contact Location"
                  id="contact"
                  name="contactLocation"
                  onChange={(e) => {
                  }}
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
