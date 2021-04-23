import Cookies from "js-cookie"
import { enLang } from "./en-Lang";

export const GetLocal = () => {
    var local = Cookies.get('local');

    if (local === undefined) {
        return enLang;
    } else if (local === "en") {
        return enLang;
    }
}