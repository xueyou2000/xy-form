import React from "react";
import { Form, FormItem, FormItemField, ValidateTrigger } from "../src";
import { FieldConfig } from "../src/ValidateUtils/ValidateInterface";
import { ValidateParams } from "../src/interface";

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

export default function() {
    function onFieldValidate(val: string, configs: FieldConfig[], params: ValidateParams) {
        console.log(val, configs, params);
        return Promise.resolve();
    }

    return (
        <div className="form-demo" style={{ width: "500px" }}>
            <Form labelPosition="top">
                <FormItem prop="name" label="姓名">
                    <input type="text" placeholder="请输入" />
                </FormItem>
                <FormItem>
                    <Button type="primary">Signin</Button>
                </FormItem>
            </Form>
        </div>
    );
}
