import React from "react";
import { FormBlockContextState } from "../interface";

export const DefaultFormBlockContext: FormBlockContextState = {
    add: null,
    remove: null,
    model: null,
    prop: ""
};

export const FormBlockContext = React.createContext<FormBlockContextState>(DefaultFormBlockContext);
