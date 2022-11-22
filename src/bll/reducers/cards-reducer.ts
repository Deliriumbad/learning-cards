import { cardsAPI, CardType, GetCardsParamsType, GetCardsResponseType } from '../../dal/cards-api';
import { AppThunk } from '../store/store';

export const cardsInitState = {
    cardsData: {
        cardPacks: [] as Array<CardType>,
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        page: 0,
        pageCount: 0,
        token: '',
        packUserId: '',
    },
    cardsPackId: '',
    packName: '',
    isFetchingCards: false,
};

export type CardsStateType = typeof cardsInitState;

export const cardsReducer = (
    state: CardsStateType = cardsInitState,
    action: CardsActionsType,
): CardsStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS_DATA':
            return { ...state, cardsData: action.cardsData };
        default:
            return state;
    }
};

export const setCardsData = (cardsData: GetCardsResponseType) =>
    ({ type: 'CARDS/SET_CARDS_DATA', cardsData } as const);

export const getCardsTC = (data: GetCardsParamsType): AppThunk => {
    return dispatch => {
        cardsAPI
            .getCards(data)
            .then(res => {
                console.log(res);
                dispatch(setCardsData(res));
            })
            .catch(e => {
                console.log(e);
            });
    };
};

export type CardsActionsType = ReturnType<typeof setCardsData>;
