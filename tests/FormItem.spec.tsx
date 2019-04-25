import React from "react";
import { render, fireEvent, act } from "react-testing-library";
import { Form, FormItem, FormItemField, ValidateTrigger } from "../src";
import { FieldConfig } from "../src/ValidateUtils/ValidateInterface";
import { ValidateParams, FormMethods } from "../src/interface";

describe("FormItem", () => {
    test("any child validate fial", () => {
        var methods: FormMethods;
        const wrapper = render(
            <Form getFormMethods={(c) => (methods = c)}>
                <FormItem label="姓名">
                    <FormItemField prop="name">
                        <input type="text" placeholder="请输入1" />
                    </FormItemField>
                    <FormItemField prop="name2">
                        <input type="text" placeholder="请输入2" />
                    </FormItemField>
                </FormItem>
            </Form>
        );
        act(() => methods.setFieldValidateResult("name", { status: false, msg: "验证失败" }));
        expect(wrapper.getByText("验证失败").classList.contains("xy-form-item-error-msg")).toBeTruthy();
    });

    test("all validate fial", () => {
        var methods: FormMethods;
        const wrapper = render(
            <Form getFormMethods={(c) => (methods = c)}>
                <FormItem label="姓名">
                    <FormItemField prop="name">
                        <input type="text" placeholder="请输入1" />
                    </FormItemField>
                    <FormItemField prop="name2">
                        <input type="text" placeholder="请输入2" />
                    </FormItemField>
                </FormItem>
            </Form>
        );
        act(() => methods.setFieldValidateResult("name", { status: false, msg: "name验证失败" }));
        act(() => methods.setFieldValidateResult("name2", { status: false, msg: "name2验证失败" }));

        expect(wrapper.getByText("name验证失败 , name2验证失败").classList.contains("xy-form-item-error-msg")).toBeTruthy();
    });

    test("validate success", () => {
        var methods: FormMethods;
        const wrapper = render(
            <Form getFormMethods={(c) => (methods = c)}>
                <FormItem label="姓名">
                    <FormItemField prop="name">
                        <input type="text" placeholder="请输入1" />
                    </FormItemField>
                    <FormItemField prop="name2">
                        <input type="text" placeholder="请输入2" />
                    </FormItemField>
                </FormItem>
            </Form>
        );
        act(() => methods.setFieldValidateResult("name", { status: false, msg: "name验证失败" }));

        expect(wrapper.getByText("name验证失败").classList.contains("xy-form-item-error-msg")).toBeTruthy();

        act(() => methods.setFieldValidateResult("name", { status: true, msg: null }));
        expect(wrapper.container.querySelector(".xy-form-item-error-msg")).toBeNull();
    });
});
