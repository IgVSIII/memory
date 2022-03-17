import './Menu.css';
import {conditions} from '../help/help';
import NotFound from '../notFound/NotFound';
import {NavLink} from 'react-router-dom';
import {useSearchParams} from "react-router-dom";

const Start = () => {
    return (<div className='menu'>
        <div className='menuWrap'>
            <h1>Правила игры</h1>
            <p>
                В начале игры, вам дается 10 секунд, что запоминть разположение карточек на доске.
                Каждая карточка повторяется на доске 2 раза.
                После 3-x секунд, карточки переворачиваются. 
                За отведеное время, вам нужно попарно открыть все карточки на доске. 
            </p>
            <h3><NavLink to="/game">Играть</NavLink></h3>
        </div>
    </div>)
}

const Win = () => {
    return (<div className='menu'>
        <div className='menuWrap'>
            <h1>Победа!</h1>
            <h3><NavLink to="/game">Играть еще</NavLink></h3>
        </div>
    </div>)
}

const Lost = () => {
    return (<div className='menu'>
        <div className='menuWrap'>
            <h1>Не получилось</h1>
            <h3><NavLink to="/game">Попробовать еще</NavLink></h3>
        </div>
    </div>)
};

const choiceCondition = (condition) => {
    switch(condition) {
        case conditions.win: return <Win/>
        case conditions.lost: return <Lost/>
        case conditions.start: return <Start/>
        default: return <NotFound/>
    }
}

const Menu = () => {
    const [searchParams] = useSearchParams();
    return (
        <div>
            {choiceCondition(searchParams.get("condition") ? searchParams.get("condition") : conditions.start)}
        </div>
    );
}

export default Menu;