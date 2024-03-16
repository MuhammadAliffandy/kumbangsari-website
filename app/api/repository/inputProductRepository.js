import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"
import { getCookie} from '@/app/utils/helper';

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const addProduct = async ( data ) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_POST(`api/v1/product`, data , token)
    return response
}
