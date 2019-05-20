import React, { useState, useRef } from "react";
import { Form, FormBlock, FormItem, FormItemField, FormRestButton } from "../src";
import "./index.scss";

import { Input, InputGroup, TextArea } from "xy-input";
import "xy-input/assets/index.css";

import InputNumber from "xy-input-number";
import "xy-input-number/assets/index.css";

import { Option, OptGroup, Select } from "xy-select";
import "xy-select/assets/index.css";

import Switch from "xy-switch";
import "xy-switch/assets/index.css";

import { Row, Col } from "xy-grid";
import "xy-grid/assets/index.css";

import { Checkbox, Radio, CheckboxGroup, RadioGroup } from "xy-checkbox";
import "xy-checkbox/assets/index.css";

import { Button, ButtonGroup } from "xy-button";
import "xy-button/assets/index.css";
import { ValidateError } from "../src/ValidateUtils/FormValidate";
import { ValidateConfig } from "../src/ValidateUtils/ValidateInterface";
import { FormMethods } from "../src/interface";

interface Model {
    certInfo: {
        idType: string;
        idNumber: string;
        age: number;
    };
    name: string;
    day: number;
    day2: number;
    region: string;
    phone?: string;
    delivery: boolean;
    type: string[];
    resource: string;
    desc: string;
}

export default function() {
    let formMethods: FormMethods;
    const model = useRef<Model>({
        certInfo: {
            idType: "军人证",
            idNumber: "XXXXXX-00001",
            age: 15
        },
        name: "活动1",
        day: 2,
        day2: 10,
        phone: null,
        region: "区域B",
        delivery: true,
        type: ["B", "C"],
        resource: "B",
        desc: "默认描述..."
    });

    const rule: ValidateConfig<Model> = {
        certInfo: {
            idType: [{ name: "Required" }],
            idNumber: [{ name: "Required" }],
            age: [{ name: "Required" }]
        },
        name: [{ name: "Required", errMsg: "{{NAME}}必填" }],
        day: [{ name: "Required" }],
        day2: [{ name: "Required" }],
        phone: [{ name: "Required" }, { name: "PhoneNo" }],
        region: [{ name: "Required" }],
        delivery: [{ name: "Required" }],
        type: [{ name: "Required" }],
        resource: [{ name: "Required" }],
        desc: [{ name: "Required" }]
    };

    const [min, setMin] = useState(model.current.day);
    const [max, setMax] = useState(model.current.day2);

    function onSubmit(data: any) {
        console.log("-onSubmit", data);
    }

    function onValidateFail(error: ValidateError, data: Model) {
        console.log("表单验证失败", data, error.message, error.input);
    }

    function setModel() {
        formMethods.setModel({
            certInfo: {
                idType: "军人证",
                idNumber: "XXXXXX-00001",
                age: 15
            },
            name: "活动1",
            day: 2,
            day2: 10,
            phone: "asdsadsa",
            xx: 123,
            region: "区域B",
            delivery: true,
            type: ["B", "C"],
            resource: "B",
            desc: "默认描述..."
        });
    }

    return (
        <div className="form-demo">
            <Form labelWidth="100px" defaultModel={model.current} validConfig={rule} onSubmit={onSubmit} onValidateFail={onValidateFail} getFormMethods={(methods) => (formMethods = methods)}>
                <FormItem label="证件信息">
                    <FormBlock prop="certInfo">
                        <InputGroup compact={true}>
                            <FormItemField label="证件类型" prop="idType">
                                <Select style={{ width: "30%" }}>
                                    <Option value={null}>请选择</Option>
                                    <Option>身份证</Option>
                                    <Option>军人证</Option>
                                </Select>
                            </FormItemField>
                            <FormItemField label="证件号" prop="idNumber">
                                <Input style={{ width: "50%" }} />
                            </FormItemField>
                            <FormItemField label="年龄" prop="age">
                                <InputNumber style={{ width: "20%", minWidth: "20%" }} />
                            </FormItemField>
                        </InputGroup>
                    </FormBlock>
                </FormItem>
                <FormItem label={<span>活动名称</span>} prop="name">
                    <Input />
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input />
                </FormItem>
                <FormItem label="活动天数区间">
                    <Row>
                        <Col span={11}>
                            <FormItemField label="起始活动天数" prop="day">
                                <InputNumber max={max} onChange={setMin} />
                            </FormItemField>
                        </Col>
                        <Col span={2} style={{ textAlign: "center" }}>
                            -
                        </Col>
                        <Col span={11}>
                            <FormItemField label="结束活动天数" prop="day2">
                                <InputNumber min={min} onChange={setMax} />
                            </FormItemField>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="活动区域" prop="region">
                    <Select>
                        <Option value={null}>请选择</Option>
                        <Option>区域A</Option>
                        <Option>区域B</Option>
                    </Select>
                </FormItem>
                <FormItem label="即时配送" prop="delivery" valueKey="checked">
                    <Switch />
                </FormItem>
                <FormItem label="活动性质" prop="type">
                    <CheckboxGroup>
                        <Checkbox value="A">美食/餐厅线上活动</Checkbox>
                        <Checkbox value="B">地推活动</Checkbox>

                        <br />

                        <Checkbox value="C">线下主题活动</Checkbox>
                        <Checkbox value="D">单纯品牌曝光</Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="特殊资源" prop="resource">
                    <RadioGroup>
                        <Radio value="A">线上品牌商赞助</Radio>
                        <Radio value="B">线下场地免费</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="活动形式" prop="desc">
                    <TextArea autosize={{ minRows: 5, maxRows: 5 }} />
                </FormItem>
                <FormItem label="">
                    <Button type="primary">提交</Button>
                    <FormRestButton>
                        <Button>重置</Button>
                    </FormRestButton>
                    <Button onClick={setModel}>主动设置模型</Button>
                </FormItem>
            </Form>
        </div>
    );
}
