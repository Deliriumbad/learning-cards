import { useAppSelector } from 'bll/store/hooks';
import { CardType } from 'dal/cards-api';

import Answer from './Answer';
import Question from './Question';

const Learning = () => {
    const arrayCards = useAppSelector(state => state.cards.cards);

    const getCard = (cards: CardType[]) => {
        const length = cards.reduce((acc, card) => acc + (6 - card.grade) ** 2, 0);

        const rand = Math.random() * length;

        let id = 0;
        let sum = 0;

        while (sum < rand) {
            sum += (6 - cards[id].grade) ** 2;
            id += 1;
        }

        console.log(length, id, sum);

        return cards[id - 1];
    };

    const currentCard = getCard(arrayCards);

    return (
        <>
            <h1>Learn</h1>
            <div>
                <Question question={currentCard.question} />
                <Answer answer={currentCard.answer} />
            </div>
        </>
    );
};

export default Learning;
