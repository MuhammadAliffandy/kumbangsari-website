import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"
import { getCookie} from '@/app/utils/helper';

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getFacebookPages = async () => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_GET(`api/v1/facebook/find-pages` , token)
    return response
}

export const facebookConnect = async ( data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_POST(`api/v1/auth/facebook`,data , token)
    return response
}
export const facebookPickPages = async ( data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_POST(`api/v1/facebook/select-pages`,data , token)
    return response
}

export const facebookCancelPages = async ( data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_DELETE(`api/v1/facebook/cancel-pages`,data , token)
    return response
}

export const facebookRevoke = async ( data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_PATCH(`api/v1/revoke/facebook`,data , token)
    return response
}
