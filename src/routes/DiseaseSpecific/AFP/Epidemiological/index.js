import {
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Radio,
  Row
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import "styles/pages/form.less";

const Epidemiological = () => {
  const { Panel } = Collapse;
  const [isDatePickerDisabled] = useState(false);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Epidemiological Information" key="1">
        <Row>
          <Col lg={24} md={24} sm={24}>
            <Form.Item
              label="Have you been vaccinated?"
              name="polioVaccineStatus"
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
              label="Total Number of polio vaccine doses, exclude dose at birth"
              name="numberOfDoses"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="1">1</Radio.Button>
                <Radio.Button value="2">2</Radio.Button>
                <Radio.Button value="3">3</Radio.Button>
                <Radio.Button value="4">4</Radio.Button>
                <Radio.Button value="5+">5+</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Source of RI Vaccination information"
              name="vaccinationHistory"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="card">Card</Radio.Button>
                <Radio.Button value="recall">Recall</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Total OPV doses received through RI"
              name="opvRiNumber"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="1">1</Radio.Button>
                <Radio.Button value="2">2</Radio.Button>
                <Radio.Button value="3">3</Radio.Button>
                <Radio.Button value="4">4</Radio.Button>
                <Radio.Button value="5+">5+</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Total OPV doses received through SIA"
              name="opvSiaNumber"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="1">1</Radio.Button>
                <Radio.Button value="2">2</Radio.Button>
                <Radio.Button value="3">3</Radio.Button>
                <Radio.Button value="4">4</Radio.Button>
                <Radio.Button value="5+">5+</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Total IPV doses received through RI"
              name="ipvRiNumber"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="1">1</Radio.Button>
                <Radio.Button value="2">2</Radio.Button>
                <Radio.Button value="3">3</Radio.Button>
                <Radio.Button value="4">4</Radio.Button>
                <Radio.Button value="5+">5+</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Total IPV doses received through SIA"
              name="ipvSiaNumber"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="1">1</Radio.Button>
                <Radio.Button value="2">2</Radio.Button>
                <Radio.Button value="3">3</Radio.Button>
                <Radio.Button value="4">4</Radio.Button>
                <Radio.Button value="5+">5+</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <Form.Item
              label="Date of last IPV dose received through SIA"
              name="ipvDoseDate_collection"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            ></Form.Item>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <Form.Item wrapperCol={{ span: 24 }}>
              <DatePicker
                format="DD-MM-YYYY"
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="DD-MM-YY"
                id="ipvDoseDate"
                name="ipvDoseDate"
              />
            </Form.Item>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <Form.Item
              label="Date of last OPV dose received through SIA"
              name="opvDoseDate_collection"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            ></Form.Item>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <Form.Item wrapperCol={{ span: 24 }}>
              <DatePicker
                format="DD-MM-YYYY"
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="DD-MM-YY"
                id="opvDoseDate"
                name="opvDoseDate"
              />
            </Form.Item>
          </Col>
          <Col lg={18} md={18} sm={24}>
            <Form.Item
              label="Where has the child been seeking help for this problem before presenting at present place"
              name="helpHistory"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="Enter Address 1"
                id="address"
                name="address"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <Form.Item
              label="Date"
              name="date"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker
                format="DD-MM-YYYY"
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="DD-MM-YY"
                id="ipvDoseDate"
                name="ipvDoseDate"
              />
            </Form.Item>
          </Col>
          <Col lg={18} md={18} sm={24}>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Input
                placeholder="Enter Address 2"
                id="address"
                name="address"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              <DatePicker
                format="DD-MM-YYYY"
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="DD-MM-YY"
                id="ipvDoseDate"
                name="ipvDoseDate"
              />
            </Form.Item>
          </Col>
          <Col lg={18} md={18} sm={24}>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Input
                placeholder="Enter Address 3"
                id="address"
                name="address"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              <DatePicker
                format="DD-MM-YYYY"
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="DD-MM-YY"
                id="ipvDoseDate"
                name="ipvDoseDate"
              />
            </Form.Item>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
