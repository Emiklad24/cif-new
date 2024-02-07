import { Col, Collapse, DatePicker, Form, Input, Radio, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import "styles/pages/form.less";

const ClinicalHistory = () => {
  const { Panel } = Collapse;
  const [isDatePickerDisabled] = useState(false);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Clinical history: Sign and Symptoms" key="1">
        <Row>
          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Date of Symptom Onset"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              // initialValue={birth_date ? moment(birth_date) : null}
              name="date_of_onset"
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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

          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Place of Symptom Onset"
              name="placeOnset"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
                },
              ]}
            >
              <Input
                placeholder="Enter place Address"
                id="address"
                name="address"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Fever (≥37.5 °C)"
              name="feverHistory"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Fever Onset Date"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              // initialValue={birth_date ? moment(birth_date) : null}
              name="date_of_onset"
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
                },
              ]}
            >
              <DatePicker
                // onChange={onChangeDoB}
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Headache"
              name="headache"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
          <Col lg={8} md={8} sm={24}></Col>
          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Anorexia/Loss of Appetite"
              name="anorexia"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Intense Fatigue"
              name="intenseFatigue"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Diarrhoea"
              name="diarrhoea"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Abdominal Pain"
              name="abdominalPain"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Muscle or Joint Pain"
              name="muscleJointPain"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Difficulty swallowing"
              name="difficultySwallowing"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Difficulty breathing"
              name="difficultyBreathing"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Skin Rash"
              name="skinRash"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Bleeding from injection sites"
              name="bleedingInjectionSite"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Bleeding gums"
              name="bleedingGums"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Bleeding into the eyes (Red Eyes)"
              name="bleedingEyes"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Black or bloody stool"
              name="blackBloodyStool"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Blood in vomits"
              name="bloodVomits"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Bleeding from the nose"
              name="bloodNose"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Bleeding from the vagina"
              name="bloodVagina"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Hiccups"
              name="hiccups"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
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
              label="Others (Specify)"
              name="others"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Fill this field!",
                },
              ]}
            >
              <Input
                placeholder="Enter other symptoms"
                id="address"
                name="address"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
