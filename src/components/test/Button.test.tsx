import Button from "../Button";
import { render, screen, fireEvent } from "@testing-library/react-native";

describe("Button component", () => {
    it("should call onPress when clicked", () => {
        const buttonName = "Bouton";
        const handleClick = jest.fn();

        render(
            <Button
                title={buttonName}
                onPress={handleClick}
            />
        );
        fireEvent.press(screen.getByText(buttonName));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
