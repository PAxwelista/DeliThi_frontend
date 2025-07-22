import {transformWordToColor} from "../index"


describe("Function transformWordToColor" , ()=>{
    it("should transform a word to color" , ()=>{
        expect(transformWordToColor("test")).toBe("#1069c0")
    })
})