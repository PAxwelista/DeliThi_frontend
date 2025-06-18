import { render, screen } from "@testing-library/react-native";

import { Loading } from "../";

describe("Loading component", () => {
    it("should show a correct ActivityIndicator", () => {
        render(<Loading />);
        const loader = screen.getByAccessibilityHint("loading");
        expect(loader).toBeTruthy();
    });
});
