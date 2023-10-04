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

const culture = ['Suspected poliovirus','Negative','NPENT','Suspect poliovirus + NPENT'];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];
const laboratoryData = ['ACEGID -African Centre of Excellence for Genomics of Infectious Diseases, Ogun', 
'AE-FUTHA -Alex Ekwueme Federal University Teaching Hospital Virology Laboratory', 
'BUK -Bayero University Kano Centre for Infectious Disease and Research, Kano', 
'FMC JALINGO -Federal Medical Centre, Jalingo, Taraba', 'FMC OWO -Federal Medical Centre Owo, Ondo', 
'ISTH -Irrua Specialist Teaching Hospital, Edo', 'LUTH -Lagos University Teaching Hospital Virology Laboratory, Lagos',
'MOGID -Molecular Genetics and Infectious Diseases Research Laboratory, Bauchi',
'NRL -National Reference Laboratory Gaduwa, FCT' ];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const LaboratoryInformation = () => {
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
        <Panel header="Laboratory information" key="1">
        <Row>
        <Col lg={24} md={24} sm={24}>
                <Form.Item
                  label="Laboratory Name"
                  name="laboratoryName"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                   <Select
                    placeholder="Select Option"
                    allowClear
                    name="laboratoryName"

                  >
                    {laboratoryData.map((item) => (
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}

                  </Select>
                </Form.Item>
            </Col>

        <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date Specimen Collected"
                  name="dateSpecimenCollected"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                  
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  wrapperCol={{span: 24}}
                >
                  <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YY"
                  id="dateSpecimenCollected"
                  name="dateSpecimenCollected"
                />
                </Form.Item>
            </Col>
            
            
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date specimen sent"
                  name="dateSpecimenSent"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                  
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  wrapperCol={{span: 24}}
                >
                  <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YY"
                  id="dateSpecimenSent"
                  name="dateSpecimenSent"
                />
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date Specimen received"
                  name="dateSpecimenReceived"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                  
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  wrapperCol={{span: 24}}
                >
                  <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YY"
                  id="dateSpecimenReceived"
                  name="dateSpecimenReceived"
                />
                </Form.Item>
            </Col>
            
            
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date culture results available"
                  name="dateResultAvailable"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                  
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  wrapperCol={{span: 24}}
                >
                  <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YY"
                  id="dateResultAvailable"
                  name="dateResultAvailable"
                />
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Final cell Culture Results"
                  name="cultureResult"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                   
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  wrapperCol={{span: 24}}
                >
                 <Select
                    placeholder="Select Option"
                    allowClear
                    name="finalCellCultureResult"

                  >
                    {culture.map((item) => (
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}

                  </Select>
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date results sent out"
                  name="dateResultSent"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                  
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  wrapperCol={{span: 24}}
                >
                  <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YY"
                  id="dateResultSent"
                  name="dateResultSent"
                />
                </Form.Item>
            </Col> 
            <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label="Date result received"
                  name="dateResultReceived"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                  <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YY"
                  id="dateResultReceived"
                  name="dateResultReceived"
                />
                  
                </Form.Item>
            </Col>
           

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Specimen condition at reception at the Lab"
                name="specimenCondition"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="adequate">Adequate</Radio.Button>
                  <Radio.Button value="not adequate">Not Adequate</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date I-T differentiation results sent to EPI"
                  name="dateSentEpi"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                   
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  wrapperCol={{span: 24}}
                >
                  <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YY"
                  id="dateSentFromIC"
                  name="dateSentFromIC"
                />
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date I-T differentiation results received at EPI"
                  name="dateReceiveResults"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                   
                </Form.Item>
            </Col>

            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  wrapperCol={{span: 24}}
                >
                  <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YY"
                  id="dateIsolateSent"
                  name="dateIsolateSent"
                />
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date Isolate sent for sequencing"
                  name="dateIsolateSent"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                   
                </Form.Item>
            </Col>

            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  wrapperCol={{span: 24}}
                >
                  <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YY"
                  id="dateSequenceResult"
                  name="dateSequenceResult"
                />
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label="Date sequencing result sent to program"
                  name="dateSequenceResult"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                   
                </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={24}>
                <Form.Item
                  wrapperCol={{span: 24}}
                >
                  <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YY"
                  id="dateSequenceResult"
                  name="dateSequenceResult"
                />
                </Form.Item>
            </Col>


            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="W1"
                name="w1"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="W2"
                name="w2"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="W3"
                name="w3"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="SL1"
                name="sl1"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="SL2"
                name="sl2"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="SL3"
                name="sl3"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="(R) NPENT"
                name="npent"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="positive">Positive</Radio.Button>
                  <Radio.Button value="negative">Negative</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="NEV"
                name="nev"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="positive">Positive</Radio.Button>
                  <Radio.Button value="negative">Negative</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
        
           
            



          
            </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default LaboratoryInformation;
