import axiosClient, { ResponseSuccess } from "../axiosClient";
export interface InfoUser {
}

export interface IProfile<T> {
    status: number;
    message: string;
    data: T;
    token: string;
}

export const getToken = async (ip: string) => {
    const path = "token.php";
    const params = {
        ip
    }
    const result: IProfile<InfoUser> = await axiosClient.post(path, params)
    return result;
}