import { render, screen, fireEvent } from "@testing-library/react-native";
import { Product } from "../../../../types/product";

import ProductManager from "../ProductManager";

describe("ProductManager component", () => {
    const productsAvailable = [
        { _id: "1", name: "Carottes" },
        { _id: "2", name: "Tomates" },
    ];
    
    
    

    it("should call addProduct with correct arguments", () => {

        const products: Product[] = [
            { _id: "1", product: { name: "Carotte" }, quantity: 3 },
            { _id: "2", product: { name: "Tomate" }, quantity: 4 },
        ];

        const handleAddProduct = jest.fn()

        render(<ProductManager availableProducts={productsAvailable} products={products} addProduct={handleAddProduct}  removeProduct={()=>{}}/>);

        const addBtn = screen.getByText("Ajouter")

        fireEvent.press(addBtn)

        expect(handleAddProduct.mock.calls[0][0]).toBe(productsAvailable[0]._id);

        expect(handleAddProduct.mock.calls[0][1]).toBe(1);
    
    });

    it("should call removeProduct with correct arguments", () => {

        const products: Product[] = [
            { _id: "1", product: { name: "Carotte" }, quantity: 3 },
            { _id: "2", product: { name: "Tomate" }, quantity: 4 },
        ];

        const handleRemoveProduct = jest.fn()

        render(<ProductManager availableProducts={productsAvailable} products={products} addProduct={()=>{}}  removeProduct={handleRemoveProduct}/>);

        const firstRemoveBtn = screen.getAllByText("-")[1]

        fireEvent.press(firstRemoveBtn)

        expect(handleRemoveProduct).toHaveBeenCalled()

        expect(handleRemoveProduct.mock.calls[0][0]).toBe(productsAvailable[0]._id);
    
    });
    
});
