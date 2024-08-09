
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import * as BannerApi from '../../api/banner/bannerApi';
import FooterSideBar from '../../components/FooterSideBar';
import { background_layout, banner_choice, bg_mobile_quiz, quiz_1, quiz_2, quiz_3 } from '../../components/ImgExport';
import useLoading from '../../hook/useLoading';
import Footer from '../../router/Layout/Footer';
import FooterDesktop from '../../router/Layout/FooterDesktop';
import Header from '../../router/Layout/Header';
import ModalNavigator from '../../router/Layout/ModalNavigator';
import './styles.css';

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ButtonBarFooter from '../../components/ButtonBarFooter';
import { IMAGE_URL, META_LOGO, META_URL } from '../../env';
import useWindowDimensions from '../../hook/useWindowDimensions';
let timeout: any, n = 5;

const MultipleChoice: React.FC = () => {
  const pushLoading = useLoading();
  const navigator = useNavigate()
  const [backdrop, setBackdrop] = useState(false)

  const [typeAge, setTypeAge] = useState(0)
  const [gender, setGender] = useState(-1)
  const [showModalFemale, setShowModalFemale] = useState(false)
  const [showModalMale, setShowModalMale] = useState(false)
  const [showThankyou, setShowThankyou] = useState(false)
  const [showModalAge, setShowModalAge] = useState(true)
  const [showModalGender, setShowModalGender] = useState(false)
  const [banner, setBanner] = useState<BannerApi.Img[]>([])
  const [bannerMobile, setBannerMobile] = useState<BannerApi.ImgMobile[]>([])

  const [showNotification, setShowNotification] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [scroll, setScroll] = useState(false)
  const { width, height } = useWindowDimensions();


  const metaHTML = () => {
    var urlMeta = document.querySelector('meta[property="og:url"]')
    var urlTitle = document.querySelector('title[class="title-index"]')
    if (urlTitle) {
      urlTitle.innerHTML = 'Trắc nghiệm';
    }
    if (urlMeta) {
      urlMeta.setAttribute("content", `${META_URL}kiem-tra-hpv`);
    }
    var typeMeta = document.querySelector('meta[property="og:type"]')
    if (typeMeta) {
      typeMeta.setAttribute("content", "website");
    }
    var titleMeta = document.querySelector('meta[property="og:title"]')
    if (titleMeta) {
      titleMeta.setAttribute("content", `Câu hỏi trắc nghiệm`);
    }
    var imageMeta = document.querySelector('meta[property="og:image"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `${META_LOGO}`);
    }
    var imageMeta = document.querySelector('meta[property="og:description"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `Câu hỏi trắc nghiệm`);
    }
    var descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", `Câu hỏi trắc nghiệm`);
    }
  }

  useLayoutEffect(() => {
    const windowWidth = width;
    const windowHeight = height;
    if (windowHeight < windowWidth && windowWidth < 1200 && windowHeight < 675) {
      setScroll(true);
    } else {
      setScroll(false);
    }

  }, [width, height])

  useEffect(() => {
    if (showModalFemale) {
      setBackdrop(true)
    } else if (showModalMale) {
      setBackdrop(true)
    } else {
      setBackdrop(false)
    }
  }, [showModalFemale, showModalMale,])

  const handleCloseBackdrop = () => {
    setShowModalFemale(false)
    setBackdrop(false)
    setShowModalMale(false)
    // setLeavingShow(false)

  }
  const handleNavigate = (e: string) => {
    { e === 'female' ? navigator('/du-phong-cho-nu') : navigator('/du-phong-cho-nam') }
    setShowModalFemale(false)
    setBackdrop(false)
    setShowModalMale(false)
    // setLeavingShow(false)
  }

  const handleTypeAge = (age: number) => {
    setBackdrop(true)
    setTypeAge(age)
    setShowModalMale(true)
  }

  const handleTypeAgeMobile = (age: number) => {
    setTypeAge(age)
    setShowModalGender(true)
  }

  const handleSubmitAge = async (gender: number, age: number) => {
    setGender(gender)
    setShowThankyou(true)
    setTimeout(() => {
      navigator(`/cau-hoi-kiem-tra-hpv/${gender}/${age}`)
    }, 2000);
  }

  const bannerDetail = async () => {
    pushLoading(true)
    const result = await BannerApi.bannerDetail(4)
    if (result.status) {
      setBanner(result.data.img)
      setBannerMobile(result.data.imgMobile)
    } else {
      setBanner([])
      setBannerMobile([])
    }
    pushLoading(false)
  }
  useEffect(() => {
    bannerDetail()
    metaHTML()
  }, [])
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

  const [curPathLink, setcurPathLink] = useState('')

  useEffect(() => {
    const curPath = window.location.pathname;
    setcurPathLink(curPath)

  }, [window.location.pathname]);


  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => <ul>{dots}</ul>,
    customPaging: (i: any) => (
      <div className="ft-slick__dots--custom">
      </div>
    )
  };

  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  return (
    <>
      {/* <Helmet>
        <title>Trắc nghiệm</title>
      </Helmet> */}
      <div className="by-svh-custom w-full hidden lg:flex flex-col justify-between lg:justify-start lg:gap-3 xxl:gap-6 z-40 relative">
        <div className="absolute h-full w-full top-0 left-0 -z-[1]">
          <img src={background_layout} className='lg:block hidden img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        {/* Header */}
        {width > 976 ? (<Header handleCancel={handleCancel} handleLink={handleLink} />) : ''}

        <div className={`h-full xl:h-full px-5 xxl:px-7  ${scroll ? 'overflow-y-scroll' : 'overflow-hidden'} flex flex-col justify-between`}>
          <div className={`hidden lg:flex flex-col lg:flex-row ${scroll ? 'h-fit' : 'h-[calc(100%-62px)]'} max-h-[1000px] homepage z-0 gap-2 sm:gap-4 lg:gap-4 xxl:gap-4`}>
            {/* content */}
            <div className={`hidden lg:flex w-full ${scroll ? '!h-[531px]' : 'h-full'} gap-4 xxl:gap-4`}>
              <div className="w-2/3 h-full  relative">
                <Slider {...settings}
                >
                  {banner.length === 0 ?
                    <div className="w-full h-full overflow-hidden rounded-2xl">
                      <img
                        className='img xl:object-top'
                        src={banner_choice}
                        onError={(e) => {
                          e.currentTarget.src = banner_choice;
                        }}
                        alt="hpv"
                      />
                    </div>
                    :
                    banner?.map((item, index) => (
                      <div key={index} className="w-full h-full overflow-hidden rounded-2xl">
                        <img
                          className='img xl:object-top'
                          src={item.img ? IMAGE_URL + item.img : banner_choice}
                          onError={(e) => {
                            e.currentTarget.src = banner_choice;
                          }}
                          alt="hpv"
                        />
                      </div>
                    ))
                  }
                </Slider>
              </div>
              <div className="w-1/3 h-full  relative grid grid-rows-3 gap-4 xxl:gap-7 xxl:pl-3">
                <div className="h-full w-full">
                  <div className="bg-white rounded-2xl h-full w-full flex overflow-hidden hover:bg-[#005750] hover-custom-color-text transition-all cursor-pointer"
                    onClick={() => handleTypeAge(1)}
                  >
                    <div className="w-1/2 pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                      <div>
                        <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase fs-title-mac15">ĐỘ TUỔI: 9-18 TUỔI</p>
                      </div>
                      <div className="">
                        <p className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 xxl:line-clamp-3 text-ellipsis font-Alexandria">Tỏ sự thật về HPV, tương lai con được phòng vệ</p>
                      </div>
                    </div>
                    <div className="  w-1/2 flex flex-col justify-end items-end px-4 pt-5 xxl:pt-8 relative">
                      <div className="absolute top-4 xxl:top-8 right-2 xxl:right-5 svg-hover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                          <path d="M31.3025 0.43C31.3025 0.43 31.2125 0.36 31.1625 0.32C31.1425 0.3 31.1125 0.29 31.0925 0.27C30.9925 0.21 30.8825 0.16 30.7725 0.11C30.7125 0.09 30.6625 0.07 30.6025 0.06C30.4525 0.02 30.3025 0 30.1425 0H20.5325C19.5125 0 18.6125 0.81 18.6125 1.83C18.6125 2.86 19.5025 3.71 20.5225 3.71L25.7125 3.74L20.7025 8.76C15.6125 4.94 8.4025 5.34 3.7925 9.95C-1.2575 15 -1.2675 23.18 3.7825 28.23C8.8325 33.28 17.0225 33.27 22.0725 28.23C26.6825 23.62 27.0325 16.35 23.2825 11.33L28.3025 6.31V11.46C28.3025 12.48 29.1325 13.31 30.1525 13.31C31.1725 13.31 32.0025 12.48 32.0025 11.46V1.86C32.0025 1.29 31.7425 0.77 31.3325 0.43H31.3025ZM19.4325 25.62C15.8325 29.22 9.9625 29.22 6.3625 25.62C2.7625 22.02 2.7625 16.15 6.3625 12.55C9.9625 8.95 15.8325 8.95 19.4325 12.55C23.0325 16.15 23.0325 22.02 19.4325 25.62Z" fill="black" />
                        </svg>
                      </div>
                      <div className="!w-full !h-[90%] aspect-square flex-shrink-0 overflow-hidden flex items-end">
                        <img src={quiz_1} alt="hpv" className='!h-full !w-full !object-contain' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-full w-full">
                  <div className="bg-white rounded-2xl h-full w-full flex overflow-hidden hover:bg-[#005750] hover-custom-color-text transition-all cursor-pointer"
                    onClick={() => handleTypeAge(2)}
                  >
                    <div className="w-1/2 pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                      <div>
                        <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 fs-title-mac15">ĐỘ TUỔI: 18-26 TUỔI</p>
                      </div>
                      <div className="">
                        <p className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 xxl:line-clamp-3 text-ellipsis font-Alexandria">Soi ngay để tỏ bạn thuộc “cờ xanh” hay “cờ đỏ”</p>

                      </div>
                    </div>
                    <div className="  w-1/2 flex flex-col justify-end items-end px-4 pt-5 xxl:pt-8 relative">
                      <div className="absolute top-4 xxl:top-8 right-2 xxl:right-5 svg-hover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                          <path d="M31.3025 0.43C31.3025 0.43 31.2125 0.36 31.1625 0.32C31.1425 0.3 31.1125 0.29 31.0925 0.27C30.9925 0.21 30.8825 0.16 30.7725 0.11C30.7125 0.09 30.6625 0.07 30.6025 0.06C30.4525 0.02 30.3025 0 30.1425 0H20.5325C19.5125 0 18.6125 0.81 18.6125 1.83C18.6125 2.86 19.5025 3.71 20.5225 3.71L25.7125 3.74L20.7025 8.76C15.6125 4.94 8.4025 5.34 3.7925 9.95C-1.2575 15 -1.2675 23.18 3.7825 28.23C8.8325 33.28 17.0225 33.27 22.0725 28.23C26.6825 23.62 27.0325 16.35 23.2825 11.33L28.3025 6.31V11.46C28.3025 12.48 29.1325 13.31 30.1525 13.31C31.1725 13.31 32.0025 12.48 32.0025 11.46V1.86C32.0025 1.29 31.7425 0.77 31.3325 0.43H31.3025ZM19.4325 25.62C15.8325 29.22 9.9625 29.22 6.3625 25.62C2.7625 22.02 2.7625 16.15 6.3625 12.55C9.9625 8.95 15.8325 8.95 19.4325 12.55C23.0325 16.15 23.0325 22.02 19.4325 25.62Z" fill="black" />
                        </svg>
                      </div>
                      <div className="!w-full !h-[90%] aspect-square flex-shrink-0 overflow-hidden flex items-end">
                        <img src={quiz_2} alt="hpv" className='!h-full !w-full !object-contain' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-full w-full">
                  <div className="bg-white rounded-2xl h-full w-full flex overflow-hidden hover:bg-[#005750] hover-custom-color-text transition-all cursor-pointer"
                    onClick={() => handleTypeAge(3)}
                  >
                    <div className="w-1/2 pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                      <div>
                        <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 fs-title-mac15">ĐỘ TUỔI: 9-45 TUỔI</p>
                      </div>
                      <div className="">
                        <p className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 xxl:line-clamp-3 text-ellipsis font-Alexandria">Nếu HPV là một môn học, bạn nghĩ mình sẽ được mấy điểm? </p>

                      </div>
                    </div>
                    <div className="  w-1/2 flex flex-col justify-end items-end px-4 pt-5 xxl:pt-8 relative">
                      <div className="absolute top-4 xxl:top-8 right-2 xxl:right-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                          <path d="M31.3025 0.43C31.3025 0.43 31.2125 0.36 31.1625 0.32C31.1425 0.3 31.1125 0.29 31.0925 0.27C30.9925 0.21 30.8825 0.16 30.7725 0.11C30.7125 0.09 30.6625 0.07 30.6025 0.06C30.4525 0.02 30.3025 0 30.1425 0H20.5325C19.5125 0 18.6125 0.81 18.6125 1.83C18.6125 2.86 19.5025 3.71 20.5225 3.71L25.7125 3.74L20.7025 8.76C15.6125 4.94 8.4025 5.34 3.7925 9.95C-1.2575 15 -1.2675 23.18 3.7825 28.23C8.8325 33.28 17.0225 33.27 22.0725 28.23C26.6825 23.62 27.0325 16.35 23.2825 11.33L28.3025 6.31V11.46C28.3025 12.48 29.1325 13.31 30.1525 13.31C31.1725 13.31 32.0025 12.48 32.0025 11.46V1.86C32.0025 1.29 31.7425 0.77 31.3325 0.43H31.3025ZM19.4325 25.62C15.8325 29.22 9.9625 29.22 6.3625 25.62C2.7625 22.02 2.7625 16.15 6.3625 12.55C9.9625 8.95 15.8325 8.95 19.4325 12.55C23.0325 16.15 23.0325 22.02 19.4325 25.62Z" fill="black" />
                        </svg>
                      </div>
                      <div className="!w-full !h-[90%] aspect-square flex-shrink-0 overflow-hidden flex items-end">
                        <img src={quiz_3} alt="hpv" className='!h-full !w-full !object-contain' />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Modal */}
                {showModalFemale || showModalMale ? (
                  <>
                    <div className={'absolute top-0 left-0 w-full h-fit rounded-2xl overflow-hidden transition ease-in-out delay-150 xxl:pl-3 py-4 z-50'}>
                      <div className='bg-white transition ease-in-out delay-150 rounded-2xl h-fit w-full relative  flex flex-col justify-between z-40 overflow-hidden'>

                        <div className='px-4 xxl:px-8 py-4 xxl:py-7 z-50 overflow-hidden rounded-2xl'>
                          <div className='pl-4 xxl:pl-[30px]  pt-1 xxl:pt-[30px] pb-2 xxl:pb-[25px]  text-[19px] xxl:text-[21px] w-full leading-[26px]text-black font-[500] fs-title-mac15'>Hãy chọn để tiếp tục</div>
                          <div className="flex flex-col gap-2">
                            <div className={`w-full h-[130px] h-mac15-res bg-[#005750] rounded-2xl flex justify-between items-center `}>
                              <div className='pl-3 xxl:pl-6'>
                                <span className='text-white text-sm xxl:text-base font-[400] leading-[21px] xxl:leading-[26px] font-Alexandria'>Bạn trong độ tuổi nào?</span>
                              </div>
                              <div className={`rounded-2xl flex-shrink-0 w-[120px] h-full items-center justify-center xxl:w-[132px] bg-[#40AFA3] p-2 xxl:p-4 flex flex-col gap-2 xxl:gap-4 px-4 xxl:px-6 py-4 xxl:py-7`}>
                                <div className='rounded-full w-[103px] text-xs xxl:text-sm uppercase py-2 !px-3 whitespace-nowrap border-[1px] hover:border-white bg-white cursor-pointer text-[#005750] font-Alexandria flex justify-center items-center'
                                >
                                  {typeAge === 1 ? "9-18 TUỔI" : (typeAge === 2 ? "18-26 TUỔI" : "27-45 TUỔI")}

                                </div>
                              </div>
                            </div>
                            <div className={`w-full h-[130px] h-mac15-res bg-[#005750] rounded-2xl flex justify-between items-center `}>
                              <div className='pl-3 xxl:pl-6'>
                                <span className='text-white text-sm xxl:text-base font-[400] leading-[21px] xxl:leading-[26px] font-Alexandria'>Bạn thuộc giới tính nào?</span>
                              </div>
                              <div className={`rounded-2xl flex-shrink-0 w-[120px] h-full items-center justify-center xxl:w-[132px] bg-[#40AFA3] p-2 xxl:p-4 flex flex-col gap-2 xxl:gap-4 px-4 xxl:px-6 py-4 xxl:py-7`}>
                                <div className={`rounded-2xl flex-shrink-0 w-[120px] h-full items-center justify-center xxl:w-[132px] bg-[#40AFA3] p-2 xxl:p-4 flex flex-col gap-2 xxl:gap-4 px-4 xxl:px-6 py-4 xxl:py-7`}>
                                  {typeAge !== 3 && (
                                    <div className={`w-[103px] rounded-full text-xs xxl:text-sm uppercase py-2 !px-3 whitespace-nowrap border-[1px] hover:border-white hover:bg-white cursor-pointer hover:text-[#005750] border-white flex justify-center items-center font-Alexandria ${gender === 1 ? "border-white bg-white text-[#005750]" : "text-white"}`}
                                      onClick={() =>
                                        handleSubmitAge(1, typeAge)
                                      }
                                    >
                                      Nam
                                    </div>
                                  )}

                                  <div className={`w-[103px] rounded-full text-xs xxl:text-sm uppercase py-2 !px-3 whitespace-nowrap border-[1px] hover:border-white hover:bg-white cursor-pointer hover:text-[#005750] border-white flex justify-center items-center font-Alexandria ${gender === 0 ? "border-white bg-white text-[#005750]" : "text-white"}`}
                                    onClick={() =>
                                      handleSubmitAge(0, typeAge)
                                    }
                                  >
                                    Nữ
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`${showThankyou ? "rounded-2xl bg-[#40ccab] transition ease-in-out w-full h-full ml-auto delay-150 py-4 xxl:py-7 px-8 xxl:px-12 z-50 custom-transition-thanks" : "hidden"}`}>
                          <span className='text-white text-[19px] xxl:text-[21px] font-[500] font-Alexandria h-mac15-res'>Cám ơn bạn đã lựa chọn!<br />
                            Giờ thì cùng làm trắc nghiệm nhé!</span>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-40 fixed inset-0 z-40 bg-black" onClick={() => {
                      setShowModalFemale(false);
                      setShowModalMale(false)
                    }}></div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <Footer colorText='#606060' type='quiz' />
          {width > 976 ? (<ButtonBarFooter handleLink={handleLink} />) : ''}
        </div>
      </div>
      {/* mobile */}
      <div className='max-h-[100vh] by-svh-custom flex lg:hidden flex-col relative'>
        <div className="max-h-[100vh] by-svh-custom w-full top-0 left-0 -z-[1]">
          <img src={bg_mobile_quiz} className='block lg:hidden img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />

        <div className="absolute top-0 left-0 h-full w-full flex lg:hidden flex-col overflow-hidden">
          <div className=" w-full h-10 md:h-[56px] bg-transparent rounded-b-md overflow-hidden z-40 ">
            {width > 976 ? '' : (<Header handleCancel={handleCancel} handleLink={handleLink} />)}
          </div>
          {/* trong layout */}
          <div className={`${scroll ? 'overflow-y-scroll' : 'overflow-hidden'} h-[calc(100%-92px)] md:h-[calc(100%-108px)] px-5 xxl:px-7`}>
            <div className='lg:hidden transition ease-in-out delay-150 pt-2  w-full  flex flex-col gap-2 justify-between z-20'>
              <div className='px-4 py-5 xxl:pb-7  bg-white rounded-2xl'>
                <div className='pl-4 xxl:pl-6 text-[15px] sm:text-lg md:text-2xl w-full leading-[26px] pt-1 xxl:pt-3 pb-2 xxl:pb-4 text-black font-[500]'>Xin chào! <br /> Hãy chọn để tiếp tục</div>
                <div className="flex flex-col gap-2">
                  <div className={`${showModalAge ? "rounded-2xl flex-shrink-0  bg-[#005750]  flex flex-col gap-3 px-4 py-4 " : "hidden"}`}>
                    <span className='text-[15px] sm:text-lg md:text-2xl text-white font-[500] pb-1'>Bạn trong độ tuổi nào?</span>
                    <div className='flex flex-row justify-center gap-3'>
                      <div className="w-1/3 h-16 sm:h-20 md:h-24 rounded-[14px] bg-[#40B0A4] flex items-center justify-center hidden"
                        onClick={(e) => handleTypeAgeMobile(1)}>
                        <div className='px-3 sm:px-6 md:px-10 py-1 sm:py-2 md:py-3 bg-white rounded-md box-select-tablet'>
                          <div
                            className="w-full h-full bg-white rounded-lg flex items-center justify-center text-[14px] sm:text-lg font-Alexandria whitespace-nowrap"
                          >
                            9-18
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3 h-16 sm:h-20 md:h-24 rounded-[14px] bg-[#40B0A4] flex items-center justify-center"
                        onClick={(e) => handleTypeAgeMobile(2)}>
                        <div className='px-3 sm:px-6 md:px-10 py-1 sm:py-2 md:py-3 bg-white rounded-md box-select-tablet'>
                          <div
                            className="w-full h-full bg-white rounded-lg flex items-center justify-center text-[14px] sm:text-lg font-Alexandria whitespace-nowrap"
                          >
                            18-26
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3 h-16 sm:h-20 md:h-24 rounded-[14px] bg-[#40B0A4] flex items-center justify-center hidden"
                        onClick={(e) => handleTypeAgeMobile(3)}>
                        <div className='px-3 sm:px-6 md:px-10 py-1 sm:py-2 md:py-3 bg-white rounded-md box-select-tablet'>
                          <div
                            className="w-full h-full bg-white  flex items-center justify-center text-[14px] sm:text-lg font-Alexandria whitespace-nowrap"
                          >
                            9-45
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${showModalGender ? "rounded-2xl flex-shrink-0  bg-[#005750]  flex flex-col gap-3 px-8 py-8" : "hidden"}`}>
                    <span className='text-[15px] sm:text-lg md:text-2xl text-white font-[500] pb-1'>Bạn thuộc giới tính nào?</span>
                    <div className='flex flex-row justify-center gap-3'>
                      <div className="w-1/2 h-16 sm:h-20 md:h-24 rounded-[14px] bg-[#40B0A4] flex items-center justify-center"
                        onClick={(e) => handleSubmitAge(0, typeAge)}
                      >
                        <div className='px-3 sm:px-6 md:px-10 py-1 sm:py-2 md:py-3 bg-white rounded-md box-select-tablet'>
                          <div
                            className="w-full h-full bg-white rounded-lg flex items-center justify-center text-[14px] sm:text-lg md:text-xl font-Alexandria"
                          >
                            Nữ
                          </div>
                        </div>
                      </div>
                      {typeAge !== 3 && (
                        <div className="w-1/2 h-16 sm:h-20 md:h-24 rounded-[14px] bg-[#40B0A4] flex items-center justify-center"
                          onClick={(e) => handleSubmitAge(1, typeAge)}>
                          <div className='px-3 sm:px-6 md:px-10 py-1 sm:py-2 md:py-3 bg-white rounded-md box-select-tablet'>
                            <div
                              className="w-full h-full bg-white rounded-lg flex items-center justify-center text-[14px] sm:text-lg md:text-xl font-Alexandria"
                            >
                              Nam
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`${showThankyou ? "rounded-2xl bg-[#40ccab] transition ease-in-out w-full h-full ml-auto delay-150 py-4 xxl:py-7 px-4 xxl:px-12 z-50 custom-transition-thanks" : "hidden"}`}>
                    <span className='text-white text-[12px] xxl:text-[21px] font-[500]'>
                      Cám ơn !<br />
                      Bạn đã lựa chọn!<br />
                      Giờ thì cùng làm trắc nghiệm nhé!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-2">
            <Footer colorText='#606060' type='quiz' />
          </div>
          <div className=" w-full h-14 bg-white rounded-t-2xl overflow-hidden z-40">
            <FooterSideBar curPathLink={curPathLink} handleCancel={handleCancel} />
          </div>
        </div>
        {width > 976 ? '' : (<ButtonBarFooter handleLink={handleLink} />)}
      </div>
    </>

  )
}
export default MultipleChoice