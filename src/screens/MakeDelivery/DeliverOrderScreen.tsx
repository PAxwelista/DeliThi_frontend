import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View ,Text} from "react-native";
import { MakeDeliveryStackParamList } from "../../types/navigation";
import Screen from "../../component/Screen";
import Button from "../../component/Button";
import { StyleSheet } from "react-native";

type Props = NativeStackScreenProps<MakeDeliveryStackParamList, "DeliverOrder">;


export default function DeliverOrderScreen({navigation,route} : Props){
    const order = route.params

    const handleNextOrder = () =>{
        navigation.navigate("Map");
    }

    const Product = order.products.map(product=><Text key={product._id}>{product.quantity}x {product.product.name}</Text>)

    return (
        <Screen title= "Livraison client">
            <Text>Client : {order.customer.name}</Text>
            <Text>Lieu : {order.customer.location.name}</Text>
            <View style={styles.products}>
            {Product}</View>
            <Button title="Commande suivante" onPress={handleNextOrder}/>
        </Screen>
    )
}

const styles =  StyleSheet.create({
    products:{
        marginVertical:20,
        padding:10,
        backgroundColor:"lightgrey",
        borderRadius:10
    }
})