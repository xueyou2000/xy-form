/**
 * 验证事件
 */
export enum ValidateTrigger {
    /**
     * 失去焦点触发
     */
    blur = 2,
    /**
     * 输入时触发
     */
    change = 4,
    /**
     * 无, 只会再表单submit时提交
     */
    none = 999,
    /**
     * 二者都是
     */
    all = 6,
}
