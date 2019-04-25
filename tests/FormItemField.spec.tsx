import React from "react";
import { render, fireEvent, act } from "react-testing-library";
import { Form, FormItem, FormItemField, ValidateTrigger } from "../src";
import { FieldConfig } from "../src/ValidateUtils/ValidateInterface";
import { ValidateParams, FormMethods } from "../src/interface";

describe("FormItemField", () => {
    test("defaultValue", () => {
        const wrapper = render(
            <Form>
                <FormItemField prop="name" defaultValue="123">
                    <input type="text" placeholder="请输入" />
                </FormItemField>
            </Form>
        );
        const input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        expect(input.value).toBe("123");
        expect(input.name).toBe("name");
    });

    test("rest", () => {
        var methods: FormMethods;
        const wrapper = render(
            <Form getFormMethods={(c) => (methods = c)}>
                <FormItem prop="name" label="姓名" defaultValue="abc">
                    <input type="text" placeholder="请输入" />
                </FormItem>
            </Form>
        );
        const input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        act(() => methods.setFieldValidateResult("name", { status: false, msg: "验证失败" }));
        fireEvent.change(input, { target: { value: "111" } });

        expect(input.value).toBe("111");

        expect(input.classList.contains("valid-error")).toBeTruthy();
        expect(wrapper.getByText("验证失败").classList.contains("xy-form-item-error-msg")).toBeTruthy();

        act(() => methods.resetFields());

        expect(input.classList.contains("valid-error")).toBeFalsy();
        expect(wrapper.container.querySelector(".xy-form-item-error-msg")).toBeNull();
        expect(input.value).toBe("abc");
    });

    test("get label", () => {
        var methods: FormMethods;
        const wrapper = render(
            <Form getFormMethods={(c) => (methods = c)}>
                <FormItem prop="name" label={<span>姓名</span>}>
                    <input type="text" placeholder="请输入" />
                </FormItem>
            </Form>
        );

        expect(methods.getFieldLabel("name")).toBe("姓名");

        wrapper.rerender(
            <Form getFormMethods={(c) => (methods = c)}>
                <FormItem label={<span>姓名</span>}>
                    <FormItemField prop="name">
                        <input type="text" placeholder="请输入1" />
                    </FormItemField>
                    <FormItemField prop="name2">
                        <input type="text" placeholder="请输入2" />
                    </FormItemField>
                </FormItem>
            </Form>
        );

        expect(methods.getFieldLabel("name")).toBe("姓名");
        expect(methods.getFieldLabel("name2")).toBe("姓名");
    });

    test("set value", () => {
        var methods: FormMethods;
        const wrapper = render(
            <Form getFormMethods={(c) => (methods = c)}>
                <FormItem prop="name">
                    <input type="text" placeholder="请输入" />
                </FormItem>
            </Form>
        );
        const input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        act(() => methods.setFieldValue("name", "abc"));

        expect(input.value).toBe("abc");
    });

    test("normalize value", () => {
        var methods: FormMethods;
        const wrapper = render(
            <Form getFormMethods={(c) => (methods = c)}>
                <FormItem prop="name" normalize={(v) => v + "__"}>
                    <input type="text" placeholder="请输入" />
                </FormItem>
            </Form>
        );
        const input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        act(() => methods.setFieldValue("name", "abc"));

        expect(input.value).toBe("abc");
        expect(methods.getFieldValue("name")).toBe("abc__");
    });

    test("native onChange", () => {
        const fn = jest.fn();
        const wrapper = render(
            <Form>
                <FormItem prop="name">
                    <input type="text" onChange={fn} placeholder="请输入" />
                </FormItem>
            </Form>
        );
        const input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "gg" } });
        expect(fn).toBeCalled();
    });
});
