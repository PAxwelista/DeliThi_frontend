
import Button from "./Button";
import { render, screen, fireEvent } from '@testing-library/react';

describe("Button",()=>{
    test("renders correctly", () => {
        const handleClick = jest.fn()
        render(<Button title='test' onPress={()=>console.log("click")} />);
        fireEvent.click(screen.getByRole('button'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    });
})

