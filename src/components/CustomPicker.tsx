import { useState } from "react";
import { GlobalStyles } from "../styles/global";
import DropDownPicker from "react-native-dropdown-picker";

type Props = {
    values: string[];
    selectedValue: string;
    setSelectedValue: React.Dispatch<React.SetStateAction<any>>;
    placeholder: string;
};

const CustomPicker = ({ values, selectedValue, setSelectedValue, placeholder }: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <DropDownPicker
            open={open}
            value={selectedValue}
            items={values?.map(v => ({ label: v, value: v }))}
            setOpen={setOpen}
            setValue={setSelectedValue}
            placeholder={placeholder}
            zIndex={open ? 2000 : 10}
            textStyle={GlobalStyles.globalFontFamily}
        />
    );
};

export { CustomPicker };
