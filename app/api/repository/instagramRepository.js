import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"
import { getCookie} from '@/app/utils/helper';


const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getInstagramPages = async (idProduct) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_GET(`api/v1/instagram/find-instagram-account/${idProduct}` , token)
    return response
}

export const instagramConnect = async ( data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_POST(`api/v1/auth/instagram`,data , token)
    return response
}
export const instagramPickPages = async ( data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_POST(`api/v1/instagram/select-instagram-account`,data , token)
    return response
}

export const instagramRevoke = async ( data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_PATCH(`api/v1/revoke/instagram`,data , token)
    return response
}

export const instagramCancelPages = async ( data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_DELETE(`api/v1/instagram/cancel-pages`,data , token)
    return response
}

export const instagramPost = async (data) => {
    await delay()
    const token = getCookie('token')
    const response = await PROVIDER_POST(`api/v1/instagram/create-post`,data , token)
    return response
}

export const instagramValidation = async (data) => {
    await delay()
    const token = getCookie('token')
    const response = await PROVIDER_POST(`api/v1/instagram/validate-account`,data , token)
    return response
}
