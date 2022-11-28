import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const packApi = {
    getPacks(data: GetPacksParams) {
        return instance.get<GetPacksResponseType>('cards/pack', {
            params: data,
        });
    },
    deletePack(id: string) {
        return instance.delete<DeletePackResponseType>('cards/pack', { params: { id } });
    },
    createPack(name: string) {
        return instance.post('cards/pack', { cardsPack: { name } });
    },
    updatePack(packId: string, name: string) {
        return instance.put('cards/pack', { cardsPack: { _id: packId, name } });
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

export type PackType = {
    _id: string;
    user_id: string;
    user_name: string;
    name: string;
    cardsCount: number;
    created: string;
    updated: string;
};

export type GetPacksResponseType = {
    cardPacks: PackType[];
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
    error?: string;
};

type DeletePackResponseType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
};
