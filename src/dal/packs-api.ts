import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const packApi = {
    packs(data: GetPacksParams) {
        return instance.get<ResponsePacksType>('cards/pack', {
            params: data,
        });
    },
};

export type GetPacksParams = {
    packName?: string;
    min?: number;
    max?: number;
    sortPacks?: string;
    page?: number;
    pageCount?: number;
    user_id?: string;
};

export type ResponsePacksType = {
    cardPacks: PackType[];
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
    error?: string;
};

export type PackType = {
    _id: string;
    user_id: string;
    user_name: string;
    name: string;
    cardsCount: number;
    created: string;
    updated: string;
};
