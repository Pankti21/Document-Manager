export const REGISTER_USER = "REGISTER_USER";
export const USER_REGISTRATION_RECEIVED = "USER_REGISTRATION_RECEIVED";


export const registerUser = (data) => ({
    type: REGISTER_USER,
    data
});


export const userRegistrationReceived = (data) => ({
    type: USER_REGISTRATION_RECEIVED,
    data
})