import { render, screen, fireEvent } from "@testing-library/react-native";

import ProductAddingForm from "../ProductAddingForm";
import { Input } from "../../../../components";

describe("ProductAddingForm component", () => {
    const productsAvailable = [
        { _id: "1", name: "Carottes", price: 3 },
        { _id: "2", name: "Tomates", price: 2 },
    ];

    it("should change the quantity value while clicking on + and - button", () => {
        render(
            <ProductAddingForm
                availableProducts={productsAvailable}
                addProduct={() => {}}
            />
        );

        const quantity = screen.getByDisplayValue("1");
        const minBtn = screen.getByText("-");
        const plusBtn = screen.getByText("+");

        expect(quantity).toBeTruthy;

        fireEvent.press(plusBtn);
        fireEvent.press(plusBtn);

        expect(screen.getByDisplayValue("3")).toBeTruthy;

        fireEvent.press(minBtn);

        expect(screen.getByDisplayValue("2")).toBeTruthy;
    });

    it("should block the change value to min 1", () => {
        render(
            <ProductAddingForm
                availableProducts={productsAvailable}
                addProduct={() => {}}
            />
        );

        const quantity = screen.getByDisplayValue("1");
        const minBtn = screen.getByText("-");
        fireEvent.press(minBtn);

        expect(screen.getByDisplayValue("1")).toBeTruthy;
    });

    it("should call addProduct on press add product and have 2 corrects initial arguments", () => {
        const handleAddProduct = jest.fn();

        render(
            <ProductAddingForm
                availableProducts={productsAvailable}
                addProduct={handleAddProduct}
            />
        );

        const plusBtn = screen.getByText("+");

        fireEvent.press(screen.getByText("Ajouter"));

        fireEvent.press(plusBtn);

        fireEvent.press(screen.getByText("Ajouter"));

        expect(handleAddProduct).toHaveBeenCalledTimes(2);

        expect(handleAddProduct.mock.calls[0][0]).toBe(productsAvailable[0]._id);

        expect(handleAddProduct.mock.calls[0][1]).toBe(1);

        expect(handleAddProduct.mock.calls[1][0]).toBe(productsAvailable[0]._id);

        expect(handleAddProduct.mock.calls[1][1]).toBe(2);
    });
});
