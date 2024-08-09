import axiosClient, { ResponseSuccess, ResponseSuccessTotal } from "../axiosClient";
export interface InfoQuestion {
    id: number
    title: string
    description: string
    note: string
    answer: number
    img: string
    imgMobile: string
    timestamp: any
    type?: number
    questionAnswer?: questionAnswer[]
}

export interface questionAnswer {
    id: number
    content: string
    answer: number
}

//Danh sách câu hỏi
export const questionByAgeGender = async (gender: number, age: number) => {
    const path = "questionByAgeGender.php";
    const params = {
        gender,
        age,
    }
    const result: ResponseSuccessTotal<InfoQuestion[]> = await axiosClient.get(path, { params })
    return result;
}

export const quizReport = async (token: string, female1: number, female2: number, female3: number, male1: number, male2: number, male3: number) => {
    const path = "quizReport.php";
    const params = {
        token,
        female1,
        female2,
        female3,
        male1,
        male2,
        male3
    }
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}

export const quizReportPause = async (token: string, quizId: number, quizType: number) => {
    const path = "quizReportPause.php";
    const params = {
        token,
        quizId,
        quizType
    }
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}

export const quizReportAnswer = async (token: string, quizId: number, quizType: number, answer: number, answerOfUser: number) => {
    const path = "quizReportAnswer.php";
    const params = {
        token,
        quizId,
        quizType,
        answer,
        answerOfUser
    }
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}