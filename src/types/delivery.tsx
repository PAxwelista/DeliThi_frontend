import { Order } from "./order";

export type Delivery = {
    _id: string;
    orders: [Order];
    deliveryDate: string;
};
