import { AppThunk } from 'bll/store/store';
import { packApi, ResponsePacksType } from 'dal/packs-api';

export const packsInitState = {
    cardPacks: [
        {
            _id: '',
            user_id: '',
            user_name: '',
            name: '',
            cardsCount: 0,
            created: '',
            updated: '',
        },
    ],

    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 0,

    packParams: {
        packName: '',
        min: 0,
        max: 0,
        sortPacks: '0updated',
        page: 1,
        pageCount: 8,
        user_id: '',
    },
};

export type PacksStateType = typeof packsInitState;

export const packsReducer = (
    state: PacksStateType = packsInitState,
    action: PacksActions,
): PacksStateType => {
    switch (action.type) {
        case 'GET-PACKS':
            return { ...state, ...action.data };
        case 'UPDATE-PACKS-PARAMS':
            return { ...state, packParams: { ...state.packParams, ...action.params } };
        default:
            return state;
    }
};

export const setPacks = (data: ResponsePacksType) => {
    return { type: 'GET-PACKS', data } as const;
};

export const updatePacksParams = (params: UpdateParamsT) => {
    return { type: 'UPDATE-PACKS-PARAMS', params } as const;
};

export const requestPacks = (): AppThunk => {
    return (dispatch, getState) => {
        const { packParams } = getState().packs;
        packApi.packs(packParams).then(response => {
            dispatch(setPacks(response.data));
        });
    };
};

export type PacksActions = ReturnType<typeof setPacks> | ReturnType<typeof updatePacksParams>;

export type UpdateParamsT = {
    packName?: string;
    min?: number;
    max?: number;
    sortPacks?: string;
    page?: number;
    user_id?: string;
};
