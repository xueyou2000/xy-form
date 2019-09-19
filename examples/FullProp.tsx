import React, { useState, useRef } from "react";
import { Form, FormBlock, FormArrayBlock, FormItem, FormItemField, FormRestButton, FormSubmitButton } from "../src";
import "./index.scss";

import { Input, InputGroup, TextArea } from "xy-input";
import "xy-input/assets/index.css";

import { Button, ButtonGroup } from "xy-button";
import "xy-button/assets/index.css";

import InputNumber from "xy-input-number";
import "xy-input-number/assets/index.css";
import { FormMethods } from "../src/interface";
import { ValidateConfig } from "../src/ValidateUtils/ValidateInterface";
import { ValidateError } from "../src/ValidateUtils/FormValidate";

interface Model {
    certInfo: {
        idType: string;
        idNumber: string;
        age: number;
        deep: {
            deppValue: string;
        };
    };
    name: string;
}

const DefaultValue: Model = {
    name: "默认名称",
    certInfo: {
        idType: "身份证",
        idNumber: "55555",
        age: 99,
        deep: {
            deppValue: "深度的值",
        },
    },
};

const rule: ValidateConfig<Model> = {
    certInfo: {
        idType: [{ name: "Required" }],
        idNumber: [{ name: "Required" }],
        age: [{ name: "Required" }],
        deep: {
            deppValue: [{ name: "Required" }],
        },
    },
    name: [{ name: "Required", errMsg: "{{NAME}}必填" }],
};

export default function() {
    const formMethods = useRef<FormMethods>(null);

    function onValidateFail(error: ValidateError, data: Model) {
        console.log("表单验证失败", data, error.message, error.input);
    }

    function submit(data: Model) {
        console.log("提交", data);
    }

    function setModel() {
        formMethods.current.setModel({
            name: "默认名称",
            certInfo: {
                idType: "身份证",
                idNumber: "55555",
                age: 99,
                deep: {
                    deppValue: "深度的值",
                },
            },
        });
    }

    return (
        <div className="form-demo">
            <Form
                labelWidth="100px"
                validConfig={rule}
                onValidateFail={onValidateFail}
                defaultModel={DefaultValue}
                onSubmit={submit}
                getFormMethods={(methods) => (formMethods.current = methods)}
            >
                <FormItem prop="name" label="名称">
                    <Input />
                </FormItem>
                <FormItem prop="certInfo.idType" label="证件类型">
                    <Input />
                </FormItem>
                <FormItem prop="certInfo.idNumber" label="证件号">
                    <Input />
                </FormItem>
                <FormItem prop="certInfo.age" label="年龄">
                    <InputNumber />
                </FormItem>
                <FormItem prop="certInfo.deep.deppValue" label="证件号">
                    <Input />
                </FormItem>
                <FormItem label="">
                    <FormSubmitButton>
                        <Button type="primary">提交</Button>
                    </FormSubmitButton>
                    <Button onClick={() => console.log(formMethods.current.toData())}>获取值</Button>
                    <Button onClick={setModel}>主动设置模型</Button>
                </FormItem>
            </Form>
        </div>
    );
}
