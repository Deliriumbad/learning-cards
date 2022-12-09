import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const cardsAPI = {
    getCards(data: GetCardsParamsType) {
        return instance.get<GetCardsResponseType>('cards/card', { params: data });
    },
    updateCard(cardId: string, question: string, answer: string) {
        return instance.put<UpdateCardResponseType>('cards/card', {
            card: {
                _id: cardId,
                question,
                answer,
            },
        });
    },
    gradeCard(cardId: string, grade: number) {
        return instance.put<RateResponseT>('cards/grade', { grade, card_id: cardId });
    },
};

export type GetCardsParamsType = {
    cardAnswer?: string;
    cardQuestion?: string;
    cardsPack_id: string;
    min?: number;
    max?: number;
    sortCards?: string;
    page?: number;
    pageCount?: number;
};

export type CardType = {
    _id: string;
    answer: string;
    question: string;
    cardsPack_id: string;
    grade: number;
    shots: number;
    user_id: string;
    created: string;
    updated: string;
    answerImg: string;
    questionImg: string;
    questionVideo: string;
    answerVideo: string;
};

export type GetCardsResponseType = {
    cards: Array<CardType>;
    cardsTotalCount: number;
    maxGrade: number;
    minGrade: number;
    page: number;
    pageCount: number;
    packUserId: string;
};

type UpdateCardResponseType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
    answerImg: string;
    answerVideo: string;
    questionImg: string;
    questionVideo: string;
};

export type UpdateParamsType = {
    cardAnswer?: string;
    cardQuestion?: string;
    cardsPack_id?: string;
    min?: number;
    max?: number;
    sortCards?: string;
    page?: number;
    pageCount?: number;
};

export type RateResponseT = {
    _id: string;
    cardsPack_id: string;
    card_id: string;
    user_id: string;
    grade: number;
    shots: number;
};
