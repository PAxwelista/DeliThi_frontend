import { Order } from "./";

export type Delivery = {
    _id: string;
    orders: Order[];
    deliveryDate: string;
    state: string;
    group:string
};
