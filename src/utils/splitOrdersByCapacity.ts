import { Order } from "../types";

export const splitOrdersByCapacity = (
    orders: Order[],
    maxCapacity: number
): { firstPartOrders: Order[]; secondPartOrders: Order[] } => {

    
    const sortedOrders = orders.slice().sort(
        (a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
    );
   
    if (!maxCapacity) return { firstPartOrders: sortedOrders, secondPartOrders: [] };
    let separationIndex = 0;
    let currentCapacity = 0;

    for (let i = 0; i < sortedOrders.length; i++) {
        currentCapacity += orders[i].products.reduce((a, product) => a + product.product.capacity, 0);
        if (currentCapacity > maxCapacity) break;
        separationIndex++;
    }

    const firstPartOrders = sortedOrders.splice(0, separationIndex);

    return { firstPartOrders, secondPartOrders: sortedOrders };
};
