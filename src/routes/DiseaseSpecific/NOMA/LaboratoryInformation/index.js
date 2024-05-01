import { Checkbox, Col, Collapse, Radio, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicSelect from "components/Custom/DynamicSelect";
import { USER_ROLE } from "constants/ActionTypes";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "styles/pages/form.less";
import useFormStore from "../../../../store/useFormStore";
import { useShallow } from "zustand/react/shallow";
import { filterLabByStateAndDisease } from "../../../../constants/AllLaboratory";

const CheckboxGroup = Checkbox.Group;

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;

  const [labComponentDisabled, setLabComponentDisabled] = useState(false);
  const { userRole } = useSelector(({ common }) => common);

  useEffect(() => {
    if (!userRole) return;
    if (userRole === USER_ROLE.LAB || userRole === USER_ROLE.SUPER) {
      setLabComponentDisabled(false);
    } else {
      setLabComponentDisabled(true);
    }
  }, [userRole]);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

 

  const conditionOfSampleOptions = ["Adequate", "Not adequate"];

  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));
  const _formValues = form?.getFieldsValue(true);
  const { selectedDiseaseArea } = useFormStore(
    useShallow((state) => ({
      selectedDiseaseArea: state.selectedDiseaseArea,
    }))
  );

  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              collectFormName={true}
              form={form}
              setFormValues={setFormValues}
              label="Specimen collected"
              name="specimenCollected"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                name="specimenCollected"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
        </Row>

        {formValues?.specimenCollected === "yes" && (
          <Row>
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                collectFormName={true}
                form={form}
                setFormValues={setFormValues}
                label="Type of specimen collected"
                name="typeOfSpecimenCollected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <CheckboxGroup
                  disabled={labComponentDisabled}
                  options={[
                    { label: "Oral Swab", value: "face" },
                    { label: "Nasal Swab", value: "leg" },
                    { label: "Nasopharyngeal Swab", value: "head" },
                  ]}
                  name="typeOfSpecimenCollected"
                />
              </ClearableFormItem>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                collectFormName={true}
                form={form}
                setFormValues={setFormValues}
                label="Date specimen collected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="dateSpecimenCollected"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <CustomDatePicker
                  disabled={labComponentDisabled}
                  form={form}
                  name="dateSpecimenCollected"
                />
              </ClearableFormItem>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                collectFormName={true}
                form={form}
                setFormValues={setFormValues}
                label="Date specimen sent"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="dateSpecimenSent"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <CustomDatePicker
                  disabled={labComponentDisabled}
                  form={form}
                  name="dateSpecimenSent"
                />
              </ClearableFormItem>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                collectFormName={true}
                form={form}
                setFormValues={setFormValues}
                label="Name of testing laboratory"
                name="nameOfTestingLaboratory"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DynamicSelect
                  disabled={labComponentDisabled}
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  options={filterLabByStateAndDisease(
                    _formValues?.stateOfReporting,
                    selectedDiseaseArea?.value
                  )}
                  valueProperty="id"
                  labelProperty="name"
                  placeholder="Select Laboratory Name"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                />
              </ClearableFormItem>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                collectFormName={true}
                form={form}
                setFormValues={setFormValues}
                label="Specimen recieved"
                name="specimenReceived"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Radio.Group
                  disabled={labComponentDisabled}
                  buttonStyle="solid"
                  name="specimenReceived"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </ClearableFormItem>
            </Col>
          </Row>
        )}
        {formValues?.specimenReceived === "yes" && (
          <Row>
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                collectFormName={true}
                form={form}
                setFormValues={setFormValues}
                label="Type of specimen recieved"
                name="specimenType"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <CheckboxGroup
                  disabled={labComponentDisabled}
                  options={[
                    { label: "Oral Swab", value: "face" },
                    { label: "Nasal Swab", value: "leg" },
                    { label: "Nasopharyngeal Swab", value: "head" },
                  ]}
                  name="specimenType"
                />
              </ClearableFormItem>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                collectFormName={true}
                form={form}
                setFormValues={setFormValues}
                label="Date specimen recieved"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="dateSpecimenRecieved"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <CustomDatePicker
                  disabled={labComponentDisabled}
                  form={form}
                  name="dateSpecimenRecieved"
                />
              </ClearableFormItem>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                collectFormName={true}
                form={form}
                setFormValues={setFormValues}
                label="Specimen condition"
                name="specimenCondition"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Radio.Group
                  disabled={labComponentDisabled}
                  buttonStyle="solid"
                  name="specimenCondition"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                >
                  {conditionOfSampleOptions.map((item) => (
                    <Radio.Button value={item} key={item}>
                      {item}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </ClearableFormItem>
            </Col>
          </Row>
        )}
      </Panel>
    </Collapse>
  );
};
export default LaboratoryInformation;
