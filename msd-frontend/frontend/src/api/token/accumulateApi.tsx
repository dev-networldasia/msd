import axiosClient, { ResponseSuccess, ResponseSuccessTotal } from "../axiosClient";

//Chi tiết loại bài viết
export const typeAccumulated = async (token: string, female: number, male: number, femaleAge1: number, femaleAge2: number, femaleAge3: number, maleAge1: number, maleAge2: number, maleAge3: number) => {
    const path = "typeAccumulated.php";
    const params = {
        token,
        female,
        male,
        femaleAge1,
        femaleAge2,
        femaleAge3,
        maleAge1,
        maleAge2,
        maleAge3
    }
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}

export const trackingButton = async (token: string, type: number) => {
    const path = "trackingButton.php";
    const params = {
        token,
        type
    }
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}