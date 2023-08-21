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

const ClinicalHistory = () => {
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
        <Panel header="Clinical history: Sign and Symptoms" key="1">
          <Row>
          <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Hospitalization status"
                name="hospitalizationStatus"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={hospitalizationStatus ? moment(hospitalizationStatus) : null}
                 name="hospitalizationStatus"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
                   },
                 ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="inpatient">Inpatient</Radio.Button>
                  <Radio.Button value="outpatient">Outpatient</Radio.Button>
                  <Radio.Button value="refered">Refered</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date Of symptom onset"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={dateOfOnset ? moment(dateOfOnset) : null}
                name="dateOfOnset"
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
                  },
                ]}
              >
                <DatePicker
                format="DD-MM-YYYY"
                  // onChange={onChangeDoB}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Onset season"
                name="onsetSeason"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={onsetSeason ? moment(onsetSeason) : null}
                 name="onsetSeason"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
                   },
                 ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="rainy">Rainy</Radio.Button>
                  <Radio.Button value="dry">Dry</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Bleeding Gums"
                name="bleedingGum"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={bleedingGum ? moment(bleedingGum) : null}
                 name="bleedingGum"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Drooling/Excessive Salivation"
                name="drooling/ExcessiveSalivation"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={drooling/ExcessiveSalivation ? moment(drooling/ExcessiveSalivation) : null}
                 name="drooling/ExcessiveSalivation"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Swollen Gum"
                name="swollenGum"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={swollenGum ? moment(swollenGum) : null}
                 name="swollenGum"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Sore on the gum"
                name="soreOnTheGum"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={soreOnTheGum ? moment(soreOnTheGum) : null}
                 name="soreOnTheGum"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Facial Swelling"
                name="facialSwelling"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={facialSwelling ? moment(facialSwelling) : null}
                 name="facialSwelling"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Wound on the face"
                name="woundOnTheFace"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={woundOnTheFace ? moment(woundOnTheFace) : null}
                 name="woundOnTheFace"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Tissue Loss/bone of the jaw exposed"
                name="tissueLoss/BoneOfTheJawExposed"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={tissueLoss/BoneOfTheJawExposed ? moment(tissueLoss/BoneOfTheJawExposed) : null}
                 name="tissueLoss/BoneOfTheJawExposed"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Difficulty Closing or Opening Mouth"
                name="difficultyClosingOrOpeningMouth"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={difficultyClosingOrOpeningMouth ? moment(difficultyClosingOrOpeningMouth) : null}
                 name="difficultyClosingOrOpeningMouth"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Diarrhea"
                name="diarrhea"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={diarrhea ? moment(diarrhea) : null}
                 name="diarrhea"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Symptoms of Malnutrition"
                name="symptomsOfMalnutrition"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={symptomsOfMalnutrition ? moment(symptomsOfMalnutrition) : null}
                 name="symptomsOfMalnutrition"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Swollen Abdomen"
                name="swollenAbdomen"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={swollenAbdomen ? moment(swollenAbdomen) : null}
                 name="swollenAbdomen"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Wisened Look"
                name="wisenedLook"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                 // initialValue={wisenedLook ? moment(wisenedLook) : null}
                 name="wisenedLook"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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
export default ClinicalHistory;
