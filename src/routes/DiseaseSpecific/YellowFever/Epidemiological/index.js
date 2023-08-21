import {
  Col,
  Form,
  Input,
  Collapse, DatePicker, Segmented,
  Row, Tooltip,
  Select, Radio,
} from 'antd';
import React, {useState} from 'react';
import "styles/pages/form.less";
import moment from "moment";
// const [value, setValue] = useState('Map');
//   return <Segmented options={['Map', 'Transit', 'Satellite']} value={value} onChange={setValue} />;

const {Option} = Select;

const stateData = ['FCT', 'Enugu'];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];
const vaccinationStatusData = ['Vaccinated', 'Not vaccinated', 'Unknown'];


const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const Epidemiological = () => {
  const [form] = Form.useForm();
  const [lga, setLga] = useState([]);
  const {Panel} = Collapse;
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);
  const [vaccination_status, setVaccinationStatus] = useState('');

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
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                rules={[
                  {
                    required: true,
                    message: "Please choose one!",
                  },
                ]}
              >

                <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  onChange={setVaccinationStatus}
                >
                  {vaccinationStatusData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {vaccination_status === 'Vaccinated' &&
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label="Number of vaccine doses"
                  name="numberOfVaccineDose"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                  rules={[
                    {
                      required: true,
                      message: "Select this option!",
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="1">1</Radio.Button>
                    <Radio.Button value="2+">2+</Radio.Button>
                  </Radio.Group>
                </Form.Item>

              </Col>
            }

            {vaccination_status === 'Vaccinated' &&
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date of Vaccination:"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    // initialValue={birth_date ? moment(birth_date) : null}
                    name="dateOfVaccination"
                    rules={[
                      {
                        required: true,
                        message: "Input the date!",
                      },
                    ]}
                  >
                    <DatePicker
                      // onChange={onChangeDoB}
                      format="DD-MM-YYYY"
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{width: "100%"}}
                      placeholder="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Source of vaccination history"
                    name="sourceVaccinationHistory"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    rules={[
                      {
                        required: true,
                        message: "Select this option!",
                      },
                    ]}
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="card">Vaccine card</Radio.Button>
                      <Radio.Button value="verbal">Verbal</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </>

            }
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="List names of villages, towns or LGAs that patient visited in the last 3 weeks"
                name="travelHistory"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
              >
                <Input
                  placeholder="Enter travel history"
                  id="address"
                  name="address"
                  onChange={(e) => {
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Patient Present Condition"
                name="patientPresentCondition"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                rules={[
                  {
                    required: true,
                    message: "Select this option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="Alive">Alive</Radio.Button>
                  <Radio.Button value="Dead">Dead</Radio.Button>
                  <Radio.Button value="Unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>

            <Col lg={24} md={24} sm={24}>
              <Form.Item
                label="Have cases of fever and jaundice been seen or reported in places visited by the patient in the last 2 weeks
                before onset of symptoms?"
                name="locationHistoryOfFever"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                rules={[
                  {
                    required: true,
                    message: "Select this option!",
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


          </Row>
        </Panel>
      </Collapse>


    </>
  );
};
export default Epidemiological;
