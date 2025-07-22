const transformWordToColor = (word : string) : string=>{
    
    let number : number = word.split("").reduce((a,letter)=>a+letter.charCodeAt(0),0)

    let hexa : string = number.toString(16)

    while (hexa.length !=6){
        number *=7

        hexa=number.toString(16)

    }

    return (`#${hexa}`)
}

export {transformWordToColor}