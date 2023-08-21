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

const stateData = ['FCT', 'Enugu'];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const Epidemiological = () => {
  const [form] = Form.useForm();
  const [lga, setLga] = useState([]);
  const {Panel} = Collapse;
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
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="vaccinated">Vaccinated</Radio.Button>
                  <Radio.Button value="unvaccinated">Not vaccinated</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Number of Vaccine Dose(s) Received"
                name="numberVaccineDose"
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
                  <Radio.Button value="1">1</Radio.Button>
                  <Radio.Button value="2">2</Radio.Button>
                  <Radio.Button value="3+">3+</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row>  
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date of Last Vaccination"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateLastVaccination"
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
                  style={{width: "100%"}}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Source of Vaccination Information"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="sourceVaccinationInformation"
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="card">Immunization card</Radio.Button>
                  <Radio.Button value="verbal">Verbal</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          
          </Row>

          <Row>  
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="History of Contact with Person with Similar Symptoms"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="contactPersonSimilarSymptoms"
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yse">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Ongoing Measles Outbreak in your Community"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="ongoingMeaslesOutbreakCommunity"
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yse">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          
          </Row>

        </Panel>
      </Collapse>


    </>
  );
};
export default Epidemiological;
