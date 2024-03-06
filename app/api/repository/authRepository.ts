import { User } from "@/app/utils/types"
import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = (): Promise<void> => new Promise(res => setTimeout(() => res(), 800))

export const createAuth = async ( data : User) => {
    await delay()
    const response = await PROVIDER_POST(`api/v1/users/register`,data)
    return response
}


export const loginAuth = async ( data : User) => {
    await delay()
    const response = await PROVIDER_POST(`api/v1/users/login`,data)
    return response
}

