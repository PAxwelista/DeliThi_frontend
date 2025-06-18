import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Input } from "./";
import { useState, useEffect } from "react";

type DataType = {
    id: string;
    title: string;
};

type Props = {
    data: DataType[];
    onChangeText: Function;
};

export default function AutoComplete({ data, onChangeText }: Props) {
    const [isDropdownVisible, setIsDropDownVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [dataFilter, setDataFilter] = useState<DataType[]>([]);

    useEffect(() => {
        const regex = new RegExp(`\w*${inputValue}\w*`, "gi");

        setDataFilter(data?.filter((v: DataType) => v.title.match(regex)));
    }, [data, inputValue]);

    const handleOnChangeText = (v: string) => {
        setInputValue(v);
        onChangeText(inputValue);
    };

    const DropDown = () => {
        return (
            <ScrollView>
                {dataFilter?.map(v => (
                    <TouchableOpacity
                        key={v.id}
                        style={styles.redColor}
                    >
                        <Text>{v.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    return (
        <View>
            <Input
                onPress={() => setIsDropDownVisible(true)}
                value={inputValue}
                onChangeText={handleOnChangeText}
            />

            {isDropdownVisible && (
                <View style={styles.flatList}>
                    <DropDown />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    redColor: {
        backgroundColor: "red",
    },
    flatList: {
        position: "absolute",
        height: 100,
        width: 100,
        backgroundColor: "yellow",
        zIndex: 9,
    },
});
