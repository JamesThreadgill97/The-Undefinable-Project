const each = require("jest-each").default;
const { youWin,youLose,startGame,provideHint,submitGuess,createNewFigure} = require("./script.js");

describe("youWin", () => {

    it("Is a function", () => {
        expect(youWin).toBeDefined();
        expect(youWin instanceof Function).toEqual(true);
    })
    
})

describe("youLose", () => {

    it("Is a function", () => {
        expect(youLose).toBeDefined();
        expect(youLose instanceof Function).toEqual(true);
    })
    
})

describe("startGame", () => {

    it("Is a function", () => {
        expect(startGame).toBeDefined();
        expect(startGame instanceof Function).toEqual(true);
    })
    
})

describe("provideHint", () => {

    it("Is a function", () => {
        expect(provideHint).toBeDefined();
        expect(provideHint instanceof Function).toEqual(true);
    })
    
})

describe("submitGuess", () => {

    it("Is a function", () => {
        expect(submitGuess).toBeDefined();
        expect(submitGuess instanceof Function).toEqual(true);
    })
    
})

describe("createNewFigure", () => {

    it("Is a function", () => {
        expect(createNewFigure).toBeDefined();
        expect(createNewFigure instanceof Function).toEqual(true);
    })
    
})

