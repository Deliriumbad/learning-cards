export const registerInitState = {};

export type RegisterStateType = typeof registerInitState;

export type RegisterActionType = any;

export const registerReducer = (
    state: RegisterStateType = registerInitState,
    action: RegisterActionType,
): RegisterStateType => {
    switch (action.type) {
        case '1':
            return { ...state };
        default:
            return state;
    }
};
