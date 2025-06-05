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
    PrepareDelivery: undefined;
    Map: undefined;
    DeliverOrder: Order;
};
export type MoreMenuStackParamList = {
    Menu: undefined;
    Customers: undefined;
    Statistics: undefined;
};
