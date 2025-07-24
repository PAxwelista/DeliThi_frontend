import { View, Text, StyleSheet } from "react-native";
import { Screen } from "../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoreMenuStackParamList, Order } from "../../types";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "OrdersStatResult">;

const frenchTranslateKey = { beginAt: "Début", endAt: "Fin", area: "Zone", product: "Produit" };

const OrdersStatResultScreen = ({ route }: Props) => {
    const { orders, filters } = route.params;

    const Filters = Object.entries(filters).map(([key, value]) => (
        <Text
            style={styles.text}
            key={key}
        >
            {frenchTranslateKey[key as keyof typeof frenchTranslateKey] +
                " : " +
                ((key === "beginAt" && value != "") || (key === "endAt" && value != "")
                    ? new Date(value).toLocaleDateString()
                    : value)}
        </Text>
    ));


    const TotalProductSell = Object.entries(
        orders.reduce<Record<string, number>>((acc, order) => {
            order.products
                .map(product => ({ product: product.product.name, qty: product.quantity }))
                .forEach(v => (acc[v.product] ? acc[v.product] += v.qty : acc[v.product] = v.qty));

            return acc;
        }, {})
    ).map(v => (
        <Text key={v[0]}>
            {"      "}{v[0]} : {v[1]}
        </Text>
    ));

    const nbOfClients = (orders : Order[])=>{
        return orders.filter((order,i,orders)=>orders.findIndex(v=>v.customer._id === order.customer._id) ===i ).length
    }

    return (
        <Screen title="Statistiques Commandes">
            <>
                <Text style={styles.title}>Critères</Text>
                {Filters}
            </>
            <>
                <Text style={styles.title}>Infos</Text>
                <Text style={styles.text}>Nombres de clients : {nbOfClients(orders)}</Text>
                <Text style={styles.text}>Nombres de commandes : {orders.length}</Text>
                <Text style={styles.text}>Total Vendu : </Text>
                {TotalProductSell}
            </>
        </Screen>
    );
};

export { OrdersStatResultScreen };

const styles = StyleSheet.create({
    title: {
        fontWeight: "700",
        marginVertical: 15,
        textAlign: "center",
    },
    text: {
        marginBottom: 5,
    },
});
