import {
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  Radio,
  Row
} from 'antd';
import React, { useState } from 'react';
import "styles/pages/form.less";

const ClinicalHistory = () => {;
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value

    }))

  }

  return (
    <Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="Clinical history: Sign and Symptoms" key="1">
        <Row>
          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Painless Swelling Of The Leg"
              name="SwellingLeg"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid"onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Painless Swelling Of The Arm"
              name="SwellingArm"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid"onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Painless Swelling Of The Face"
              name="SwellingFace"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
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
              label="Skin Ulcer"
              name="skinUlcer"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
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
              label="Osteomyelitis"
              name="osteomyelitis"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
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
              label="Plaque"
              name="plaque"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="Yes">Yes</Radio.Button>
                <Radio.Button value="No">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="The Appearance Of Lesions"
              name="AppearanceOfLesion"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Checkbox.Group buttonStyle="solid"
                options={

                  [
                    { label: 'Upper limbs', value: 'upperLimbs' },
                    { label: 'Lower limb ', value: 'lowerLimb' },
                    { label: 'Abdomen ', value: 'abdomen' },
                    { label: 'Immunocompromised conditions', value: 'Immunocompromised conditions' },

                  ]
                }

              />
            </Form.Item>
          </Col>


          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Disability Presence"
              name="disabilityPresence"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>


          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Other Symptom Please Specify"
              name="othersymptoms"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field",
                },
              ]}
            >
              <Input
                placeholder="othersymptoms"
                id="othersymptoms "
                name="othersymptoms"
                type="text"
              />
            </Form.Item>
          </Col>


        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
