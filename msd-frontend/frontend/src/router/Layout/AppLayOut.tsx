import * as React from 'react';
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ButtonBarFooter from '../../components/ButtonBarFooter';
import FooterSideBar from '../../components/FooterSideBar';
import { background_layout, bg_community, bg_community_mb, bg_mobile_home } from "../../components/ImgExport";
import useToast from '../../hook/useToast';
import Header from './Header';
import ModalNavigator from './ModalNavigator';
import "./styles.css";
import useWindowDimensions from '../../hook/useWindowDimensions';


let timeout: any, n = 5;
const AppLayout = () => {
  const navigator = useNavigate()
  const [curPathLink, setCurPathLink] = useState('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showNotification, setShowNotification] = useState(false);
  const pushToast = useToast();
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

  useEffect(() => {
    const curPath = window.location.pathname;
    setCurPathLink(curPath)

  }, [window.location.pathname]);

  // scroll ẩn URL
  const { width, height } = useWindowDimensions();

  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  return (
    <>
      {/* desktop */}
      <div className="home-page h-[100vh] w-full hidden lg:flex flex-col justify-between lg:justify-start lg:gap-3 xxl:gap-6 z-40 relative">
        <div className="absolute h-full w-full top-0 left-0 -z-[1]">
          {curPathLink.includes('hoat-dong-cong-dong') ? (
            <img src={bg_community} className='lg:block hidden img' alt="hpv" />
          ) : (
            <img src={background_layout} className='lg:block hidden img' alt="hpv" />
          )}

        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        {/* Header */}
        {width > 976 ? (<Header handleCancel={handleCancel} handleLink={handleLink} />) : ''}

        <div className="h-full xl:h-full px-5 xxl:px-7  overflow-y-scroll ">
          <Outlet />

        </div>
        {width > 976 ? (<ButtonBarFooter handleLink={handleLink} />) : ''}

      </div>
      {/* mobile */}
      <div className=' h-full flex lg:hidden flex-col overflow-y-scroll relative'>
        <div className="fixed h-[100vh] w-full top-0 left-0 -z-[1]">
          {curPathLink.includes('hoat-dong-cong-dong') ? (
            <img src={bg_community_mb} className='block lg:hidden h-full w-full' alt="hpv" />
          ) :
            (<img src={bg_mobile_home} className='block lg:hidden h-full w-full' alt="hpv" />)
          }
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />

        <div className="fixed top-0 left-0 w-full h-10 md:h-[56px] rounded-b-md overflow-hidden z-999">
          {curPathLink.includes('hoat-dong-cong-dong') ? (
            <img src={bg_community_mb} className=' absolute top-0 left-0 w-full h-full object-top -z-10' alt="hpv" />
          ) : (
            <img src={bg_mobile_home} className=' absolute top-0 left-0 w-full h-full object-top -z-10' alt="hpv" />
          )}

          {width > 976 ? '' : (<Header handleCancel={handleCancel} handleLink={handleLink} />)}
        </div>
        {/* <div className="pt-10 md:pt-[56px] pb-14 min-h-[100vh] h-fit px-5 xxl:px-7 flex flex-col justify-between"> */}
        <div className="pt-10 md:pt-[56px] !pb-14 by-svh-custom px-5 overflow-y-scroll xxl:px-7 flex flex-col">
          <Outlet />
        </div>
        <div className="fixed bottom-0 left-0 w-full h-14 bg-white rounded-t-2xl overflow-hidden z-40">
          <FooterSideBar curPathLink={curPathLink} handleCancel={handleCancel} />
        </div>
        {width > 976 ? '' : (<ButtonBarFooter handleLink={handleLink} />)}

      </div>
    </>
  )

};

export default AppLayout;