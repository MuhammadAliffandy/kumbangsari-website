import moment from "moment";
import { format } from 'date-fns';
import idLocale from 'date-fns/locale/id';

export const formattedDate = (date)=> {
    const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    return formattedDate;
}

export const setCookie = (name, value, days, path = '/') => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const cookieValue = encodeURIComponent(value) + ((days) ? `; expires=${expires.toUTCString()}` : '') + `; path=${path}`;
    document.cookie = `${name}=${cookieValue}`;
}

export const getCookie = (name)=>  {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

export const convertValueCheckbox = (text) => {
    if(text.search(',') > -1){
        return text.split(',')
    }else{
        return [text]
    }
}


export const formattedDateNumber = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate() + 2).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}

export const dateIndonesianNow = () => {

    const now = new Date()
    const formattedDate = format(now, "EEEE, dd MMMM yyyy", { locale: idLocale });
    return formattedDate;
}