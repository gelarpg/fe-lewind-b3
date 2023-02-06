import {config} from "../../../app/config/main";

export const storeToken = (token) => {
    localStorage.setItem('b3token', token);
    if(!config?.authSetting?.axiosObject)
        throw Error("axiosObject need to be set under authSettings inside app/config/main.js");
    else
        config.authSetting.axiosObject.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export const removeToken = () => {
    localStorage.removeItem('b3token');
    if(!config?.authSetting?.axiosObject)
        throw Error("axiosObject need to be set under authSettings inside app/config/main.js");
    else
        delete config.authSetting.axiosObject.defaults.headers.common['Authorization'];
};