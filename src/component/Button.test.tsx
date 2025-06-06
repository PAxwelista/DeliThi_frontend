
import Button from "./Button";
import { render, screen, fireEvent } from '@testing-library/react-native';

describe("Button",()=>{
    test("renders correctly", () => {
        const handleClick = jest.fn()
        render(<Button title='test' onPress={handleClick} />);
        fireEvent.press(screen.getByText('test'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    });
})

