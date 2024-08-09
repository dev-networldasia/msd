import axiosClient, { ResponseSuccess } from "../axiosClient";
export interface InfoBanner {
    id: number
    name: string
    img: Img[]
    imgMobile: ImgMobile[]
    type: number
    delf: number
    timestamp: any
}
export interface Img {
    id: number
    img: string
}
export interface ImgMobile {
    id: number
    imgMobile: string
}

export const bannerDetail = async (type: number = 1) => {
    const path = "bannerDetail.php";
    const params = { type }
    const result: ResponseSuccess<InfoBanner> = await axiosClient.get(path, { params })
    return result;
}