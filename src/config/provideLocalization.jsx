import Cookies from "js-cookie"
import { enLang, uaLang } from "./en-Lang";

export const GetLocal = () => {
    var local = Cookies.get('local');

    if (local === undefined) {
        return enLang;
    } else if (local === "en") {
        return enLang;
    } else if (local === "ua") {
        return uaLang;
    } else {
        return enLang;
    }
}

export const ChangeLanguage = (lang) => {
    Cookies.set('local', lang);
}