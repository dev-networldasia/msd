import React, { useEffect, useState } from 'react'

import * as InterfaceApi from '../../api/interface/interfaceApi';
import useToast from '../../hook/useToast';
import useLoading from '../../hook/useLoading';
import { convertHTML } from '../../until';
import './styles.css';



interface infoFooter {
    colorText: string;
    type: string;
}

export default function FooterDesktop(infoFooter: infoFooter) {
    const { colorText, type } = infoFooter;
    const pushToast = useToast();
    const pushLoading = useLoading();
    const [sloganText, setSloganText] = useState<string>('')
    const getDetailSettingInterFace = async () => {
        pushLoading(true)
        const result = await InterfaceApi.detailSettingInterface()
        if (result.status) {
            switch (type) {
                case 'homepage':
                    return setSloganText(result.data.sloganFooterHomepage)
                case 'female':
                    return setSloganText(result.data.sloganFooterFemale)
                case 'female-detail':
                    return setSloganText(result.data.sloganFooterListFemale)
                case 'female-post':
                    return setSloganText(result.data.sloganFooterListDetailFemale)
                case 'male':
                    return setSloganText(result.data.sloganFooterMale)
                case 'male-detail':
                    return setSloganText(result.data.sloganFooterListMale)
                case 'male-post':
                    return setSloganText(result.data.sloganFooterListDetailMale)
                case 'quiz':
                    return setSloganText(result.data.sloganFooterQuiz)
                case 'quiz-question':
                    return setSloganText(result.data.sloganFooterQuiz)
                case 'healthy':
                    return setSloganText(result.data.sloganFooterHealthy)
                case 'healthy-body':
                    return setSloganText(result.data.sloganFooterBody)
                case 'healthy-collective-spirit':
                    return setSloganText(result.data.sloganFooterCollectiveSpirit)
                case 'healthy-mind':
                    return setSloganText(result.data.sloganFooterMind)
                case 'healthy-mind-detail':
                    return setSloganText(result.data.sloganFooterDetailMind)
                case 'healthy-body-detail':
                    return setSloganText(result.data.sloganFooterDetailBody)
                case 'healthy-collective-spirit-detail':
                    return setSloganText(result.data.sloganFooterDetailCollectiveSpirit)
                case 'community':
                    return setSloganText(result.data.sloganFooterCommunity)
                case 'community-post':
                    return setSloganText(result.data.sloganFooterCommunity)
                case 'location':
                    return setSloganText(result.data.sloganFooterLocation)
                default:
                    return setSloganText(result.data.sloganFooter)
            }

        } else {
            setSloganText('')
            pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
        }
        pushLoading(false)
    }

    useEffect(() => {
        getDetailSettingInterFace()
    }, [])
    return (
        <>
            <div className="w-full px-5  xxl:px-7 hidden lg:block py-4 relative z-50">
                <p className="font-Alexandria text-center lg:text-left text-xs lg:text-[16px] xl:text-[18px] lg:leading-[25px] fs-footer-mac15"
                    style={{ color: colorText }}
                    dangerouslySetInnerHTML={convertHTML(sloganText)}
                >
                </p>
            </div>
        </>
    )
}
