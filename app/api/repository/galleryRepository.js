import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAllGallery = async () => {
    await delay()
    const response = await PROVIDER_GET(`api/gallery`)
    return response
}
export const addGallery = async ( data ) => {
    await delay()
    const response = await PROVIDER_POST(`api/gallery`, data , 'form')
    return response
}

export const editGallery = async ( data) => {
    await delay()
    const response = await PROVIDER_PUT(`api/gallery`, data , 'form')
    return response
}


