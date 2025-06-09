import { render, screen, fireEvent } from "@testing-library/react-native";

import { Product } from "../../../../types/product";

import DisplayProducts from "../DisplayProducts";

describe("DisplayProdcuts component", () => {
    const products: Product[] = [
        { _id: "1", product: { name: "Carotte" }, quantity: 3 },
        { _id: "2", product: { name: "Tomate" }, quantity: 4 },
    ];

    it("should show products pass in props", () => {
        render(
            <DisplayProducts
                products={products}
                removeProduct={() => {}}
            />
        );

        for (const product of products) {
            expect(screen.getByText(`${product.quantity}x ${product.product.name}`)).toBeTruthy();
        }
    });
    it("should call removeProduct on press on - for each products", () => {
        const handleClick = jest.fn();

        render(
            <DisplayProducts
                products={products}
                removeProduct={handleClick}
            />
        );

        const removeBtns = screen.getAllByText("-")

        for (const removeBtn of removeBtns){
            fireEvent.press(removeBtn);
        }


        expect(handleClick).toHaveBeenCalledTimes(products.length);
    });
});
