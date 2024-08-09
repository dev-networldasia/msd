import axiosClient, { ResponseSuccess, ResponseSuccessTotal } from "../axiosClient";
export interface DetailSettingInterface {
    id: number
    page: string
    favicon: string
    indexTitle: string
    logo: string
    sloganHead: string
    sloganHeadMobile: string
    facebook: string
    instagram: string
    hotline: string
    sloganFooter: string
    sloganFooterMobile: string
    sloganFooterHomepage: string
    sloganFooterFemale: string
    sloganFooterMale: string
    sloganFooterQuiz: string
    sloganFooterHealthy: string
    sloganFooterCommunity: string
    sloganFooterLocation: string
    script: string
    scriptBody: string
    sloganFooterListFemale: string,
    sloganFooterListMale: string,
    sloganFooterListDetailFemale: string,
    sloganFooterListDetailMale: string,
    sloganFooterMind: string,
    sloganFooterBody: string,
    sloganFooterCollectiveSpirit: string,
    sloganFooterDetailMind: string,
    sloganFooterDetailBody: string,
    sloganFooterDetailCollectiveSpirit: string
}

export const detailSettingInterface = async () => {
    const path = "detailSettingInterface.php";
    const result: ResponseSuccess<DetailSettingInterface> = await axiosClient.get(path, {})
    return result;
}

export const settingInterface = async (
    id: number,
    page: string,
    favicon: string,
    indexTitle: string,
    logo: string,
    sloganHead: string,
    sloganHeadMobile: string,
    facebook: string,
    instagram: string,
    hotline: string,
    sloganFooter: string,
    sloganFooterMobile: string) => {
    const params = {
        id,
        page,
        favicon,
        indexTitle,
        logo,
        sloganHead,
        sloganHeadMobile,
        facebook,
        instagram,
        hotline,
        sloganFooter,
        sloganFooterMobile
    }
    const path = "settingInterface.php";
    const result: ResponseSuccess<[]> = await axiosClient.post(path, params)
    return result;
}