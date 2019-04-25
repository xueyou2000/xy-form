import React from "react";
import { render, fireEvent, act } from "react-testing-library";
import { Form, FormItem, FormItemField, FormBlock, ValidateTrigger } from "../src";
import { FieldConfig } from "../src/ValidateUtils/ValidateInterface";
import { ValidateParams, FormMethods } from "../src/interface";

describe("Form", () => {
    test("nest field", () => {
        var methods: FormMethods;
        const wrapper = render(
            <Form getFormMethods={(c) => (methods = c)}>
                <FormBlock prop="config">
                    <FormBlock prop="subCfg">
                        <FormItem prop="name" defaultValue="123">
                            <input type="text" placeholder="请输入" />
                        </FormItem>
                    </FormBlock>
                </FormBlock>
            </Form>
        );

        expect(methods.toData()).toEqual({ config: { subCfg: { name: "123" } } });
    });

    test("form rest", () => {
        var methods: FormMethods;
        const wrapper = render(
            <Form getFormMethods={(c) => (methods = c)}>
                <FormItem prop="name" label="姓名">
                    <input type="text" placeholder="请输入" />
                </FormItem>

                <input type="reset" value="重置" />
            </Form>
        );

        const input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "111" } });
        expect(input.value).toBe("111");
        fireEvent.click(wrapper.getByValue("重置"));
        expect(input.value).toBe("111");
    });

    test("form submit", () => {
        const fn = jest.fn();

        const wrapper = render(
            <Form onSubmitBefore={fn}>
                <FormItem prop="name" label="姓名">
                    <input type="text" placeholder="请输入" />
                </FormItem>

                <button>提交</button>
            </Form>
        );
        fireEvent.click(wrapper.getByText("提交"));
        expect(fn).toBeCalled();
    });
});
