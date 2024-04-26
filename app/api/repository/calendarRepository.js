import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"
import { getCookie} from '@/app/utils/helper';

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getContentCalendar= async () => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_GET(`api/v1/calender`, token)
    return response
}