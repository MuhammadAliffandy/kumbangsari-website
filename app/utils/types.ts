// this is example type 

export interface CarData {
    image?: string;
    capacity?: number;
    rentPerDay?: number;
    description?: string;
    availableAt?: string;
}

export interface CarId {
    id : string;
}

export interface CarApiData{
    id: string;
    plate: string;
    manufacture: string;
    model: string;
    image: string;
    rentPerDay: number;
    capacity: number;
    description: string;
    availableAt: string;
    transmission: string;
    available: boolean;
    type: string;
    year: number;
    options: string[];
    specs: string[];
}

//  added new type initiation in ate here


export interface User{
    name?: string,
    email : string,
    phoneNumber? : string ,
    password : string ,
    confirmPassword?: string,
}