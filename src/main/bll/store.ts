import {applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {loginReducer} from "../../features/auth/Login/login-reducer";
import thunk from "redux-thunk";
import {registerReducer} from "../../features/auth/Registration/register-reducer";
import {newPassReducer} from "../../features/auth/NewPassword/newPassword-reducer";
import {passRecoveryReducer} from "../../features/auth/PasswordRecovery/passwordRecovery-reducer";
import {profileReducer} from "../../features/auth/Profile/profile-reducer";

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