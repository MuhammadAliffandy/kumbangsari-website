import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT , PROVIDER_PATCH } from "../provider"
import { getCookie} from '@/app/utils/helper';

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getUserProfile = async () => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_GET(`api/v1/profile`,token )
    return response
}
export const changePasswordUser = async (data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_PATCH(`api/v1/profile/change-password`,data,token ,'form')
    return response
}

export const editUserProfile  = async (data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_PUT(`api/v1/profile`, data, token  ,'form')
    return response
}
