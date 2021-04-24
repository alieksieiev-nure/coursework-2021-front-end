import { baseUrl } from "../config/baseUrl"

export const LogIn = (loginData, passwordData) => {
    var payload = {
        Login: loginData,
        Password: passwordData
    }
    fetch(baseUrl + "Authenfication/Login", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
}

export const Register = (login, password, fullName, email, phoneNumber) => {
    var currJSONDate = new Date();
    var payload = {
        Login: login,
        Password: password,
        FullName: fullName,
        Email: email,
        PhoneNumber: phoneNumber,
        CreationDate: currJSONDate.toJSON(),
        Role: 0
    };

    return fetch(baseUrl + "Authenfication/Register", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (!response.ok) {
            return false;
        } else {
            return true;
        }
    });
}