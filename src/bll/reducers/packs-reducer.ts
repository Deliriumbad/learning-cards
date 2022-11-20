import { AppThunk } from 'bll/store/store';
import { packApi, PackType } from 'dal/packs-api';

export const packsInitState = {
    packs: [] as PackType[],
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
        default:
            return state;
    }
};

export const setPacks = (data: PackType[]) => {
    return { type: 'GET-PACKS', data } as const;
};

export const requestPacks = (): AppThunk => {
    return dispatch => {
        packApi.packs().then(response => {
            dispatch(setPacks(response.data.cardPacks));
        });
    };
};

type PacksActions = ReturnType<typeof setPacks>;
