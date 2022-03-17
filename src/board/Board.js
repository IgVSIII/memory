import './Board.css';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    generateCards, 
    changeCardsState, 
    turnAllCard,
    checkWin,
    revertCardsState,
    gameSettings
} from './utilits';
import Card from './card/Card';
import {
    useNavigate,
    useLocation,
} from "react-router-dom";
import {conditions} from '../help/help';

const Board = () => {
    const [cardsState, setCardsState] = useState(generateCards());
    const [isStart, setStartFalg]  = useState(false); 
    const [gameTimer, setGameTimer]  = useState(gameSettings.gameTime); 
    const [cardIndex, setCardIndex]  = useState({
        last: undefined,
        actual: undefined
    }); 

    let navigate = useNavigate();
    let location = useLocation();

    const updateCard = (index) => {
        setCardsState(changeCardsState(cardsState, index));

        setCardIndex({
            ...cardIndex,
            actual: index,
        });
    }

    useLayoutEffect(() => {
        if (!isStart) {
            const timer = setTimeout(() => {
                setCardsState(turnAllCard(cardsState));
                setStartFalg(true);
            }, gameSettings.previewTime * 1000);  
            return function cleanup() {
                clearTimeout(timer);
            }
        }
    }, [isStart]);

    useLayoutEffect(() => {
        if (isStart) {

            if ((gameTimer-1) <=0) {
                navigate(`/?condition=${conditions.lost}` + location.search);
            }
        
            const interval = setInterval(() => {
                setGameTimer(gameTimer-1);                
            }, 1000);

            return function cleanup() {
                clearInterval(interval);
            }
        }
    }, [isStart, gameTimer]);

    useLayoutEffect(() => {
        if (isStart) {
            if (checkWin(cardsState)) {
                navigate(`/?condition=${conditions.win}` + location.search);
            }

            if ((cardIndex.last === undefined && cardIndex.actual === undefined)  
            || cardIndex.last === cardIndex.actual || cardIndex.actual === undefined) return
        
            if (cardIndex.last !== undefined) {
                if (cardsState[cardIndex.last].value === cardsState[cardIndex.actual].value) {
                    setCardIndex({
                        actual: undefined,
                        last: undefined,
                    });
                } else {
                    setCardsState(revertCardsState(cardsState, cardIndex.actual));
                    setCardIndex({
                        actual: undefined,
                        last: cardIndex.last,
                    });
                }
            } else {
                setCardIndex({
                    actual: cardIndex.actual,
                    last: cardIndex.actual,
                });
            }
        }
    }, [isStart, cardsState, cardIndex])

    return (
        <div className='board'>
            <div>
                {isStart ?
                    <h1>Осталось времени: {gameTimer} сек.</h1> :
                    <h1>Быстрее запоминаем)</h1>
                }
                <div className='boardWrap'>
                    {cardsState.map((elem, index) => (
                        <Card key={index + ":" + elem.value}
                            kindOfCard={elem.value}
                            isOpen={elem.isOpen}
                            getClick = {()=> updateCard(index)}
                        />
                    ))}
                </div>                

            </div>
        </div>
    );
}

export default Board;