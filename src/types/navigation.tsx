import { Delivery } from "./delivery";
import { Order } from "./order";

export type DeliveriesStackParamList = {
    AllDeliveries: undefined;
    DetailDelivery: Delivery;
};

export type OrderStackParamList = {
    AllOrders: undefined;
    DetailOrder: Order;
};
export type MakeDeliveryStackParamList = {
    BeginDelivery: undefined;
    PrepareDelivery: Delivery;
    Map: undefined;
    DeliverOrder: undefined;
};
