import { useEffect, useLayoutEffect, useState } from 'react';
import * as ReportApi from '../../../api/report/reportApi';
import useToast from '../../../hook/useToast';
import useWindowDimensions from '../../../hook/useWindowDimensions';
import * as Token from '../../../services/token';
import '../styles.css';

interface info {
    // gender: string
    show: boolean
    dismiss: () => void
}
export default function ModalStarted(info: info) {

    const pushToast = useToast();
    const [thankShow, setThankShow] = useState(false)
    const [tokenUser, setTokenUser] = useState('')
    const [active1, setActive1] = useState(-1)
    const [active2, setActive2] = useState(-1)

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
        if (tokenUser && active1 !== -1 && active2 !== -1) {
            const result = await ReportApi.hbsreport(tokenUser, active1, active2)
            if (result.status) {
                setTimeout(() => {
                    info.dismiss()
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
        if (active1 !== -1 && active2 !== -1) {
            setThankShow(true)
            // localStorage.setItem('hpvquestion', (String(active1), String(active2)));
            document.cookie = `hpvquestion=${(String(active1) + String(active2))}; Max-Age=15768000`;
            if (tokenUser !== "") {
                reportHBS()
            } else {
                getToken()
            }
        }
    }, [active1, active2])

    return (
        <>
            {info.show ? (
                <>
                    <div
                        className={`${scroll ? 'w-full pr-3 lg:pr-0 lg:pl-0 top-6' : ' w-full pr-0 sm:pr-3 lg:pr-0'} flex justify-end absolute sm:!right-4 sm:!bottom-10 lg:!top-0 lg:!left-0 h-full  lg:w-full overflow-x-hidden overflow-y-auto  inset-0 z-[999] outline-none focus:outline-none `}
                    >
                        <div className=' w-full sm:w-[354px] lg:w-full lg:h-full flex  transition ease-in-out delay-150 px-3 sm:px-0' >

                            <div className='bg-white transition ease-in-out delay-150 rounded-2xl w-full relative rounded-tl-none flex flex-col justify-between z-40 mt-auto custom-modal-started-md md:px-0'>
                                <div className={`${scroll ? '!w-[30vw] lg:!w-[45%]' : 'w-[200px] lg:w-[278px]'} absolute -top-6 left-0  rounded-2xl bg-white transition ease-in-out delay-150 h-full z-40 `}></div>
                                <div className='px-4 xxl:px-8 pb-4 xxl:pb-7 z-50 bg-white rounded-2xl relative'>
                                    <div className='pl-4 xxl:pl-6 text-[19px] xxl:text-[21px] w-full leading-[26px] pt-1 xxl:pt-3 pb-2 xxl:pb-4 text-black font-[500]'>Xin chào! <br /> Hãy chọn để tiếp tục</div>
                                    <div className={`${scroll ? 'flex-row lg:flex-col' : 'flex-col'} flex gap-2`}>
                                        <div className={`w-full  bg-[#005750] rounded-3xl flex justify-between `}>
                                            <div className='pl-3 xxl:pl-6 pt-2 xxl:pt-5'>
                                                <span className='text-white text-sm xxl:text-base font-[400] leading-[21px] xxl:leading-[26px] font-Alexandria'>Bạn đã biết HPV trước đây chưa?</span>
                                            </div>
                                            <div className={`rounded-3xl flex-shrink-0 w-[120px] xxl:w-[162px] bg-[#40AFA3] p-2 xxl:p-4 flex flex-col gap-2 xxl:gap-4 px-4 xxl:px-6 py-4 xxl:py-7`}>
                                                <div
                                                    className={`${active1 === 1 ? '!bg-transparent !text-white rounded-full' : ''} rounded-full text-[10px] xxl:text-sm uppercase py-2 !px-2 whitespace-nowrap border-[1px] bg-white !text-[#005750] hover:border-white hover:bg-transparent cursor-pointer hover:!text-white border-white flex justify-center items-center`}
                                                    // onClick={() => { setHpvQuestionSelect(1); setLeavingShow(true) }}
                                                    onClick={() => setActive1(1)}
                                                >
                                                    Đã biết
                                                </div>
                                                <div
                                                    className={`${active1 === 0 ? '!bg-transparent !text-white rounded-full' : ''} rounded-full text-[10px] xxl:text-sm font-[400] uppercase py-2 !px-2 whitespace-nowrap border-[1px] bg-white text-[#005750] hover:border-white hover:bg-transparent cursor-pointer hover:!text-white border-white flex justify-center items-center`}
                                                    // onClick={() => { setHpvQuestionSelect(2); setLeavingShow(true) }}
                                                    // onClick={handleCloseBackdrop}
                                                    onClick={() => setActive1(0)}
                                                // onClick={() => info.dismiss()}
                                                >
                                                    Chưa biết
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`w-full bg-[#005750] rounded-3xl flex justify-between `}>
                                            <div className='pl-3 xxl:pl-6 pt-2 xxl:pt-5'>
                                                <span className='text-white text-sm xxl:text-base font-[400] leading-[21px] xxl:leading-[26px] font-Alexandria whitespace-normal'>Bạn đã có kế hoạch dự phòng HPV chưa?</span>
                                            </div>
                                            <div className={`rounded-3xl  flex-shrink-0 w-[120px] xxl:w-[162px] bg-[#40AFA3] p-2 xxl:p-4 flex flex-col gap-2 xxl:gap-4 px-4 xxl:px-6 py-4 xxl:py-7`}>
                                                <div
                                                    className={`${active2 === 1 ? '!bg-transparent !text-white rounded-full' : ''} rounded-full text-[10px] xxl:text-sm uppercase py-2 !px-2 whitespace-nowrap border-[1px] bg-white text-[#005750] hover:border-white hover:bg-transparent cursor-pointer hover:!text-white border-white flex justify-center items-center`}
                                                    // onClick={() => { setHpvQuestionSelect(3); setLeavingShow(true) }}
                                                    onClick={() => setActive2(1)}
                                                // onClick={handleCloseBackdrop}
                                                >
                                                    Đã có
                                                </div>
                                                <div
                                                    className={`${active2 === 0 ? '!bg-transparent !text-white rounded-full' : ''} rounded-full text-[10px] xxl:text-sm uppercase py-2 !px-2 whitespace-nowrap border-[1px] bg-white text-[#005750] hover:border-white hover:bg-transparent cursor-pointer hover:!text-white border-white flex justify-center items-center`}
                                                    // onClick={() => { setHpvQuestionSelect(4); setLeavingShow(true) }}
                                                    onClick={() => {
                                                        setActive2(0)
                                                    }}
                                                >
                                                    Chưa có
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={thankShow ? 'rounded-2xl bg-[#40ccab] transition ease-in-out w-full h-full ml-auto delay-150 py-4 xxl:py-7 px-8 xxl:px-12 z-50 custom-transition-thanks ' : 'hidden'}>
                                    <span className=' text-white text-base lg:text-[19px] xxl:text-[21px] font-[500]'>Cảm ơn! <br /> Bạn đã lựa chọn thành công!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-[200] bg-black"></div>
                </>
            ) : null}
        </>
    )
}
