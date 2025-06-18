import { useState } from "react";

export const useFormInput = <T extends Record<string, string>>(initialValues:T) => {
    const [values, setValues] = useState<T>(initialValues);

    const handleChangeValue = (name: string) => (text: string) => {
        setValues(prev => ({ ...prev, [name]: text }));
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
