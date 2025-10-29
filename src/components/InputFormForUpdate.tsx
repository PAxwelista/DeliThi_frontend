import { View, StyleSheet } from "react-native";
import { Button } from "./Button";
import { Input } from "./Input";
import { useFormInput } from "../hooks";
import { Text } from "./Text";

type Props = {
    initialValues: Record<string, string>;
    inputs: Record<string, string>;
    handleValidateModifications: (values: Record<string, string>) => void;
};

const InputFormForUpdate = ({ initialValues, inputs, handleValidateModifications }: Props) => {
    const { values, handleChangeValue } = useFormInput<typeof initialValues>(initialValues);

    const isInitialValues = JSON.stringify(values) === JSON.stringify(initialValues);


    const Inputs = Object.entries(inputs).map(([key, value]) => {
        const k = key as keyof typeof initialValues;
        return (
            <View
                key={k}
                style={styles.inputContainer}
            >
                <Text>{value}</Text>
                <Input
                    value={values[k]}
                    onChangeText={handleChangeValue(k)}
                />
            </View>
        );
    });

    return (
        <View style={styles.container}>
            {Inputs}
            <Button
                title="Valider changements"
                onPress={() => handleValidateModifications(values)}
                disable={isInitialValues}
            />
        </View>
    );
};

export { InputFormForUpdate };

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 5,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
});
