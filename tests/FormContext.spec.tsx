import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Form, FormItem, FormItemField, ValidateTrigger } from "../src";
import { FieldConfig } from "../src/ValidateUtils/ValidateInterface";
import { ValidateParams } from "../src/interface";

describe("FormContext", () => {
    test("disabled form", () => {
        const wrapper = render(
            <Form disabled={true}>
                <FormItem prop="name">
                    <input type="text" placeholder="请输入name" />
                </FormItem>
                <FormItem prop="age">
                    <input type="number" placeholder="请输入age" />
                </FormItem>
            </Form>,
        );
        const nameInput = wrapper.getByPlaceholderText("请输入name") as HTMLInputElement;
        const ageInput = wrapper.getByPlaceholderText("请输入age") as HTMLInputElement;

        expect(nameInput.disabled).toBe(true);
        expect(ageInput.disabled).toBe(true);
    });

    test("trigger blur", () => {
        const fn = jest.fn((value: any, configs: FieldConfig[], params: ValidateParams) => Promise.resolve());
        const wrapper = render(
            <Form trigger={ValidateTrigger.blur} onFieldValidate={fn}>
                <FormItem prop="name" label="姓名">
                    <input type="text" placeholder="请输入" />
                </FormItem>
            </Form>,
        );
        const input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "ab" } });

        expect(fn).not.toBeCalled();

        fireEvent.blur(input);
        expect(fn).toBeCalled();
        expect(fn.mock.calls[0][0]).toBe("ab");
        expect(fn.mock.calls[0][2].label).toBe("姓名");
        expect(fn.mock.calls[0][2].input).toBe(input);
        expect(fn.mock.calls[0][2].trigger).toBe(ValidateTrigger.blur);
    });

    test("label position", () => {
        var wrapper = render(
            <Form labelPosition="left">
                <FormItem prop="name" label="姓名">
                    <input type="text" placeholder="请输入" />
                </FormItem>
            </Form>,
        );
        var form = wrapper.container.querySelector(".xy-form");
        var input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        var formItemContent = input.parentElement;
        var label = wrapper.getByText("姓名");
        expect(label.style.width).toBe("85px");
        expect(formItemContent.style.marginLeft).toBe("85px");
        expect(form.classList.contains("xy-form--label-left")).toBeTruthy();

        wrapper.rerender(
            <Form labelPosition="right">
                <FormItem prop="name" label="姓名">
                    <input type="text" placeholder="请输入" />
                </FormItem>
            </Form>,
        );

        expect(label.style.width).toBe("85px");
        expect(formItemContent.style.marginLeft).toBe("85px");
        expect(form.classList.contains("xy-form--label-right")).toBeTruthy();
    });

    test("label top position", () => {
        var wrapper = render(
            <Form labelPosition="top">
                <FormItem prop="name" label="姓名">
                    <input type="text" placeholder="请输入" />
                </FormItem>
            </Form>,
        );
        var form = wrapper.container.querySelector(".xy-form");
        var input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        var formItemContent = input.parentElement;
        var label = wrapper.getByText("姓名");

        expect(label.style.width).toBe("");
        expect(formItemContent.style.marginLeft).toBe("");
        expect(form.classList.contains("xy-form--label-top")).toBeTruthy();
    });

    test("label width", () => {
        const wrapper = render(
            <Form labelWidth="120px">
                <FormItem prop="name" label="姓名">
                    <input type="text" placeholder="请输入" />
                </FormItem>
            </Form>,
        );
        const input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        const formItemContent = input.parentElement;
        const label = wrapper.getByText("姓名");
        expect(label.style.width).toBe("120px");
        expect(formItemContent.style.marginLeft).toBe("120px");
    });

    test("inline mode", () => {
        const wrapper = render(
            <Form inline={true}>
                <FormItem prop="name" label="姓名">
                    <input type="text" placeholder="请输入" />
                </FormItem>
            </Form>,
        );
        const form = wrapper.container.querySelector(".xy-form");
        expect(form.classList.contains("xy-form--inline")).toBeTruthy();
    });
});
