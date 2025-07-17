import { Order } from "../types";

export function CalculateOrderTotalPrice(order: Order): number {
    return order.products.reduce((a,v)=>v.product?.price ? a+v.product.price*v.quantity : a,0);
}


