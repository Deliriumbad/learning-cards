import { cardsAPI, CardType, GetCardsParamsType, GetCardsResponseType } from '../../dal/cards-api';
import { AppThunk } from '../store/store';

export const cardsInitState = {
    cardsList: [] as Array<CardType>,
    packUserId: '',
    cardsTotalCount: 0,
    maxGrade: undefined as undefined | number,
    minGrade: undefined as undefined | number,
    page: 1,
    pageCount: 5,
    cardAnswer: '',
    cardQuestion: '',
    sortCards: '0updated',
    isFetchingCards: false,
};

export type CardsStateType = typeof cardsInitState;

export const cardsReducer = (
    state: CardsStateType = cardsInitState,
    action: CardsActionsType,
): CardsStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS_DATA':
            return { ...state, ...action.cardsData };
        default:
            return state;
    }
};

export const setCardsData = (cardsData: GetCardsResponseType) =>
    ({ type: 'CARDS/SET_CARDS_DATA', cardsData } as const);

export const getCardsTC = (data: GetCardsParamsType): AppThunk => {
    return (dispatch, getState) => {
        const { cardAnswer, cardQuestion, sortCards, page, pageCount } = getState().cards;
        const cardsData: GetCardsParamsType = {
            cardAnswer,
            cardQuestion,
            sortCards,
            page,
            pageCount,
            ...data,
        };

        cardsAPI
            .getCards(cardsData)
            .then(res => {
                console.log(data);
                dispatch(setCardsData(res));
            })
            .catch(e => {
                console.log(e);
            });
    };
};

export type CardsActionsType = ReturnType<typeof setCardsData>;
