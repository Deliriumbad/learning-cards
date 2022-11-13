export const newPassInitState = {};

export type NewPassStateType = typeof newPassInitState;

type ActionType = any;

export const newPassReducer = (
    state: NewPassStateType = newPassInitState,
    action: ActionType,
): NewPassStateType => {
    switch (action.type) {
        case '1':
            return { ...state };
        default:
            return state;
    }
};
