import moment from "moment";
import { format } from 'date-fns';
import idLocale from 'date-fns/locale/id';

export const formattedDate = (date)=> {
    const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    return formattedDate;
}

export const  convertToIndonesianDate = (dateString) => {
    function getIndonesianMonth(month) {
        const months = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        return months[month];
    }

    const dateJS = new Date(dateString);

    const day = dateJS.getDate();
    const month = getIndonesianMonth(dateJS.getMonth());
    const year = dateJS.getFullYear();

    const formattedDate = day + " " + month + " " + year;

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

export const getCurrentDateTime = () => {
    const now = new Date();
    const time = format(now, 'HH:mm', { timeZone: 'Asia/Jakarta' });
    const date = format(now, 'yyyy-MM-dd', { timeZone: 'Asia/Jakarta' });
    return { time, date };
};


export const formatDateTime = (inputDate, inputTime) => {

    const dateComponents = inputDate.split("-");
    const timeComponents = inputTime.split(":");

    const hours = timeComponents[0];



    const minutes = timeComponents[1];
    const seconds = timeComponents[2] ? timeComponents[2] : '00.00';
    
    const postedAt = new Date(
        parseInt(dateComponents[0]),
        parseInt(dateComponents[1]) - 1, 
        parseInt(dateComponents[2]),
        hours,
        minutes,
        seconds
    );

    const year = dateComponents[0]
    const month = String(postedAt.getUTCMonth() + 1).padStart(2, '0'); 
    const day = dateComponents[2];


    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    return formattedDateTime;
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

export const formatRupiahNumber = (amount) => {
    return amount.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export const isImageFile = (file) => {
    var mimeType = file.type;
    return mimeType.startsWith('image/');
}

export const convertEventDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate
}

export const  formatNumberHashtag = (number) => {
    if (number < 1000) {
        return number.toString();
    }

    const transformedNumber = Math.abs(number) >= 1.0e+9
        ? (Math.abs(number) / 1.0e+9).toFixed(1) + "m"
        : Math.abs(number) >= 1.0e+6
            ? (Math.abs(number) / 1.0e+6).toFixed(1) + "jt"
            : Math.abs(number) >= 1.0e+3
                ? (Math.abs(number) / 1.0e+3).toFixed(1) + "rb"
                : Math.abs(number);

    return transformedNumber;
}

export const convertToTimeWIB = (isoString) => {

    const date = new Date(isoString);

    const wibOffset = 7 * 60; 
    const wibDate = new Date(date.getTime() + (wibOffset * 60 * 1000));
    const hours = wibDate.getUTCHours();
    const minutes = wibDate.getUTCMinutes();

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${formattedHours} : ${formattedMinutes} WIB`;
}

export const isToday = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return date.getTime() === today.getTime();
};