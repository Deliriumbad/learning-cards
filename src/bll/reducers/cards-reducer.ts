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
        cardsPack_id: '',
        min: 0,
        max: 0,
        sortCards: '0grade',
        page: 1,
        pageCount: 8,
    },
};

export const cardsReducer = (
    state: CardsStateType = cardsInitState,
    action: CardsActionsType,
): CardsStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS_DATA':
            return { ...state, ...action.data };
        case 'CARDS/UPDATE_PARAMS_CARDS': {
            return { ...state, cardsParams: { ...state.cardsParams, ...action.params } };
        }
        default:
            return state;
    }
};

export const setCardsData = (data: GetCardsResponseType) =>
    ({ type: 'CARDS/SET_CARDS_DATA', data } as const);

export const updateParamsCards = (params: UpdateParamsT) =>
    ({ type: 'CARDS/UPDATE_PARAMS_CARDS', params } as const);

export const getCardsTC = (): AppThunk => {
    return (dispatch, getState) => {
        const { cardsParams } = getState().cards;

        cardsAPI.getCards(cardsParams).then(response => dispatch(setCardsData(response.data)));
    };
};

export type CardsStateType = typeof cardsInitState;

export type CardsActionsType =
    | ReturnType<typeof setCardsData>
    | ReturnType<typeof updateParamsCards>;

export type UpdateParamsT = {
    cardAnswer?: string;
    cardQuestion?: string;
    cardsPack_id: string;
    min?: number;
    max?: number;
    sortCards?: string;
    page?: number;
    pageCount?: number;
};
