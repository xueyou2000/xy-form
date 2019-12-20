const FormValidateLocal = {
    // 通用验证===
    Required: "必填",
    MinLength: "长度应小于{0}",
    MaxLength: "长度应大于{0}",
    RangeLength: "长度范围应在{0} ~ {1}之间",
    EqualLength: "长度应为{0}",
    Min: "值应该小于{0}",
    Max: "值应该大于{0}",
    Range: "值范围应该在{0} ~ {1}之间",
    Pattern: "无效值",
    // 类型验证===
    IsNumber: "无效数值",
    IsFunction: "无效函数",
    IsArray: "无效数组",
    // 格式验证===
    IsEmail: "无效邮箱格式",
    IsUrl: "无效网址格式",
    AcceptSuffix: "无效后缀格式",
    ZipCode: "无效邮政编码格式",
    PhoneNo: "无效手机号码",
    Tel: "无效座机号码",
    Chinese: "无效中文字符",
    NotChinese: "不能包含中文字符",
    BankCard: "无效银行卡号",
    IdCardNo: "无效身份证号",
    // 日期验证===
    IsTime: "无效时间格式",
    IsDateFormat: "无效日期格式",
    IsDateISO: "无效日期格式",
    // 数值验证===
    IsDigits: "无效整数",
    IsStep: "不是{0}的倍数",
    Amount: "无效金额",
};

export default FormValidateLocal;
