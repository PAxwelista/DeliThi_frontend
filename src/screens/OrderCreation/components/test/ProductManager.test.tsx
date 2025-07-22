import { render, screen, fireEvent } from "@testing-library/react-native";
import { Product } from "../../../../types";

import ProductManager from "../ProductManager";

const products: Product[] = [
    { _id: "1", product: { name: "Carotte", price: 3 }, quantity: 3, group: "" },
    { _id: "2", product: { name: "Tomate", price: 4 }, quantity: 4, group: "" },
];

describe("ProductManager component", () => {
    const productsAvailable = [
        { _id: "1", name: "Carottes" , price : 4 },
        { _id: "2", name: "Tomates" , price : 3 },
    ];

    it("should call addProduct with correct arguments", () => {
        const handleAddProduct = jest.fn();

        render(
            <ProductManager
                availableProducts={productsAvailable}
                products={products}
                addProduct={handleAddProduct}
                removeProduct={() => {}}
            />
        );

        const addBtn = screen.getByText("Ajouter");

        fireEvent.press(addBtn);

        expect(handleAddProduct.mock.calls[0][0]).toBe(productsAvailable[0]._id);

        expect(handleAddProduct.mock.calls[0][1]).toBe(1);
    });

    it("should call removeProduct with correct arguments", () => {
        const handleRemoveProduct = jest.fn();

        render(
            <ProductManager
                availableProducts={productsAvailable}
                products={products}
                addProduct={() => {}}
                removeProduct={handleRemoveProduct}
            />
        );

        const firstRemoveBtn = screen.getAllByText("-")[1];

        fireEvent.press(firstRemoveBtn);

        expect(handleRemoveProduct).toHaveBeenCalled();

        expect(handleRemoveProduct.mock.calls[0][0]).toBe(productsAvailable[0]._id);
    });
});
