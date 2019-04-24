import React from "react";
import { FormContextState } from "../interface";
import { ValidateTrigger } from "../ValidateUtils/ValidateTrigger";

export const DefaultFormContext: FormContextState = {
    disabled: false,
    trigger: ValidateTrigger.change,
    labelPosition: "left",
    labelWidth: "90px",
    inline: false,
    formMethods: null
};

export const FormContext = React.createContext<FormContextState>(DefaultFormContext);
