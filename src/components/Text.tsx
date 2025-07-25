import { Text as RNText, StyleProp, TextProps, TextStyle } from "react-native";
import { GlobalStyles } from "../styles/global";

type Props = TextProps & {
    style?: StyleProp<TextStyle>
    children: React.ReactNode;
};

const Text = ({ style, children, ...props }: Props) => {
    return (
        <RNText
            style={[GlobalStyles.globalFontFamily, style]}
            {...props}
        >
            {children}
        </RNText>
    );
};

export { Text };