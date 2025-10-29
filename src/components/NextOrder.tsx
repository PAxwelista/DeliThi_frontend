import { View , StyleSheet } from "react-native";
import { Text } from "./Text";

type Props = {
    customer: string;
    location: string;
    deliveryTime: string;
};

export const NextOrder = ({ customer, location, deliveryTime }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.firstLine}>
                <Text>{customer}</Text>
                <Text>{deliveryTime}</Text>
            </View>
            <Text>{location}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container : {
        backgroundColor:"white",
        padding:20,
        borderRadius:10,
        margin:10
    },

    firstLine:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:10

    }
})