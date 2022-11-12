import {applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {loginReducer} from "../reducers/login-reducer";
import thunk from "redux-thunk";
import {registerReducer} from "../reducers/register-reducer";
import {newPassReducer} from "../reducers/new-password-reducer";
import {passRecoveryReducer} from "../reducers/password-recovery-reducer";
import {profileReducer} from "../reducers/profile-reducer";

const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    newPass: newPassReducer,
    passRecovery: passRecoveryReducer,
    profile: profileReducer
})

export const store = legacy_createStore(reducers, applyMiddleware(thunk))
export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store;