import { useState } from "react";

export function useInput(initialValue = "") {
    const [value, setValue] = useState<string>(initialValue);

    const onChangeText = (text: string) => setValue(text);

    return {
        value,
        onChangeText,
        setValue,
    };
}
