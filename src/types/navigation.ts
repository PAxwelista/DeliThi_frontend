import { Delivery, Order, Customer, AvailableProduct } from "./";

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
    CustomersMap: undefined;
    DetailCustomer: Customer;
    Statistics: undefined;
    Products: undefined;
    DetailProduct: AvailableProduct;
    CustomersStat:undefined;
    OrdersStatForm:undefined;
    OrdersStatResult:{orders:Order[],filters:{ beginAt: string, endAt:string, area: string, product: string }};
    ProductsStat:undefined;

};

export type ConnexionStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
};
