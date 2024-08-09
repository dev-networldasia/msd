import axiosClient, { ResponseSuccess } from "../axiosClient";
export interface InfoUser {
}

export interface IProfile<T> {
    status: number;
    message: string;
    data: T;
    token: string;
}

export interface InfoHomepageDescription {
    id: number
    headline: string
    description: string
    img: string
    imgMobile: string
    type: number
    delf: number
    timestamp: any
}

export const getToken = async (ip: string) => {
    const path = "token.php";
    const params = {
        ip
    }
    const result: IProfile<InfoUser> = await axiosClient.post(path, params)
    return result;
}



export const homepageDescriptionDetail = async (type: number = 1) => {
    const path = "homepageDetail.php";
    const params = { type }
    const result: ResponseSuccess<InfoHomepageDescription> = await axiosClient.get(path, { params })
    return result;
}
