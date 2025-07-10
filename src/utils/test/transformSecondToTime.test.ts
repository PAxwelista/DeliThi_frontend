import {TransformSecondToTime} from ".."


describe("Function TransformDecondToTime" , ()=>{
    it("should show a correct display hours and minutes" , ()=>{
        expect(TransformSecondToTime(16140)).toBe("4:29")
    })
    it("should show a correct display hours and minutes with a 0 before the minutes" , ()=>{
        expect(TransformSecondToTime(14580)).toBe("4:03")
    })
})