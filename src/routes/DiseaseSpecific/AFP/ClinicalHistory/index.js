import {
  Col,
  Collapse,
  Form,
  Radio,
  Row,
  Select
} from 'antd';
import React from 'react';
import "styles/pages/form.less";

const {Option} = Select;

const paralysisSite = ['Left Arm','Right Arm','Left Leg','Right Leg'];

const ClinicalHistory = () => {
  const {Panel} = Collapse;

  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="Clinical history: Sign and Symptoms" key="1">
        <Row>
        <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Fever at the onset"
              name="feverOnset"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Progressive analysis"
              name="progressiveAnalysis"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Is Paralysis flaccid and acute?"
              name="paralysisAcute"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Assymetric"
              name="assymetric"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>


          <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Site of paralysis"
                name="paralysisSite"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
              >
                 <Select
                  placeholder="Select Option"
                  allowClear
                  name="paralysisSite"

                >
                  {paralysisSite.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}

                </Select>
              </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Paralyzed limb(s) sensitive to pain?"
              name="paralysedLimb"
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
              label="Was there any injection before onset of paralysis?"
              name="injectionOnset"
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
                label="If Yes, indicate site of injection"
                name="injectionSite"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
              >
                 <Select
                  placeholder="Select Option"
                  allowClear
                  name="injectionSite"

                >
                  {paralysisSite.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}

                </Select>
              </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="After investigation, was this a true AFP?"
              name="investiagtionAfp"
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
              label="Immunocompromised status suspected?"
              name="injectionOnset"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Hospitalised?"
              name="hospitalised"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
