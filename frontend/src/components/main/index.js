// Main entry after redux and router are loaded

import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getCurrentUser} from "../../redux/actions";

function Main() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUser());
    }, []);

    return null
}

export {Main}