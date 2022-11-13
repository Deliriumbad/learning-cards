export const profileInitState = {};

export type ProfileStateType = typeof profileInitState;

type ActionType = any;

export const profileReducer = (
    state: ProfileStateType = profileInitState,
    action: ActionType,
): ProfileStateType => {
    switch (action.type) {
        case '1':
            return { ...state };
        default:
            return state;
    }
};
