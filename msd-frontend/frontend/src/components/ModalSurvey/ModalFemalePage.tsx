import React, { useEffect, useState } from 'react'
import '../styles.css'
import { useNavigate } from 'react-router-dom'
import * as ReportApi from '../../api/report/reportApi';
import * as Token from '../../services/token';
import useToast from '../../hook/useToast';

interface ModalFemalePageProps {
    // gender: string
    show: boolean
    dismiss: () => void
}
export default function ModalFemalePage(modal: ModalFemalePageProps) {
    const pushToast = useToast();
    const navigator = useNavigate()

    const [thankShow, setThankShow] = useState(false)
    const [tokenUser, setTokenUser] = useState('')
    const [active1, setActive1] = useState(-1)
    const [active2, setActive2] = useState(-1)

    const reportHBS = async () => {

        if (tokenUser && active1 !== -1 && active2 !== -1) {
            const result = await ReportApi.hbsreport(tokenUser, active1, active2)
            if (result.status) {
                setTimeout(() => {
                    modal.dismiss()
                    navigator('/du-phong-cho-nu')
                }, 3000)
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
            {modal.show ? (
                <>
                    <div
                        className="hidden lg:flex absolute !bottom-4 left-0 h-full pt-6  w-full overflow-x-hidden overflow-y-auto  inset-0 z-[999] outline-none focus:outline-none custom-modal-mobile"
                    >
                        <div className='w-full lg:h-full flex  transition ease-in-out delay-150 mt-auto' >

                            <div className=' transition ease-in-out delay-150 rounded-2xl w-full relative rounded-tl-none flex flex-col justify-between z-40 mt-auto'>
                                <div className="absolute -top-6 left-0 w-[278px] rounded-2xl bg-white transition ease-in-out delay-150 h-28 z-40"></div>
                                <div className='h-fit px-4 xxl:px-8 pb-4 xxl:pb-7 z-50 bg-white rounded-2xl relative'>

                                    <div className='pl-4 xxl:pl-6 text-[19px] xxl:text-[21px] w-full leading-[26px] pt-1 xxl:pt-3 pb-2 xxl:pb-4 text-black font-[500]'>Xin chào! <br /> Hãy chọn để tiếp tục</div>
                                    <div className="flex flex-col gap-2">
                                        <div className={`w-full  bg-[#FDE533] rounded-3xl flex justify-between `}>
                                            <div className='pl-3 xxl:pl-6 pt-2 xxl:pt-5'>
                                                <span className=' text-sm xxl:text-base font-[400] leading-[21px] xxl:leading-[26px] font-Alexandria'>Bạn đã biết HPV <br /> trước đây chưa?</span>
                                            </div>
                                            <div className={`rounded-3xl flex-shrink-0 w-[140px] xxl:w-[162px] bg-[#FFF29C] p-2 xxl:p-4 flex flex-col gap-2 xxl:gap-4 px-4 xxl:px-6 py-4 xxl:py-7`}>
                                                <div
                                                    className={`${active1 === 1 ? 'bg-white !text-black rounded-full border-white' : ''} rounded-full text-xs xxl:text-sm uppercase py-2 !px-2 whitespace-nowrap border-[1px] hover:border-white hover:bg-white cursor-pointer hover:text-black border-black text-black flex justify-center items-center`}
                                                    // onClick={() => { setHpvQuestionSelect(1); setLeavingShow(true) }}
                                                    onClick={() => setActive1(1)}
                                                >
                                                    Đã biết
                                                </div>
                                                <div
                                                    className={`${active1 === 0 ? 'bg-white !text-black rounded-full border-white' : ''} rounded-full text-xs xxl:text-sm uppercase py-2 !px-2 whitespace-nowrap border-[1px] hover:border-white hover:bg-white cursor-pointer hover:text-black border-black text-black flex justify-center items-center`}
                                                    // onClick={() => { setHpvQuestionSelect(2); setLeavingShow(true) }}
                                                    // onClick={handleCloseBackdrop}
                                                    onClick={() => setActive1(0)}
                                                // onClick={() => modal.dismiss()}
                                                >
                                                    Chưa biết
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`w-full bg-[#FDE533] rounded-3xl flex justify-between `}>
                                            <div className='pl-3 xxl:pl-6 pt-2 xxl:pt-5'>
                                                <span className='text-black text-sm xxl:text-base font-[400] leading-[21px] xxl:leading-[26px] font-Alexandria'>Bạn đã có kế hoạch dự phòng <br /> HPV chưa?</span>
                                            </div>
                                            <div className={`rounded-3xl  flex-shrink-0 w-[140px] xxl:w-[162px] bg-[#FFF29C] p-2 xxl:p-4 flex flex-col gap-2 xxl:gap-4 px-4 xxl:px-6 py-4 xxl:py-7`}>
                                                <div
                                                    className={`${active2 === 1 ? 'bg-white !text-black rounded-full border-white' : ''} rounded-full text-xs xxl:text-sm uppercase py-2 !px-2 whitespace-nowrap border-[1px] hover:border-white hover:bg-white cursor-pointer hover:text-black border-black text-black flex justify-center items-center`}
                                                    // onClick={() => { setHpvQuestionSelect(3); setLeavingShow(true) }}
                                                    onClick={() => setActive2(1)}
                                                // onClick={handleCloseBackdrop}
                                                >
                                                    Đã có
                                                </div>
                                                <div
                                                    className={`${active2 === 0 ? 'bg-white !text-black rounded-full border-white' : ''} rounded-full text-xs xxl:text-sm uppercase py-2 !px-2 whitespace-nowrap border-[1px] hover:border-white hover:bg-white cursor-pointer hover:text-black border-black text-black flex justify-center items-center`}
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
                                <div className={thankShow ? 'rounded-2xl bg-[#40ccab] transition ease-in-out w-full h-full ml-auto delay-150 mt-4 py-4 xxl:py-7 px-8 xxl:px-12 z-50 custom-transition-thanks ' : 'hidden'}>
                                    <span className=' text-white text-[19px] xxl:text-[21px] font-[500]'>Cảm ơn! <br /> Bạn đã lựa chọn thành công!</span>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-[998] bg-black"></div>
                </>
            ) : null}
        </>
    )
}
