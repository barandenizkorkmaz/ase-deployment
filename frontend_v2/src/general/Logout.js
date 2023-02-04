import { saveState } from "../localstorage/LocalStorage";

export const logout = () =>{
    saveState("token","");
    saveState("userType", "");
    saveState("login", false);
    window.location.href = "/home";
}