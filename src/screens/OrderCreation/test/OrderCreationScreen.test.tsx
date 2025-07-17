jest.mock("react-native-autocomplete-dropdown", () => {
    const React = require("react");
    const actual = jest.requireActual("react-native-autocomplete-dropdown");
    const { Input } = require("../../../components");

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
                const fakeItem = { id: "1", title: text };
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

import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";

import { useFetch } from "../../../hooks";

import {OrderCreationScreen} from "../../";

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useFocusEffect: jest.fn(),
  }));


const mockLoadingData = {
    data: null,
    isLoading: true,
};

const mockAvailableProduct = {
    data: { products: [{ _id: "1", name: "product1" }] },
    isLoading: false,
};

const mockCustomerList = {
    data: {
        customers: [
            {
                _id: "1",
                name: "Axel",
                phoneNumber: "0234",
                location: {
                    name: "here",
                    area: "area2",
                    longitude: 2.3,
                    latitude: 3.2,
                },
                email: "Email@gmail.com",
            },
        ],
    },
    isLoading: false,
};

jest.mock("../../../hooks/useFetch");

const mockedUseFetch = useFetch as jest.Mock;

describe("OrderCreationScreen component", () => {
    it("should show a loading if there is no data", () => {
        mockedUseFetch.mockReturnValueOnce(mockLoadingData).mockReturnValueOnce(mockLoadingData);
        render(<OrderCreationScreen />);

        expect(screen.getByAccessibilityHint("loading")).toBeTruthy();
    });

    it("should show a the normal apge if there is correct data", () => {
        mockedUseFetch.mockReturnValueOnce(mockAvailableProduct).mockReturnValueOnce(mockCustomerList);
        render(<OrderCreationScreen />);

        expect(screen.getByText("Nouvelle commande")).toBeTruthy();
    });
    it("should add a new product to the list when add", () => {
        mockedUseFetch.mockReturnValue(mockCustomerList).mockReturnValueOnce(mockAvailableProduct);

        render(<OrderCreationScreen />);

        fireEvent.press(screen.getByText("Ajouter"));

        expect(screen.getByText("1x product1")).toBeTruthy();
    });

    it("should show a message when click on validate order and something is missing", () => {
        mockedUseFetch.mockReturnValue(mockCustomerList).mockReturnValueOnce(mockAvailableProduct);

        render(<OrderCreationScreen />);

        fireEvent.press(screen.getByText("Valider commande"));

        expect(screen.getByText("Il n'y a aucuns produits dans cette commande")).toBeTruthy();
    });

    it("should show a message when click on validate and if a customer is not selected", () => {
        mockedUseFetch.mockReturnValue(mockCustomerList).mockReturnValueOnce(mockAvailableProduct);

        render(<OrderCreationScreen />);

        fireEvent.press(screen.getByText("Ajouter"));

        fireEvent.press(screen.getByText("Valider commande"));

        expect(screen.getByText("Veuillez choisir un client ou en créé un nouveau")).toBeTruthy();
    });
    it("should validate order if there is some products and a customer", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ orders: [{ customer: { _id: "2" } }], result: true }),

                ok: true,

                status: 200,
            })
        ) as jest.Mock;

        mockedUseFetch.mockReturnValue(mockCustomerList).mockReturnValueOnce(mockAvailableProduct);

        render(<OrderCreationScreen />);

        fireEvent.press(screen.getByText("Ajouter"));

        fireEvent.changeText(screen.getByPlaceholderText("Nom"), "hello");

        fireEvent.press(screen.getByText("Valider commande"));
        await waitFor(() => {
            expect(screen.getByText("Commande enregistrée"));
        });
    });
});
