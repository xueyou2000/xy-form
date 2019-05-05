import React from "react";
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

import { Checkbox, Radio, CheckboxGroup, RadioGroup } from "xy-checkbox";
import "xy-checkbox/assets/index.css";

import { Button, ButtonGroup } from "xy-button";
import "xy-button/assets/index.css";

export default function() {
    return (
        <Form inline={true}>
            <FormItem prop="user">
                <Input placeholder="Username" />
            </FormItem>
            <FormItem prop="password">
                <Input type="password" placeholder="Password" />
            </FormItem>
            <FormItem>
                <Button type="primary">Signin</Button>
            </FormItem>
        </Form>
    );
}
