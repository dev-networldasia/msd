import axiosClient, { ResponseSuccess, ResponseSuccessTotal } from "../axiosClient";
// export interface InfoQuestion {
//     id: number
//     title: string
// }
//Danh sách câu hỏi
// export const questionByAgeGender = async (gender: number, age: number) => {
//     const path = "questionByAgeGender.php";
//     const params = {
//         gender,
//         age,
//     }
//     const result: ResponseSuccessTotal<InfoQuestion[]> = await axiosClient.get(path, { params })
//     return result;
// }
export const hbsreport = async (token: string, known: number, plan: number) => {
    const path = "hbsReport.php";
    const params = {
        token,
        known,
        plan
    }
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}

export const cookieReport = async (token: string, type: number, ip: string, country: string, city: string, custom: any, utmSource: any, utmMedium: any, utmCampaign: any, utmId: any, utmContent: any, device: string) => {
    const path = "cookieReport.php";
    const params = {
        token,
        type,
        ip,
        country,
        city,
        custom,
        utmSource,
        utmMedium,
        utmCampaign,
        utmId,
        utmContent,
        device
    }
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}

export const updateCookie = async (token: string, utmSource: any, utmMedium: any, utmCampaign: any, utmId: any, utmContent: any, device: string) => {
    const path = "updateCookie.php";
    const params = {
        token,
        utmSource,
        utmMedium,
        utmCampaign,
        utmId,
        utmContent,
        device
    }
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}

export const insertSessionCookie = async (token: string) => {
    const path = "insertSessionCookie.php";
    const params = {
        token
    }
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}