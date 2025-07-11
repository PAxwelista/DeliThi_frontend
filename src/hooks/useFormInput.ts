import { useState } from "react";

export const useFormInput = <T extends Record<string, string>>(initialValues:T) => {
    const [values, setValues] = useState<T>(initialValues);

    const handleChangeValue = (key: string) => (text: string) => {
        setValues(prev => ({ ...prev, [key]: text }));
    };

    const reset = () => {
        setValues(initialValues);
    };

    return {
        values,
        handleChangeValue,
        reset,
    };
};
