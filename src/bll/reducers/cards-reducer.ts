import { cardsAPI, CardType, GetCardsResponseType, UpdateParamsType } from '../../dal/cards-api';
import { AppThunk } from '../store/store';

export const cardsInitState = {
    cards: [] as CardType[],
    cardsTotalCount: 3,
    maxGrade: 10,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: '',
    error: null as null | string,

    cardsParams: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 0,
        sortCards: '0grade',
        page: 1,
        pageCount: 8,
        isLoading: false,
    },
};

export type CardsStateType = typeof cardsInitState;

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
        case 'CARDS/SET_ERROR':
            return { ...state, error: action.error };
        case 'CARDS/SET_SEARCH_BY_QUESTION':
            return { ...state, cardsParams: { ...state.cardsParams, cardQuestion: action.value } };
        case 'CARDS/SET_SORT_CARDS':
            return { ...state, cardsParams: { ...state.cardsParams, sortCards: action.value } };
        case 'CARDS/IS_LOADING':
            return { ...state, cardsParams: { ...state.cardsParams, isLoading: action.isLoading } };
        default:
            return state;
    }
};

export const setCardsData = (data: GetCardsResponseType) =>
    ({ type: 'CARDS/SET_CARDS_DATA', data } as const);

export const updateParamsCards = (params: UpdateParamsType) =>
    ({ type: 'CARDS/UPDATE_PARAMS_CARDS', params } as const);

export const setSearchCardsByQuestion = (value: string) =>
    ({ type: 'CARDS/SET_SEARCH_BY_QUESTION', value } as const);

export const loadingCards = (isLoading: boolean) =>
    ({ type: 'CARDS/IS_LOADING', isLoading } as const);

export const setSortCards = (value: string) => ({ type: 'CARDS/SET_SORT_CARDS', value } as const);

export const setError = (error: string | null) => ({ type: 'CARDS/SET_ERROR', error } as const);

export const getCardsTC = (): AppThunk => {
    return (dispatch, getState) => {
        const { cardsParams } = getState().cards;
        // dispatch(loadingCards(true));
        cardsAPI.getCards(cardsParams).then(res => {
            dispatch(setCardsData(res.data));
        });
        // .catch(e => {
        //     const error = e.response
        //         ? e.response.data.error
        //         : `${e.message}, more details in the console`;
        //     dispatch(setError(error));
        // })
        // .finally(() => {
        //     dispatch(loadingCards(false));
        // });
    };
};

export const updateRequestCard = (cardId: string, question: string, answer: string): AppThunk => {
    return dispatch => {
        cardsAPI.changeCard(cardId, question, answer).then(() => {
            dispatch(getCardsTC);
        });
    };
};

export type CardsActionsType =
    | ReturnType<typeof setCardsData>
    | ReturnType<typeof updateParamsCards>
    | ReturnType<typeof setError>
    | ReturnType<typeof setSearchCardsByQuestion>
    | ReturnType<typeof setSortCards>
    | ReturnType<typeof loadingCards>;
