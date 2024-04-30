import { Checkbox, Col, Collapse, Divider, Input, Radio, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import DynamicSelect from "components/Custom/DynamicSelect";
import { USER_ROLE } from "constants/ActionTypes";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import useGetHealthFacilities from "hooks/useGetHealthFacilities.hook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "styles/pages/form.less";

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

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };
  const { data: allLookup } = useFetchAllLookup();
  const allHealthFacilitiesQuery = useGetHealthFacilities();
  const testingLaboratoryData = allHealthFacilitiesQuery?.data?.filter(
    (fac) => fac?.type?.toLowerCase() === "laboratory"
  );

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
              label="Specimen collected"
              name="specimenCollected"
              setFormValues={setFormValues}
              form={form}
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
                options={allLookup?.yes_no_unknown || []}
                valueProperty="id"
                labelProperty="value"
                name="specimenCollected"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.specimenCollected === "YES" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  label="Date specimen collected "
                  name="dateSpecimenCollected"
                  setFormValues={setFormValues}
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
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
                  label="Type of specimen collected?"
                  name="specimenType"
                  setFormValues={setFormValues}
                  form={form}
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
                    options={[{ label: "Blood/Serum", value: "bloodSerum" }]}
                    name="specimenType"
                    onChange={(value) => {
                      handleUpdateInputValues("specimenType", value);
                    }}
                  />
                </ClearableFormItem>
              </Col>

              {formValues?.specimenType?.length >= 1 && (
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    collectFormName={true}
                    label="Date specimen sent"
                    name="dateSpecimenSent"
                    setFormValues={setFormValues}
                    form={form}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <CustomDatePicker form={form} name="dateSpecimenSent" />
                  </ClearableFormItem>
                </Col>
              )}

              <Col lg={24} md={12} sm={12} xs={24}>
                <ClearableFormItem
                  collectFormName={true}
                  label="Name of testing laboratory"
                  name="nameOfTestingLaboratory"
                  setFormValues={setFormValues}
                  form={form}
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
                    options={testingLaboratoryData}
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

              {canSeeResult && (
                <>
                  <Divider plain>Laboratory result</Divider>
                  {formValues?.specimenType?.includes("bloodSerum") && (
                    <Col lg={24} md={24} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        label="Blood/Serum specimen received"
                        name="bloodSerumSpecimenReceived"
                        setFormValues={setFormValues}
                        form={form}
                        onChange={(e) => {
                          handleUpdateInputValues(
                            e.target.name,
                            e.target.value
                          );
                        }}
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
                          disabled={labComponentDisabled}
                          buttonStyle="solid"
                          options={allLookup?.yes_no_type || []}
                          valueProperty="id"
                          labelProperty="value"
                          name="bloodSerumSpecimenReceived"
                          onChange={(e) =>
                            handleUpdateInputValues(
                              e.target.name,
                              e.target.value
                            )
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.bloodSerumSpecimenReceived === "YES" && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date blood/serum specimen received "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="bloodSerumDateSpecimenReceived"
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
                            name="bloodSerumDateSpecimenReceived"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Laboratory ID"
                          name="bloodSerumLaboratoryId"
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
                            placeholder="Laboratory ID"
                            name="bloodSerumLaboratoryId"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={8} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Specimen condition"
                          name="bloodSerumSpecimenCondition"
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
                            disabled={labComponentDisabled}
                            onChange={(e) => {
                              handleUpdateInputValues(
                                "bloodSerumSpecimenCondition",
                                e.target.value
                              );
                            }}
                          >
                            <Radio.Button value="adequate">
                              Adequate
                            </Radio.Button>
                            <Radio.Button value="not adequate">
                              Not adequate
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {formValues?.bloodSerumSpecimenCondition ===
                        "not adequate" && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            setFormValues={setFormValues}
                            form={form}
                            label="Reason why specimen is not adequate"
                            name="reasonSpecimenNotAdequate"
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
                              placeholder="Reason why specimen is not adequate"
                              name="reasonSpecimenNotAdequate"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      {formValues?.specimenType?.length >= 1 && (
                        <Col lg={24} md={24} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            setFormValues={setFormValues}
                            form={form}
                            label="Test conducted"
                            name="bloodSerumTestConducted"
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
                                { label: "IgM", value: "igm" },
                                // { label: "IgG(acute)", value: "iggAcute" },
                                // {
                                //   label: "IgG(convalescent)",
                                //   value: "iggConvalescent",
                                // },
                                {
                                  label: "PCR/RT-PCR (In Country)",
                                  value: "pcr",
                                },
                                { label: "IP Darker result", value: "regionalLabResult" },
                              ]}
                              name="bloodSerumTestConducted"
                              onChange={(value) => {
                                handleUpdateInputValues(
                                  "bloodSerumTestConducted",
                                  value
                                );
                              }}
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      {formValues?.bloodSerumTestConducted?.includes("igm") && (
                        <Row>
                          <Divider plain>Igg Result</Divider>
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="Igm result for blood specimen"
                              name="resultBloodSerumIgm"
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
                                disabled={labComponentDisabled}
                              >
                                <Radio.Button value="positive">
                                  Positive
                                </Radio.Button>
                                <Radio.Button value="negative">
                                  Negative
                                </Radio.Button>
                                <Radio.Button value="inconclusive">
                                  Inconclusive
                                </Radio.Button>
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="notDone">
                                  Not done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="Date result released "
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedBloodSerumIgm"
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
                                name="dateResultReleasedBloodSerumIgm"
                              />
                            </ClearableFormItem>
                          </Col>
                        </Row>
                      )}
                      {formValues?.bloodSerumTestConducted?.includes(
                        "iggAcute"
                      ) && (
                        <Row>
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="IgG(Acute) result for blood specimen"
                              name="resultBloodSerumIggAcute"
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
                                disabled={labComponentDisabled}
                              >
                                <Radio.Button value="positive">
                                  Positive
                                </Radio.Button>
                                <Radio.Button value="negative">
                                  Negative
                                </Radio.Button>
                                <Radio.Button value="inconclusive">
                                  Inconclusive
                                </Radio.Button>
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="notDone">
                                  Not done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="Date result released "
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedBloodIggA"
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
                                name="dateResultReleasedBloodIggA"
                              />
                            </ClearableFormItem>
                          </Col>
                        </Row>
                      )}

                      {formValues?.bloodSerumTestConducted?.includes(
                        "iggConvalescent"
                      ) && (
                        <Row>
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="IgG(Convalescent) result for blood/serum specimen"
                              name="iggConvalescentResultBloodSerum"
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
                                disabled={labComponentDisabled}
                              >
                                <Radio.Button value="positive">
                                  Positive
                                </Radio.Button>
                                <Radio.Button value="negative">
                                  Negative
                                </Radio.Button>
                                <Radio.Button value="inconclusive">
                                  Inconclusive
                                </Radio.Button>
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="notDone">
                                  Not done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="Date result released "
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedBloodSerumIggc"
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
                                name="dateResultReleasedBloodSerumIggc"
                              />
                            </ClearableFormItem>
                          </Col>
                        </Row>
                      )}

                      {formValues?.bloodSerumTestConducted?.includes("pcr") && (
                        <Row>
                          <Divider plain>Pcr Result</Divider>
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="PCR/RT-PCR result for blood/serum"
                              name="resultBloodSerumPcr"
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
                                disabled={labComponentDisabled}
                              >
                                <Radio.Button value="positive">
                                  Positive
                                </Radio.Button>
                                <Radio.Button value="negative">
                                  Negative
                                </Radio.Button>
                                <Radio.Button value="inconclusive">
                                  Inconclusive
                                </Radio.Button>
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="notDone">
                                  Not done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="Date result released"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedBloodSerumPcr"
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
                                name="dateResultReleasedBloodSerumPcr"
                              />
                            </ClearableFormItem>
                          </Col>
                        </Row>
                      )}

                      {formValues?.bloodSerumTestConducted?.includes(
                        "regionalLabResult"
                      ) && (
                        <Row>

                      <Divider plain>IP Darker result Result</Divider>
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="Date result released"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedRegionalLab"
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
                                name="dateResultReleasedRegionalLab"
                              />
                            </ClearableFormItem>
                          </Col>

                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="IgM"
                              name="regionalLabResultIgm"
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
                                disabled={labComponentDisabled}
                              >
                                <Radio.Button value="positive">
                                  Positive
                                </Radio.Button>
                                <Radio.Button value="negative">
                                  Negative
                                </Radio.Button>
                                <Radio.Button value="inconclusive">
                                  Inconclusive
                                </Radio.Button>
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="notDone">
                                  Not done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="PCR"
                              name="regionalLabResultPcr"
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
                                disabled={labComponentDisabled}
                              >
                                <Radio.Button value="positive">
                                  Positive
                                </Radio.Button>
                                <Radio.Button value="negative">
                                  Negative
                                </Radio.Button>
                                <Radio.Button value="inconclusive">
                                  Inconclusive
                                </Radio.Button>
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="notDone">
                                  Not done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="PRNT"
                              name="regionalLabResultPrnt"
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
                                disabled={labComponentDisabled}
                              >
                                <Radio.Button value="positive">
                                  Positive
                                </Radio.Button>
                                <Radio.Button value="negative">
                                  Negative
                                </Radio.Button>
                                <Radio.Button value="inconclusive">
                                  Inconclusive
                                </Radio.Button>
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="notDone">
                                  Not done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="Dengue Fever"
                              name="regionalLabResultDengueFever"
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
                                disabled={labComponentDisabled}
                              >
                                <Radio.Button value="positive">
                                  Positive
                                </Radio.Button>
                                <Radio.Button value="negative">
                                  Negative
                                </Radio.Button>
                                <Radio.Button value="inconclusive">
                                  Inconclusive
                                </Radio.Button>
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="notDone">
                                  Not done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="West Nile"
                              name="regionalLabResultWestNile"
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
                                disabled={labComponentDisabled}
                              >
                                <Radio.Button value="positive">
                                  Positive
                                </Radio.Button>
                                <Radio.Button value="negative">
                                  Negative
                                </Radio.Button>
                                <Radio.Button value="inconclusive">
                                  Inconclusive
                                </Radio.Button>
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="notDone">
                                  Not done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="Chikungunya"
                              name="regionalLabResultChikungunya"
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
                                disabled={labComponentDisabled}
                              >
                                <Radio.Button value="positive">
                                  Positive
                                </Radio.Button>
                                <Radio.Button value="negative">
                                  Negative
                                </Radio.Button>
                                <Radio.Button value="inconclusive">
                                  Inconclusive
                                </Radio.Button>
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="notDone">
                                  Not done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>
                        </Row>
                      )}
                    </>
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
