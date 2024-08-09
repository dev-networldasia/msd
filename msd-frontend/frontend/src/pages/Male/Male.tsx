
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
import { baner_homepage, bg_male_mobile, bg_male_test, male } from '../../components/ImgExport';
import ModalMalePage from '../../components/ModalSurvey/ModalMalePage';
import ModalSurvey from '../../components/ModalSurvey/ModalSurvey';
import { IMAGE_URL, IMAGE_URL_CATEGORY, META_LOGO, META_URL } from '../../env';
import useLoading from '../../hook/useLoading';
import useWindowDimensions from '../../hook/useWindowDimensions';
import Footer from '../../router/Layout/Footer';
import Header from '../../router/Layout/Header';
import ModalNavigator from '../../router/Layout/ModalNavigator';
import * as Token from '../../services/token';
import { convertHTML } from '../../until';
import './styles.css';
let timeout: any, n = 5;

const Male: React.FC = () => {
  const pushLoading = useLoading();
  const [tokenUser, setTokenUser] = useState('')
  const [banner, setBanner] = useState<BannerApi.Img[]>([])
  const [bannerMobile, setBannerMobile] = useState<BannerApi.ImgMobile[]>([])
  const [listCategoryByGender, setListCategoryByGender] = useState<NewcategoryApi.InfoCategory[]>([])
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(true)
  const gender = 'male-page'
  const [modalMale, setModalMale] = useState(false)
  const [scroll, setScroll] = useState(false)
  const { width, height } = useWindowDimensions();
  const metaHTML = () => {
    var urlMeta = document.querySelector('meta[property="og:url"]')
    var urlTitle = document.querySelector('title[class="title-index"]')
    if (urlTitle) {
      urlTitle.innerHTML = "Dự phòng cho nam";
    }
    if (urlMeta) {
      urlMeta.setAttribute("content", `${META_URL}du-phong-cho-nam`);
    }
    var typeMeta = document.querySelector('meta[property="og:type"]')
    if (typeMeta) {
      typeMeta.setAttribute("content", "website");
    }
    var titleMeta = document.querySelector('meta[property="og:title"]')
    if (titleMeta) {
      titleMeta.setAttribute("content", `Dự phòng HPV cho Nam`);
    }
    var imageMeta = document.querySelector('meta[property="og:image"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `${META_LOGO}`);
    }
    var imageMeta = document.querySelector('meta[property="og:description"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `Dự phòng HPV cho Nam`);
    }
    var descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", `Dự phòng HPV cho Nam`);
    }
  }

  const checkHBS = () => {
    let hpv = Token.getHBS();
    if (hpv && hpv !== '') {
      setShowModal(false)
      setModalMale(false)
    } else {
      setShowModal(true)
      setModalMale(true)
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
      setModalMale(false)
    } else {
      setModalMale(true)
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
    const result = await BannerApi.bannerDetail(3)
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
    const result = await NewcategoryApi.articleCategoryByGender(1)
    if (result.status) {
      setListCategoryByGender(result.data)
    } else {
      setListCategoryByGender([])
    }
    pushLoading(false)
  }

  const getToken = async () => {
    pushLoading(true)
    let token = Token.getUser();
    setTokenUser(token)
    pushLoading(false)
  }

  const typeAccumulated = async () => {
    const result = await AccumulateApi.typeAccumulated(tokenUser, 0, 3, 0, 0, 0, 0, 0, 0)
  }

  const clickFemaleDetail = (url: string) => {
    if (url && url !== '') {
      navigate(`/chi-tiet-du-phong-cho-nam/${url}`)
    }
  }

  useEffect(() => {
    resetData()
    fetchDataDetail()
    bannerDetail()
    getToken()
    const setHeight = () => {
      const element = document.getElementById('css_');
      if (element) {
        element.style.height = `${window.innerHeight}px`;
      }
    };

    setHeight();
    window.addEventListener('resize', setHeight);

    return () => {
      window.removeEventListener('resize', setHeight);
    };
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
      <div className="ft-slick__dots--custom-male">
      </div>
    )
  };

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  return (
    <>
      {/* <Helmet>
        <title>Dự phòng cho nam</title>
      </Helmet> */}
      <div className="by-svh-custom pt-0 hidden lg:flex flex-col lg:gap-3 xxl:gap-6 justify-between z-40 relative">
        <div className="absolute by-svh-custom w-full top-0 left-0 -z-[1]">
          <img src={bg_male_test} className='lg:block hidden img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        {width > 976 ? (<Header handleCancel={handleCancel} handleLink={handleLink} />) : ''}
        <div className={`by-svh-custom xl:h-full px-5 xxl:px-7  ${scroll ? 'overflow-y-scroll' : 'overflow-hidden'} flex flex-col justify-between`}>
          <div className={`hidden lg:flex ${scroll ? 'h-fit' : 'h-[calc(100%-62px)]'} max-h-[1000px] gap-4 xxl:gap-4 z-9`}>
            <div className={`w-2/3 ${scroll ? '!h-[531px]' : 'h-full'} relative`}>
              <Slider {...settings}
              >
                {banner.length === 0 ?
                  <div className="w-full h-full overflow-hidden rounded-2xl relative">
                    <span className='text-white text-2xl xxl:text-2xl uppercase absolute bottom-6 left-6 font-[500] z-10'>Dự Phòng <br />HPV cho nam</span>
                    <img
                      className='img xl:object-top'
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
                      <span className='text-white text-2xl xxl:text-2xl uppercase absolute bottom-6 left-6 font-[500] z-10'>Dự Phòng <br />HPV cho nam</span>
                      <img
                        className='img xl:object-top'
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
              <ModalMalePage show={modalMale} dismiss={() => setModalMale(false)} />
              {listCategoryByGender?.map((row: any) => (
                <div className="h-full w-full" key={row.id}>
                  <div className="bg-white rounded-2xl h-full w-full flex overflow-hidden hover:bg-[#7AD6F9] transition-all cursor-pointer"
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
                    <div className=" w-1/2 flex flex-col justify-end items-end px-4 pt-5 xxl:pt-8 relative">
                      <div className="absolute top-4 xxl:top-8 right-2 xxl:right-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none" aria-label='svg-tag'>
                          <path d="M31.3025 0.43C31.3025 0.43 31.2125 0.36 31.1625 0.32C31.1425 0.3 31.1125 0.29 31.0925 0.27C30.9925 0.21 30.8825 0.16 30.7725 0.11C30.7125 0.09 30.6625 0.07 30.6025 0.06C30.4525 0.02 30.3025 0 30.1425 0H20.5325C19.5125 0 18.6125 0.81 18.6125 1.83C18.6125 2.86 19.5025 3.71 20.5225 3.71L25.7125 3.74L20.7025 8.76C15.6125 4.94 8.4025 5.34 3.7925 9.95C-1.2575 15 -1.2675 23.18 3.7825 28.23C8.8325 33.28 17.0225 33.27 22.0725 28.23C26.6825 23.62 27.0325 16.35 23.2825 11.33L28.3025 6.31V11.46C28.3025 12.48 29.1325 13.31 30.1525 13.31C31.1725 13.31 32.0025 12.48 32.0025 11.46V1.86C32.0025 1.29 31.7425 0.77 31.3325 0.43H31.3025ZM19.4325 25.62C15.8325 29.22 9.9625 29.22 6.3625 25.62C2.7625 22.02 2.7625 16.15 6.3625 12.55C9.9625 8.95 15.8325 8.95 19.4325 12.55C23.0325 16.15 23.0325 22.02 19.4325 25.62Z" fill="black" aria-hidden='true' aria-label='svg' />
                        </svg>
                      </div>
                      <div className="!w-full !h-[90%] aspect-square flex-shrink-0 overflow-hidden flex items-end">
                        <img
                          className='!h-full !w-full !object-contain'
                          src={row.img ? IMAGE_URL_CATEGORY + row.img : male}
                          onError={(e) => {
                            e.currentTarget.src = male;
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
          <Footer colorText='#606060' type='male' />
        </div>
        {width > 976 ? (<ButtonBarFooter handleLink={handleLink} />) : ''}
      </div>
      {/* Mobile */}
      <div className='by-svh-custom flex lg:hidden flex-col relative'>
        <ModalSurvey gender={gender} show={showModal} dismiss={(e) => handleDismiss(e)} />
        <div className="fixed by-svh-custom w-full top-0 left-0 -z-[1]">
          <img src={bg_male_mobile} className='block lg:hidden img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        <div className="absolute top-0 left-0 h-full w-full flex lg:hidden flex-col overflow-hidden">
          <div className="w-full h-10 md:h-[56px] bg-transparent  rounded-b-md overflow-hidden z-40  ">
            {width > 976 ? '' : (<Header handleCancel={handleCancel} handleLink={handleLink} />)}
          </div>
          <div className="h-[calc(100%-92px)] md:h-[calc(100%-108px)] px-5 xxl:px-7 overflow-hidden">
            <div className={`${scroll ? 'overflow-y-scroll' : 'overflow-y-hidden'} flex flex-col lg:flex-row h-full `}>
              <div className={`${scroll ? '!min-h-[310px]' : ''} w-full h-[43%] relative `}>
                <Slider {...settings}
                >
                  {bannerMobile.length === 0 ?
                    <div className="w-full h-full overflow-hidden rounded-2xl !flex !flex-row">
                      <img
                        className='img '
                        src={baner_homepage}
                        onError={(e) => {
                          e.currentTarget.src = baner_homepage;
                        }}
                        alt="hpv"
                      />
                    </div>
                    :
                    bannerMobile?.map((item, index) => (
                      <div key={index} className="w-full h-full overflow-hidden rounded-2xl !flex !flex-row">
                        <img
                          className='img '
                          src={item.imgMobile ? IMAGE_URL + item.imgMobile : baner_homepage}
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
              <div className={`${scroll ? '!min-h-[410px]' : ''} w-full h-[57%] relative flex flex-col`}>
                {listCategoryByGender?.map((row: any, index) => (
                  <div className="h-1/3 pt-2 w-full " key={index}>
                    <div className={` ${index === 0 ? 'bg-[#00A6E8]' : (index === 1 ? 'bg-[#0289E8]' : 'bg-[#045AF3]')} lg:bg-white rounded-2xl padding-res sm:p-5 h-full w-full flex justify-between gap-3 overflow-hidden transition-all cursor-pointer`}
                      onClick={() => clickFemaleDetail(row.url)}
                    >
                      <div className="h-full w-[60%] flex flex-col justify-end gap-3 py-1 px-4">
                        <div>
                          <p className="mb-0 text-white text-[12px] sm:text-base md:text-[20px] md:leading-[28px] font-[500] headline-res leading-4 uppercase" dangerouslySetInnerHTML={convertHTML(row?.titleHtml)}></p>
                        </div>
                      </div>
                      <div className="text-white w-[40%] flex flex-col justify-end items-end pr-7 gap-2  py-2">
                        <p className="text-end text-[12px] sm:text-sm md:text-[16px] md:leading-[24px] leading-[15px] line-clamp-3 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(row.description)}></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-2 pt-2">
            <Footer colorText='#ffffff' type='male' />
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
export default Male