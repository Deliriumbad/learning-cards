import { AppThunk } from 'bll/store/store';
import { packApi, GetPacksResponseType } from 'dal/packs-api';

export const packsInitState = {
    cardPacks: [
        {
            _id: '',
            user_id: '',
            user_name: '',
            name: '',
            cardsCount: 20,
            created: '',
            updated: '',
        },
    ],

    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    error: null as null | string,

    packParams: {
        packName: '',
        min: 0,
        max: 0,
        sortPacks: '0updated',
        page: 1,
        pageCount: 8,
        user_id: '',
        isLoading: false,
    },
};

export type PacksStateType = typeof packsInitState;

export const packsReducer = (
    state: PacksStateType = packsInitState,
    action: PacksActions,
): PacksStateType => {
    switch (action.type) {
        case 'PACKS/GET_PACKS':
            return { ...state, ...action.data };
        case 'PACKS/UPDATE_PACKS_PARAMS':
            return { ...state, packParams: { ...state.packParams, ...action.params } };
        case 'PACKS/SET_SORT_PACKS':
            return { ...state, packParams: { ...state.packParams, sortPacks: action.params } };
        case 'PACKS/IS_LOADING':
            return { ...state, packParams: { ...state.packParams, isLoading: action.isLoading } };
        default:
            return state;
    }
};

export const setPacks = (data: GetPacksResponseType) => {
    return { type: 'PACKS/GET_PACKS', data } as const;
};

export const updatePacksParams = (params: UpdateParamsT) => {
    return { type: 'PACKS/UPDATE_PACKS_PARAMS', params } as const;
};

export const setSortPacks = (params: string) => ({ type: 'PACKS/SET_SORT_PACKS', params } as const);

export const setError = (error: string | null) => ({ type: 'CARDS/SET_ERROR', error } as const);

export const loadingCardsPack = (isLoading: boolean) =>
    ({ type: 'PACKS/IS_LOADING', isLoading } as const);

export const getRequestPacks = (): AppThunk => {
    return (dispatch, getState) => {
        const { packParams } = getState().packs;
        dispatch(loadingCardsPack(true));
        packApi
            .getPacks(packParams)
            .then(response => {
                dispatch(setPacks(response.data));
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : `${e.message}, more details in the console`;
                dispatch(setError(error));
            })
            .finally(() => {
                dispatch(loadingCardsPack(false));
            });
    };
};

export const deleteRequestPack = (packId: string): AppThunk => {
    return dispatch => {
        packApi.deletePack(packId).then(() => {
            dispatch(getRequestPacks());
        });
    };
};

export const updateRequestPack = (packId: string, name: string): AppThunk => {
    return dispatch => {
        packApi.updatePack(packId, name).then(() => {
            dispatch(getRequestPacks());
        });
    };
};

export const createRequestPack = (name: string): AppThunk => {
    return dispatch => {
        packApi.createPack(name).then(() => {
            dispatch(getRequestPacks());
        });
    };
};

export type PacksActions =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof updatePacksParams>
    | ReturnType<typeof setSortPacks>
    | ReturnType<typeof loadingCardsPack>
    | ReturnType<typeof setError>;

export type UpdateParamsT = {
    packName?: string;
    min?: number;
    max?: number;
    sortPacks?: string;
    page?: number;
    user_id?: string;
};
