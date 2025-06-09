import { Dispatch, SetStateAction } from "react";
import ProductAddingForm from "./ProductAddingForm";
import DisplayProducts from "./DisplayProducts";
import { Product } from "../../../types/product"
import { availableProducts } from "../../../types/availableProduct";

type Props = {
    availableProducts: availableProducts[];
    products: Product[];
    addProduct: (productId: string, quantity: number) => void;
    removeProduct: (productId: string) => void;
};

export default function ProductManager({ availableProducts, products, addProduct , removeProduct }: Props) {

    return (
        <>
            <ProductAddingForm
                availableProducts={availableProducts}
                addProduct={addProduct}
            />
            <DisplayProducts
                products={products}
                removeProduct={removeProduct}
            />
        </>
    );
}
