
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import * as BannerApi from '../../api/banner/bannerApi';
import * as HomepageApi from '../../api/homepage/homepageApi';
import FooterSideBar from '../../components/FooterSideBar';
import { background_desktop, baner_homepage, bg_mobile_home, homepage_female, homepage_male } from '../../components/ImgExport';
import ModalFemalePage from '../../components/ModalSurvey/ModalFemalePage';
import ModalMalePage from '../../components/ModalSurvey/ModalMalePage';
import ModalSurvey from '../../components/ModalSurvey/ModalSurvey';
import { IMAGE_URL, META_LOGO } from '../../env';
import useLoading from '../../hook/useLoading';
import useToast from '../../hook/useToast';
import Footer from '../../router/Layout/Footer';
import Header from '../../router/Layout/Header';
import ModalNavigator from '../../router/Layout/ModalNavigator';
import * as Token from '../../services/token';
import { convertHTML } from '../../until';
import ModalStarted from './Modal/ModalStarted';
import './styles.css';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ButtonBarFooter from '../../components/ButtonBarFooter';
import useWindowDimensions from '../../hook/useWindowDimensions';
const homepage = [
  { 'type': 1, 'title': "Dự phòng HPV cho nữ" },
  { 'type': 2, 'title': "Dự phòng HPV cho nam" },
  { 'type': 3, 'title': "Đặt lịch tư vấn" },
  { 'type': 4, 'title': "Sống lành chủ động" }
];
let timeout: any, n = 5;
const HomePage: React.FC = () => {
  const navigator = useNavigate()
  const pushToast = useToast();
  const pushLoading = useLoading();
  const [showModalFemale, setShowModalFemale] = useState(false)
  const [showModalMale, setShowModalMale] = useState(false)
  const [backdrop, setBackdrop] = useState(false)
  const [modal, setModal] = useState(false)
  const [leavingShow, setLeavingShow] = useState(false)
  const [gender, setGender] = useState('')
  const [banner, setBanner] = useState<BannerApi.Img[]>([])
  const [bannerMobile, setBannerMobile] = useState<BannerApi.ImgMobile[]>([])
  const [homepageDescription, setHomepageDescription] = useState<HomepageApi.InfoHomepageDescription[]>([])
  const [showNotification, setShowNotification] = useState(false);
  const [countdown, setCountdown] = useState(0); // Bắt đầu với giá trị 10, hoặc giá trị tùy chọn khác
  const [tokenUser, setTokenUser] = useState<any>(''); // Bắt đầu với giá trị 10, hoặc giá trị tùy chọn khác
  // Modal Female khi click - làm lại
  const [modalFemale, setModalFemale] = useState(false)
  const [modalMale, setModalMale] = useState(false)
  const [modalStarted, setModalStarted] = useState(true)
  const metaHTML = () => {
    var urlMeta = document.querySelector('meta[property="og:url"]')
    var urlTitle = document.querySelector('title[class="title-index"]')
    if (urlTitle) {
      urlTitle.innerHTML = "Cộng Đồng Phòng Vệ HPV & các gánh nặng bệnh tật, nguy cơ ung thư liên quan";
    }
    if (urlMeta) {
      urlMeta.setAttribute("content", `https://hpv.vn`);
    }
    var typeMeta = document.querySelector('meta[property="og:type"]')
    if (typeMeta) {
      typeMeta.setAttribute("content", "website");
    }
    var titleMeta = document.querySelector('meta[property="og:title"]')
    if (titleMeta) {
      titleMeta.setAttribute("content", `Cộng Đồng Phòng Vệ HPV & các gánh nặng bệnh tật, nguy cơ ung thư liên quan`);
    }
    var imageMeta = document.querySelector('meta[property="og:image"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `${META_LOGO}`);
    }
    var imageMeta = document.querySelector('meta[property="og:description"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `Cộng Đồng Phòng Vệ HPV & các gánh nặng bệnh tật, nguy cơ ung thư liên quan`);
    }
    var descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", `Cộng Đồng Phòng Vệ HPV & các gánh nặng bệnh tật, nguy cơ ung thư liên quan`);
    }
  }
  useEffect(() => {
    let hpv = Token.getHBS();
    setTokenUser(hpv)
    if (hpv && hpv !== '') {
      setModalFemale(false)
      setModalMale(false)
      setModalStarted(false)
    } else {
      setModalFemale(false)
      setModalMale(false)
      setModalStarted(true)
    }
    metaHTML()
  }, [])
  const bannerDetail = async () => {
    pushLoading(true);
    const result = await BannerApi.bannerDetail(1)
    if (result.status) {
      setBanner(result.data.img)
      setBannerMobile(result.data.imgMobile)
    } else {
      setBanner([])
      setBannerMobile([])
    }
    pushLoading(false);
  }
  const homepageDetail = async () => {
    setHomepageDescription([])
    homepage.forEach(async (element) => {
      pushLoading(true);
      const result = await HomepageApi.homepageDescriptionDetail(element.type)
      if (result.status) {
        setHomepageDescription((data: any) => [...data, ...[result.data]])
      } else {
        pushToast(result?.message || "Đang xảy ra lỗi. Vui lòng thử lại sau", "warning");
      }
      pushLoading(false);
    });
  }
  useEffect(() => {
    bannerDetail();
    homepageDetail()
  }, [])
  useEffect(() => {
    if (showModalFemale) {
      setBackdrop(true)
    } else if (showModalMale) {
      setBackdrop(true)
    } else if (leavingShow) {
      setBackdrop(true)
    } else if (modalFemale) {
      setBackdrop(true)
    } else {
      setBackdrop(false)
    }
  }, [showModalFemale, showModalMale, leavingShow])
  const handleCloseBackdrop = () => {
    setShowModalFemale(false)
    setBackdrop(false)
    setShowModalMale(false)
    setLeavingShow(false)

  }
  const handleDismiss = (e: string) => {
    setModal(false)
    setLeavingShow(true)

  }
  const handleShowModal = (event: string) => {
    setGender(event)
    setModal(true)
  }
  const clickModal = (url: string) => {
    let hpvQuestion = Token.getHBS();
    if (hpvQuestion !== '') {
      navigator(`/${url}`)
    } else {
      handleShowModal(`${url}`)
    }
  }
  const clickModalWeb = (url: string) => {
    let hpvQuestion = Token.getHBS();
    if (hpvQuestion !== '') {
      navigator(`/${url}`)
    } else {
      if (url === 'du-phong-cho-nu') {
        setModalFemale(true)
      } else {
        setModalMale(true)
      }
    }
  }
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
    setCountdown(5)
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
  const slideSlick = (index: number) => {
    // listArticleByCategory(String(listCategoryByGender[index].url))
  }
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
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  return (
    <>
      <div
        className={`by-svh-custom !max-h-[100vh]  w-full hidden lg:flex flex-col justify-between lg:justify-start lg:gap-3 xxl:gap-6 z-40 relative overflow-hidden`}
      >
        <div className="by-svh-custom absolute !max-h-[100vh]  w-full top-0 left-0 -z-[1]">
          <img src={background_desktop} className='img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        {width > 976 ? (<Header handleCancel={handleCancel} handleLink={handleLink} />) : ('')}
        <div className={`h-full px-5 xxl:px-7 ${scroll ? 'overflow-y-scroll' : 'overflow-hidden'}  flex flex-col justify-between`}>
          <div className={`hidden lg:flex flex-col lg:flex-row ${scroll ? 'h-fit' : 'h-[calc(100%-62px)]'}  max-h-[1000px]  homepage z-9 gap-2 sm:gap-4 lg:gap-4 xxl:gap-4 custom-gap-tablet-horizontal`}>
            <div className={` w-2/3 relative ${scroll ? '!h-[531px]' : 'h-full'} `}>
              <Slider {...settings}
              >
                {banner.length === 0 ?
                  <div className="w-full h-full overflow-hidden rounded-2xl">
                    <img
                      className='hidden lg:block img'
                      src={baner_homepage}
                      onError={(e) => {
                        e.currentTarget.src = baner_homepage;
                      }}
                      alt="hpv"
                    />
                  </div>
                  :
                  banner?.map((item, index) => (
                    <div key={index} className="w-full h-full overflow-hidden rounded-2xl">
                      <img
                        className='hidden lg:block img'
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
            <div className={`w-1/3 ${scroll ? '!h-[531px]' : 'h-full'} relative lg:pl-1 xxl:pl-3 custom-padding-left-tablet-horizontal`}>
              {/* tablet - desktop dự phòng nữ */}
              {homepageDescription?.map((item, index) => {
                if (item.id === 1) {
                  return <div key={index} className="hidden lg:block h-1/3 w-full pb-2 pointer-events-none lg:pointer-events-auto custom-padding-bottom-tablet-horizontal">
                    <div className="bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition  rounded-2xl h-full w-full flex overflow-hidden lg:gap-3 xl:gap-0 custom-padding-tablet-horizontal"
                      onClick={() => {
                        clickModalWeb('du-phong-cho-nu')
                      }}
                    >
                      <div className="w-[50%] h-full pl-8 pt-8 flex flex-col justify-between pr-3 relative">
                        <div className="flex justify-center w-full h-full">
                          <FemaleIcon className="absolute top-4 left-4 text-[#005750]  !text-[40px] xxl:!text-[50px]" />
                          {/* <img src={female} alt="hpv" className="w-[140px] xxl:w-[204px] h-[110px] xxl:h-[183px] object-contain -mt-3" /> */}
                          <div className="flex h-full  justify-center">
                            <img
                              className='w-full h-full !object-contain'
                              src={item?.img ? IMAGE_URL + item?.img : homepage_female}
                              onError={(e) => {
                                e.currentTarget.src = homepage_female;
                              }}
                              alt="hpv"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-[50%] h-full  flex flex-col justify-between xl:gap-0 pt-4 xxl:pt-10 pb-5 pr-5">
                        <span className="text-[#005750] lg:text-base pt-1 xl:text-[21px] font-[500]  uppercase fs-title-mac15">
                          Dự phòng HPV <br /> Cho nữ
                        </span>
                        <span className="flex items-end text-[#005750] text-xs xxl:text-sm leading-[17px] lg:line-clamp-2 xl:line-clamp-3 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item.description)}></span>
                      </div>
                    </div>
                  </div>
                } else {
                  <div className="hidden lg:block h-1/3 w-full pb-2 pointer-events-none lg:pointer-events-auto custom-padding-bottom-tablet-horizontal">
                    <div className="bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition  rounded-2xl h-full w-full flex overflow-hidden lg:gap-3 xl:gap-0 custom-padding-tablet-horizontal"
                      onClick={() => clickModalWeb('du-phong-cho-nu')}
                    >
                      <div className="w-[50%] h-full pl-8 pt-8 flex flex-col justify-between pr-3 relative">
                        <div className="flex justify-center w-full h-full">
                          <FemaleIcon className="absolute top-4 left-4 text-[#005750]  !text-[40px] xxl:!text-[50px]" />
                          {/* <img src={female} alt="hpv" className="w-[140px] xxl:w-[204px] h-[110px] xxl:h-[183px] object-contain -mt-3" /> */}
                          <div className="flex h-full  justify-center">
                            <img
                              className='w-full h-full !object-contain'
                              src={homepage_female}
                              onError={(e) => {
                                e.currentTarget.src = homepage_female;
                              }}
                              alt="hpv"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-[50%] h-full  flex flex-col justify-between xl:gap-0 xxl:pt-10 pb-5 pr-5">
                        <span className="text-[#005750] lg:text-base pt-1 xl:text-[21px] font-[500] uppercase fs-title-mac15">
                          Dự phòng HPV <br /> Cho nữ
                        </span>
                        <span className=" flex items-end text-[#005750] text-xs xxl:text-sm leading-[17px] lg:line-clamp-2 xl:line-clamp-3 text-ellipsis font-Alexandria" >
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt obcaecati voluptates officia repu
                        </span>
                      </div>
                    </div>
                  </div>
                }
              })}
              {/* MOdal for start, male, Female */}
              <ModalFemalePage show={modalFemale} dismiss={() => setModalFemale(false)} />
              <ModalMalePage show={modalMale} dismiss={() => setModalMale(false)} />
              <ModalStarted show={modalStarted} dismiss={() => setModalStarted(false)} />
              {/* tablet ngang Nam - dia diem - song lanh */}
              <div className="lg:h-2/3  relative w-full hidden lg:flex pt-2 gap-4 xxl:pt-6 custom-gap-tablet-horizontal custom-padding-top-tablet-horizontal">
                <div className="w-1/2 h-full ">
                  {homepageDescription?.map((item, index) => {
                    if (item.id === 2) {
                      return <div key={index} className="h-full w-full bg-[#005750] lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition rounded-2xl px-8 py-4 xxl:p-7 xxl:pt-8 hidden lg:flex flex-col justify-between lg:gap-3 xl:gap-0 custom-padding-tablet-horizontal"
                        onClick={() => {
                          clickModalWeb('du-phong-cho-nam')
                        }}>
                        <div className=" flex flex-col  justify-between w-full h-full xxl:h-1/2 relative">
                          <div className="flex w-full h-full">
                            <MaleIcon className="absolute -left-2 text-white lg:text-[#005750] !text-[40px] xxl:!text-[50px] " />
                            <div className="w-full h-full overflow-hidden flex justify-center">
                              <img
                                className='w-full h-full !object-contain'
                                src={item?.img ? IMAGE_URL + item?.img : homepage_male}
                                onError={(e) => {
                                  e.currentTarget.src = homepage_male;
                                }}
                                alt="hpv"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-full xxl:h-1/2  flex flex-col justify-between  lg:mt-0 xxl:pt-7 xl:mb-0">
                          <span className="text-[#005750] lg:text-base pt-1 xl:text-[21px] font-[500] text-ellipsis  uppercase fs-title-mac15">
                            Dự phòng HPV <br /> Cho nam
                          </span>
                          <span className="lg-h-[40px] xl-h-[50px] !flex items-end xxl:h-[60px] text-[#005750] text-xs xxl:text-sm leading-[17px] lg:line-clamp-2 xl:line-clamp-4 text-ellipsis font-Alexandria xl:pb-4 xxl:pb-0 custom-height-description-tablet-horizontal" dangerouslySetInnerHTML={convertHTML(item.description)}></span>
                        </div>
                      </div>
                    } else {
                      <div key={index} className="h-full w-full bg-[#005750]  lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition  rounded-2xl px-8 py-4 xxl:p-7 xxl:pt-8 hidden lg:flex lg:flex-row xl:flex-col justify-between lg:gap-3 xl:gap-0 custom-padding-tablet-horizontal"
                        onClick={() => {
                          clickModalWeb('du-phong-cho-nam')
                        }}>
                        <div className=" flex flex-col  justify-between lg:w-[55%] xl:w-full h-full xxl:h-1/2 relative">
                          <div className="flex w-full h-full">
                            <MaleIcon className="absolute -left-2 text-white lg:text-[#005750] !text-[40px] xxl:!text-[50px] " />
                            <div className="w-full h-full overflow-hidden flex justify-center">
                              <img
                                className='w-full h-full !object-contain'
                                src={homepage_male}
                                onError={(e) => {
                                  e.currentTarget.src = homepage_male;
                                }}
                                alt="hpv"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="w-[45%] xl:w-full h-full xxl:h-1/2  flex flex-col justify-between  lg:mt-0 xxl:pt-7 xl:mb-0">
                          <span className="text-[#005750] lg:text-base pt-1 xl:text-[21px] font-[500]  text-ellipsis line-clamp-3 fs-title-mac15">
                            Dự phòng HPV <br /> Cho nam
                          </span>
                          <span className="!flex items-end  text-[#005750] text-xs xxl:text-sm leading-[17px] mt-2 lg:line-clamp-2 xl:line-clamp-4 text-ellipsis font-Alexandria pb-4" >
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum nobis labore ipsam quod qui similique ipsa id perferendis ipsum! Minus dolore quas, perspiciatis aliquam error numquam. Reprehenderit reiciendis corporis necessitatibus.
                          </span>
                        </div>
                      </div>

                    }
                  })}
                </div>
                <div className="w-1/2 h-full pt-0 xxl:pl-3 flex gap-0 flex-col">
                  {homepageDescription?.map((item, index) => {
                    if (item.id === 3) {
                      return <div key={index} className="w-full h-1/2 pb-2 custom-padding-bottom-tablet-horizontal">
                        <div className="bg-[#40B0A4] lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition ease-in-out  rounded-2xl h-full w-full flex flex-col justify-between p-4 xl:p-7 custom-padding-tablet-horizontal"
                          onClick={() => navigator('/dia-diem-tu-van')}
                        >
                          <span className="text-white lg:text-[#005750] font-[500] lg:text-base pt-1 xl:text-[21px] leading-6 fs-title-mac15">ĐỊA ĐIỂM <br /> TƯ VẤN</span>
                          <span className="flex items-end text-[#005750] text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-3 xxl:line-clamp-3 text-ellipsis font-Alexandria custom-height-description-tablet-horizontal" dangerouslySetInnerHTML={convertHTML(item.description)}></span>
                        </div>
                      </div>
                    } else {
                      <div className="w-full h-1/2 pb-2 custom-padding-bottom-tablet-horizontal">
                        <div className="bg-[#40B0A4] lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition ease-in-out  rounded-2xl h-full w-full flex flex-col justify-between p-4 xl:p-7 custom-padding-tablet-horizontal"
                          onClick={() => navigator('/dia-diem-tu-van')}
                        >
                          <span className="mb-0 text-white lg:text-[#005750] font-[500] lg:text-base pt-1 xl:text-[21px] leading-6 text-ellipsis fs-title-mac15">ĐỊA ĐIỂM <br /> TƯ VẤN</span>
                          <span className="flex items-end text-[#005750] text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-3 xxl:line-clamp-3 text-ellipsis font-Alexandria custom-height-description-tablet-horizontal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quaerat doloribus at distinctio sed! Eveniet ratione corporis vitae consequatur corrupti quos, saepe, voluptates recusandae rem provident minus labore maxime veniam.</span>
                        </div>
                      </div>
                    }
                  })}

                  {homepageDescription?.map((item, index) => {
                    if (item.id === 4) {
                      return <div key={index} className="w-full h-1/2 pt-2 custom-padding-top-tablet-horizontal">
                        <div className="bg-[#40CDAC] lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition ease-in-out  rounded-2xl h-full w-full flex flex-col justify-between p-4 xl:p-7 custom-padding-tablet-horizontal"
                          onClick={() => navigator('/song-lanh-chu-dong')}>
                          <span className="mb-0 text-white lg:text-[#005750] font-[500] lg:text-base pt-1 xl:text-[21px] leading-6 line-clamp-2 fs-title-mac15 py-1">SỐNG LÀNH <br /> CHỦ ĐỘNG</span>
                          <span className="flex items-end text-[#005750] text-xs xxl:text-sm leading-[17px] xxl:mt-5 line-clamp-3 xxl:line-clamp-3 text-ellipsis font-Alexandria custom-height-description-tablet-horizontal" dangerouslySetInnerHTML={convertHTML(item.description)}></span>
                        </div>
                      </div>
                    } else {
                      <div key={index} className="w-full h-1/2 pt-2 custom-padding-top-tablet-horizontal">
                        <div className="bg-[#40CDAC] lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition ease-in-out  rounded-2xl h-full w-full flex flex-col justify-between p-4 xl:p-7 custom-padding-tablet-horizontal"
                          onClick={() => navigator('/song-lanh-chu-dong')} >
                          <span className="mb-0 text-white lg:text-[#005750] font-[500] lg:text-base pt-1 xl:text-[21px] leading-6 fs-title-mac15">SỐNG LÀNH <br /> CHỦ ĐỘNG</span>
                          <span className="flex items-end text-[#005750] text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-3 xxl:line-clamp-3 text-ellipsis font-Alexandria custom-height-description-tablet-horizontal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quaerat doloribus at distinctio sed! Eveniet ratione corporis vitae consequatur corrupti quos, saepe, voluptates recusandae rem provident minus labore maxime veniam.</span>
                        </div>
                      </div>
                    }
                  })}
                </div>
                {/* modal mobile */}
                {leavingShow ? (
                  <div className="bg-white transition ease-in-out delay-[150] rounded-2xl h-[405px] -top-24 w-full absolute rounded-tl-none lg:hidden flex flex-col justify-between z-40">
                    <div className="absolute -top-6 left-0 w-[45%] h-full xxl:w-2/3 rounded-2xl bg-white transition ease-in-out delay-150  z-40"></div>
                    <div className='px-4 xxl:px-8 pb-4 xxl:pb-7 z-50 h-full flex flex-col'>
                      <div className='pl-4 xxl:pl- 6text-[21px] w-full leading-[26px] pt-1 xxl:pt-3 pb-2 xxl:pb-4 text-black font-[500]'>Thông báo <br /> <span className='opacity-0'>.</span></div>
                      <div className="flex flex-col h-full transition ease-in-out delay-150 gap-2">
                        <div className={`w-full h-full ${gender === 'female' ? 'bg-[#005750]' : 'bg-[#045AFA]'} rounded-2xl flex flex-col gap-5 px-3 xxl:px-6 py-8 xxl:py-11 overflow-hidden`} >
                          <span className='text-white text-[15px] xxl:text-base leading-[21px] xxl:leading-[26px] font-Alexandria '>
                            Cám ơn! <br /> Bạn đã lựa chọn thành công!
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : ''}

              </div>
            </div>

          </div >
          <Footer colorText='#606060' type='homepage' />

        </div>
        {width > 976 ? (<ButtonBarFooter handleLink={handleLink} />) : ''}
      </div>

      <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
      <div className={backdrop ? 'absolute top-0 left-0 w-[100vw] h-[100vh] bg-black z-30 opacity-70' : 'hidden'} onClick={handleCloseBackdrop}></div>
      {modal ? <ModalSurvey gender={gender} show={modal} dismiss={(e) => handleDismiss(e)} />
        :
        (
          <div
            className='by-svh-custom overflow-hidden flex lg:hidden flex-col relative'
          >
            <div className=" by-svh-custom w-full top-0 left-0 -z-[1]">
              <img src={bg_mobile_home} className='block lg:hidden w-full h-full' alt="hpv" />
            </div>
            <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />

            <div className="absolute top-0 left-0 h-full w-full flex lg:hidden flex-col overflow-hidden">
              <div className=" w-full h-10 md:h-[56px] bg-transparent rounded-b-md overflow-hidden z-40 ">
                {width > 976 ? '' : (<Header handleCancel={handleCancel} handleLink={handleLink} />)}

              </div>
              <div className=" h-[calc(100%-92px)] md:h-[calc(100%-108px)] px-5 xxl:px-7 overflow-hidden">
                <ModalStarted show={modalStarted} dismiss={() => setModalStarted(false)} />
                <div className={`${scroll ? 'overflow-y-scroll' : 'overflow-y-hidden'} flex flex-col lg:flex-row h-full xxl:pt-7 z-10 lg:gap-4 xxl:gap-4`}>
                  <div className={`${scroll ? '!min-h-[310px]' : ''} banner-home w-full h-[43%] relative lg:h-full `}>
                    <Slider {...settings}
                    >
                      {bannerMobile.length === 0 ?
                        <div className="w-full h-full overflow-hidden rounded-2xl !flex !flex-row">
                          <img
                            className='block img'
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
                              className='block img'
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
                  <div className={`${scroll ? '!min-h-[410px]' : ''} w-full h-[57%] relative pt-2`}>
                    <ModalFemalePage show={modalFemale} dismiss={() => setModalFemale(false)} />
                    <ModalMalePage show={modalMale} dismiss={() => setModalMale(false)} />
                    {homepageDescription?.map((item, index) => {
                      if (item.id === 1) {
                        return <div key={index} className="block lg:hidden !h-[35%] w-full ">
                          <div className="bg-[#005750] sm:px-4 sm:pt-4 cursor-pointer hover-custom-color-text transition  rounded-2xl h-full w-full flex overflow-hidden "
                            onClick={() => clickModal('du-phong-cho-nu')}
                          >
                            <div className="w-1/2 pl-3 pt-3 flex flex-col relative">

                              <div className="flex justify-between h-full">
                                <FemaleIcon className="text-white left-2 top-4 !text-[30px] md:!text-[50px] absolute" />
                                <div className="flex items-end h-full  w-full">
                                  <img
                                    className='-mt-6 !h-[100%] w-full  object-contain img-custom'
                                    src={item?.imgMobile ? IMAGE_URL + item?.imgMobile : homepage_female}
                                    onError={(e) => {
                                      e.currentTarget.src = homepage_female;
                                    }}
                                    alt="hpv"
                                  />
                                </div>

                              </div>
                            </div>
                            <div className="w-1/2 h-full flex flex-col justify-between px-3 pt-2 sm:pt-2 md:pt-2 pb-2 sm:pb-5">
                              <span className=" text-white text-[12px] sm:text-base md:text-[20px] md:leading-[28px] font-[500] leading-4 line-clamp-2 text-ellipsis  uppercase title-homepage">
                                Dự phòng HPV <br /> Cho nữ
                              </span>
                              <span className=" flex flex-col justify-end text-white des-size-homepage text-[10px] sm:text-sm md:text-base font-[300] leading-[13px]  line-clamp-4 text-ellipsis font-Alexandria description margin-bottom-male" dangerouslySetInnerHTML={convertHTML(item.description)}></span>
                            </div>
                          </div>
                        </div>
                      } else {
                        <div className="block lg:hidden !h-[35%] w-full mb-1 sm:mb-3 ">

                          <div className="bg-[#005750] sm:px-4 sm:pt-4 cursor-pointer hover-custom-color-text transition  rounded-2xl h-full w-full flex overflow-hidden "
                            onClick={() => clickModal('du-phong-cho-nu')}
                          >
                            <div className="w-1/2 pl-3 pt-3 flex flex-col relative">

                              <div className="flex justify-between h-full">
                                <FemaleIcon className="text-whiteleft-2 top-4 !text-[30px] md:!text-[50px] absolute" />
                                <div className="flex items-end h-full">
                                  <img src={homepage_female} alt="hpv" className="-mt-6 !h-[100%] w-full  object-contain img-custom" />
                                </div>
                              </div>
                            </div>
                            <div className="w-1/2 h-full flex flex-col justify-between px-3 pt-2 sm:pt-2 md:pt-2 pb-2 sm:pb-5">
                              <span className="min-h-[40px] text-white text-[12px] sm:text-base md:text-[20px] md:leading-[28px] font-[500] leading-4 line-clamp-2 text-ellipsis  uppercase title-homepage">
                                DỰ PHÒNG <br /> HPV CHO NỮ
                              </span>
                              <span className="min-h-[68px] flex flex-col justify-end text-white text-[10px] des-size-homepage sm:text-sm md:text-base font-[300] leading-[13px]  line-clamp-4 text-ellipsis font-Alexandria description margin-bottom-male" >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rerum perferendis inventore corporis ipsam minima ab vero modi numquam maxime quis dolorum repellendus dignissimos, laborum natus aspernatur voluptatum nam ipsum.
                              </span>
                            </div>
                          </div>
                        </div>
                      }
                    })}
                    <div className="relative w-full !h-[65%] custom-height-mobile flex lg:hidden pt-2 gap-2  xxl:pt-6">
                      <div className="w-1/2 h-full ">
                        {homepageDescription?.map((item, index) => {
                          if (item.id === 2) {
                            return <div key={index} className=" lg:hidden flex flex-col justify-between !h-full w-full bg-[#005750] lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition  rounded-2xl  overflow-hidden  " data-id={index}
                              onClick={() => clickModal('du-phong-cho-nam')
                              }
                            >
                              <div className="w-full h-1/2 flex flex-col justify-between">
                                <div className="flex h-full w-full items-center relative">
                                  <MaleIcon className="text-white left-4 top-4 !text-[30px] md:!text-[50px] absolute" />
                                  <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-auto sm:pt-0 h-full !aspect-square flex items-center overflow-hidden">

                                      <img
                                        src={item?.img ? IMAGE_URL + item?.imgMobile : homepage_male}
                                        alt="hpv"
                                        className="!h-full !w-full !object-contain"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className=" w-full h-1/2 flex flex-col justify-between gap-1 px-4 py-2 sm:pb-5 md:pt-6">
                                <span className="text-white text-[12px] sm:text-base md:text-[20px] md:leading-[28px] font-[500] leading-4 line-clamp-2 text-ellipsis  uppercase healine padding-top-male title-homepage">{item.headline}</span>
                                <span className="text-white text-[10px] des-size-homepage sm:text-sm md:text-base font-[300] xxl:text-sm leading-[13px] line-clamp-3 text-ellipsis font-Alexandria description margin-bottom-male" dangerouslySetInnerHTML={convertHTML(item.description)}></span>
                              </div>
                            </div>
                          } else {
                            <div className=" lg:hidden flex flex-col justify-between !h-full w-full bg-[#005750] lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition  rounded-2xl  overflow-hidden  "
                              onClick={() => clickModal('du-phong-cho-nam')
                              }
                            >
                              <div className="w-full h-1/2 flex flex-col justify-between">
                                <div className="flex h-full w-full items-center relative">
                                  <MaleIcon className="text-white left-4 top-5 !text-[30px] md:!text-[50px] absolute" />
                                  <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-auto sm:pt-0 h-full aspect-square flex items-center overflow-hidden">
                                      <img
                                        src={homepage_male}
                                        alt="hpv"
                                        className="h-full w-auto !object-contain"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className=" w-full h-1/2 flex flex-col justify-end gap-1 px-4 py-2 sm:pb-5">
                                <span className="text-white text-[12px] sm:text-base md:text-[20px] md:leading-[28px] font-[500] leading-4 line-clamp-2 text-ellipsis healine uppercase title-homepage">Dự phòng HPV cho nam</span>
                                <hr className="text-[#005750] !h-[1px] my-4 bg-white w-3/5 " />
                                <span className=" text-white text-[10px] des-size-homepage sm:text-sm md:text-base font-[300] xxl:text-sm leading-[13px] line-clamp-3 text-ellipsis font-Alexandria description margin-bottom-male">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ratione eius molestiae. Hic ab provident veniam tenetur dolore, blanditiis porro! Enim, necessitatibus. Expedita officia ea libero unde quasi a culpa?</span>
                              </div>
                            </div>
                          }
                        })}
                      </div>
                      <div className="w-1/2 min-h-full xxl:pl-3">
                        {homepageDescription?.map((item, index) => {
                          if (item.id === 3) {
                            return <div key={index} className="w-full h-1/2 pb-1 xxl:pb-3">
                              <div className="bg-[#40B0A4] lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition ease-in-out  rounded-2xl h-full w-full flex flex-col justify-between px-3 pt-2 md:pt-4 pb-2 sm:pb-5"
                                onClick={() => navigator('/dia-diem-tu-van')}
                              >
                                <span className="mb-0 text-white lg:text-[#005750] text-[12px] sm:text-base md:text-[20px] md:leading-[28px] font-[500] leading-4 line-clamp-2 text-ellipsis uppercase healine title-homepage sm:pt-2 md:pt-2">địa điểm tư vấn</span>
                                <span className=" text-white text-[10px] des-size-homepage flex items-end sm:text-sm md:text-base font-[300] leading-[13px] line-clamp-2 text-ellipsis font-Alexandria description margin-bottom-male" dangerouslySetInnerHTML={convertHTML(item.description)}></span>
                              </div>
                            </div>
                          } else {
                            <div className="w-full h-1/2 pb-1 xxl:pb-3">
                              <div className="bg-[#40B0A4] lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition ease-in-out  rounded-2xl h-full w-full flex flex-col justify-between px-3 pt-2 md:pt-4 pb-2 sm:pb-5"
                                onClick={() => navigator('/dia-diem-tu-van')}
                              >
                                <span className="mb-0 text-white lg:text-[#005750] text-[12px] sm:text-base md:text-[20px] md:leading-[28px] font-[500] leading-4 line-clamp-2 text-ellipsis  uppercase healine title-homepage">ĐỊA ĐIỂM  TƯ VẤN</span>
                                <span className=" min-h-[51px] flex items-end text-[#005750] text-[10px] des-size-homepage sm:text-sm md:text-base font-[300] leading-[13px] line-clamp-2 mt-2 xxl:mt-5 xxl:line-clamp-3 text-ellipsis font-Alexandria description margin-bottom-male">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quaerat doloribus at distinctio sed! Eveniet ratione corporis vitae consequatur corrupti quos, saepe, voluptates recusandae rem provident minus labore maxime veniam.</span>
                              </div>
                            </div>
                          }

                        })}
                        {homepageDescription?.map((item, index) => {
                          if (item.id === 4) {
                            return <div key={index} className="w-full h-1/2 pt-1 xxl:pt-3">
                              <div className="bg-[#40CDAC] lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition ease-in-out  rounded-2xl h-full w-full flex flex-col justify-between px-3 pt-2 md:pt-4 pb-2 sm:pb-5"
                                onClick={() => navigator('/song-lanh-chu-dong')}>
                                <div>
                                  <span className="text-white text-[12px] sm:text-base md:text-[20px] md:leading-[28px] font-[500] leading-4 line-clamp-2 text-ellipsis  uppercase title-homepage sm:pt-2 md:pt-2">SỐNG LÀNH CHỦ ĐỘNG</span>
                                </div>
                                <span className="text-white text-[10px] des-size-homepage sm:text-sm md:text-base font-[300] leading-[13px]  line-clamp-2 text-ellipsis font-Alexandria description margin-bottom-male" dangerouslySetInnerHTML={convertHTML(item.description)}></span>
                              </div>
                            </div>
                          } else {
                            <div className="w-full h-1/2 pt-1 xxl:pt-3">
                              <div className="bg-[#40CDAC] lg:bg-white hover:bg-[#005750] cursor-pointer hover-custom-color-text transition ease-in-out  rounded-2xl h-full w-full flex flex-col justify-between px-3 pt-2 md:pt-4 pb-2 sm:pb-5"
                                onClick={() => navigator('/song-lanh-chu-dong')} >
                                <div>
                                  <span className="mb-0 text-white lg:text-[#005750] text-[12px] sm:text-base md:text-[20px] md:leading-[28px] font-[500] leading-4 line-clamp-2 text-ellipsis  uppercase title-homepage">SỐNG LÀNH CHỦ ĐỘNG</span>
                                </div>
                                <span className="  text-white text-[10px] des-size-homepage sm:text-sm md:text-base font-[300] leading-[13px]  line-clamp-2 text-ellipsis font-Alexandria description margin-bottom-male">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quaerat doloribus at distinctio sed! Eveniet ratione corporis vitae consequatur corrupti quos, saepe, voluptates recusandae rem provident minus labore maxime veniam.</span>
                              </div>
                            </div>
                          }
                        })}
                      </div>
                      {leavingShow ? (
                        <div className="bg-white transition ease-in-out delay-[150] rounded-2xl h-[405px] -top-24 w-full absolute rounded-tl-none lg:hidden flex flex-col justify-between z-40">
                          <div className="absolute -top-6 left-0 w-[45%] h-full xxl:w-2/3 rounded-2xl bg-white transition ease-in-out delay-150  z-40"></div>
                          <div className='px-4 xxl:px-8 pb-4 xxl:pb-7 z-50 h-full flex flex-col'>
                            <div className='pl-4 xxl:pl- 6text-[21px] w-full leading-[26px] pt-1 xxl:pt-3 pb-2 xxl:pb-4 text-black font-[500]'>Thông báo <br /> <span className='opacity-0'>.</span></div>
                            <div className="flex flex-col h-full transition ease-in-out delay-150 gap-2">
                              <div className={`w-full h-full ${gender === 'female' ? 'bg-[#005750]' : 'bg-[#045AFA]'} rounded-2xl flex flex-col gap-5 px-3 xxl:px-6 py-8 xxl:py-11 overflow-hidden`} >
                                <span className='text-white text-[15px] xxl:text-base leading-[21px] xxl:leading-[26px] font-Alexandria '>
                                  Cám ơn! <br /> Bạn đã lựa chọn thành công!
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : ''}
                    </div>
                  </div>
                </div >
              </div>
              <div className="px-2 pt-2">
                <Footer colorText='#606060' type='homepage' />
              </div>
              <div className=" w-full h-14 bg-white rounded-t-2xl overflow-hidden z-40">
                <FooterSideBar curPathLink={curPathLink} handleCancel={handleCancel} />
              </div>
            </div>
            {width > 976 ? '' : (<ButtonBarFooter handleLink={handleLink} />)}
          </div>
        )}
    </>
  )
}
export default HomePage