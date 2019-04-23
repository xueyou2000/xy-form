import React from "react";
import { FormItemContextState } from "../interface";

export const FormItemContext = React.createContext<FormItemContextState>({
    onValidateChange: null,
    label: ""
});
