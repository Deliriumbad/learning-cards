import { AppThunk } from 'bll/store/store';
import { packApi, PackType } from 'dal/packs-api';

export const packsInitState = {
    packs: [] as PackType[],
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

type Actions = PacksActions;

export const packsReducer = (
    state: PacksStateType = packsInitState,
    action: Actions,
): PacksStateType => {
    switch (action.type) {
        case 'GET-PACKS':
            return { ...state, packs: [...action.data] };
        case 'UPDATE-PACKS-PARAMS':
            return { ...state, packParams: { ...state.packParams, ...action.params } };
        default:
            return state;
    }
};

export const setPacks = (data: PackType[]) => {
    return { type: 'GET-PACKS', data } as const;
};

export const updatePacksParams = (params: UpdateParamsT) => {
    return { type: 'UPDATE-PACKS-PARAMS', params } as const;
};

export const requestPacks = (): AppThunk => {
    return (dispatch, getState) => {
        const { packParams } = getState().packs;
        packApi.packs(packParams).then(response => {
            dispatch(setPacks(response.data.cardPacks));
        });
    };
};

type PacksActions = ReturnType<typeof setPacks> | ReturnType<typeof updatePacksParams>;

export type UpdateParamsT = {
    packName?: string;
    min?: number;
    max?: number;
    sortPacks?: string;
    page?: number;
    user_id?: string;
};
