import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"
import { getCookie} from '@/app/utils/helper';

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getProductByUser = async () => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_GET(`api/v1/product`, token)
    return response
}
export const addProduct = async ( data ) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_POST(`api/v1/product`, data , token)
    return response
}

export const editProduct = async ( data , idProduct ) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_PUT(`api/v1/product/${idProduct}`, data , token)
    return response
}
export const deleteProduct = async ( idProduct , data ) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_DELETE(`api/v1/product/${idProduct}`, data ,token)
    return response
}

