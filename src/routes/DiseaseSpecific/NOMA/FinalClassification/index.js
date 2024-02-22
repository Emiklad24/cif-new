import { Col, Collapse, Radio } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import "styles/pages/form.less";

const FinalClassification = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={12} md={12} sm={24}>
          <ClearableFormItem
            form={form}
            label="Epidemiological Linked"
            name="epidemiologicalLinked"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Radio.Group buttonStyle="solid" name="epidemiologicalLinked">
              <Radio.Button value="yes">Yes</Radio.Button>
              <Radio.Button value="no">No</Radio.Button>
            </Radio.Group>
          </ClearableFormItem>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
