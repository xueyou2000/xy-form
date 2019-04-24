import React from "react";
import { Form, FormBlock, FormItem, FormItemField } from "../src";
import { ValidateTrigger } from "../src/ValidateUtils/ValidateTrigger";
import { FormMethods } from "../src/interface";
import { FieldConfig, ValidateConfig } from "../src/ValidateUtils/ValidateInterface";
import { ValidateError } from "../src/ValidateUtils/FormValidate";

/**
 * 民警配置
 */
interface PoliceConfig {
    /**
     * 执勤时间
     */
    dutyTime: number;
    /**
     * 是否休息
     */
    halt: boolean;
    /**
     * 内部嵌套
     */
    nest2?: {
        t2_1: string;
    };
}

/**
 * 民警新增Dto
 */
interface PoliceAddDto {
    /**
     * 民警名称
     */
    name: string;
    /**
     * 手机号
     */
    phone: string;
    /**
     * 地址
     */
    address: string;
    /**
     * 年纪
     */
    age: number;
    /**
     * 民警配置
     */
    config: PoliceConfig;
}

export default function() {
    let formMethods: FormMethods;
    const policeAddDto: PoliceAddDto = {
        name: "",
        phone: "",
        age: null,
        address: "默认地址",
        config: {
            dutyTime: null,
            halt: false,
            nest2: {
                t2_1: "12"
            }
        }
    };

    const rule: ValidateConfig<PoliceAddDto> = {
        name: [{ name: "Required", errMsg: "{{NAME}}必填" }],
        phone: [{ name: "Required" }],
        address: [{ name: "Required" }],
        age: [{ name: "Required" }],
        config: {
            dutyTime: [{ name: "Required" }],
            halt: [{ name: "Required" }],
            nest2: {
                t2_1: [{ name: "Required" }]
            }
        }
    };

    function onFieldChange(prop: string, value: any) {
        console.log("-onFieldChange", prop, value);
    }

    function onSubmitBefore(data: PoliceAddDto) {
        console.log("-onSubmitBefore", data);
    }

    function onSubmit(data: PoliceAddDto) {
        console.log("-onSubmit", data);
    }

    function onValidateFail(data: PoliceAddDto, error: ValidateError) {
        console.log("表单验证失败", data, error.message, error.input, error.name, error.validName, error.trigger);
    }

    return (
        <div>
            <h1>简单演示</h1>

            <Form defaultModel={policeAddDto} validConfig={rule} onValidateFail={onValidateFail} onFieldChange={onFieldChange} onSubmitBefore={onSubmitBefore} onSubmit={onSubmit} getFormMethods={(methods) => (formMethods = methods)}>
                <FormItem label="民警名称" prop="name">
                    <input type="text" />
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <input type="text" />
                </FormItem>
                <FormItem label="年龄" prop="age">
                    <input type="number" />
                </FormItem>
                <FormItem label="地址" prop="address">
                    <input type="text" />
                </FormItem>

                <FormBlock prop="config">
                    <FormItem label="执勤时间" prop="dutyTime">
                        <input type="number" />
                    </FormItem>
                    <FormBlock prop="nest2">
                        <FormItem label="深层嵌套" prop="t2_1">
                            <input type="string" />
                        </FormItem>
                    </FormBlock>
                </FormBlock>
                <button>提交</button>
                <input type="reset" value="重置" />
            </Form>

            <button onClick={() => console.log(formMethods.getFieldValue("name"))}>获取字段值</button>
            <button onClick={() => formMethods.setFieldValue("name", "123")}>设置字段值</button>
            <button onClick={() => formMethods.resetFields()}>重置</button>
            <button onClick={() => console.log(formMethods.getFieldLabel("name"))}>获取标签名</button>
            <button onClick={() => formMethods.submit()}>表单提交</button>
        </div>
    );
}
