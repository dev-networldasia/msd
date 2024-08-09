import axiosClient, { ResponseSuccess, ResponseSuccessTotal } from "../axiosClient";
export interface InfoNewHealthy {
    id: number
    title: string
    url: string
    description: string
    content: string
    img: string
    imgMobile: string
    view: number
    delf: number
    timestamp: any
}

export interface InfoDescription {
    id: number
    headline: string
    description: string
}

//Danh sách bài viết sống lành chủ động theo loại
export const listHealthyLivingByCategory = async (category: number) => {
    const path = "listHealthyLivingByCategory.php";
    const params = {
        category
    }
    const result: ResponseSuccessTotal<InfoNewHealthy[]> = await axiosClient.get(path, { params })
    return result;
}

//Chi tiết bài viết sống lành chủ động
export const healthyLivingDetail = async (id: number) => {
    const path = "healthyLivingDetail.php";
    const params = {
        id
    }
    const result: ResponseSuccess<InfoNewHealthy> = await axiosClient.get(path, { params })
    return result;
}

//Chi tiết bài viết sống lành chủ động theo đường dẫn
export const healthyLivingDetailByUrl = async (url: string) => {
    const path = "healthyLivingDetailByUrl.php";
    const params = {
        url
    }
    const result: ResponseSuccess<InfoNewHealthy> = await axiosClient.get(path, { params })
    return result;
}

//add view
export const insertViewHealthy = async (id: number) => {
    const path = "insertViewHealthy.php";
    const params = {
        id
    }
    const result: ResponseSuccess<InfoNewHealthy> = await axiosClient.post(path, params)
    return result;
}

export const insertViewHealthyByUrl = async (url: string) => {
    const path = "insertViewHealthyByUrl.php";
    const params = {
        url
    }
    const result: ResponseSuccess<InfoNewHealthy> = await axiosClient.post(path, params)
    return result;
}


//các bài viết liên quan
export const listHealthyLivingByCategoryOtherHealthy = async (category: number, healthyId: number, limit: number = 3, offset: 0) => {
    const path = "listHealthyLivingByCategoryOtherHealthy.php";
    const params = {
        category,
        healthyId,
        limit,
        offset
    }
    const result: ResponseSuccessTotal<InfoNewHealthy[]> = await axiosClient.get(path, { params })
    return result;
}

//các bài viết liên quan theo url
export const listHealthyLivingByUrlCategoryOtherHealthy = async (category: number, url: string, limit: number = 3, offset: 0) => {
    const path = "listHealthyLivingByUrlCategoryOtherHealthy.php";
    const params = {
        category,
        url,
        limit,
        offset
    }
    const result: ResponseSuccessTotal<InfoNewHealthy[]> = await axiosClient.get(path, { params })
    return result;
}


//mô tả healthy
export const healthyDescriptionDetail = async () => {
    const path = "healthyDescriptionDetail.php";
    const params = {}
    const result: ResponseSuccess<InfoDescription> = await axiosClient.get(path, { params })
    return result;
}

