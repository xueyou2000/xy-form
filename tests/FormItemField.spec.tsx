import React from "react";
import { render } from "react-testing-library";
import { Form, FormItemField } from "../src";

describe("FormItemField", () => {
    test("render", () => {
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
});
