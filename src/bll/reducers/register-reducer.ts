export const registerInitState = {};

export type RegisterStateType = typeof registerInitState;

type ActionType = any;

export const registerReducer = (
  state: RegisterStateType = registerInitState,
  action: ActionType
): RegisterStateType => {
  switch (action.type) {
    case "1":
      return { ...state };
    default:
      return state;
  }
};
