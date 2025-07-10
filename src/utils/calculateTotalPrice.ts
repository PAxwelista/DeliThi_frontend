import { Order } from "../types";

export function CalculateOrderTotalPrice(order: Order): number {
    return order.products.reduce((a,v)=>a+v.product.price*v.quantity,0);
}


