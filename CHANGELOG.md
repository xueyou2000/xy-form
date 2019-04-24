# Change Log

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
