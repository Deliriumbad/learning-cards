export const passRecoveryInitState = {};

export type PassRecoveryStateType = typeof passRecoveryInitState;

type ActionType = any;

export const newPasswordReducer = (
    state: PassRecoveryStateType = passRecoveryInitState,
    action: ActionType,
): PassRecoveryStateType => {
    switch (action.type) {
        case '1':
            return { ...state };
        default:
            return state;
    }
};
