import {LOGIN_USER, REGISTER_USER, USER_LOGIN_RECEIVED, USER_REGISTRATION_RECEIVED} from "../actions";


const initialState = {
    isUserRegistrationDone: false,
    userRegistrationData: {},
    isUserLoginDone: false,
    userLoginData: {}
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                isUserRegistrationDone: false,
            }
        case USER_REGISTRATION_RECEIVED: {
            return {
                ...state,
                isUserRegistrationDone: true,
                userRegistrationData: action.response,
            }
        }
        case LOGIN_USER:
            return {
                ...state,
                isUserLoginDone: false
            }
        case USER_LOGIN_RECEIVED: {
            return {
                ...state,
                isUserLoginDone: true
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default auth;