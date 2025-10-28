import { Customer, Product } from "./";
import frenchState from "../../assets/translation/frenchState.json"

export type Order = {
    _id: string;
    customer: Customer;
    deliveryDate: string;
    creationDate: string;
    state: keyof typeof frenchState;
    orderer: string;
    products: Product[];
    area: string;
    amountPaid: number;
    group: string;
};
