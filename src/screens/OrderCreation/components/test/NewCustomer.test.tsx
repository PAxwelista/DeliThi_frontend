jest.mock("react-native-autocomplete-dropdown", () => {
    const React = require("react");
    const actual = jest.requireActual("react-native-autocomplete-dropdown");
    const { Input } = require("../../../../components");

    return {
        ...actual,
        AutocompleteDropdown: ({
            textInputProps,
            onSelectItem,
        }: {
            textInputProps: { placeholder: string };
            onSelectItem: (item: { id: string; title: string }) => void;
        }) => {
            const handleChange = (text: string) => {
                const fakeItem = { id: "mock-id", title: text };
                onSelectItem?.(fakeItem);
            };

            return (
                <Input
                    placeholder={textInputProps?.placeholder}
                    onChangeText={handleChange}
                />
            );
        },
    };
});

jest.mock('react-redux');

import { render, screen, fireEvent } from "@testing-library/react-native";

import NewCustomerForm from "../NewCustomerForm";

describe("NewCustomer component", () => {
    it("should change the differents input", () => {
        const placeholders = ["Nom", "Lieu", "Zone", "Téléphone", "Email"];
        const newText = ["Axel", "Here", "42", "06942639219", "madotto.axel@outlook.com"];

        render(
            <NewCustomerForm
                addCustomer={() => {}}
                closeModal={() => {}}
            />
        );

        const inputs = placeholders.map(v => screen.getByPlaceholderText(v));

        inputs.forEach((input, i) => {
            fireEvent.changeText(input, newText[i]);

            expect(screen.getByDisplayValue(newText[i])).toBeTruthy();
        });
    });

    it("should show an error message if locationName or area are empty", () => {
        const placeholders = ["Nom", "Lieu", "Zone", "Téléphone", "Email"];
        const newText = ["", "Here", "42", "", ""];
        const handleAddCustomer = jest.fn();

        render(
            <NewCustomerForm
                addCustomer={handleAddCustomer}
                closeModal={() => {}}
            />
        );

        const inputs = placeholders.map(v => screen.getByPlaceholderText(v));
        const addBtn = screen.getByText("Ajouter");

        fireEvent.press(addBtn);

        expect(handleAddCustomer).not.toHaveBeenCalled();
        expect(screen.getByText("Champ lieu et/ou zone non rempli")).toBeTruthy();

        fireEvent.changeText(inputs[1], newText[1]);

        fireEvent.press(addBtn);

        expect(handleAddCustomer).not.toHaveBeenCalled();
        expect(screen.getByText("Champ lieu et/ou zone non rempli")).toBeTruthy();

        fireEvent.changeText(inputs[2], newText[2]);

        fireEvent.press(addBtn);

        screen.getByDisplayValue("Here");

        expect(handleAddCustomer).toHaveBeenCalled();
        expect(screen.queryByText("Champ lieu et/ou zone non rempli")).toBeFalsy();
    });
    it("should call closeModal on click on the exit tab button", () => {
        const handleCloseModal = jest.fn();

        render(
            <NewCustomerForm
                addCustomer={() => {}}
                closeModal={handleCloseModal}
            />
        );

        fireEvent.press(screen.getByText("X"));

        expect(handleCloseModal).toHaveBeenCalled();
    });
    it("should pass arguments through addCustomer even if the name is empty", () => {
        const placeholders = ["Nom", "Lieu", "Zone", "Téléphone", "Email"];
        const newText = ["", "Here", "42", "", ""];

        const handleAddCustomer = jest.fn();

        render(
            <NewCustomerForm
                addCustomer={handleAddCustomer}
                closeModal={() => {}}
            />
        );

        const inputs = placeholders.map(v => screen.getByPlaceholderText(v));

        inputs.forEach((input, i) => {
            fireEvent.changeText(input, newText[i]);
        });

        fireEvent.press(screen.getByText("Ajouter"));

        expect(handleAddCustomer.mock.calls[0][0]).toEqual({
            name: "Here",
            locationName: "Here",
            area: "42",
            phoneNumber: "",
            email: "",
        });
    });
});
