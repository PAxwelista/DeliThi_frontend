import { isSecurePassword } from "../";

describe("isValidPassword", () => {
    it("should return false with a unsecure password", () => {
        const emails = ["TEST", "TEST@", "AHZDnjdazdbAAA", "aA#1", "azaecuiaze#az9"];

        emails.forEach(email => expect(isSecurePassword(email)).toBe(false));
    });
    it("should return true with a secure password", () => {
        const email = "ADFio877?";

        expect(isSecurePassword(email)).toBe(true);
    });
});
