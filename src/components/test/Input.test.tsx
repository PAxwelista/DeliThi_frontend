import { render, screen, fireEvent } from "@testing-library/react-native";
import Input from "../Input";

describe("Input component" , ()=>{
    it("should call onChangeText when changing text" , ()=>{

        const handleChangeText = jest.fn();

        const placeholder = "password"
        const newText = "Hello there"
        render(<Input placeholder={placeholder} onChangeText={handleChangeText}/>);

        const input = screen.getByPlaceholderText(placeholder)

        fireEvent.changeText(input,newText)

        expect(handleChangeText).toHaveBeenCalledWith(newText)

    })
})