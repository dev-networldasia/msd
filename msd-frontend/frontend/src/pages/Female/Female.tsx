
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import * as BannerApi from '../../api/banner/bannerApi';
import * as NewcategoryApi from '../../api/newcategory/newcategoryApi';
import * as AccumulateApi from '../../api/token/accumulateApi';
import ButtonBarFooter from '../../components/ButtonBarFooter';
import FooterSideBar from '../../components/FooterSideBar';
import { baner_homepage, bg_female, bg_female_mobile, female } from '../../components/ImgExport';
import ModalFemalePage from '../../components/ModalSurvey/ModalFemalePage';
import ModalSurvey from '../../components/ModalSurvey/ModalSurvey';
import { IMAGE_URL, IMAGE_URL_CATEGORY, META_LOGO, META_URL } from '../../env';
import useLoading from '../../hook/useLoading';
import useToast from '../../hook/useToast';
import useWindowDimensions from '../../hook/useWindowDimensions';
import Footer from '../../router/Layout/Footer';
import FooterDesktop from '../../router/Layout/FooterDesktop';
import Header from '../../router/Layout/Header';
import ModalNavigator from '../../router/Layout/ModalNavigator';
import * as Token from '../../services/token';
import { convertHTML } from '../../until';
import './styles.css';

let timeout: any, n = 5;

