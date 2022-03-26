export const REGISTER_USER = "REGISTER_USER";
export const USER_REGISTRATION_RECEIVED = "USER_REGISTRATION_RECEIVED";
export const LOGIN_USER = "LOGIN_USER";
export const USER_LOGIN_RECEIVED = "USER_LOGIN_RECEIVED"


export const registerUser = (payload) => ({
    type: REGISTER_USER,
    payload
});


export const userRegistrationReceived = (response) => ({
    type: USER_REGISTRATION_RECEIVED,
    response
})

export const loginUser = (payload) => ({
    type: LOGIN_USER,
    payload
})

export const userLoginReceived = (payload) => ({
    type: USER_LOGIN_RECEIVED,
    payload
})