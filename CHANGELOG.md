# Change Log

## 0.2.1 (Wed Sep 11 2019)

-   修复`FormArrayBlock`传递默认模型时没有处理索引的问题

## 0.2.0 (Mon Sep 09 2019)

-   提升版本号

## 0.0.1 (Mon Sep 09 2019)

-   修复`toData`中的`merge`合并改变了默认模型，导致的 BUG！

## 0.0.997 (Mon Sep 09 2019)

-   修复合并代码遗漏的发布

## 0.0.996 (Mon Sep 09 2019)

-   修复`toData`逻辑，现在叠加默认模型

## 0.0.995 (Sat Sep 07 2019)

-   修复`name`传递问题，优先使用元素属性上的值

## 0.0.994 (Thu Sep 05 2019)

-   `ValidateTrigger`增加`none`验证事件

## 0.0.993 (Thu Sep 05 2019)

-   改变表单默认被 button 触发的提交行为

## 0.0.992 (Wed Sep 04 2019)

-   清除控制台打印, 优化代码警告
-   `FormItem`增加`required`必填选项，启用增加红色星号

## 0.0.991 (Tue Jul 09 2019)

-   支持数组域
-   使用`lodash`来解析全路径

## 0.0.99 (Mon Jul 08 2019)

-   修复`fieldValidateDefault`时传入空对象问题

## 0.0.98 (Wed Jun 19 2019)

-   增加`formMethods.getFieldInput`获取字段 dom 元素

## 0.0.97 (Tue Jun 18 2019)

-   修复`FormItem`处理验证状态时候没有使用一次性对象，导致`setState`还是原始值的问题
-   `formMethods.submit`函数延长至`onSubmit`函数执行完毕, 之前验证完毕后,`loading`状态就结束了

## 0.0.96 (Wed May 22 2019)

-   修复验证参数数组被错误解构的 BUG

## 0.0.95 (Tue May 21 2019)

-   提升原始组件`disabled`的优先级, 避免被覆盖

## 0.0.94 (Mon May 20 2019)

-   `setModel`方法当模型字段未找到时，不进行报错.

## 0.0.93 (Fri May 17 2019)

-   标签默认右对齐
-   `FormMehhods`增加`setModel(model)`方法, 快速设置模型值

## 0.0.92 (Sun May 05 2019)

-   更新依赖

## 0.0.91 (Sun May 05 2019)

-   更新`xy-manual-tools`, 修复编译 demo

## 0.0.9 (Mon Apr 29 2019)

-   从`storybook`换成`xy-manual-tools`来管理 demo

## 0.0.8 (Fri Apr 26 2019)

-   更新依赖

## 0.0.7 (Thu Apr 25 2019)

-   改变`onFieldValidate`触发逻辑, 当验证配置未定也也会触发`onFieldValidate`事件, 所以需要自定判断
-   增加单元测试

## 0.0.6 (Thu Apr 25 2019)

-   优化细节

## 0.0.5 (Tue Apr 23 2019)

-   修复验证失败下重置不会恢复 FormItem 的验证状态
-   如果提供了默认模型, 则字段值改变会尝试同步到模型中, 所以模型不要是 state, 只要一个简单的 Ref 变量
-   思考接口，不友好，不直观的需要修改, 然后更新 readme
-   FormItemField 上的 defaultValue 属性权重改成比模型默认值大
-   FormItemField 上的 label 属性权重改成比 formItemContext 值大
-   修复 FormItemField 上 label 外部访问永远是旧的问题

## 0.0.4 (Tue Apr 23 2019)

-   内置表单验证

## 0.0.3 (Tue Apr 23 2019)

-   增加 FormItem 管理内部错误列表, 修复 BUG
-   代理输入组件的`name`属性
-   增加是否可验证
-   禁用状态下不验证

## 0.0.2 (Tue Apr 23 2019)

-   基本实现表单功能

## 0.0.1 (Mon Apr 22 2019)

-   初始化项目
