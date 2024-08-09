
import axiosClient, { ResponseSuccess, ResponseSuccessTotal } from "../axiosClient";
export interface InfoNew {
    id: number
    title: string
    url: string
    categoryId: number
    categoryTitle: string
    description: string
    content?: string
    img: string
    imgMobile: string
    view: number
    delf: number
    timestamp: any
}

export interface InfoNewOther {
    id: number
    title: string
    url: string
    categoryTitle: string
    categoryUrl: string
    description: string
    content: string
    img: string
    imgMobile: string
    view: number
    delf: number
    timestamp: any
}

export interface InfoNewSearch {
    id: number
    title: string
    url: string
    categoryId: number
    categoryUrl: string
    maxColumn: number
}

//Danh sách bài viết theo loại
export const listArticleByCategory = async (category: number, limit: number = 20, offset: number = 0) => {
    const path = "listArticleByCategory.php";
    const params = {
        category,
        limit,
        offset
    }
    const result: ResponseSuccessTotal<InfoNew[]> = await axiosClient.get(path, { params })
    return result;
}

//Danh sách bài viết theo loại (url)
export const listArticleByUrlCategory = async (url: string, limit: number = 20, offset: number = 0) => {
    const path = "listArticleByUrlCategory.php";
    const params = {
        url,
        limit,
        offset
    }
    const result: ResponseSuccessTotal<InfoNew[]> = await axiosClient.get(path, { params })
    return result;
}

//Chi tiết bài viết
export const articleDetail = async (id: number) => {
    const path = "articleDetail.php";
    const params = {
        id
    }
    const result: ResponseSuccessTotal<InfoNew> = await axiosClient.get(path, { params })
    return result;
}

export const articleDetailByUrl = async (url: string) => {
    const path = "articleDetailByUrl.php";
    const params = {
        url
    }
    const result: ResponseSuccessTotal<InfoNew> = await axiosClient.get(path, { params })
    return result;
}

//Các bài viết liên quan
export const listArticleByCategoryOtherArticle = async (category: number, id: number, limit: number = 3, offset: number = 0) => {
    const path = "listArticleByCategoryOtherArticle.php";
    const params = {
        category,
        id,
        limit,
        offset,
    }
    const result: ResponseSuccessTotal<InfoNew[]> = await axiosClient.get(path, { params })
    return result;
}

//Các bài viết liên quan theo url
export const listArticleByUrlCategoryOtherArticle = async (category: number, url: string, limit: number = 3, offset: number = 0) => {
    const path = "listArticleByUrlCategoryOtherArticle.php";
    const params = {
        category,
        url,
        limit,
        offset,
    }
    const result: ResponseSuccessTotal<InfoNew[]> = await axiosClient.get(path, { params })
    return result;
}

//Các bài viết liên quan theo url mới
export const listArticleBySiteCatalytsOtherArticle = async (token: string, category: number, url: string, gender: number, limit: number = 3, offset: number = 0, keySearch: string = "") => {
    const path = "listArticleBySiteCatalytsOtherArticle.php";
    const params = {
        token,
        category,
        url,
        gender,
        limit,
        offset,
        keySearch
    }
    const result: ResponseSuccessTotal<InfoNew[]> = await axiosClient.get(path, { params })
    return result;
}

//Các bài viết liên quan theo url mới
export const listArticleBySitecatalystNoCategory = async (token: string, url: string, gender: number, limit: number = 3, offset: number = 0) => {
    const path = "listArticleBySitecatalystNoCategory.php";
    const params = {
        token,
        url,
        gender,
        limit,
        offset
    }
    const result: ResponseSuccessTotal<InfoNewOther[]> = await axiosClient.get(path, { params })
    return result;
}



//Thêm lượt view cho bài viết
export const insertViewArticle = async (id: number) => {
    const path = "insertViewArticle.php";
    const params = {
        id
    }
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}

//Thêm lượt view cho bài viết theo url
export const insertViewArticleByUrl = async (token: string, url: string) => {
    const path = "insertViewArticleByUrl.php";
    const params = {
        token,
        url
    }
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}

// Tìm kiếm bài viết
export const searchTitleArticle = async (key: string, token: string, limit: number = 5, offset: number = 0) => {
    const path = "searchTitleArticle.php";
    const params = {
        key,
        token,
        limit,
        offset
    }
    const result: ResponseSuccess<InfoNewSearch[]> = await axiosClient.get(path, { params })
    return result;
}

