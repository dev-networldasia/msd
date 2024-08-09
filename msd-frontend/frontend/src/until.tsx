import axiosClient from "./api/axiosClient"
export const paserParams = (params: any, valueIsFail: any, allow?: CheckValueOptions) => {
    for (let i in params) {
        if (typeof (params[i]) === 'object') {
            params[i] = paserParams(params[i], valueIsFail, allow)
        } else {
            params[i] = parseValue(params[i], valueIsFail, allow)
        }
    }
    return params
}

export const parseValue = (value: any, valueIsFail: any, allow?: CheckValueOptions) => {

    if (!allow?.isNull) {
        if (value === null) {
            return valueIsFail;
        }
        if (Number.isNaN(value)) {
            return valueIsFail;
        }
    }

    if (!allow?.isEmpty) {
        if (['string', 'object'].includes(typeof (value)) && value.length === 0) {
            return valueIsFail;
        }
    }
    return value;
}
interface CheckValueOptions {
    isEmpty?: boolean,
    isNull?: boolean,
}

//chuyển text sang HTML
const ConvertHTML = (item: any) => {
    return {
        __html: item,
    };
};

//ĐỊNH DẠNG GIÁ
export const formatPrice = (val: number | string | undefined) => {
    if (val !==undefined) {
        let v = val.toString();
        return v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
        return "";
    }
};

//ĐỊNH DẠNG GIÁ
export const formatDateUiToSever = (val: string) => {
    if (val) {
        var arr = val.split("/");
        return arr[2] + "/" + arr[1] + "/" + arr[0]
    } else {
        return "";
    }
};
export const formatDateUiToSeverV2 = (val: string) => {
    if (val) {
        var arr = val.split("-");
        return arr[2] + "/" + arr[1] + "/" + arr[0]
    } else {
        return "";
    }
};

//check định dạng mail
export function validateEmail(email: string) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//chuyển text sang HTML
export function convertHTML(item: any) {
    return {
        __html: item,
    };
};

export function arrayHandling(arr: string[], value: string) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    } else {
        arr.push(value);
    }
    return arr;
};

export const findSearchObject = (arr: any[], field: string, search: string) => {
    try {
        const filteredArray = arr.filter((e) => {
            const fieldValue = e[field];
            const regex = new RegExp(search, 'gi');
            return fieldValue.match(regex);
        });
        return filteredArray;
    } catch (error) {
        return []
    }

}

export const textToDate = (text: string) => {
    const parts = text?.split("-");
    if (parts?.length > 2) {
        const isoDateString = `${parts[2]}-${parts[1]}-${parts[0]}`;
        const dateObject = new Date(isoDateString);
        return dateObject
    }
}

export function formatDateToISO(dateString: string) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
        const [day, month, year] = parts;
        // Lưu ý: Đảm bảo rằng giá trị của day, month, và year là số (integer)
        return `${year}-${month}-${day}`;
    }
    return ''; // Xử lý trường hợp không hợp lệ (optional)
}


export function isImageFile(file: any) {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validImageTypes.includes(file.type);
}
export function isAlphaNumeric(input: string): boolean {
    // Sử dụng biểu thức chính quy để kiểm tra chuỗi
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(input);
}