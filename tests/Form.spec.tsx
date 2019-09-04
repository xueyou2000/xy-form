import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { Form, FormItem, FormItemField, FormBlock, ValidateTrigger } from "../src";
import { FieldConfig } from "../src/ValidateUtils/ValidateInterface";
import { ValidateParams, FormMethods } from "../src/interface";
import { Select, Option } from "xy-select";

export interface Model {
    name: string;
    age: number;
    names: string[];
    nest: {
        next_name: string;
        nest2: {
            nest2_name: string;
        };
    };
}

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
            </Form>,
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
            </Form>,
        );

        const input = wrapper.getByPlaceholderText("请输入") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "111" } });
        expect(input.value).toBe("111");
        fireEvent.click(wrapper.getByDisplayValue("重置"));
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
            </Form>,
        );
        fireEvent.click(wrapper.getByText("提交"));
        expect(fn).toBeCalled();
    });

    test("set model", () => {
        var methods: FormMethods;
        const wrapper = render(
            <Form getFormMethods={(c) => (methods = c)}>
                <FormItem prop="name" label="姓名">
                    <input type="text" placeholder="请输入姓名" />
                </FormItem>
                <FormItem prop="age" label="年龄">
                    <input type="number" placeholder="请输入年龄" />
                </FormItem>
                <FormItem prop="names" label="字符串集合">
                    <Select multiple={true}>
                        <Option>a</Option>
                        <Option>b</Option>
                        <Option>c</Option>
                    </Select>
                </FormItem>
                <FormBlock prop="nest">
                    <FormItem prop="next_name" label="嵌套姓名">
                        <input type="text" placeholder="请输入嵌套姓名" />
                    </FormItem>
                    <FormBlock prop="nest2">
                        <FormItem prop="nest2_name" label="嵌套姓名2">
                            <input type="text" placeholder="请输入嵌套姓名2" />
                        </FormItem>
                    </FormBlock>
                </FormBlock>
                <button>提交</button>
            </Form>,
        );

        act(() =>
            methods.setModel<Model>({
                name: "abc",
                age: 12,
                names: ["a", "b"],
                nest: {
                    next_name: "name1",
                    nest2: {
                        nest2_name: "name2",
                    },
                },
            }),
        );

        expect((wrapper.getByPlaceholderText("请输入姓名") as HTMLInputElement).value).toBe("abc");
        expect((wrapper.getByPlaceholderText("请输入年龄") as HTMLInputElement).value).toBe("12");
        const selected = wrapper.container.querySelectorAll(".xy-select-item__content") as NodeListOf<HTMLElement>;
        expect([].map.call(selected, (node: HTMLElement) => node.textContent)).toEqual(["a", "b"]);
        expect((wrapper.getByPlaceholderText("请输入嵌套姓名") as HTMLInputElement).value).toBe("name1");
        expect((wrapper.getByPlaceholderText("请输入嵌套姓名2") as HTMLInputElement).value).toBe("name2");
    });
});
