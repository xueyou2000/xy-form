# xy-form

---

[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/xy-form.svg?style=flat-square
[npm-url]: http://npmjs.org/package/xy-form
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/xy-form.svg?style=flat-square
[download-url]: https://npmjs.org/package/xy-form

> `基于React`的表单组件, 提供了表单样式, 数据存储

## 安装

[![xy-form](https://nodei.co/npm/xy-form.png)](https://npmjs.org/package/xy-form)

| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

```sh
# npm
npm install --save xy-form utils-hooks validate-methods validate-provider validate-runner classnames

# yarn
yarn add xy-form utils-hooks validate-methods validate-provider validate-runner classnames
```

## 使用

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
    container
);
```

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
