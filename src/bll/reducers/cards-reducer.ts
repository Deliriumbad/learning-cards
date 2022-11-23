import { cardsAPI, CardType, GetCardsResponseType } from '../../dal/cards-api';
import { AppThunk } from '../store/store';

export const cardsInitState = {
    cards: [] as CardType[],
    cardsTotalCount: 3,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: '',

    cardsParams: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '637e57685b737b0004433950',
        min: 1,
        max: 4,
        sortCards: '0grade',
        pageCount: 0,
        page: 0,
    },
};
export type CardsStateType = typeof cardsInitState;
export type CardsParamsType = typeof cardsInitState.cardsParams;

export const cardsReducer = (
    state: CardsStateType = cardsInitState,
    action: CardsActionsType,
): CardsStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS_DATA':
            return { ...state, ...action.data };
        case 'CARDS/UPDATE_PARAMS_CARDS': {
            return { ...state, cardsParams: { ...action.params } };
        }
        default:
            return state;
    }
};

export const setCardsData = (data: GetCardsResponseType) =>
    ({ type: 'CARDS/SET_CARDS_DATA', data } as const);

export const updateParamsCards = (params: CardsParamsType) =>
    ({ type: 'CARDS/UPDATE_PARAMS_CARDS', params } as const);

export const getCardsTC = (): AppThunk => {
    return (dispatch, getState) => {
        const { cardsParams } = getState().cards;

        cardsAPI.getCards(cardsParams).then(response => setCardsData(response.data));
    };
};

export type CardsActionsType =
    | ReturnType<typeof setCardsData>
    | ReturnType<typeof updateParamsCards>;
