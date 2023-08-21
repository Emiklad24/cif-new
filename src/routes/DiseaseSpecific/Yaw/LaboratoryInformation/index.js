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

const sample = ['Finger prick blood for Trep. POC', 'Finger prick blood for DPP POC', 'Swab/scraping from lesions for PCR'];
const poc = ['Positive', 'Negative', 'Not done'];
const pcr = ['Positive', 'Negative', 'Not done'];
const dpp = ['Positive', 'Negative', 'Not done'];
const dual = ['Positive', 'Negative', 'Not done'];
const gwTests = ['Positive', 'Negative', 'Not done'];
const refLabs = ['National Veterinary Research Institute (NVRI) Vom Jos, Plateau State', 'National Reference Laboratory Gaduwa, Abuja', 'Central Public Health Lab (CPHL), Yaba Lagos'
];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

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
            
            <Col lg={12} md={6} xs={24}>
                <Form.Item
                  label="Sampling Methods"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 12}}
                  name="specimen_type"
                  rules={[
                    {
                      required: true,
                      message: "Please select Sampling Methods",
                    },
                  ]}
                  >
                  <Select
                    placeholder="Select Option"
                    allowClear

                  >
                    {sample.map((item) => (
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}

                  </Select>
                </Form.Item>
            </Col>
            <Col lg={12} md={6} xs={24}>
                <Form.Item
                  label="Treponemal POC Test"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 12}}
                  name="poc_test"
                  rules={[
                    {
                      required: true,
                      message: "Please select Treponemal POC Test",
                    },
                  ]}
                  >
                  <Select
                    placeholder="Select Option"
                    allowClear

                  >
                    {poc.map((item) => (
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}

                  </Select>
                </Form.Item>
            </Col>
            <Col lg={12} md={6} xs={24}>
                <Form.Item
                  label="PCR Result"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 12}}
                  name="pcr_result"
                  rules={[
                    {
                      required: true,
                      message: "Please select PCR Result",
                    },
                  ]}
                  >
                  <Select
                    placeholder="Select Option"
                    allowClear

                  >
                    {pcr.map((item) => (
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}

                  </Select>
                </Form.Item>
            </Col>
            <Col lg={12} md={6} xs={24}>
                <Form.Item
                  label="DPP dual POC treponemal line/TPHA"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 12}}
                  name="specimen_type"
                  rules={[
                    {
                      required: true,
                      message: "Please select DPP dual POC treponemal line/TPHA",
                    },
                  ]}
                  >
                  <Select
                    placeholder="Select Option"
                    allowClear

                  >
                    {dpp.map((item) => (
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}

                  </Select>
                </Form.Item>
            </Col>
            <Col lg={12} md={6} xs={24}>
                <Form.Item
                  label="DPP dual POC non-treponemal line/RPR"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 12}}
                  name="specimen_type"
                  rules={[
                    {
                      required: true,
                      message: "Please select DPP dual POC non-treponemal line/RPR",
                    },
                  ]}
                  >
                  <Select
                    placeholder="Select Option"
                    allowClear

                  >
                    {dual.map((item) => (
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}

                  </Select>
                </Form.Item>
            </Col>
           
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default LaboratoryInformation;
