import * as yup from "yup";
import Swal from "sweetalert2";

export function validateYupSchema(type, name, required = true) {
    function func(data) {
        return required ? data.required(`${name} ${("is required")}`) : data;
    }

    function validate() {
        switch (type) {
            case "text":
                return func(yup.string());
            case "email":
                return func(yup.string().email());
            case "password":
                return func(yup.string())
        }
    }

    return validate();
}

export const showPopUp = function (text, title, action, type = "info") {
    const data = {
        title: title || "Information",
        html: text,
        showCloseButton: true,
        showCancelButton: action,
        type,
        heightAuto: false
    };

    if (action) {
        return Swal.fire(data).then((result) => {
            if (result.value) {
                action();
            }
        });
    }

    return Swal.fire(data);
};

export const showError = function (error) {
    if (error.response) {
        const err = error.response.data.data;
        showPopUp(err, "Error", null, "error");
    } else if (error.request) {
        showPopUp(error.request, "Error", null, "error");
    } else {
        showPopUp(error.message, "Error", null, "error");
    }
};

export const isError = (error) => {
    const codes = new Set([200, 201])
    return !(codes.has(error?.response?.status));
}