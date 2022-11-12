export const profileInitState = {}

export type profileStateType = typeof profileInitState

type ActionType = any

export const profileReducer = (state: profileStateType = profileInitState, action: ActionType): profileStateType => {
    switch (action.type) {
        case '1':
            return {...state}
        default:
            return state
    }
}