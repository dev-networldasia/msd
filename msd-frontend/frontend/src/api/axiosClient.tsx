import axios from "axios";
import qs from 'qs';
import * as ENV from "../env";
import tokenService from '../services/token';

// export interface ResponseSuccess<T> {
//     success?: boolean;
//     status: number;
//     data: T;
//     message?: string;
// }
export interface ResponseSuccess<T> {
    status: number;
    message?: string;
    data: T;
}

export interface ResponseSuccessTotal<T> {
    success?: boolean;
    status: number;
    data: T;
    message?: string;
    total: number | 0
}

export interface ResponseError {
    status: number,
    title: string,
    errors: {
        [key: string]: string[]
    }
}

const axiosClient = axios.create({
    baseURL: ENV.API_URL,
    headers: {
        'content-type': 'multipart/form-data',
    },
    paramsSerializer: {
        serialize: params => {
            return qs.stringify(params, { arrayFormat: 'repeat', allowDots: true });
        }
    }
});

axiosClient.interceptors.request.use(async (config) => {
    const token = tokenService.getToken();
    if (token)
        config.headers.Authorization = 'Bearer ' + token;
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        var ketQua = response.data
        //1 tiếng việt 2  tiếng anh
        if (ketQua?.status === "0") {
            var data = {
                status: 0,
                data: [],
                message: ketQua?.message
            }
            return data
        }
        return response.data;
    }
    return response;
}, (error) => {
    if (error.response && error.response.data && error.response.data.error &&
        (error.response.data.session === false || error.response.data.session === "false")) {
        // alert("Đã xảy ra sự cố, sẽ tự động đăng xuất.");
        window.location.href = "/";
    } else if (error?.response && error.response?.data && error.response.data.error && error.response.data.error.message) {
        return error?.response?.data
    } else if (error.response && error.response.status === 500) {
        return error?.response?.data;
    } else if (error?.response && error?.response?.status === 401) {
        return Promise.reject(error);
    } else {
        return error?.response?.data;
    }
    Promise.reject(error);
});

export default axiosClient;