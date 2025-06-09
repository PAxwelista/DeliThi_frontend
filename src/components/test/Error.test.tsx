import { render, screen } from "@testing-library/react-native";
import Error from "../Error";

describe("Error component", () => {
    const errorName = "Erreur2";

    it("should show the correct props", () => {
        render(<Error err={errorName} />);

        expect(screen.getByText(errorName)).toBeTruthy();
    });
    it("should be in red by default", () => {
        render(<Error err={errorName} />);

        expect(screen.getByText(errorName)).toHaveStyle({ color: "red" });
    });
    it("should change text color with props textStyle", () => {
        const color = "blue";

        render(
            <Error
                err={errorName}
                textStyle={{ color }}
            />
        );

        expect(screen.getByText(errorName)).toHaveStyle({ color });
    });
});
