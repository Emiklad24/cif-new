/* eslint-disable no-unused-vars */
import { Col, Collapse, Radio } from "antd";
import "styles/pages/form.less";

import ClearableFormItem from "components/Custom/ClearableFormItem";
import { useState } from "react";

const FinalClassification = ({ form }) => {
  const { Panel } = Collapse;
  const [formValues, setFormValues] = useState({});

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={24} sm={24}>
          <ClearableFormItem
            label="Final classification"
            name="finalClassification"
            form={form}
            setFormValues={setFormValues}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="laboratory confirmed">
                Laboratory Confirmed
              </Radio.Button>
              <Radio.Button value="epidemiology link">
                Epidemiological Link
              </Radio.Button>
              <Radio.Button value="clinically compatible">
                Clinically Compatible
              </Radio.Button>
              <Radio.Button value="probable">Probable</Radio.Button>
              <Radio.Button value="not a case">
                Not a Case
              </Radio.Button>
              <Radio.Button value="pending">Pending</Radio.Button>
            </Radio.Group>
          </ClearableFormItem>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
