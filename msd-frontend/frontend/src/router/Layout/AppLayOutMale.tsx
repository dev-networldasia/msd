import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { bg_male } from "../../components/ImgExport";
import Header from './Header';
import "./styles.css";

import ButtonBarFooter from '../../components/ButtonBarFooter';
import FooterSideBar from '../../components/FooterSideBar';
import ModalNavigator from './ModalNavigator';
import useWindowDimensions from "../../hook/useWindowDimensions";
let timeout: any, n = 5;

const AppLayoutMale = () => {
    const navigator = useNavigate()
    const [curPathLink, setcurPathLink] = useState('')

    const [showNotification, setShowNotification] = useState(false);
    const [countdown, setCountdown] = useState(0); // Bắt đầu với giá trị 10, hoặc giá trị tùy chọn khác

    const handleLink = () => {
        setCountdown(5)
        setShowNotification(true)
        timeout = setInterval(() => {
            n = n - 1
            setCountdown(n)
            if (n <= 0) {
                clearInterval(timeout)
                window.location.href = 'https://youmed.vn/dat-kham/benh-vien?utm_source=Hpv.vn&utm_medium=redirect&utm_campaign=MSD006-HPV'
                setShowNotification(false)
            }

        }, 1000)
    }
    const handleCancel = () => {
        clearInterval(timeout)
        n = 5
        setShowNotification(false)
    }
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        const curPath = window.location.pathname;
        setcurPathLink(curPath)

    }, [window.location.pathname]);
    return (
        <>
            {/* desktop */}
            <div className="male-background h-[100vh] w-full  hidden lg:flex flex-col justify-between lg:justify-start lg:gap-3 xxl:gap-6  z-40 relative">
                <div className="absolute h-full w-full top-0 left-0 -z-[1]">
                    <img src={bg_male} className='lg:block hidden img' alt="hpv" />
                </div>
                <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
                {width > 976 ? (<Header handleCancel={handleCancel} handleLink={handleLink} />) : ''}

                <div className="h-full xl:h-full px-5 xxl:px-7 overflow-y-auto">
                    <Outlet />
                </div>
                {width > 976 ? (<ButtonBarFooter handleLink={handleLink} />) : ''}

            </div>
            {/* mobile */}
            <div className=' h-full flex lg:hidden flex-col overflow-y-scroll relative'>
                <div className="fixed h-[100vh] w-full top-0 left-0 -z-[1] bg-white">
                    {/* <img src={bg_male_detail} className='block lg:hidden img' alt="hpv" /> */}
                </div>
                <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />

                <div className="fixed top-0 left-0 w-full h-10 md:h-[56px] bg-white rounded-b-md overflow-hidden z-40 ">
                {width > 976 ? '' : (<Header handleCancel={handleCancel} handleLink={handleLink} />)}
                </div>
                <div className="pt-12 pb-14 min-h-[100vh]  px-5 xxl:px-7">
                    <Outlet />
                </div>
                <div className="fixed bottom-0 left-0 w-full h-14 bg-white rounded-t-2xl overflow-hidden z-40">
                    <FooterSideBar curPathLink={curPathLink} handleCancel={handleCancel} />
                </div>
                {width > 976 ? '' : (<ButtonBarFooter handleLink={handleLink} />)}

                {/* </div> */}
            </div>
        </>
    )

};

export default AppLayoutMale;