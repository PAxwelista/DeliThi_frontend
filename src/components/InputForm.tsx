import { Input } from "./Input";
import {PasswordInput} from "./PasswordInput";

const InputForm = ({
    values,
    handleChangeValue,
    labelsFr,
    visible,
}: {
    values: Record<string, string>;
    handleChangeValue: (key: string) => (text: string) => void;
    labelsFr: typeof values;
    visible: Record<string, boolean>;
}) => {
    return (Object.keys(values) as (keyof typeof values)[]).map(key => {
        return (visible[key] && (key === "password" ? (
            <PasswordInput
                key={key}
                placeholder={labelsFr[key]}
                value={values[key]}
                onChangeText={handleChangeValue(key)}
            />
        ) : (
            <Input
                key={key}
                placeholder={labelsFr[key]}
                value={values[key]}
                onChangeText={handleChangeValue(key)}
            />
        )));
    });
};

export { InputForm };
