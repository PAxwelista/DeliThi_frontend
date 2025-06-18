import { Delivery, Order, Customer } from "./";

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
    DetailCustomer: Customer;
    Statistics: undefined;
};
