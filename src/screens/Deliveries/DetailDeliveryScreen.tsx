import Screen from "../../components/Screen";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Order } from "../../types/order";
import { Product } from "../../types/product";
import { useFetch } from "../../hooks/useFetch";
import { TotalProduct } from "../../types/totalProduct";
import { DeliveriesStackParamList } from "../../types/navigation";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { apiUrl } from "../../config";

type ItemOrder={
    item :Order
}

type Props = NativeStackScreenProps<DeliveriesStackParamList, 'DetailDelivery'>;

export default function DetailDeliveryScreen({ route } : Props) {
    const { _id, deliveryDate, orders } = route.params;

    const { data: total } = useFetch(`${apiUrl}/deliveries/${_id}/allProducts`);

    const Orders = orders.map((order: Order) => (
        <View
            key={order._id}
            style={styles.order}
        >
            <Text style={styles.orderCustomer}>{order.customer.name}</Text>
            <View>
                {order.products.map((product: Product) => (
                    <Text key={product._id}>
                        {product.product.name} x{product.quantity}
                    </Text>
                ))}
            </View>
        </View>
    ));

    const renderOrders = ({item}:ItemOrder)=>{
        return(
            <View
            style={styles.order}
        >
            <Text style={styles.orderCustomer}>{item.customer.name}</Text>
            <View>
                {item.products.map((product: Product) => (
                    <Text key={product._id}>
                        {product.product.name} x{product.quantity}
                    </Text>
                ))}
            </View>
        </View>
        )
    }

    return (
        <Screen title="Livraison">
            <Text style={styles.deliveryDate}>Date de livraison : {new Date(deliveryDate).toLocaleDateString()}</Text>
            <View style={styles.orders}>
            <FlatList  data={orders} renderItem={renderOrders} keyExtractor={(item)=>item._id}/></View>
            <View style={styles.total}>
                <Text style={styles.totalText}>Total : </Text>
                {total?.totalProduct.map((product: TotalProduct) => (
                    <Text key={product.name}>
                        {product.name} x{product.quantity}
                    </Text>
                ))}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    order: {
        backgroundColor: "lightgrey",
        borderRadius: 10,
        margin: 5,
        padding: 10,
    },
    orderCustomer: {
        textAlign: "center",
    },
    deliveryDate: {
        flex: 1,
        textAlign:"center",
        textAlignVertical:"center"
    },
    total: {
        flex: 3,
        justifyContent:"center",
    },
    orders: {
        flex: 6,
    },
    totalText:{
        textAlign:"center"
    }
});
