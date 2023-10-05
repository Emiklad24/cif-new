import {
  Col,
  Form,
  Input,
  Collapse, DatePicker,
  Row, Tooltip,
  Select, Radio,
} from 'antd';
import React, {useState} from 'react';
import "styles/pages/form.less";
import moment from "moment";

const {Option} = Select;

const signs = [ 'Fever', 
 'Headache',
 'Skin lesions',
 'Chest Discomfort',
 'Shortness of breath', 
 'Confusion or dizziness', 
 'Cough',
 'Nausea',
 'Bloody vomiting',
'Stomach pains',
 'Sweats (often drenching)',
 'Extreme tiredness',
 'Body aches',
 'Swelling of neck or neck glands',
 'Sore throat',
'Painful swallowing',
'Hoarseness of voice',
'Diarrhea or bloody diarrhea',
'Flushing (red face) and red eyes',
'Fainting', 
'Swelling of the abdomen (stomach)',
'Black Eschars/crusts',
'Convulsions',
'Others'
];
const baseline = ['Yes', 'No','Unknown'];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const ClinicalHistory = ({form}) => {

  const [lga, setLga] = useState([]);
  const {Panel} = Collapse;
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);

  const [signsSymptoms, setSignsSymptoms] = useState("");

  const [hasBaselineSecrum, setHasBaselineSecrum] = useState(null);

  const handleRadioHasBaseLine = (event) => {
    setHasBaselineSecrum(event.target.value);
  };

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

      console.log(inputName, value, 'hellos')

      setFormValues((previousState) => ({
          ...previousState,
          [inputName]: value

      }));

      if(formValues?.hasBaselineSecrum === "no" || formValues?.hasBaselineSecrum ==="unknown"){
        form?.setFieldsValue({
          ifYesDate:null,
        });
      }
      if(formValues?.signsSymptoms === "no" || formValues?.signsSymptoms ==="unknown"){
        form?.setFieldsValue({
            other:null
          });
      }

  };
      



  return (
    <>
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header="Clinical history: Sign and Symptoms" key="1">
          <Row>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date seen at the health facility"
                name="dateSeenAtHealthFacility"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateSeenAtHealthFacility"
                  name="dateSeenAtHealthFacility"
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Signs and symptoms"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                    placeholder="Select Option"
                    allowClear
                    name="signsSymptoms"
                    onChange={(value) => handleUpdateInputValues(signsSymptoms, value)}
                  >
                  {signs.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}

                </Select>
              </Form.Item>
            </Col>
            {
              formValues?.signsSymptoms === 'Others' &&
              (
                <>
                  <Col lg={8} md={8} sm={24}>
                    <Form.Item
                      label="Other"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
                        placeholder="Other specify"
                        name="other"
                        onChange={(e) => {}}
                      />
                    </Form.Item>
                  </Col>
                </>
              )
            }
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of case investigation"
                name="dateOfCaseInvestigation"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateOfCaseInvestigation"
                  name="dateOfCaseInvestigation"
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of onset of skin lesions"
                name="dateOfOnsetOfSkin"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateOfOnsetOfSkin"
                  name="dateOfOnsetOfSkin"
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Has baseline serum been taken"
                name="hasBaselineSecrum"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                    {
                        required: true,
                        message: "Select an option!",
                    },
                ]}>
                <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} name="hasBaselineSecrum" >
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="no">No</Radio.Button>
                    <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            {
              formValues?.hasBaselineSecrum === 'yes' &&
              (
                <>
                  <Col lg={8} md={8} sm={24}>
                    <Form.Item
                      label="If yes, date"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                            required: true,
                            message: "Select a date!",
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

                        name="ifYesDate"
                        onChange={(_, dateString) => handleUpdateInputValues("ifYesDate", dateString)}

                      />
                    </Form.Item>
                  </Col>
                </>
              )
            }
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="First symptom noticed"
                name="firstSymptomNoticed"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter first symptom noticed"
                  id="firstSymptomNoticed"
                  name="firstSymptomNoticed"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of onset of first symptoms"
                name="dateOfOnsetOfFirstSymptoms"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  id="dateOfOnsetOfFirstSymptoms"
                  name="dateOfOnsetOfFirstSymptoms"
                />
              </Form.Item>
            </Col>
            
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Name of sentinel lab specimen was sent"
                name="nameOfSentinelLabSpecimen"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter name of sentinel lab specimen was sent"
                  id="nameOfSentinelLabSpecimen"
                  name="nameOfSentinelLabSpecimen"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default ClinicalHistory;
