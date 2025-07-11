import { Input } from "./Input";

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
        return (visible[key] && 
            <Input
                key={key}
                placeholder={labelsFr[key]}
                value={values[key]}
                onChangeText={handleChangeValue(key)}
                secureTextEntry={key === "password"}
                autoCapitalize={key === "password" ? "none" : undefined}
            />
        );
    });
};

export { InputForm };
