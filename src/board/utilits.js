const sizeBoard = 8;

const baseBoard = [
    {
        isOpen: true,
        value: "card1"
    },
    {
        isOpen: true,
        value: "card1"
    },
    {
        isOpen: true,
        value: "card2"
    },
    {
        isOpen: true,
        value: "card2"
    },
    {
        isOpen: true,
        value: "card3"
    },
    {
        isOpen: true,
        value: "card3"
    },
    {
        isOpen: true,
        value: "card4"
    },
    {
        isOpen: true,
        value: "card4"
    },
]

export const gameSettings = {
    gameTime: 30,
    previewTime: 3,
}

export const generateCards = () => {
    let newBoard = [];
    let baseBoardCopy = Array.from(baseBoard);

    for (let i = 0; i < sizeBoard; i++) {
        let randIndex = Math.floor(Math.random() * baseBoardCopy.length);
        newBoard.push(baseBoardCopy[randIndex])
        baseBoardCopy.splice(randIndex, 1);
    }
    return newBoard;
}

export const changeCardsState = (state, index) => {
    const checkElem = state[index];
    if (checkElem.isOpen) {
        return state;
    } 

    return state.map((elem, i) => {
        if (i === index) {
            return {
                ...elem,
                isOpen: !elem.isOpen
            };
        } else {
            return elem;
        }
    });
}

export const revertCardsState = (state, index) => {
    return state.map((elem, i) => {
        if (i === index) {
            return {
                ...elem,
                isOpen: !elem.isOpen
            };
        } else {
            return elem;
        }
    });
}

export const turnAllCard = (state) => {
    return state.map((elem) => {
        return {
            ...elem,
            isOpen: !elem.isOpen
        };
    })
}

export const checkWin = (state) => {
    let winFlag = true;
    state.map((elem) => {
        if (!elem.isOpen) {
            winFlag = false;
        }      
    });
    return winFlag;
}

export const checkCard = (state, cardIndex) => {
    if (cardIndex.last === cardIndex.actual) return true;

    if (state[cardIndex.last].value === state[cardIndex.actual].value) return true;

    return false;
}