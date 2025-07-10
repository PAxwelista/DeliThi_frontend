import { CalculateOrderTotalPrice } from "../calculateTotalPrice";
import { orderExemple } from "./orderExemple";

describe("Function CalculateOrderTotalPrice" , ()=>{
    it("should calculate the total price of an order" , ()=>{
        expect(CalculateOrderTotalPrice(orderExemple)).toBe(28)
    })
})