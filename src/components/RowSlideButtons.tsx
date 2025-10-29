import { GestureResponderEvent, ScrollView , StyleSheet } from "react-native";
import { Button } from "./Button";
import {Text} from "./Text"

type Props = {
    buttons: { title: string; onPress: (event: GestureResponderEvent) => void }[];
};

export const RowSlideButtons = ({ buttons }: Props) => {
    const btns = buttons.map(button => (
        <Button
            key={button.title}
            
            onPress={button.onPress}
            style={styles.button}
        ><Text>{button.title}</Text></Button>
    ));

    return <ScrollView horizontal showsHorizontalScrollIndicator={false}>{btns}</ScrollView>;
};

const styles = StyleSheet.create({
    button:{
        backgroundColor:"white",
        margin:8,
    }
})