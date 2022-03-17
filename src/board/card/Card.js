import './Card.css';

const CardType = (isOpen, kindOfCard, getClick) => {
    if (isOpen) {
        return (
            <div className = {"card " + kindOfCard}  onClick = {getClick}>
            </div>
        );
    } else {
        return (
            <div className = 'card closeCard' onClick = {getClick}>
            </div>
        );
    }
}

const Card = (props) => {
    const {isOpen, kindOfCard, getClick} = props;
    return CardType(isOpen, kindOfCard, getClick);
}

export default Card;