import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as BannerApi from '../../../api/banner/bannerApi';
import * as HealthyApi from '../../../api/healthy/healthyApi';
import ButtonBarFooter from '../../../components/ButtonBarFooter';
import FooterSideBar from '../../../components/FooterSideBar';
import { background_layout, baner_homepage, bg_mobile_home, body, mind, team_work } from '../../../components/ImgExport';
import { IMAGE_URL, META_LOGO, META_URL } from '../../../env';
import useLoading from '../../../hook/useLoading';
import useToast from '../../../hook/useToast';
import useWindowDimensions from '../../../hook/useWindowDimensions';
import Footer from '../../../router/Layout/Footer';
import Header from '../../../router/Layout/Header';
import ModalNavigator from '../../../router/Layout/ModalNavigator';
let timeout: any, n = 5;

export default function Healthy() {
  const navigator = useNavigate()
  const pushToast = useToast();
  const pushLoading = useLoading();
  const [showNotification, setShowNotification] = useState(false);
  const [countdown, setCountdown] = useState(0); // Bắt đầu với giá trị 10, hoặc giá trị tùy chọn khác
  const [bannerMobile, setBannerMobile] = useState<BannerApi.ImgMobile[]>([])
  const [description, setDescription] = useState('')
  const [scroll, setScroll] = useState(false)
  const { width, height } = useWindowDimensions();

  const metaHTMLDefault = () => {
    var urlTitle = document.querySelector('title[class="title-index"]')
    if (urlTitle) {
      urlTitle.innerHTML = `Sống lành chủ động`;
    }
  }
  useEffect(() => {
    metaHTMLDefault()
  }, [window.location.pathname]);

  const metaHTML = (data: any) => {
    var descriptionMetaText = data.description.replace(/<[^>]+>/g, '');
    var urlMeta = document.querySelector('meta[property="og:url"]')
    var urlTitle = document.querySelector('title[class="title-index"]')
    if (urlTitle) {
      urlTitle.innerHTML = 'Sống lành chủ động';
    }
    if (urlMeta) {
      urlMeta.setAttribute("content", `${META_URL}song-lanh-chu-dong`);
    }
    var typeMeta = document.querySelector('meta[property="og:type"]')
    if (typeMeta) {
      typeMeta.setAttribute("content", "website");
    }
    var titleMeta = document.querySelector('meta[property="og:title"]')
    if (titleMeta) {
      titleMeta.setAttribute("content", `Sống lành chủ động`);
    }
    var imageMeta = document.querySelector('meta[property="og:image"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `${META_LOGO}`);
    }
    var imageMeta = document.querySelector('meta[property="og:description"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `${descriptionMetaText}`);
    }
    var descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", `${descriptionMetaText}`);
    }
  }
  const getInfoDescription = async () => {
    pushLoading(true)
    const result = await HealthyApi.healthyDescriptionDetail()
    if (result.status) {
      setDescription(result.data.description)
      metaHTML(result.data)
    } else {
      setDescription('')
      pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
    }
    pushLoading(false)
  }
  useEffect(() => {
    getInfoDescription()
    bannerDetail()
  }, [])
  const bannerDetail = async () => {
    pushLoading(true)
    const result = await BannerApi.bannerDetail(2)
    if (result.status) {
      setBannerMobile(result.data.imgMobile)
    } else {
      setBannerMobile([])
    }
    pushLoading(false)
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
    setShowNotification(false)
  }
  const [curPathLink, setcurPathLink] = useState('')
  useEffect(() => {
    const curPath = window.location.pathname;
    setcurPathLink(curPath)
  }, [window.location.pathname]);
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
      {/* <Helmet>
        <title>Sống lành chủ động</title>
      </Helmet> */}
      <div className="by-svh-custom w-full hidden lg:flex flex-col justify-between lg:justify-start lg:gap-3 xxl:gap-6 z-40 relative">
        <div className="absolute h-full w-full top-0 left-0 -z-[1]">
          <img src={background_layout} className='lg:block hidden img' alt="hpv" />
          <img src={bg_mobile_home} className='block lg:hidden img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        {/* Header */}
        {width > 976 ? (<Header handleCancel={handleCancel} handleLink={handleLink} />) : ''}
        <div className={`h-full px-5 xxl:px-7 flex flex-col justify-between  ${scroll ? 'overflow-y-scroll' : 'overflow-hidden'}`}>
          {/* tablet - desktop */}
          <div className={`hidden lg:flex ${scroll ? 'h-fit' : 'h-[calc(100%-62px)]'} max-h-[1000px] w-full gap-4 xxl:gap-4 `}>
            <div className={`w-2/5 ${scroll ? '!h-[531px]' : 'h-full'}  relative`}>
              <div className="h-full w-full  ">
                <div className="bg-[#40AFA3] rounded-2xl h-full w-full flex overflow-hidden  transition-all cursor-default"
                >
                  <div className="w-full h-full flex flex-col justify-between pl-[45px] pr-[45px] pt-[120px] pb-[120px]">
                    <span className='lg:text-[30px] xl:text-[40px] font-[500] uppercase text-white fs-healthy-mac15'>Sống lành <br /> chủ động</span>
                    <span className='lg:text-sm xl:text-base text-white line-clamp-3 xxl:line-clamp-4 text-ellipsis font-Alexandria '>{description}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`w-3/5 ${scroll ? '!h-[531px]' : 'h-full'} relative grid grid-rows-2 gap-4 xxl:pl-3`}>
              <div className=" w-full h-full ">
                <div className="w-full h-full   flex gap-4">
                  <div className="w-3/5 h-full bg-white rounded-2xl overflow-hidden relative cursor-pointer"
                  // onClick={() => navigator('/chi-tiet-song-lanh-chu-dong/tri-sang')}
                  >
                    <img src={mind} alt="hpv" className='img brightness-[.8]' />
                    <div className="absolute  bottom-2 xl:bottom-5 xxl:bottom-7 left-2 xl:left-8 xxl:left-10 lg:text-[30px] xl:text-[40px] font-[500] text-white capitalize fs-healthy-mac15">Trí Sáng</div>
                  </div>
                  <div className="w-2/5 h-full bg-white rounded-2xl overflow-hidden relative cursor-pointer"
                    onClick={() => navigator('/chi-tiet-song-lanh-chu-dong/than-khoe')}
                  >
                    <img src={body} alt="hpv" className='img brightness-[.8]' />
                    <div className="absolute  bottom-2 xl:bottom-5 xxl:bottom-7 left-2 xl:left-8 xxl:left-10 lg:text-[30px] xl:text-[40px] font-[500] text-white capitalize fs-healthy-mac15">Thân Khỏe</div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden cursor-pointer relative"
                // onClick={() => navigator('/chi-tiet-song-lanh-chu-dong/tam-an')}
                >
                  <img src={team_work} alt="hpv" className='img  brightness-[.8]' />
                  <div className="absolute bottom-[43%] left-2 xl:left-8 xxl:left-10 lg:text-[30px] xl:text-[40px] font-[500] text-[#ffffff] capitalize z-40 fs-healthy-mac15">Tâm An</div>
                </div>
              </div>
            </div>
          </div>
          <Footer colorText='#606060' type='healthy' />
        </div>
        {width > 976 ? (<ButtonBarFooter handleLink={handleLink} />) : ''}
      </div>
      {/* mobile */}
      <div className=' max-h-[100vh] by-svh-custom flex lg:hidden flex-col relative'>
        <div className="max-h-[100vh]  by-svh-custom w-full top-0 left-0 -z-[1]">
          <img src={bg_mobile_home} className='block lg:hidden img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        <div className="absolute top-0 left-0 h-full w-full flex lg:hidden flex-col overflow-hidden">
          <div className=" w-full h-10 md:h-[56px] bg-transparent rounded-b-md overflow-hidden z-40 ">
            {width > 976 ? '' : (<Header handleCancel={handleCancel} handleLink={handleLink} />)}
          </div>
          <div className=" h-[calc(100%-92px)] md:h-[calc(100%-108px)] px-5 xxl:px-7 overflow-hidden">
            <div className={`${scroll ? 'overflow-y-scroll' : 'overflow-y-hidden'} lg:hidden flex flex-col h-full w-full gap-2 xxl:gap-4 `}>
              <div className={`${scroll ? '!min-h-[310px]' : ''} w-full h-[43%]`}>
                <div className="w-full h-full overflow-hidden rounded-2xl">
                  {bannerMobile.length === 0 ?
                    <img
                      className='lg:hidden block img '
                      src={baner_homepage}
                      onError={(e) => {
                        e.currentTarget.src = baner_homepage;
                      }}
                      alt="hpv"
                    />
                    :
                    bannerMobile?.map((item, index) => (
                      index === 0 && (
                        <img
                          key={index}
                          className='lg:hidden block img '
                          src={item.imgMobile ? IMAGE_URL + item.imgMobile : baner_homepage}
                          onError={(e) => {
                            e.currentTarget.src = baner_homepage;
                          }}
                          alt="hpv"
                        />
                      )
                    ))
                  }
                </div>
              </div>
              <div className={`${scroll ? '!min-h-[410px]' : ''} w-full h-[57%] relative flex flex-col`}>
                <div className="w-full h-1/5">
                  <div className="bg-[#40AFA3] rounded-2xl h-full w-full flex overflow-hidden py-2 px-4 transition-all cursor-default"
                  >
                    <div className="w-full h-full flex justify-between items-center">
                      <span className='w-3/5 flex-shrink-0 text-sm md:text-[20px] md:leading-[28px] font-[500] uppercase text-white'>Sống lành <br /> chủ động</span>
                      <div className="h-full flex flex-col justify-center">
                        <span className='text-[10px] md:text-[16px] md:leading-[20px] text-white line-clamp-3 xxl:line-clamp-4 text-ellipsis font-Alexandria '>{description}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-4/5 relative flex flex-col pt-2 ">
                  <div className=" w-full h-[55%]  flex-shrink-0 ">
                    <div className="w-full h-full   flex gap-2">
                      <div className="w-[57%] h-full bg-white rounded-2xl overflow-hidden relative cursor-pointer"
                      // onClick={() => navigator('/chi-tiet-song-lanh-chu-dong/tri-sang')}
                      >
                        <img src={mind} alt="hpv" className='brightness-[0.6] img' />
                        <div className="absolute bottom-5 left-5 text-[16px] sm:text-[21px] md:text-[23px] font-[500] text-white capitalize"
                        >Trí Sáng</div>
                      </div>
                      <div className="w-[43%] h-full bg-white rounded-2xl overflow-hidden relative cursor-pointer"
                        onClick={() => navigator('/chi-tiet-song-lanh-chu-dong/than-khoe')}
                      >
                        <img src={body} alt="hpv" className='brightness-[0.6] img' />
                        <div className="absolute bottom-5 left-5 text-[16px] sm:text-[21px] md:text-[23px] font-[500] text-white capitalize">Thân Khỏe</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[45%] pt-2 flex-shrink-0">
                    <div className="w-full h-full bg-white rounded-2xl overflow-hidden cursor-pointer"
                    // onClick={() => navigator('/chi-tiet-song-lanh-chu-dong/tam-an')}
                    >
                      <img src={team_work} alt="hpv" className='brightness-[0.6] img' />
                      <div className="absolute bottom-5 left-5 text-[16px] sm:text-[21px] md:text-[23px] font-[500] text-white capitalize">Tâm An</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 pt-2">
            <Footer colorText='#606060' type='healthy' />
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
