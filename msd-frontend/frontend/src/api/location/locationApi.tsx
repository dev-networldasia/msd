import axiosClient, { ResponseSuccess, ResponseSuccessTotal } from "../axiosClient";

export interface InfoProvince {
    id: number
    title: string
}

export interface InfoLocation {
    id: number
    name: string
    description: string
    address: string
    operation?: string
    province: number
    district: number
    ward: number
    phone: string
    img: string
    imgMobile: string
    lat: number
    lng: number
    type: number
    typeText: string
    delf: number
    timestamp: any
}

export const listProvince = async () => {
    const path = "listProvince.php";
    const params = {}
    const result: ResponseSuccessTotal<InfoProvince[]> = await axiosClient.get(path, { params })
    return result;
}

export const listDistrictByProvince = async (provinceId: number) => {
    const path = "listDistrictByProvince.php";
    const params = { provinceId }
    const result: ResponseSuccessTotal<InfoProvince[]> = await axiosClient.get(path, { params })
    return result;
}

export const listConsultLocation = async (lat: number = 0, lng: number = 0, province: number, district: number, nameOrAddress: string, limit: number = 2, offset: number = 0) => {
    const path = "listConsultLocation.php";
    const params = { lat, lng, province, district, nameOrAddress, limit, offset }
    const result: ResponseSuccessTotal<InfoLocation[]> = await axiosClient.get(path, { params })
    return result;
}

export const consultLocationDetail = async (id: number) => {
    const path = "consultLocationDetail.php";
    const params = { id }
    const result: ResponseSuccessTotal<InfoLocation> = await axiosClient.get(path, { params })
    return result;
}

