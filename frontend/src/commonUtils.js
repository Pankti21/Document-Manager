import * as yup from "yup";

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