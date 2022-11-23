import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const cardsAPI = {
    getCards(data: GetCardsParamsType) {
        return instance.get<GetCardsResponseType>('cards/card', { data }).then(res => res.data);
    },
};

export type GetCardsParamsType = {
    cardsPack_id: string;
    cardAnswer?: string;
    cardQuestion?: string;
    min?: number;
    max?: number;
    sortCards?: string;
    page?: number;
    pageCount?: number;
};

export type CardType = {
    answer: string;
    question: string;
    cardsPack_id: string;
    grade: number;
    shots: number;
    user_id: string;
    created: string;
    updated: string;
    _id: string;
    comments?: string;
    type?: string;
    rating?: number;
    more_id?: string;
    __v?: number;
};

export type GetCardsResponseType = {
    cardsData: CardType[];
    packUserId: string;
    cardsTotalCount: number;
    maxGrade: number;
    minGrade: number;
    page: number;
    pageCount: number;
};
