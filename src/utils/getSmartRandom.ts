import { CardType } from 'dal/cards-api';

export const getSmartRandom = (cards: CardType[]) => {
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
