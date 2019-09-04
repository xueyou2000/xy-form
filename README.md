| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-form.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-form.svg?style=flat-square)

[![xy-form](https://nodei.co/npm/xy-form.png)](https://npmjs.org/package/xy-form)

# xy-form

表单组件, 提供了表单样式, 数据存储

## 安装

```bash
# yarn
yarn add xy-form
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { Form, Separator, FormBlock, FormItem, FormItemField } from "xy-form";
ReactDOM.render(
    <Form onSubmitBefore={onSubmitBefore} onSubmit={onSubmit}>
        <FormItem label="姓名" prop="name">
            <input type="text" />
        </FormItem>
        <FormItem label="手机号" prop="phone">
            <input type="text" />
        </FormItem>
        <button>提交</button>
        <input type="reset" value="重置" />
    </Form>,
    container,
);
```

## API

### Form

| 属性            | 说明                     | 类型                                                                              | 默认值                 |
| --------------- | ------------------------ | --------------------------------------------------------------------------------- | ---------------------- |
| disabled        | 是否禁用表单             | boolean                                                                           | false                  |
| trigger         | 默认触发事件             | ValidateTrigger                                                                   | ValidateTrigger.change |
| labelPosition   | 标签对齐位置             | "right"/"left"/"top"                                                              | "left"                 |
| labelWidth      | 标签宽度                 | string                                                                            | "85px"                 |
| inline          | 是否内联模式             | boolean                                                                           | false                  |
| action          | 与原生表单一样           | string                                                                            | 无                     |
| enctype         | 与原生表单一样           | string                                                                            | 无                     |
| method          | 与原生表单一样           | string                                                                            | 无                     |
| name            | 与原生表单一样           | string                                                                            | 无                     |
| target          | 与原生表单一样           | string                                                                            | 无                     |
| defaultModel    | 默认对象, 用于提供默认值 | any                                                                               | 无                     |
| validConfig     | 验证配置                 | ValidateConfig<any>                                                               | 无                     |
| getFormMethods  | 获取表单方法             | (methods: FormMethods) => void                                                    | 无                     |
| onFieldChange   | 字段值改变事件           | (prop: string, value: any) => void                                                | 无                     |
| onFieldValidate | 字段需要验证事件         | (value: any, configs: FieldConfig[], params: ValidateParams) => Promise<any>      | 无                     |
| onSubmitBefore  | 开始点击提交按钮         | (data: any) => void                                                               | 无                     |
| onFormValidate  | 表单需要验证事件         | (fieldMapper: React.MutableRefObject<Map<string, FormItemState>>) => Promise<any> | 无                     |
| onValidateFail  | 表单验证失败事件         | (error: Error, data: any) => void                                                 | 无                     |
| onSubmit        | 表单提交事件             | (data: any) => void                                                               | 无                     |

### FormBlock

| 属性 | 说明       | 类型   | 默认值 |
| ---- | ---------- | ------ | ------ |
| prop | 字段域名称 | string | 无     |

### FormItemField

| 属性             | 说明                                                                | 类型                                                                                                              | 默认值  |
| ---------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------- |
| prop             | 代理字段名                                                          | string                                                                                                            | 无      |
| valueKey         | 代理值的 key                                                        | string                                                                                                            | "value" |
| converValue      | 如何从 onChange 转换值                                              | (val: any) => any                                                                                                 | 无      |
| label            | 中文标签名                                                          | string                                                                                                            | 无      |
| children         | 代理输入组件                                                        | React.ReactNode                                                                                                   | 无      |
| trigger          | 默认触发事件                                                        | ValidateTrigger                                                                                                   | 无      |
| defaultValue     | 默认值                                                              | any                                                                                                               | 无      |
| normalize        | 规范化函数, 比如绑定的是 Date 类型，form 最后同步时可以是日期字符串 | (value: T) => NormalizeResult                                                                                     | 无      |
| disabledValidate | 是否禁用验证                                                        | boolean                                                                                                           | 无      |
| onValidate       | 执行验证事件                                                        | (value: T, validateResult: ValidateResult, input: HTMLElement, normalize?: (value: T) => NormalizeResult) => void | 无      |

### FormItem

| 属性             | 说明                                                                | 类型                                                                                                              | 默认值  |
| ---------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------- |
| labelPosition    | 标签对齐位置                                                        | "right"/"left"/"top"                                                                                              | "left"  |
| prop             | 代理字段名                                                          | string                                                                                                            | 无      |
| valueKey         | 代理值的 key                                                        | string                                                                                                            | "value" |
| converValue      | 如何从 onChange 转换值                                              | (val: any) => any                                                                                                 | 无      |
| label            | 中文标签名                                                          | React.ReactNode                                                                                                   | 无      |
| children         | 代理输入组件                                                        | React.ReactNode                                                                                                   | 无      |
| trigger          | 默认触发事件                                                        | ValidateTrigger                                                                                                   | 无      |
| defaultValue     | 默认值                                                              | any                                                                                                               | 无      |
| normalize        | 规范化函数, 比如绑定的是 Date 类型，form 最后同步时可以是日期字符串 | (value: T) => NormalizeResult                                                                                     | 无      |
| disabledValidate | 是否禁用验证                                                        | boolean                                                                                                           | 无      |
| onValidate       | 执行验证事件                                                        | (value: T, validateResult: ValidateResult, input: HTMLElement, normalize?: (value: T) => NormalizeResult) => void | 无      |

## Form

-   顶级就能控制所有输入框的 disabled 状态
-   提供通用的默认配置, 详细看`FormContext`
-   提供很多事件钩子， 比如字段值改变， 比如字段验证状态改变， 比如表单验证完毕等
-   挂接原生 submit,rest 事件
-   表单样式
-   提供表单方法, 详细看`FormMethods`

## FormBlock

-   用于嵌套数据

## FormItem

-   提供表单段落样式
-   显示错误信息文本
-   指定某个字段验证状态改变后， 再次判断是否验证失败
-   提供了`prop`则默认自带`FormItemField`组件

## FormItemField

-   代理包裹组件的`value`, `onChange`, `disabled`属性
-   内部有验证是否失败状态, 和失败原因
-   初始化时候保留当前组件初始值, initialValue, 在 form.resetFields()时候以重置输入框的值
-   normalize, 可选规范化函数， 比如绑定的是 Date 类型，form 最后同步时可以是日期字符串

---

## FormContext

> 提供整体通过默认状态

-   `disabled` 是否全部默认禁用
-   `trigger` 全部默认触发事件
-   `labelPosition` 标签对齐位置 "right" | "left" | "top"
-   `labelWidth` 标签宽度
-   `inline` 是否内陆模式

## FormMehhods

> 提供表单操作功能

```ts
export interface FormMethods {
    /**
     * 设置模型值
     * @description 快速设置整个模型的值
     */
    setModel: (model: any) => any;
    /**
     * 获取字段值
     */
    getFieldValue: (prop: string) => any;
    /**
     * 设置字段值
     */
    setFieldValue: (prop: string, value: any) => void;
    /**
     * 获取字段验证结果
     */
    getFieldValidateResult: (props: string) => ValidateResult;
    /**
     * 重置字段到初始值
     */
    resetField: (prop: string) => void;
    /**
     * 重置所有字段到初始值
     */
    resetFields: () => void;
    /**
     * 验证指定字段
     */
    validateField: (prop: string) => Promise<any>;
    /**
     * 验证所有字段
     */
    validateFields: () => Promise<any>;
    /**
     * 获取对应标签
     */
    getFieldLabel: (prop: string) => React.ReactNode;
    /**
     * 表单提交
     */
    submit: (uncaught?: boolean) => Promise<any>;
    /**
     * 获取数据
     */
    toData: () => any;
}
```

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-form is released under the MIT license.
