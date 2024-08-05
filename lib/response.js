


export const sendSuccessResponse = (data, message = 'Success',) => {
    return {
        status: 'OK',
        message : message,
        data : data,
    };
};

export const sendErrorResponse = (error, message = 'Error') => {
    return {
        status: 'FAIL',
        message : message,
        error: error.message ? error.message : error,
    };
};
