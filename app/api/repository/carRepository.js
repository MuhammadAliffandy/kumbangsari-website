import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const fetchCars = async () => {
    await delay()
    const response = await PROVIDER_GET(`cars`)
    return response
}

export const fetchCarsId = async (id) => {
    await delay()
    const response = await PROVIDER_GET(`cars/${id}`)
    return response
}

export const updateCars = async (id,data) => {
    await delay()
    const response = await PROVIDER_PUT(`cars/${id}`,data)
    return response
}