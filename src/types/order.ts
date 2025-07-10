import { Customer, Product } from "./";

export type Order = {
    _id: string;
    customer: Customer;
    deliveryDate: string;
    creationDate: string;
    state: string;
    orderer: string;
    products: Product[];
    area: string;
};
