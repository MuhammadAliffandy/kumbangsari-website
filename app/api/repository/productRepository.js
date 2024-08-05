import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAllProduct = async () => {
    await delay()
    const response = await PROVIDER_GET(`api/product`)
    return response
}
export const addProduct = async ( data ) => {
    await delay()
    const response = await PROVIDER_POST(`api/product`, data , 'form')
    return response
}

export const editProduct = async ( data ) => {
    await delay()
    const response = await PROVIDER_PUT(`api/product`, data , 'form')
    return response
}


