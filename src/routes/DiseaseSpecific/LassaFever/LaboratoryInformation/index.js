import { Checkbox, Col, Collapse, Divider, Input, Radio, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import DynamicSelect from "components/Custom/DynamicSelect";
import { USER_ROLE } from "constants/ActionTypes";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
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

  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));
  const _formValues = form?.getFieldsValue(true);

  const { selectedDiseaseArea } = useFormStore(
    useShallow((state) => ({
      selectedDiseaseArea: state.selectedDiseaseArea,
    }))
  );

  const { data: allLookup } = useFetchAllLookup();
  

  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  const canSeeResult =
    USER_ROLE.LAB === userRole ||
    USER_ROLE.SUPER === userRole ||
    USER_ROLE.VIEW === userRole;

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              collectFormName={true}
              setFormValues={setFormValues}
              form={form}
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
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_type || []}
                valueProperty="id"
                labelProperty="value"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="specimenCollected"
              />
            </ClearableFormItem>
          </Col>

          {formValues?.specimenCollected === "YES" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  setFormValues={setFormValues}
                  form={form}
                  label="Date specimen collected"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  // initialValue={collection_date ? moment(collection_date) : null}
                  name="dateSpecimenCollected"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateSpecimenCollected" />
                </ClearableFormItem>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  setFormValues={setFormValues}
                  form={form}
                  label="Type of specimen collected"
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
                    options={[
                      { label: "Blood", value: "blood" },
                      { label: "Breast milk", value: "breastMilk" },
                    ]}
                    name="specimenType"
                    onChange={(value) => {
                      console.log(value);
                      handleUpdateInputValues("specimenType", value);
                    }}
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  setFormValues={setFormValues}
                  form={form}
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
                  <CustomDatePicker form={form} name="dateSpecimenSent" />
                </ClearableFormItem>
              </Col>

              
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  setFormValues={setFormValues}
                  form={form}
                  label="Name of testing laboratory"
                  name="nameOfTestingLaboratory"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <DynamicSelect
                    showSearch
                    allowClear
                    optionLabelProp="label"
                    options={filterLabByStateAndDisease(
                      _formValues?.stateOfReporting,
                      selectedDiseaseArea?.value
                    )}
                    valueProperty="id"
                    labelProperty="name"
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
             
            </>
          )}

          {formValues?.specimenCollected === "no" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                collectFormName={true}
                setFormValues={setFormValues}
                form={form}
                label="Why was specimen not collected?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={collection_date ? moment(collection_date) : null}
                name="whySpecimenNotCollected"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input
                  placeholder="Enter reason"
                  id="whySpecimenNotCollected"
                  name="whySpecimenNotCollected"
                  onChange={(e) => {}}
                />
              </ClearableFormItem>
            </Col>
          )}

          {formValues?.specimenCollected === "YES" && canSeeResult && (
            <>
              <Divider plain>Laboratory result</Divider>
              {formValues?.specimenType?.includes("blood") &&
                formValues?.specimenCollected === "YES" && (
                  <Col lg={24} md={24} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      setFormValues={setFormValues}
                      form={form}
                      label="Blood specimen received"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="bloodSpecimenReceived"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <DynamicRadio
                        disabled={labComponentDisabled}
                        buttonStyle="solid"
                        options={allLookup?.yes_no_type || []}
                        valueProperty="id"
                        labelProperty="value"
                        name="bloodSpecimenReceived"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      />
                    </ClearableFormItem>
                  </Col>
                )}
              {formValues?.bloodSpecimenReceived === "YES" &&
                formValues?.specimenType?.includes("blood") && (
                  <>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="Date specimen received"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="bloodDateSpecimenReceived"
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
                          name="bloodDateSpecimenReceived"
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="Specimen condition"
                        name="bloodSpecimenCondition"
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
                          name="bloodSpecimenCondition"
                          onChange={(e) =>
                            handleUpdateInputValues(
                              e.target.name,
                              e.target.value
                            )
                          }
                        >
                          <Radio.Button value="adequate">Adequate</Radio.Button>
                          <Radio.Button value="not adequate">
                            Not adequate
                          </Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>

                    {formValues?.bloodSpecimenCondition === "not adequate" && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Reason why specimen is not adequate"
                          name="reasonSpecimenNotAdequateBloodSpecimen"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            disabled={labComponentDisabled}
                            name="reasonSpecimenNotAdequateBloodSpecimen"
                            placeholder="Reason why"
                          />
                        </ClearableFormItem>
                      </Col>
                    )}

                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="Laboratory ID"
                        name="bloodLaboratoryId"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          disabled={labComponentDisabled}
                          placeholder="Enter lab ID"
                          id="labid"
                          name="labid"
                          onChange={(e) => {}}
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="PCR/RT-PCR result"
                        name="bloodPcrResult"
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
                          name="bloodPcrResult"
                          onChange={(e) =>
                            handleUpdateInputValues(
                              e.target.name,
                              e.target.value
                            )
                          }
                        >
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="indeterminate">
                            Indeterminate
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                          <Radio.Button value="notDone">Not done</Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>

                    {formValues?.bloodPcrResult === "notDone" && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Why was test not done?"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          // initialValue={collection_date ? moment(collection_date) : null}
                          name="reasonbloodPcrNotDone"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            disabled={labComponentDisabled}
                            placeholder="Enter reason"
                            id="reasonbloodPcrNotDone"
                            name="reasonbloodPcrNotDone"
                            onChange={(e) => {}}
                          />
                        </ClearableFormItem>
                      </Col>
                    )}

                    {(formValues?.bloodPcrResult === "positive" ||
                      formValues?.bloodPcrResult === "negative" ||
                      formValues?.bloodPcrResult === "indeterminate") &&
                      formValues?.bloodSpecimenReceived === "YES" &&
                      formValues?.specimenType?.includes("blood") && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            setFormValues={setFormValues}
                            form={form}
                            label="Date result released"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            // initialValue={birth_date ? moment(birth_date) : null}
                            name="bloodDateResultReleased"
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
                              name="bloodDateResultReleased"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}
                  </>
                )}

              <Divider />
              {/* breastMilk Form fields */}
              {formValues?.specimenType?.includes("breastMilk") &&
                formValues?.specimenCollected === "YES" && (
                  <Col lg={24} md={24} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      setFormValues={setFormValues}
                      form={form}
                      label="Breast milk specimen received"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="breastMilkSpecimenReceived"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <DynamicRadio
                        disabled={labComponentDisabled}
                        buttonStyle="solid"
                        options={allLookup?.yes_no_type || []}
                        valueProperty="id"
                        labelProperty="value"
                        name="breastMilkSpecimenReceived"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      />
                    </ClearableFormItem>
                  </Col>
                )}
              {formValues?.breastMilkSpecimenReceived === "YES" &&
                formValues?.specimenType?.includes("breastMilk") && (
                  <>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="Date specimen received"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="breastMilkDateSpecimenReceived"
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
                          name="breastMilkDateSpecimenReceived"
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="Specimen condition"
                        name="breastMilkSpecimenCondition"
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
                        >
                          <Radio.Button value="adequate">Adequate</Radio.Button>
                          <Radio.Button value="not adequate">
                            Not adequate
                          </Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>

                    {formValues?.breastMilkSpecimenCondition ===
                      "not adequate" && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Reason why specimen is not adequate"
                          name="reasonSpecimenNotAdequateBreastMilkSpecimen"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            disabled={labComponentDisabled}
                            name="reasonSpecimenNotAdequateBloodSpecimen"
                            placeholder="Reason why"
                          />
                        </ClearableFormItem>
                      </Col>
                    )}

                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="Laboratory ID"
                        name="breastMilkLaboratoryId"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          disabled={labComponentDisabled}
                          placeholder="Enter lab ID"
                          id="breastMilkLaboratoryId"
                          name="breastMilkLaboratoryId"
                          onChange={(e) => {}}
                        />
                      </ClearableFormItem>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="PCR/RT-PCR result"
                        name="breastMilkPcrResult"
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
                          name="breastMilkPcrResult"
                          onChange={(e) =>
                            handleUpdateInputValues(
                              e.target.name,
                              e.target.value
                            )
                          }
                        >
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="indeterminate">
                            Indeterminate
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                          <Radio.Button value="notDone">Not done</Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>
                    {formValues?.breastMilkPcrResult === "notDone" && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Why was test not done?"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          // initialValue={collection_date ? moment(collection_date) : null}
                          name="reasonBreastMilkPcrNotDone"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            disabled={labComponentDisabled}
                            placeholder="Enter reason"
                            id="reasonBreastMilkPcrNotDone"
                            name="reasonBreastMilkPcrNotDone"
                            onChange={(e) => {}}
                          />
                        </ClearableFormItem>
                      </Col>
                    )}
                    {(formValues?.breastMilkPcrResult === "positive" ||
                      formValues?.breastMilkPcrResult === "negative" ||
                      formValues?.breastMilkPcrResult === "indeterminate") &&
                      formValues?.breastMilkSpecimenReceived === "YES" &&
                      formValues?.specimenType?.includes("breastMilk") && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            setFormValues={setFormValues}
                            form={form}
                            label="Date result released"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            // initialValue={birth_date ? moment(birth_date) : null}
                            name="breastMilkDateResultReleased"
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
                              name="breastMilkDateResultReleased"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}
                  </>
                )}
            </>
          )}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default LaboratoryInformation;
