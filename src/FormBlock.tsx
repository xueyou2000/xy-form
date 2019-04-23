import React, { useContext } from "react";
import { FormBlockContext } from "./Context/FormBlockContext";
import { Separator } from "./Form";
import { FormBlockProps, FormItemState } from "./interface";
import { ValidateTrigger } from "./ValidateUtils/ValidateTrigger";

export function FormBlock({ prop = "", children }: FormBlockProps) {
    const context = useContext(FormBlockContext);
    const model = context.model && prop in context.model ? context.model[prop] : null;
    const parentProp = context.prop ? context.prop + Separator : "";
    const currentProp = parentProp + prop;

    function spliceProp(fieldProp: string) {
        return prop + Separator + fieldProp;
    }

    function add(fieldProp: string, itemState: FormItemState) {
        context.add(spliceProp(fieldProp), itemState);
    }

    function remove(fieldProp: string) {
        context.remove(spliceProp(fieldProp));
    }

    function fieldChange(fieldProp: string, value: any) {
        context.fieldChange(spliceProp(fieldProp), value);
    }

    function fieldValidate(fieldProp: string, value: any, trigger?: ValidateTrigger) {
        return context.fieldValidate(spliceProp(fieldProp), value, trigger);
    }

    return <FormBlockContext.Provider value={{ model, prop: currentProp, add, remove, fieldChange, fieldValidate }}>{children}</FormBlockContext.Provider>;
}

export default React.memo(FormBlock);
