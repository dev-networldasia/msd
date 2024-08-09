import React from 'react'


interface info {
    // gender: string
    show: boolean
    dismiss: () => void
}
export default function ModalChooseAge(info: info) {


    return (
        <div className={info.show ? 'lg:hidden transition ease-in-out delay-150 pt-2  w-full  flex flex-col gap-2 justify-between z-20' : 'hidden'}>
            {/* 
              <div className=' h-[45px] rounded-t-2xl bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition ease-in-out delay-150 absolute top-[-40px] left-0 '>
              </div> */}

            <div className='px-4 py-5 xxl:pb-7 z-50 bg-white rounded-2xl'>
                <div className='pl-4 xxl:pl-6 text-[15px] w-full leading-[26px] pt-1 xxl:pt-3 pb-2 xxl:pb-4 text-black font-[500]'>Xin chào! <br /> Hãy chọn để tiếp tục</div>
                <div className="flex flex-col gap-2">
                    <div className={`rounded-2xl flex-shrink-0  bg-[#005750]  flex flex-col gap-3 px-6 py-6 `}>
                        <span className='text-[15px] text-white font-[500] pb-1'>Bạn trong độ tuổi nào?</span>
                        <div className="w-full h-20 rounded-[14px] bg-[#40B0A4] flex items-center justify-center"

                            onClick={() => info.dismiss()}
                            >
                            <div className="w-[95px] h-10 bg-white rounded-lg flex items-center justify-center text-base font-Alexandria">
                                9-18
                            </div>
                        </div>
                        <div className="w-full h-20 rounded-[14px] bg-[#40B0A4] flex items-center justify-center">
                            <div className="w-[95px] h-10 bg-white rounded-lg flex items-center justify-center text-base font-Alexandria">
                                18-26
                            </div>
                        </div>
                        <div className="w-full h-20 rounded-[14px] bg-[#40B0A4] flex items-center justify-center"                            onClick={() => info.dismiss()}>
                            <div className="w-[95px] h-10 bg-white rounded-lg flex items-center justify-center text-base font-Alexandria">
                                27-45
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='rounded-2xl bg-[#40ccab] py-4 xxl:py-7 px-8 xxl:px-12 z-50'>
                <span className='text-white text-[15px] font-[500]'>Cảm ơn! <br /> Bạn đã lựa chọn thành công !</span>
            </div> */}
        </div>
    )
}
