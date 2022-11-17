export const IS_LOG_OUT = 'IS_LOG_OUT';
export const profileInitState = {
    isLogOut: false,
};

export type ProfileStateType = typeof profileInitState;

export const profileReducer = (
    state: ProfileStateType = profileInitState,
    action: ActionType,
): ProfileStateType => {
    switch (action.type) {
        case 'IS_LOG_OUT':
            return {
                ...state,
                isLogOut: true,
            };
        default:
            return state;
    }
};
export const logOutAC = () => ({ type: IS_LOG_OUT } as const);

type ActionType = ReturnType<typeof logOutAC>;
