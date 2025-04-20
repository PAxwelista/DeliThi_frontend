import { Customer } from "./customer";
import { Product } from "./product";

export type Order = {
    _id: string;
    customer: Customer;
    deliveryDate: string;
    creationDate: string;
    state: string;
    orderer: string;
    products: [Product];
};
