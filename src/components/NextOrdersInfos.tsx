import { ScrollView } from "react-native";
import { Order } from "../types/order";
import { NextOrder } from "./NextOrder";

type Props = {
    orders: Order[];
    firstDuration: string;
};

export const NextOrdersInfos = ({ orders, firstDuration }: Props) => {
    const deliveriesComp = orders.map((order, i) => (
        <NextOrder
            key={order._id}
            customer={order.customer.name}
            location={order.customer.location.name}
            deliveryTime={i === 0 ? firstDuration : ""}
        />
    ));

    return <ScrollView>{deliveriesComp}</ScrollView>;
};
