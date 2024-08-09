import axiosClient, { ResponseSuccess, ResponseSuccessTotal } from "../axiosClient";
export interface InfoNewCommunityActivity {
    id: number
    title: string
    url: string
    description: string
    content: string
    img: string
    imgMobile: string
    view: number
    timestamp: any
}

export const listCommunityActivity = async () => {
    const path = "listCommunityActivity.php";
    const params = {}
    const result: ResponseSuccessTotal<InfoNewCommunityActivity[]> = await axiosClient.get(path, { params })
    return result;
}

export const communityActivityDetail = async (url: string) => {
    const path = "communityActivityDetail.php";
    const params = { url }
    const result: ResponseSuccess<InfoNewCommunityActivity> = await axiosClient.get(path, { params })
    return result;
}

export const insertViewCommunityActivity = async (url: string) => {
    const path = "insertViewCommunityActivity.php";
    const params = { url }
    const result: ResponseSuccess<InfoNewCommunityActivity> = await axiosClient.post(path, params)
    return result;
}

export const listCommunityActivityOtherByUrl = async (url: string, limit: number = 5, offset: number = 0) => {
    const path = "listCommunityActivityOtherByUrl.php";
    const params = {
        url,
        limit,
        offset
    }
    const result: ResponseSuccess<InfoNewCommunityActivity[]> = await axiosClient.get(path, { params })
    return result;
}