import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const createAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`api/v1/users/register`,data)
    return response
}


export const loginAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`api/v1/users/login`,data)
    return response
}


export const sendOTPAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`api/v1/users/send-otp`,data)
    return response
}

export const verificationOTPAuth = async ( data) => {
    await delay()
    const response = await PROVIDER_POST(`api/v1/users/verification`,data)
    return response
}

