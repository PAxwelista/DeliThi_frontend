import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

import Screen from "../Screen";

describe("Screen component" , ()=>{
    it("should show her children" , ()=>{

        const text = "Hey what's up?"

        const mockComponent=<Text>{text}</Text>

        render(<Screen>{mockComponent}</Screen>)

        expect(screen.getByText(text)).toBeTruthy()

    })
    it("should show a title" , ()=>{

        const text = "Hey what's up?"

        const title = "this is the title"

        const mockComponent=<Text >{text}</Text>

        render(<Screen title={title}>{mockComponent}</Screen>)

        expect(screen.getByText(title)).toBeTruthy()

    })
})