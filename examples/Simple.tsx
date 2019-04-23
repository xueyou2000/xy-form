import React from "react";
import { Form, FormBlock, FormItem, FormItemField } from "../src";
import { ValidateTrigger } from "../src/ValidateUtils/ValidateTrigger";
import { FormMethods } from "../src/interface";

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

export interface Rule {
    disabled?: boolean;
    validName?: string;
    params?: any;
    function?: Function;
}
type ValidValue = string | number | null | boolean;
type RuleConfig<T> = { [P in keyof T]?: (T[P]) extends ValidValue ? Rule[] : RuleConfig<T[P]> };

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

    const rule: RuleConfig<PoliceAddDto> = {
        name: [{ validName: "required" }],
        phone: [{ validName: "required" }],
        address: [{ validName: "required" }],
        age: [{ validName: "required" }],
        config: {
            dutyTime: [{ validName: "required" }],
            halt: [{ validName: "required" }],
            nest2: {
                t2_1: [{ validName: "required" }]
            }
        }
    };

    function onFieldChange(prop: string, value: any) {
        console.log("-onFieldChange", prop, value);
    }

    function onFieldValidate(prop: string, value: any, trigger?: ValidateTrigger) {
        console.log("-onFieldValidate", prop, value, trigger);
        return Promise.reject(new Error(`${formMethods.getFieldLabel(prop)}验证失败啦!`));
    }

    function onSubmitBefore(data: PoliceAddDto) {
        console.log("-onSubmitBefore", data);
    }

    function onSubmit(data: PoliceAddDto) {
        console.log("-onSubmit", data);
    }

    return (
        <div>
            <h1>简单演示</h1>

            <Form defaultModel={policeAddDto} onFieldChange={onFieldChange} onFieldValidate={onFieldValidate} onSubmitBefore={onSubmitBefore} onSubmit={onSubmit} getFormMethods={(methods) => (formMethods = methods)}>
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
            <button onClick={() => console.log(formMethods.getModelByFullProp(rule, "name"))}>获取配置</button>
            <button onClick={() => console.log(formMethods.getModelByFullProp(rule, "config/dutyTime"))}>获取配置(嵌套)</button>
        </div>
    );
}
