import React, { useState } from "react";
import { Form, FormBlock, FormItem, FormItemField, FormRestButton, FormSubmitButton } from "../src";
import "./index.scss";

import { Input, InputGroup, TextArea } from "xy-input";
import "xy-input/assets/index.css";

import InputNumber from "xy-input-number";
import "xy-input-number/assets/index.css";

import { Option, OptGroup, Select } from "xy-select";
import "xy-select/assets/index.css";

import Switch from "xy-switch";
import "xy-switch/assets/index.css";

import { Checkbox, Radio, CheckboxGroup, RadioGroup } from "xy-checkbox";
import "xy-checkbox/assets/index.css";

import { Button, ButtonGroup } from "xy-button";
import "xy-button/assets/index.css";

import { Row, Col } from "xy-grid";
import "xy-grid/assets/index.css";

import { TimeSelect } from "xy-time-select";
import "xy-time-select/assets/index.css";

import { TimePicker } from "xy-time-picker";
import "xy-time-picker/assets/index.css";

import { DatePicker, DateRangePicker } from "xy-date-picker";
import "xy-date-picker/assets/index.css";

import { dateParse } from "utils-dom";

export default function() {
    function onSubmit(data: any) {
        console.log("提交:", data);
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("提交完毕");
                resolve(data);
            }, 3000);
        });
    }

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    return (
        <div className="form-demo" style={{ width: "500px" }}>
            <Form labelWidth="100px" onSubmit={onSubmit}>
                <FormItem label="证件信息" required={true}>
                    <InputGroup compact={true}>
                        <FormItemField label="证件类型" prop="idType">
                            <Select style={{ width: "30%" }}>
                                <Option>身份证</Option>
                                <Option>军人证</Option>
                            </Select>
                        </FormItemField>
                        <FormItemField label="证件号" prop="idNumber">
                            <Input style={{ width: "70%" }} />
                        </FormItemField>
                    </InputGroup>
                </FormItem>
                <FormItem label="活动名称" prop="name">
                    <Input />
                </FormItem>
                <FormItem label="活动天数" prop="day">
                    <InputNumber />
                </FormItem>
                <FormItem label="活动区域" prop="region">
                    <Select>
                        <Option>区域A</Option>
                        <Option>区域B</Option>
                    </Select>
                </FormItem>
                <FormItem label="活动日期">
                    <Row>
                        <Col span={11}>
                            <FormItemField label="活动开始日期" prop="startDate">
                                <DatePicker max={end} onChange={(v) => setStart(dateParse(v))} />
                            </FormItemField>
                        </Col>
                        <Col className="line" span={2}>
                            -
                        </Col>
                        <Col span={11}>
                            <FormItemField label="活动结束日期" prop="endDate">
                                <DatePicker min={start} onChange={(v) => setEnd(dateParse(v))} />
                            </FormItemField>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="日期范围" prop="date-range">
                    <DateRangePicker />
                </FormItem>
                <FormItem label="时间选择" prop="time-picker">
                    <TimePicker />
                </FormItem>
                <FormItem label="时间下拉" prop="time-select">
                    <TimeSelect />
                </FormItem>
                <FormItem label="即时配送" prop="delivery" valueKey="checked">
                    <Switch />
                </FormItem>
                <FormItem label="活动性质" prop="type">
                    <CheckboxGroup>
                        <Checkbox value="A">美食/餐厅线上活动</Checkbox>
                        <Checkbox value="B">地推活动</Checkbox>
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
                    <FormSubmitButton>
                        <Button type="primary">提交</Button>
                    </FormSubmitButton>
                    <FormRestButton>
                        <Button>重置</Button>
                    </FormRestButton>
                </FormItem>
            </Form>
        </div>
    );
}