const Female: React.FC = () => {
  const navigator = useNavigate()
  const pushToast = useToast();
  const pushLoading = useLoading();
  const [tokenUser, setTokenUser] = useState('')
  const [banner, setBanner] = useState<BannerApi.Img[]>([])
  const [bannerMobile, setBannerMobile] = useState<BannerApi.ImgMobile[]>([])
  const [listCategoryByGender, setListCategoryByGender] = useState<NewcategoryApi.InfoCategory[]>([])
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(true)
  const gender = 'female-page'
  const [leavingShow, setLeavingShow] = useState(false)
  const [modalFemale, setModalFemale] = useState(false)


  const [scroll, setScroll] = useState(false)
  const { width, height } = useWindowDimensions();

  const metaHTML = () => {
    var urlMeta = document.querySelector('meta[property="og:url"]')

    var urlTitle = document.querySelector('title[class="title-index"]')
    if (urlTitle) {
      urlTitle.innerHTML = "Dự phòng cho nữ";
    }
    if (urlMeta) {
      urlMeta.setAttribute("content", `${META_URL}du-phong-cho-nu`);
    }
    var typeMeta = document.querySelector('meta[property="og:type"]')
    if (typeMeta) {
      typeMeta.setAttribute("content", "website");
    }
    var titleMeta = document.querySelector('meta[property="og:title"]')
    if (titleMeta) {
      titleMeta.setAttribute("content", `Dự phòng HPV cho Nữ`);
    }
    var imageMeta = document.querySelector('meta[property="og:image"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `${META_LOGO}`);
    }
    var imageMeta = document.querySelector('meta[property="og:description"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `Dự phòng HPV cho Nữ`);
    }
    var descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", `Dự phòng HPV cho Nữ`);
    }
  }

  const checkHBS = () => {
    let hpv = Token.getHBS();
    if (hpv && hpv !== '') {
      setShowModal(false)
      setModalFemale(false)
    } else {
      setShowModal(true)
      setModalFemale(true)
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
    checkHBS()
  }, [width, height])

  useEffect(() => {
    // var hpv = Token.getHPVQuestion()
    let hpv = Token.getHBS();
    if (hpv && hpv !== '') {
      setShowModal(false)
      setModalFemale(false)
    } else {
      setShowModal(true)
      setModalFemale(true)
    }
    metaHTML()
  }, [])

  const handleDismiss = (e: string) => {
    setShowModal(false)
  }
  const resetData = () => {
    setBanner([])
    setBannerMobile([])
    setListCategoryByGender([])
  }

  const bannerDetail = async () => {
    pushLoading(true)
    const result = await BannerApi.bannerDetail(2)
    if (result.status) {
      setBanner(result.data.img)
      setBannerMobile(result.data.imgMobile)
    } else {
      setBanner([])
      setBannerMobile([])
    }
    pushLoading(false)
  }

  const fetchDataDetail = async () => {
    pushLoading(true)
    const result = await NewcategoryApi.articleCategoryByGender(0)
    if (result.status) {
      setListCategoryByGender(result.data)
    } else {
      setListCategoryByGender([])
    }
    pushLoading(false)
  }

  const getToken = async () => {
    let token = Token.getUser();
    setTokenUser(token)
  }

  const typeAccumulated = async () => {
    const result = await AccumulateApi.typeAccumulated(tokenUser, 3, 0, 0, 0, 0, 0, 0, 0)
  }

  const clickFemaleDetail = (url: string) => {
    if (url && url !== '') {
      navigate(`/chi-tiet-du-phong-cho-nu/${url}`)
    }
  }

  useEffect(() => {
    resetData()
    fetchDataDetail()
    bannerDetail()
    getToken()
  }, [])

  useEffect(() => {
    typeAccumulated();
  }, [tokenUser])

  useEffect(() => {
    // var hpv = Token.getHPVQuestion()
    let hpv = Token.getHBS();
    if (hpv && hpv !== '') {
      setShowModal(false)
    } else {
      setShowModal(true)
    }
  }, [])

  const [curPathLink, setcurPathLink] = useState('')

  useEffect(() => {
    const curPath = window.location.pathname;
    setcurPathLink(curPath)
  }, [window.location.pathname]);

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

  useEffect(() => {
    handleCancel()
  }, [window.location.href])


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
      <div className="ft-slick__dots--custom-female">
      </div>
    )
  };


  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  return (
    <>
      {/* <Helmet>
        <title>Dự phòng cho nữ</title>
      </Helmet> */}
      {/* desktop */}
      <div className="by-svh-custom w-full hidden lg:flex flex-col justify-between lg:justify-start lg:gap-3 xxl:gap-6 z-40 relative">
        <div className="absolute by-svh-custom w-full top-0 left-0 -z-[1]">
          <img src={bg_female} className='img' alt="hpv" />
        </div>

        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        {width > 976 ? (<Header handleCancel={handleCancel} handleLink={handleLink} />) : ''}
        <div className={`by-svh-custom px-5 xxl:px-7 flex flex-col justify-between ${scroll ? 'overflow-y-scroll' : 'overflow-hidden'}`}>
          <div className={`hidden lg:flex flex-col lg:flex-row  ${scroll ? 'h-fit' : 'h-[calc(100%-62px)]'} max-h-[1000px] z-9 gap-2 sm:gap-4 lg:gap-4 xxl:gap-4`}>
            <div className={`w-2/3 relative ${scroll ? '!h-[531px]' : 'h-full'} `}>
              <Slider {...settings}
              >
                {banner.length === 0 ?
                  <div className="w-full h-full overflow-hidden rounded-2xl relative">
                    <span className=' text-2xl xxl:text-2xl uppercase absolute bottom-6 left-6 font-[500] z-10'>Dự Phòng <br />HPV cho nữ</span>
                    <img
                      className='img'
                      src={baner_homepage}
                      onError={(e) => {
                        e.currentTarget.src = baner_homepage;
                      }}
                      alt="hpv"
                    />
                  </div>
                  :
                  banner?.map((item, index) => (
                    <div key={index} className="w-full h-full overflow-hidden rounded-2xl relative">
                      <span className=' text-2xl xxl:text-2xl uppercase absolute bottom-6 left-6 font-[500] z-10'>Dự Phòng <br />HPV cho nữ</span>
                      <img
                        className='img'
                        src={item.img ? IMAGE_URL + item.img : baner_homepage}
                        onError={(e) => {
                          e.currentTarget.src = baner_homepage;
                        }}
                        alt="hpv"
                      />
                    </div>
                  ))
                }

              </Slider>


            </div>
            <div className={`w-1/3 ${scroll ? '!h-[531px]' : 'h-full'} relative grid grid-rows-3 gap-4 xxl:gap-7 xxl:pl-3`}>

              {/* MOdal for start, male, Female */}
              <ModalFemalePage show={modalFemale} dismiss={() => setModalFemale(false)} />
              {listCategoryByGender?.map((row: any) => (
                <div className="h-full w-full" key={row.id}>
                  <div className="bg-white rounded-2xl h-full w-full flex overflow-hidden hover:bg-[#FFF298] transition-all cursor-pointer"
                    onClick={() => clickFemaleDetail(row.url)}
                  >
                    <div className="w-1/2 pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between ">
                      <div>
                        <p className=" mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase fs-title-mac15" dangerouslySetInnerHTML={convertHTML(row?.titleHtml)}></p>
                      </div>
                      <div className="">
                        <p
                          className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 xxl:line-clamp-3 text-ellipsis font-Alexandria"
                          dangerouslySetInnerHTML={convertHTML(row?.description)}
                        >
                        </p>
                      </div>
                    </div>
                    <div className=" w-1/2 px-4 flex flex-col justify-end items-end relative">
                      <div className="absolute top-4 xxl:top-8 right-2 xxl:right-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="39" viewBox="0 0 26 39" fill="none" aria-label='svg-tag'>
                          <path d="M25.3 12.67C25.3 5.67 19.63 0 12.63 0C5.63 0 0 5.67 0 12.67C0 19.05 4.75 24.33 10.9 25.21V29.38H7.94C6.94 29.38 6.16 30.15 6.16 31.15C6.16 32.16 6.95 32.98 7.94 32.98H10.9V36.56C10.9 37.56 11.66 38.37 12.66 38.37C13.66 38.37 14.42 37.56 14.42 36.56V32.98H17.36C18.36 32.98 19.17 32.16 19.17 31.17C19.17 30.17 18.36 29.38 17.36 29.38H14.42V25.21C20.66 24.33 25.3 19.05 25.3 12.67ZM12.65 21.72C7.66 21.72 3.6 17.66 3.6 12.67C3.6 7.68 7.65 3.62 12.64 3.62C17.63 3.62 21.69 7.68 21.69 12.67C21.69 17.66 17.63 21.72 12.64 21.72H12.65Z" fill="black" aria-hidden='true' aria-label='svg' />
                        </svg>
                      </div>
                      <div className="!w-full !h-[90%] !aspect-square flex-shrink-0 overflow-hidden flex items-end">
                        <img
                          className='!h-full !w-full !object-contain mt-auto'
                          src={row.img ? IMAGE_URL_CATEGORY + row.img : female}
                          onError={(e) => {
                            e.currentTarget.src = female;
                          }}
                          alt="hpv"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer colorText='#606060' type='female' />

        </div>
        {width > 976 ? (<ButtonBarFooter handleLink={handleLink} />) : ''}

      </div>


      {/* mobile */}
      <div className='by-svh-custom flex lg:hidden flex-col overflow-y-scroll relative'>
        <ModalSurvey gender={gender} show={showModal} dismiss={(e) => handleDismiss(e)} />
        <div className="by-svh-custom w-full top-0 left-0 -z-[1]">
          <img src={bg_female_mobile} className='block lg:hidden img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        <div className="absolute top-0 left-0 h-full w-full flex lg:hidden flex-col overflow-hidden">
          <div className="w-full h-10 md:h-[56px] bg-transparent rounded-b-md overflow-hidden z-40  ">
            {width > 976 ? '' : (<Header handleCancel={handleCancel} handleLink={handleLink} />)}
          </div>
          <div className="h-[calc(100%-92px)] md:[calc(100%-108px)] px-5 xxl:px-7 overflow-hidden">


            <div className={`${scroll ? 'overflow-y-scroll' : 'overflow-y-hidden'} flex lg:hidden flex-col lg:flex-row h-full`}>
              <div className={`${scroll ? '!min-h-[310px]' : ''} w-full h-[43%] `}>
                <Slider {...settings}
                // initialSlide={defaultActive}
                // beforeChange={(current, next) => slideSlick(next)}
                >
                  {bannerMobile.length === 0 ?
                    <div className="w-full h-full overflow-hidden rounded-2xl">
                      <img
                        className=' img scale-110'
                        src={baner_homepage}
                        onError={(e) => {
                          e.currentTarget.src = baner_homepage;
                        }}
                        alt='baner'
                      />
                    </div>
                    :
                    bannerMobile?.map((item, index) => (
                      <div key={index} className="w-full h-full overflow-hidden rounded-2xl">
                        <img
                          className=' img scale-110'
                          src={item.imgMobile ? IMAGE_URL + item.imgMobile : baner_homepage}
                          onError={(e) => {
                            e.currentTarget.src = baner_homepage;
                          }}
                          alt='baner'
                        />
                      </div>
                    ))
                  }
                </Slider>
              </div>
              <div className={`${scroll ? '!min-h-[410px]' : ''} w-full h-[57%] relative flex flex-col`}>
                {listCategoryByGender?.map((row: any, index) => (
                  <div className="h-1/3 pt-2 w-full" key={index}>
                    <div className={` ${index === 0 ? 'bg-[#FFEFBD]' : (index === 1 ? 'bg-[#FFEB91]' : 'bg-[#F6E466]')} rounded-2xl padding-res sm:p-5 h-full w-full flex justify-between gap-3 overflow-hidden hover:bg-[#FFF298] transition-all cursor-pointer`}
                      onClick={() => clickFemaleDetail(row.url)}
                    >
                      <div className="h-full w-[60%] flex flex-col justify-end gap-3 py-1 px-4">

                        <p className="mb-0 text-black text-[12px] sm:text-base md:text-[20px] md:leading-[28px] font-[500] headline-res leading-4 uppercase" dangerouslySetInnerHTML={convertHTML(row?.titleHtml)}></p>

                      </div>
                      <div className=" w-[40%] flex flex-col justify-end items-end pr-7 gap-2  py-1">
                        <p className="text-end text-[12px] sm:text-sm md:text-[16px] md:leading-[24px] leading-[15px] line-clamp-3 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(row.description)}></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-2 pt-2">
            <Footer colorText='#606060' type='female' />
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
export default Female