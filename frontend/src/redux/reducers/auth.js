import {REGISTER_USER, USER_REGISTRATION_RECEIVED} from "../actions";


const initialState = {
    isUserRegistrationDone: false,
    userRegistrationData: {}
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                isUserRegistrationDone: false,
                ...state,

            }
        case USER_REGISTRATION_RECEIVED: {
            return {
                isUserRegistrationDone: true,
                userRegistrationData: action.data,
                ...state
            }
        }

    }
}

export default auth;