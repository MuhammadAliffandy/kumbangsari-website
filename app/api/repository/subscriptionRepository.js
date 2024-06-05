import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT , PROVIDER_PATCH } from "../provider"
import { getCookie} from '@/app/utils/helper';

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getUserSubscription = async () => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_GET(`api/v1/subscription/user-subscription`,token )
    return response
}

export const stopUserSubscription = async (data ) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_DELETE(`api/v1/subscription/stop-subscription`, data ,token)
    return response;
}