import { Order } from "../../types";

export const orderExemple: Order = {
    _id: "6853cbaf0ca84d644d152d1f",
    area: "Verdun Nord",
    creationDate: "2025-06-19T08:34:55.222Z",
    customer: {
        _id: "6853c9550ca84d644d152ca6",
        email: "Madotto.axel@outlook.com",
        location: {
            name: "1 Quai General Leclerc 55100 Verdun",
            area: "Verdun Nord",
            longitude: 5.384323,
            latitude: 49.158784,
        },
        name: "Axel",
        phoneNumber: "06",
        group: "group1",
    },
    deliveryDate: "2025-06-20T07:24:24.116Z",
    orderer: "Placeholder",
    products: [
        {
            _id: "hererr",
            product: {
                name: "Carots",
                price: 2,
            },
            quantity: 4,
            group: "group1",
        },
        {
            _id: "azarzar",
            product: {
                name: "Vegetables",
                price: 5,
            },
            quantity: 4,
            group: "group1",
        },
    ],
    state: "delivered",
    group: "group1",
    amountPaid: 3,
};
