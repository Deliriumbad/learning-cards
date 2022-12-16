import {
    cardsAPI,
    CardType,
    CreateCardParamsT,
    GetCardsResponseType,
    UpdateParamsType,
} from '../../dal/cards-api';
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

    load: false,

    currentCard: {
        _id: '',
        answer: '',
        question: '',
    },

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
        case 'CARDS/LOAD': {
            return { ...state, load: action.isLoading };
        }
        case 'CARDS/SET_CURRENT_CARD': {
            return { ...state, currentCard: { ...action.card } };
        }
        case 'CARD/SET_UPDATED_CARD_GRADE': {
            return {
                ...state,
                cards: state.cards.map(card =>
                    card._id === action.gradeData.cardId
                        ? {
                              ...card,
                              grade: action.gradeData.grade,
                          }
                        : card,
                ),
            };
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

export const setCards = (data: GetCardsResponseType) =>
    ({ type: 'CARDS/SET_CARDS_DATA', data } as const);

export const updateParamsCards = (params: UpdateParamsType) =>
    ({ type: 'CARDS/UPDATE_PARAMS_CARDS', params } as const);

export const setSearchCardsByQuestion = (value: string) =>
    ({ type: 'CARDS/SET_SEARCH_BY_QUESTION', value } as const);

export const setCurrentCard = (card: { _id: string; answer: string; question: string }) =>
    ({ type: 'CARDS/SET_CURRENT_CARD', card } as const);

export const loadingCards = (isLoading: boolean) =>
    ({ type: 'CARDS/IS_LOADING', isLoading } as const);

export const load = (isLoading: boolean) => ({ type: 'CARDS/LOAD', isLoading } as const);

export const setSortCards = (value: string) => ({ type: 'CARDS/SET_SORT_CARDS', value } as const);

export const setError = (error: string | null) => ({ type: 'CARDS/SET_ERROR', error } as const);

export const setUpdatedCardGrade = (gradeData: { cardId: string | undefined; grade: number }) =>
    ({ type: 'CARD/SET_UPDATED_CARD_GRADE', gradeData } as const);

export const getRequestCards = (): AppThunk => {
    return (dispatch, getState) => {
        const { cardsParams } = getState().cards;
        cardsAPI.getCards(cardsParams).then(res => {
            dispatch(setCards(res.data));
        });
    };
};

export const updateRequestCard = (cardId: string, question: string, answer: string): AppThunk => {
    return dispatch => {
        cardsAPI.updateCard(cardId, question, answer).then(() => {
            dispatch(getRequestCards());
        });
    };
};

export const createRequestCard = (data: CreateCardParamsT): AppThunk => {
    return dispatch => {
        cardsAPI.createCards(data).then(() => {
            dispatch(getRequestCards());
        });
    };
};

export const deleteRequestCard = (cardId: string): AppThunk => {
    return dispatch => {
        cardsAPI.deleteCards(cardId).then(() => {
            dispatch(getRequestCards());
        });
    };
};

export const updateGradeRequest = (cardId: string, grade: number): AppThunk => {
    return dispatch => {
        dispatch(load(true));
        cardsAPI.gradeCard(cardId, grade).then(() => {
            dispatch(setUpdatedCardGrade({ cardId, grade }));
            dispatch(load(false));
        });
    };
};

export type CardsActionsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCurrentCard>
    | ReturnType<typeof updateParamsCards>
    | ReturnType<typeof setError>
    | ReturnType<typeof setSearchCardsByQuestion>
    | ReturnType<typeof setSortCards>
    | ReturnType<typeof loadingCards>
    | ReturnType<typeof load>
    | ReturnType<typeof setUpdatedCardGrade>;
