export const loginInitState = {};

export type LoginStateType = typeof loginInitState;

type ActionType = any;

export const loginReducer = (
    state: LoginStateType = loginInitState,
    action: ActionType,
): LoginStateType => {
    switch (action.type) {
        case '1':
            return { ...state };
        default:
            return state;
    }
};
