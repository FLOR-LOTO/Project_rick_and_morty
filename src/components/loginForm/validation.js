


export const validations = (values) => {
    let errors ={};
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const regexChartNumber = /\d/;

        if (!values.email) {
            errors.email = "El email es requerido";
        }
        else if (!regexEmail.test(values.email)) {
            errors.email = "El email es inválido";
        }
        if (values.password.length > 10) {
            errors.password = "El password no puede tener mas de 10 caracteres";
        }
        if (!values.password) {
            errors.password = "El password es requerido";
        }
        if (!regexChartNumber.test(values.password)) {
                errors.password = "El password debe contener al menos un numero";
        }
        if (values.password.length < 6 || values.password.length > 10) {
            errors.password = "El password debe tener entre 6 y 10 caracteres";
        }
        return errors;
}



