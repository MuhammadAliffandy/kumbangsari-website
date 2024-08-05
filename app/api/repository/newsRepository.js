import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAllNews = async () => {
    await delay()
    const response = await PROVIDER_GET(`api/news`)
    return response
}
export const addNews = async ( data ) => {
    await delay()
    const response = await PROVIDER_POST(`api/news`, data , 'form')
    return response
}

export const editNews = async ( data  ) => {
    await delay()
    const response = await PROVIDER_PUT(`api/news`, data , 'form')
    return response
}


