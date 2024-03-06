export const validatePassword = (value) => {
    let isValid = true;
    let errorMessage = '';

    if (!value) {
        isValid = false;
        errorMessage = 'Password harus diisi';
    }
    
    if (isValid && value.length < 8) {
        isValid = false;
        errorMessage = 'Panjang password harus kurang lebih 8 karakter';
    }

    if (isValid && !/[a-z]/.test(value)) {
        isValid = false;
        errorMessage = 'Password harus mengandung setidaknya satu huruf kecil';
    }

    if (isValid && !/[A-Z]/.test(value)) {
        isValid = false;
        errorMessage = 'Password harus mengandung setidaknya satu huruf kapital';
    }

    if (isValid && !/\d/.test(value)) {
        isValid = false;
        errorMessage = 'Password harus mengandung setidaknya 1 angka ';
    }

    if (isValid && !/[@$!%*?&#]/.test(value)) {
        isValid = false;
        errorMessage = 'Password harus mengandung setidaknya 1 karakter spesial';
    }

    return isValid || errorMessage;
};


export const validateEmail = (value ) => {
    let isValid = true;
    let errorMessage = '';

    if (!value) {
        isValid = false;
        errorMessage = 'Email harus diisi';
    }

    if (isValid && !/^\S+@\S+$/.test(value)) {
        isValid = false;
        errorMessage = 'Format Email tidak sesuai ';
    }

    return isValid || errorMessage;
}

export const validatePhoneNumber = (value  ) => {
    let isValid  = true;
    let errorMessage = '';

    if (!value) {
        isValid = false;
        errorMessage = 'Nomor Handphone harus diisi';
    }

    if (isValid &&  !/^\d{10,15}$/.test(value)) {
        isValid = false;
        errorMessage = 'Format nomer handphone salah';
    }

    return isValid || errorMessage;

} 

export const validateName = (value) => {

    let isValid  = true;
    let errorMessage = '';

    if (!value) {
        isValid = false;
        errorMessage = 'Nama harus diisi';
    }

    if ( isValid && !/^[a-zA-Z0-9_ ]{5,40}$/.test(value)) {
        isValid = false;
        errorMessage = 'Name harus terdiri dari 5 hingga 40 karakter yang terdiri dari huruf, angka, underscore, dan spasi';
    }

    return isValid || errorMessage;

}