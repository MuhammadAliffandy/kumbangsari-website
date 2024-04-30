import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT , PROVIDER_PATCH } from "../provider"
import { getCookie} from '@/app/utils/helper';

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const changePasswordUser = async (data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_PATCH(`api/v1/users`,token , data)
    return response
}