import React, { useEffect, useLayoutEffect, useState } from 'react'
import * as ReportApi from '../../api/report/reportApi';
import * as Token from '../../services/token';
import useWindowDimensions from '../../hook/useWindowDimensions';
import useToast from '../../hook/useToast';

interface info {
    gender: string
    show: boolean
    dismiss: (event: string) => void
}
export default function ModalSurvey(info: info) {
    const pushToast = useToast();
    const [stateKnowYet, setStateKnowYet] = useState(-1)
    const [statePlan, setStatePlan] = useState(-1)
    const [tokenUser, setTokenUser] = useState('')
    const [thankShow, setThankShow] = useState(false)

    const [scroll, setScroll] = useState(false)
    const { width, height } = useWindowDimensions();

    useLayoutEffect(() => {
        const windowWidth = width;
        const windowHeight = height;
        if (windowHeight < windowWidth && windowWidth < 1200 && windowHeight < 675) {
            setScroll(true);
        } else {
            setScroll(false);
        }

    }, [width, height])


    const reportHBS = async () => {
        if (tokenUser && stateKnowYet !== -1 && statePlan !== -1) {
            const result = await ReportApi.hbsreport(tokenUser, stateKnowYet, statePlan)
            if (result.status) {
                setTimeout(() => {
                    info.dismiss(info.gender)
                }, 2000)
            } else {
                pushToast(result?.message || "Đang xảy ra lỗi. Vui lòng thử lại sau", "warning");
            }
        }
    }

    const getToken = async () => {
        let token = Token.getUser();
        setTokenUser(token)
    }

    useEffect(() => {
        reportHBS()
    }, [tokenUser])

    useEffect(() => {
        if (stateKnowYet !== -1 && statePlan !== -1) {
            setThankShow(true)
            // localStorage.setItem('hpvquestion', (String(active1), String(active2)));
            document.cookie = `hpvquestion=${(String(stateKnowYet), String(statePlan))}; Max-Age=15768000`;
            if (tokenUser !== "") {
                reportHBS()
            } else {
                getToken()
            }
        }
    }, [statePlan, stateKnowYet])
    // const handleDismissKnow = (id: number) => {
    //     setStateKnowYet(id)
    //     if (id !==1 && statePlan !==-1) {
    //         document.cookie = `hpvquestion=${(String(id), String(statePlan))}; Max-Age=15768000`;
    //         reportHBS()
    //         setThankShow(true)
    //         setTimeout(() => {
    //             info.dismiss(info.gender)
    //         }, 3000)
    //     }
    // }
    // const handleDismissPlan = (id: number) => {
    //     setStatePlan(id)
    //     if (id !==-1 && stateKnowYet !==1) {
    //         document.cookie = `hpvquestion=${(String(id), String(statePlan))}; Max-Age=15768000`;
    //         reportHBS()
    //         setThankShow(true)
    //         setTimeout(() => {
    //             info.dismiss(info.gender)
    //         }, 3000)

    //     }
    // }
    return (
        <div className={info.show ? 'lg:hidden transition ease-in-out delay-150 pt-2  w-full h-full bg-[#636363b2] flex flex-col items-end gap-2 justify-center z-[999] px-7 absolute' : 'hidden'}>



            <div className={`${scroll ? 'w-[90vw]' : 'w-full sm:w-[334px]'}  py-5 px-5 xxl:pb-7 z-50  bg-white rounded-2xl relative`}>
                <div className='absolute  h-[70px] w-[50%] rounded-t-2xl bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition ease-in-out delay-150 !-top-[20px] left-0 -z-10 '>
                </div>
                <div className='pl-4 xxl:pl-6 text-[15px] w-full leading-[26px] pt-1 xxl:pt-3 pb-2 xxl:pb-4 text-black font-[500]'>Xin chào! <br /> Hãy chọn để tiếp tục</div>
                <div className={`flex ${scroll ? 'flex-row' : 'flex-col'}  gap-2`}>
                    <div className={`w-full h-[109px] ${info.gender === 'female' ? 'bg-[#005750]' : info.gender === 'female-page' ? 'bg-[#F9E249]' : 'bg-[#045AFA]'} rounded-2xl flex justify-between gap-3`}>
                        <div className='pl-3 xxl:pl-6 pt-2 xxl:pt-5'>
                            <span className={`${info.gender === 'female-page' ? 'text-black' : 'text-white'}  text-[15px] font-[400] leading-[21px] xxl:leading-[26px] font-Alexandria text-ellipsis line-clamp-4`}>Bạn đã biết HPV  trước đây chưa?</span>
                        </div>
                        <div className={`rounded-2xl flex-shrink-0 w-[140px] xxl:w-[162px] ${info.gender === 'female' ? 'bg-[#40B0A4]' : info.gender === 'female-page' ? 'bg-[#FFEFBD]' : 'bg-[#01ABEA]'} p-2 xxl:p-4 flex flex-col gap-2 xxl:gap-4 px-4 xxl:px-6 py-4 xxl:py-7`}>
                            <div className={`${stateKnowYet === 1 ? 'border-white bg-white text-[#005750]' : 'text-[#005750]'} w-[115px] rounded-full text-[10px] sm:text-xs md:text-sm font-[500] uppercase py-2 !px-2 whitespace-nowrap border-[1px] hover:border-white  cursor-pointer hover:text-[#005750]  ${info.gender === 'female-page' ? 'text-black border-black' : 'text-white border-white'} flex justify-center items-center`}
                                onClick={() => setStateKnowYet(1)}
                            >
                                Đã biết
                            </div>
                            <div className={`${stateKnowYet === 0 ? 'border-white bg-white text-[#005750]' : 'text-[#005750]'} w-[115px] rounded-full text-[10px] sm:text-xs md:text-sm font-[500] uppercase py-2 !px-2 whitespace-nowrap border-[1px] hover:border-white  cursor-pointer hover:text-[#005750]  ${info.gender === 'female-page' ? 'text-black border-black' : 'text-white border-white'} flex justify-center items-center`}
                                onClick={() => setStateKnowYet(0)}
                            >
                                Chưa biết
                            </div>
                        </div>
                    </div>
                    <div className={`w-full h-[109px] ${info.gender === 'female' ? 'bg-[#005750]' : info.gender === 'female-page' ? 'bg-[#F9E249]' : 'bg-[#045AFA]'} rounded-2xl flex justify-between gap-3`}>
                        <div className='pl-3 xxl:pl-6 pt-2 xxl:pt-5'>
                            <span className={`${info.gender === 'female-page' ? 'text-black' : 'text-white'}  text-[15px] font-[400] leading-[21px] xxl:leading-[26px] font-Alexandria text-ellipsis line-clamp-4`}>Bạn đã có kế hoạch dự phòng HPV chưa?</span>
                        </div>
                        <div className={`rounded-2xl flex-shrink-0 w-[140px] xxl:w-[162px] ${info.gender === 'female' ? 'bg-[#40B0A4]' : info.gender === 'female-page' ? 'bg-[#FFEFBD]' : 'bg-[#01ABEA]'} p-2 xxl:p-4 flex flex-col gap-2 xxl:gap-4 px-4 xxl:px-6 py-4 xxl:py-7`}>
                            <div className={`${statePlan === 1 ? 'border-white bg-white text-[#005750]' : 'text-[#005750]'} w-[115px] rounded-full text-[10px] sm:text-xs md:text-sm font-[500] uppercase py-2 !px-2 whitespace-nowrap border-[1px] hover:border-white  cursor-pointer hover:text-[#005750]  ${info.gender === 'female-page' ? 'text-black border-black' : 'text-white border-white'} flex justify-center items-center`}
                                onClick={() => setStatePlan(1)}
                            >
                                Đã có
                            </div>
                            <div className={`${statePlan === 0 ? 'border-white bg-white text-[#005750]' : 'text-[#005750]'} w-[115px] rounded-full text-[10px] sm:text-xs md:text-sm font-[500] uppercase py-2 !px-2 whitespace-nowrap border-[1px] hover:border-white  cursor-pointer hover:text-[#005750]  ${info.gender === 'female-page' ? 'text-black border-black' : 'text-white border-white'} flex justify-center items-center`}
                                onClick={() => setStatePlan(0)}
                            >
                                Chưa có
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-[334px]">
                <div className={thankShow ? `  rounded-2xl bg-white transition ease-in-out h-auto ml-auto delay-150 mt-4 py-4 px-8 z-50 custom-transition-thanks ` : 'hidden'}>
                    <span className=' text-black text-xs sm:text-sm md:text-base font-[500]'>Cảm ơn! <br /> Bạn đã lựa chọn thành công!</span>
                </div>
            </div>

            {/* <div className='rounded-2xl bg-[#40ccab] py-4 xxl:py-7 px-8 xxl:px-12 z-50'>
                <span className='text-white text-[15px] font-[500]'>Cảm ơn! <br /> Bạn đã lựa chọn thành công !</span>
            </div> */}
        </div>
    )
}
