import { Text, View, StyleSheet } from "react-native";
import Screen from "../../component/Screen";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "../../component/Button";
import { State } from "../../types/state";
import { OrderStackParamList } from "../../types/navigation";
import { useState } from "react";
import { apiUrl } from "../../config";
import Input from "../../component/Input";

const frenchState = {pending : "Enregistré" , processing : "En cours de livraison" , delivered : "Livré" , cancelled : "Annulé"}

type Props = NativeStackScreenProps<OrderStackParamList, "DetailOrder">;

export default function DetailOrderScreen({ route }: Props) {
    const { _id, customer, deliveryDate, creationDate, products ,area  } = route.params;

    const [state ,setState] = useState(route.params.state)
    const [actualArea , setActualArea] = useState(area)
    
    const title = `Commande pour ${customer.name}`;

    const Product = products.map((v: { _id: string; product: { name: string }; quantity: number }) => (
        <Text key={v._id}>
            {v.product?.name} : x{v.quantity}
        </Text>
    ));

    const handleChangeArea = async ()=>{
        const response = await fetch(`${apiUrl}/orders/area`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ordersID: [_id], newArea: actualArea }),
        });
    }

    const handleCancelledOrder = async () => {
        const response = await fetch(`${apiUrl}/orders/state`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ordersID: [_id], newState: "cancelled" }),
        });

        const json = await response.json();

        console.log(json)

        if (json.result) setState("cancelled")

    };

    return (
        <Screen title={title}>
            <Text>Commande du {new Date(creationDate).toLocaleDateString()}</Text>
            <View style={styles.area}><Text>Zone : </Text><Input value={actualArea} onChangeText={v=>setActualArea(v)} style={styles.areaInput} onEndEditing={handleChangeArea}/></View>
            <View style={styles.products}>{Product}</View>
            <Text>Statut : {frenchState[state as State]}</Text>
            {deliveryDate && <Text>Commande livré le : {new Date(deliveryDate).toLocaleDateString()}</Text>}
            {state != "cancelled" && <Button
                title="Annuler commande"
                onPress={handleCancelledOrder}
            />}
        </Screen>
    );
}

const styles = StyleSheet.create({
    products: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        marginVertical: 20,
        backgroundColor: "#E7E7E7",
        alignItems: "center",
    },
    area:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginVertical:20
    },
    areaInput:{
        width:"50%"
    }
});
