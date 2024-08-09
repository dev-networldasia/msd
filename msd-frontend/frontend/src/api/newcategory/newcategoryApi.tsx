import axiosClient, { ResponseSuccess, ResponseSuccessTotal } from "../axiosClient";
export interface InfoCategory {
    id: number
    title: string
    titleHtml?: string
    url: string
    headline?: string
    description: string
    content: string
    img: string
    gender: number
    minAge: number
    maxAge: number
    status?: number
    delf: number
    timestamp: any
}

//Danh sách loại bài viết theo giới tính
export const articleCategoryByGender = async (gender: number, limit: number = 20, offset: number = 0) => {
    const path = "articleCategoryByGender.php";
    const params = {
        gender,
        limit,
        offset
    }
    const result: ResponseSuccessTotal<InfoCategory[]> = await axiosClient.get(path, { params })
    return result;
}

//Chi tiết loại bài viết
export const articleCategoryDetail = async (id: number) => {
    const path = "articleCategoryDetail.php";
    const params = {
        id
    }
    const result: ResponseSuccessTotal<InfoCategory> = await axiosClient.get(path, { params })
    // const result: ResponseSuccessTotal<InfoCategory> = await axiosClient.post(path, params)
    return result;
}

//Chi tiết loại bài viết theo url
export const articleCategoryDetailByUrl = async (url: string) => {
    const path = "articleCategoryDetailByUrl.php";
    const params = {
        url
    }
    const result: ResponseSuccessTotal<InfoCategory> = await axiosClient.get(path, { params })
    // const result: ResponseSuccessTotal<InfoCategory> = await axiosClient.post(path, params)
    return result;
}