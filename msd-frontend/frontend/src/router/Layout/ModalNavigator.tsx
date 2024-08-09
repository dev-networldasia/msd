import * as React from 'react';
import useWindowDimensions from '../../hook/useWindowDimensions';
import './styles.css';

interface ModalInfo {
    open: boolean
    dismiss: () => void
    countDown: number
}

export default function ModalNavigator(ModalInfo: ModalInfo) {
    const { open, dismiss, countDown } = ModalInfo

    const [scroll, setScroll] = React.useState(false)
    const { width, height } = useWindowDimensions();

    React.useLayoutEffect(() => {
        const windowWidth = width;
        const windowHeight = height;
        if (windowHeight < windowWidth && windowWidth < 1200 && windowHeight < 675) {
            setScroll(true);
        } else {
            setScroll(false);
        }

    }, [width, height])


    return (
        <div>
            {open ?
                (
                    <div
                    >
                        <div className={` ${scroll ? 'md:w-2/3 h-[50vh] overflow-y-scroll bottom-10' : 'md:w-1/2 h-[472px] bottom-20 rounded-tl-none'} bg-white transition ease-in-out delay-[150] rounded-2xl  w-[88%]  lg:w-1/3 fixed  right-6   flex flex-col justify-between z-[110]`}>
                            <div className="absolute -top-8 left-0 w-[45%] h-full xxl:w-2/3 rounded-2xl bg-white transition ease-in-out delay-150  z-[110]"></div>
                            <div className={`${scroll ? 'h-full' : 'h-full '} px-4 xxl:px-8 pb-4 xxl:pb-7 z-[110] flex flex-col`}>
                                <div className='flex justify-between items-center md:pl-6 text-[19px] xxl:text-[21px] w-full leading-[26px] pt-3 pb-2 xxl:pb-4 text-black font-[500]'>
                                    <span>Rời khỏi HPV.vn</span> <span className='text-sm font-[400]'>Rời khỏi trang web hpv.vn sau <span className='min-w-[20px]'>{countDown}s</span> </span></div>
                                <div className="flex flex-col h-full transition ease-in-out delay-150 gap-2">
                                    <div className={`w-full h-full bg-[#005750] rounded-2xl flex flex-col gap-5 px-3 xxl:px-6 py-8 xxl:py-11 overflow-hidden`}>
                                        <span className='text-white text-sm xxl:text-base leading-[21px] xxl:leading-[26px] font-Alexandria '>
                                            Đang rời khỏi trang web hpv.vn
                                        </span>
                                        <span className='text-white text-sm xxl:text-base leading-[21px] xxl:leading-[26px] font-Alexandria '>
                                            Bạn đang rời khỏi trang HPV.vn của MSD và chuyển sang một liên kết khác. Xin lưu ý rằng tất cả nội dung trên trang đích bạn đang chuyển sang không thuộc trách nhiệm hoặc sự chấp thuận của chúng tôi. Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất hoặc hậu quả nào có thể phát sinh từ liên kết này.
                                        </span>
                                        <span className='text-white text-sm xxl:text-base leading-[21px] xxl:leading-[26px] font-Alexandria '>
                                            Vui lòng đợi tải trang hoặc nhấp  <a className='text-blue-500 decoration-blue-500' href='https://youmed.vn/dat-kham/benh-vien?utm_source=Hpv.vn&utm_medium=redirect&utm_campaign=MSD006-HPV'>vào đây</a> nếu bạn không muốn đợi.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-50 fixed inset-0 z-[100] bg-black" onClick={dismiss}></div>

                    </div>
                ) : null}

        </div>

    );
}
