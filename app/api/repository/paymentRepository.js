import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT , PROVIDER_PATCH } from "../provider"
import { getCookie} from '@/app/utils/helper';

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getPaymentTransaction = async () => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_GET(`api/v1/payment/transaction`,token )
    return response
}

export const createPayment = async (data) => {
    await delay() 
    const token = getCookie('token');
    const response = await PROVIDER_POST(`api/v1/payment/create-invoice`,data, token)
    return response
}

export const validatePaymentStatus = async (data) => {
    await delay() 
    const token = getCookie('token');
    const response = await PROVIDER_PATCH(`api/v1/payment/validate-payment-status`,data, token)
    return response
}