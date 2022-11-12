import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import { loginReducer } from "../reducers/login-reducer";
import { newPassReducer } from "../reducers/new-password-reducer";
import { passRecoveryReducer } from "../reducers/password-recovery-reducer";
import { profileReducer } from "../reducers/profile-reducer";
import { registerReducer } from "../reducers/register-reducer";

const reducers = combineReducers({
  login: loginReducer,
  register: registerReducer,
  newPass: newPassReducer,
  passRecovery: passRecoveryReducer,
  profile: profileReducer,
});

export const store = legacy_createStore(reducers, applyMiddleware(thunk));
export type AppStoreType = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store;
