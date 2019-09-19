import React from "react";
import { FormContextState } from "../interface";
import { ValidateTrigger } from "../ValidateUtils/ValidateTrigger";

export const DefaultFormContext: FormContextState = {
    disabled: false,
    trigger: ValidateTrigger.change,
    labelPosition: "right",
    labelWidth: "90px",
    inline: false,
    formMethods: null,
    defaultModel: null,
};

export const FormContext = React.createContext<FormContextState>(DefaultFormContext);
