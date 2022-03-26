import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {REGISTER_USER, userRegistrationReceived} from "../actions";


function* registerUser(action) {
    try {
        const json = yield axios
            .post("/signup", action.payload)
            .then((res) => res.data);
        yield put(userRegistrationReceived(json));
    } catch (err) {
        yield put(userRegistrationReceived(err));
    }
}

export function* registerUserSaga() {
    yield takeLatest(REGISTER_USER, registerUser);
}