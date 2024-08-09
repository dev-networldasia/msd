
import { Geolocation } from "@awesome-cordova-plugins/geolocation";
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import * as BannerApi from '../../api/banner/bannerApi';
import * as LocationApi from '../../api/location/locationApi';
import ButtonBarFooter from "../../components/ButtonBarFooter";
import FooterSideBar from "../../components/FooterSideBar";
import { background_layout, bg_mobile_home, office, office_mobile } from '../../components/ImgExport';
import { IMAGE_URL, META_LOGO, META_URL } from '../../env';
import useLoading from '../../hook/useLoading';
import useToast from '../../hook/useToast';
import useWindowDimensions from "../../hook/useWindowDimensions";
import Footer from '../../router/Layout/Footer';
import FooterDesktop from '../../router/Layout/FooterDesktop';
import Header from "../../router/Layout/Header";
import ModalNavigator from '../../router/Layout/ModalNavigator';
import Map from './map';
import './styles.css';

let timeout: any, n = 5;
const ScheduleConsultation: React.FC = () => {
  const param = useLocation();
  const mylocation = param.state ? param?.state.mylocation : "";

  const pushToast = useToast();
  const pushLoading = useLoading();
  const navigator = useNavigate()
  const [listLocation, setListLocation] = useState<LocationApi.InfoLocation[]>([])
  const [locationDetail, setlistLocationDetail] = useState<LocationApi.InfoLocation>()
  const [listProvince, setListProvince] = useState<LocationApi.InfoProvince[]>([])
  const [listDistrictByProvince, setListDistrictByProvince] = useState<LocationApi.InfoProvince[]>([])

  const [provinceFilter, setProvinceFilter] = useState(0)
  const [districtFilter, setDistrictFilter] = useState(0)
  const [addressFilter, setAddressFilter] = useState('')
  const [latUser, setLatUser] = useState(0)
  const [lngUser, setLngUser] = useState(0)
  const [latMap, setLatMap] = useState(0)
  const [lngMap, setLngMap] = useState(0)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(20)
  const [offset, setOffset] = useState(0)
  const [banner, setBanner] = useState<BannerApi.Img[]>([])
  const [bannerMobile, setBannerMobile] = useState<BannerApi.ImgMobile[]>([])
  const [loadData, setLoadData] = useState<boolean>(false);
  const [directLocation, setDirectLocation] = useState<boolean>(false);
  const [directLocationlat, setDirectLocationlat] = useState(0);
  const [directLocationlng, setDirectLocationlng] = useState(0);
  const [countdown, setCountdown] = useState(0); // Bắt đầu với giá trị 10, hoặc giá trị tùy chọn khác
  const [showNotification, setShowNotification] = useState(false);
  const bannerDetail = async () => {
    pushLoading(true);
    const result = await BannerApi.bannerDetail(5)
    if (result.status) {
      setBanner(result.data.img)
      setBannerMobile(result.data.imgMobile)
    } else {
      setBanner([])
      setBannerMobile([])
    }
    pushLoading(false);
  }

  const getListProvince = async () => {
    pushLoading(true)
    const result = await LocationApi.listProvince()
    if (result.status) {
      setListProvince(result.data)
    } else {
      setListProvince([])
      pushToast(result?.message || "Đang xảy ra lỗi. Vui lòng thử lại sau", "warning")
    }
    pushLoading(false)
  }

  const getListDistrictByProvinceId = async (id: number) => {
    pushLoading(true)
    const result = await LocationApi.listDistrictByProvince(id)
    if (result.status) {
      setListDistrictByProvince(result.data)
    } else {
      setListDistrictByProvince([])
      pushToast(result?.message || "Đang xảy ra lỗi. Vui lòng thử lại sau", "warning")
    }
    pushLoading(false)
  }

  const handleChangeProvinceChoose = (event: SelectChangeEvent) => {
    setProvinceFilter(Number(event.target.value));
    setDistrictFilter(0);
    getListDistrictByProvinceId(Number(event.target.value))
  }

  const getlocation = async () => {
    Geolocation.getCurrentPosition()
      .then((resp) => {
        // if (mylocation === 1) {
        setLatUser(resp.coords.latitude)
        setLngUser(resp.coords.longitude)
        searchLocation(resp.coords.latitude, resp.coords.longitude, limit, 0, false)
        // } else {
        //   searchLocation(0, 0, limit, 0, false)
        // }
      })
      .catch((error) => {
        console.log("không lấy được vị trí")
        searchLocation(0, 0, limit, 0, false)
      });
  }

  const searchLocation = async (lat: number, lng: number, limitPage: number, offsetPage: number, load: boolean) => {
    // nếu lat lng = 0 thì sẽ tìm như bth còn nếu !==0 thì sẽ tìm theo địa chỉ người dùng
    if (!load) {
      setOffset(0)
      //trường hợp ban đầu k load thêm
      const result = await LocationApi.listConsultLocation(lat, lng, provinceFilter, districtFilter, addressFilter, limitPage, offsetPage)
      if (result.status) {
        setTotal(result.total)
        setListLocation(result.data)
        if (latUser || lngUser) {
          setLatMap(latUser)
          setLngMap(lngUser)
        } else {
          setLatMap(result.data[0].lat)
          setLngMap(result.data[0].lng)
        }
        consultLocationDetail(result.data[0].id)
      } else {
        setListLocation([])
        pushToast(result?.message || "Đang xảy ra lỗi. Vui lòng thử lại sau", "warning")
      }
    } else {
      const result = await LocationApi.listConsultLocation(lat, lng, provinceFilter, districtFilter, addressFilter, limitPage, offsetPage)
      if (result.status) {
        if ((result.data.length + listLocation.length) >= result.total) {
          setLoadData(false);
        }
        setListLocation((data: any) => [...data, ...result.data])
      } else {
        // setListLocation([])
        pushToast(result?.message || "Đang xảy ra lỗi. Vui lòng thử lại sau", "warning")
      }
    }

    pushLoading(true)

    pushLoading(false)
  }
  const consultLocationDetail = async (id: number) => {
    setDirectLocation(false)
    setDirectLocationlat(0)
    setDirectLocationlng(0)
    pushLoading(true)
    const result = await LocationApi.consultLocationDetail(id)
    if (result.status) {
      setLatMap(result.data.lat)
      setLngMap(result.data.lng)
      setlistLocationDetail(result.data)
    } else {
      setlistLocationDetail(undefined)
      pushToast(result?.message || "Đang xảy ra lỗi. Vui lòng thử lại sau", "warning")
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

  useEffect(() => {
    getlocation()
    getListProvince()
    // searchLocation(0, 0, limit, 0, false)
    bannerDetail()
  }, [])

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


  const [curPathLink, setcurPathLink] = useState('')

  const metaHTML = () => {
    // var optionProvinceDesktopLabelControls = document.getElementById('select-province-desktop-label>')
    var selectProvinceDesktopLabelControls = document.getElementById('select-province-desktop-label')
    if (selectProvinceDesktopLabelControls) {
      // selectProvinceDesktopLabelControls.setAttribute("aria-controls", `province-desktop-controls-0-combobox`)
      selectProvinceDesktopLabelControls.setAttribute("aria-label", `select-province-desktop-label-combobox`)
      selectProvinceDesktopLabelControls.removeAttribute("tabindex")
      selectProvinceDesktopLabelControls.removeAttribute("role")
      selectProvinceDesktopLabelControls.removeAttribute("aria-controls")
      selectProvinceDesktopLabelControls.removeAttribute("aria-expanded")
      selectProvinceDesktopLabelControls.removeAttribute("aria-haspopup")
      selectProvinceDesktopLabelControls.removeAttribute("aria-labelledby")
    }
    var selectDistrictDesktopLabelControls = document.getElementById('select-district-desktop-label')
    if (selectDistrictDesktopLabelControls) {
      // selectDistrictDesktopLabelControls.setAttribute("aria-controls", `district-desktop-controls-0-combobox`)
      selectDistrictDesktopLabelControls.setAttribute("aria-label", `select-district-desktop-label-combobox`)
      selectDistrictDesktopLabelControls.removeAttribute("tabindex")
      selectDistrictDesktopLabelControls.removeAttribute("role")
      selectDistrictDesktopLabelControls.removeAttribute("aria-controls")
      selectDistrictDesktopLabelControls.removeAttribute("aria-expanded")
      selectDistrictDesktopLabelControls.removeAttribute("aria-haspopup")
      selectDistrictDesktopLabelControls.removeAttribute("aria-labelledby")
    }
    var selectProvinceMobileLabelControls = document.getElementById('select-province-mobile-label')
    if (selectProvinceMobileLabelControls) {
      selectProvinceMobileLabelControls.setAttribute("aria-label", `select-province-mobile-label-combobox`)
      selectProvinceMobileLabelControls.removeAttribute("tabindex")
      selectProvinceMobileLabelControls.removeAttribute("role")
      selectProvinceMobileLabelControls.removeAttribute("aria-controls")
      selectProvinceMobileLabelControls.removeAttribute("aria-expanded")
      selectProvinceMobileLabelControls.removeAttribute("aria-haspopup")
      selectProvinceMobileLabelControls.removeAttribute("aria-labelledby")
    }
    var selectDistrictMobileLabelControls = document.getElementById('select-district-mobile-label')
    if (selectDistrictMobileLabelControls) {
      selectDistrictMobileLabelControls.setAttribute("aria-label", `select-district-mobile-label-combobox`)
      selectDistrictMobileLabelControls.removeAttribute("tabindex")
      selectDistrictMobileLabelControls.removeAttribute("role")
      selectDistrictMobileLabelControls.removeAttribute("aria-controls")
      selectDistrictMobileLabelControls.removeAttribute("aria-expanded")
      selectDistrictMobileLabelControls.removeAttribute("aria-haspopup")
      selectDistrictMobileLabelControls.removeAttribute("aria-labelledby")
    }


    var urlMeta = document.querySelector('meta[property="og:url"]')
    var urlTitle = document.querySelector('title[class="title-index"]')
    if (urlTitle) {
      urlTitle.innerHTML = 'Địa điểm tư vấn';
    }
    if (urlMeta) {
      urlMeta.setAttribute("content", `${META_URL}dia-diem-tu-van`);
    }
    var typeMeta = document.querySelector('meta[property="og:type"]')
    if (typeMeta) {
      typeMeta.setAttribute("content", "website");
    }
    var titleMeta = document.querySelector('meta[property="og:title"]')
    if (titleMeta) {
      titleMeta.setAttribute("content", `Địa điểm tư vấn`);
    }
    var imageMeta = document.querySelector('meta[property="og:image"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `${META_LOGO}`);
    }
    var imageMeta = document.querySelector('meta[property="og:description"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `Địa điểm tư vấn`);
    }
    var descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", `Địa điểm tư vấn`);
    }
  }

  useEffect(() => {
    const curPath = window.location.pathname;
    setcurPathLink(curPath)
    metaHTML()
  }, [window.location.pathname]);
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
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  return (
    <>
      {/* <Helmet>
        <title>Địa điểm tư vấn</title>
      </Helmet> */}
      {/* tablet - desktop */}
      <div
        className={`by-svh-custom  w-full hidden lg:flex flex-col justify-between lg:justify-start lg:gap-3 xxl:gap-6 z-40 relative overflow-hidden`}
      >
        <div className="by-svh-custom absolute  w-full top-0 left-0 -z-[1]">
          <img src={background_layout} className='img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        {/* Header */}
        {width > 976 ? (<Header handleCancel={handleCancel} handleLink={handleLink} />) : ''}

        <div className={`h-full px-5 xxl:px-7 ${scroll ? 'overflow-y-scroll' : 'overflow-hidden'}  flex flex-col justify-between`}>
          <div className={`hidden lg:flex flex-col ${scroll ? 'h-fit' : 'h-full'}  max-h-[1000px] z-9 justify-between`}>
            {/* content */}
            <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
            <div className={`hidden lg:flex ${scroll ? 'h-fit' : 'h-[calc(100%-62px)]'} max-h-[1000px] w-full gap-4 xxl:gap-7`}>
              <div className={`w-1/3 ${scroll ? '!h-[531px]' : 'h-full'} flex flex-col `}>
                {banner.length === 0 ?
                  <div className="w-full h-full rounded-xl overflow-hidden">

                    <img
                      className='img'
                      src={office}
                      onError={(e) => {
                        e.currentTarget.src = office;
                      }}
                      alt="hpv"
                    />
                  </div>
                  :
                  banner?.map((item, index) => (
                    index === 0 && (
                      <div key={index} className="w-full h-full rounded-xl overflow-hidden">
                        <img
                          className='img xl:object-top'
                          src={item.img ? IMAGE_URL + item.img : office}
                          onError={(e) => {
                            e.currentTarget.src = office;
                          }}
                          alt="hpv"
                        />
                      </div>
                    )
                  ))
                }
              </div>
              <div className={`w-1/3 ${scroll ? '!h-[531px]' : 'h-full'} flex flex-col  `}>
                <div className=" w-full flex flex-col !min-h-[220px] pb-2">
                  <div className="w-full !min-h-[220px] flex flex-col gap-3  rounded-2xl bg-[#005750] overflow-hidden px-4 xxl:px-9 py-4 xxl:py-9" >
                    <div className="flex  justify-between items-center gap-3">
                      <div className="w-1/2 bg-white py-2 px-2 rounded-full custom-select-border">
                        <Select
                          className="w-full h-8 xl:h-9 font-Alexandria select-province-desktop-label"
                          value={String(provinceFilter)}
                          onChange={handleChangeProvinceChoose}
                          name="select-province-desktop-label"
                          id='select-province-desktop-label'
                          aria-label='select-province-desktop-label'
                        // aria-labelledby='address-desktop-labelledby'
                        // aria-describedby='address-desktop-describedby'
                        >
                          <MenuItem value={0} className="font-Alexandria city-item">
                            Thành phố
                          </MenuItem>
                          {listProvince.map((item, index) => (
                            <MenuItem key={index} className='font-Alexandria city-item' value={item.id}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      <div className="w-1/2 bg-white py-2 px-2 rounded-full custom-select-border">
                        <Select
                          className="w-full h-8 xl:h-9 font-Alexandria select-district-desktop-label"
                          value={String(districtFilter)}
                          onChange={(e) => setDistrictFilter(Number(e.target.value))}
                          name="select-district-desktop-label"
                          id='select-district-desktop-label'
                          aria-label='select-district-desktop-label'
                        // aria-labelledby='address-desktop-labelledby'
                        // aria-describedby='address-desktop-describedby'
                        >
                          <MenuItem value={0} className="font-Alexandria district-item">
                            Quận/Huyện
                          </MenuItem>
                          {listDistrictByProvince.map((item, index) => (
                            <MenuItem key={index} className='font-Alexandria district-item' value={item.id}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="w-full ">
                      <div className="bg-white py-2 px-2 rounded-full border-none custom-select-border">
                        <input
                          id='address-input-desktop'
                          className='h-8 xl:h-9 w-full px-4 border-none  focus:outline-none font-Alexandria address-input'
                          placeholder="Địa chỉ"
                          value={addressFilter}
                          onChange={(e) => setAddressFilter(e.target.value)}
                          aria-label='address-desktop-label'
                        />
                      </div>
                      <div className="w-full h-[60px] xl:h-[70px] pt-4 flex items-center justify-center">
                        <button className='px-7 h-full w-[200px] flex items-center justify-center rounded-full bg-white hover:bg-[#40AFA3] hover:text-white transition-all uppercase text-sm xxl:text-base font-Alexandria btn-search-location'
                          onClick={() => searchLocation(0, 0, limit, 0, false)}
                        >Tìm ngay</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" w-full flex flex-col !h-[calc(100%-228px)] overflow-y-scroll">
                  <InfiniteScroll
                    dataLength={listLocation.length} //This is important field to render the next data
                    next={() => {
                      searchLocation(latUser, lngUser, limit, offset + limit, true);
                      setOffset(offset + limit)
                    }}
                    hasMore={listLocation.length < total}
                    loader={<h4 style={{ textAlign: 'center' }}>Đang tải...</h4>}
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <b>Bạn đã xem tất cả theo bộ lọc</b>
                      </p>
                    }
                    refreshFunction={() => {
                      searchLocation(latUser, lngUser, limit, 0, false);
                      setOffset(0)
                    }}
                    height={'100%'}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                  >
                    {listLocation?.map((item, index) => {
                      return <div key={index} className=" w-full !min-h-[190px] h-1/2 py-2">
                        <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden cursor-pointer"
                          onClick={() => consultLocationDetail(item.id)}
                        >
                          <div className="w-[37%] h-full overflow-hidden custom-tooltip">
                            <img
                              className='img'
                              src={item?.img ? IMAGE_URL + item?.img : office}
                              onError={(e) => {
                                e.currentTarget.src = office;
                              }}
                              alt="hpv"
                            />
                          </div>
                          <div className="w-[73%] h-full overflow-hidden px-2 py-4 xl:px-4 xl:py-8 location-custom-mac flex flex-col justify-between">
                            <span className='lg:text-sm xl:text-[16px] font-[400] uppercase !leading-[26px] line-clamp-2 text-ellipsis'>{item.name}</span>
                            <div className="flex gap-2 items-center">
                              <LocationOnIcon className='text-xs xl:text-sm xxl:text-base !text-[#3a3a3a]' />
                              <span className='text-xs xl:text-sm xxl:text-base font-[300] text-ellipsis line-clamp-2 font-Alexandria'>
                                {item.address}

                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    })}
                  </InfiniteScroll>
                </div>
              </div>
              <div className={`w-1/3 ${scroll ? '!h-[531px]' : 'h-full'} flex flex-col  `}>
                <div className="w-full h-full flex flex-col ">
                  {(listLocation.length > 0 || locationDetail) &&
                    <div className=" w-full flex flex-col h-3/5 height-custom-desktop-location pb-1">
                      <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden" >
                        {/* <img src={gg_map} alt="hpv" className='w-full h-full object-cover' /> */}
                        <div className='w-full h-full object-cover'>
                          <Map
                            directLocation={directLocation}
                            directLocationlat={directLocationlat}
                            directLocationlng={directLocationlng}
                            latUser={latUser}
                            lngUser={lngUser}
                            lat={latMap}
                            lng={lngMap}
                            listLocation={listLocation}
                          />

                        </div>
                      </div>
                    </div>
                  }

                  {locationDetail &&
                    <div className="w-full flex h-2/5 pt-3 height-custom-desktop-location ">
                      <div className="h-full overflow-y-auto w-full flex flex-col justify-between px-8 xxl:px-11 py-3 xxl:py-8 bg-white rounded-xl">
                        <span className='!min-h-[78px] lg:text-sm xl:text-[16px] font-[400] uppercase !leading-[26px] line-clamp-3 text-ellipsis'>{locationDetail.name}</span>
                        <div className="flex gap-2 items-center h-[56px]">
                          <LocationOnIcon className='text-xs xl:text-sm xxl:text-base !text-[#3a3a3a]' />
                          <span className=' text-sm xl:text-base xxl:text-lg font-[300] text-ellipsis line-clamp-2 font-Alexandria leading-4 text-justify'>
                            {locationDetail.address}

                          </span>
                        </div>
                        <div className="!min-h-[28px] flex justify-between items-center">
                          <div className="flex items-center justify-end gap-3">
                            <CallIcon className='text-xs xl:text-sm xxl:text-base !text-[#3a3a3a]' />
                            <span className='text-sm xl:text-base xxl:text-lg font-[300] text-ellipsis line-clamp-2 font-Alexandria pr-10'>{locationDetail.phone && locationDetail.phone !== "" ? locationDetail.phone : "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-end gap-3 pr-[25px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 37 37" fill="none" aria-label='svg-tag'
                            >
                              <g clip-path="url(#clip0_83_1073)">
                                <path d="M16.7999 0C17.7799 0 18.7499 0 19.7299 0C19.7899 0.01 19.8399 0.04 19.8999 0.04C22.6199 0.27 25.1699 1.07 27.5099 2.46C31.9899 5.13 34.8599 9.01 36.1199 14.08C36.3499 15.02 36.4599 15.97 36.5799 16.92V19.63C36.5399 19.92 36.4999 20.22 36.4699 20.51C35.9799 24.46 34.3899 27.93 31.6399 30.8C27.3699 35.24 22.1299 37.13 15.9999 36.43C12.0699 35.98 8.62986 34.36 5.77986 31.62C1.03986 27.05 -0.790141 21.43 0.309859 14.93C1.49986 7.91 7.07986 2.09 14.0299 0.47C14.9499 0.26 15.8799 0.14 16.7999 0ZM2.04986 18.27C2.07986 27.05 9.00986 34.5 18.2899 34.52C27.4799 34.53 34.5499 27.15 34.5599 18.31C34.5699 9.45 27.5099 2.04 18.3099 2.04C9.02986 2.04 2.09986 9.49 2.05986 18.27H2.04986Z" fill="black" aria-label='svg-first' />
                                <path d="M17.28 12.32C17.28 10.37 17.28 8.41999 17.28 6.46999C17.28 5.68999 17.91 5.19999 18.61 5.41999C19.03 5.54999 19.31 5.90999 19.32 6.37999C19.33 6.82999 19.32 7.27999 19.32 7.73999C19.32 10.75 19.32 13.76 19.32 16.77C19.32 17.26 19.32 17.27 19.82 17.27C22.38 17.27 24.93 17.27 27.49 17.27C28.15 17.27 28.57 17.64 28.6 18.22C28.63 18.84 28.22 19.3 27.59 19.31C26.85 19.32 26.12 19.31 25.38 19.31C23.13 19.31 20.88 19.29 18.64 19.32C17.76 19.33 17.23 18.95 17.26 17.92C17.31 16.05 17.27 14.19 17.27 12.32H17.28Z" fill="black" aria-label='svg-second' />
                              </g>
                              <defs>
                                <clipPath id="clip0_83_1073">
                                  <rect width="36.59" height="36.58" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                            <span className='text-sm xl:text-base xxl:text-lg font-[300] text-ellipsis line-clamp-2 font-Alexandria whitespace-nowrap'>{locationDetail.operation}</span>
                          </div>

                        </div>
                        <div className='!min-h-[40px] flex justify-center gap-5'>
                          <div
                            className="h-[40px] px-4 border-[#005750] hover:text-white hover:bg-[#005750] transition-all border flex justify-center items-center cursor-pointer rounded-full overflow-hidden text-[18px] text-[#005750] font-Alexandria uppercase btn-direct"
                            onClick={() => {
                              setDirectLocation(true)
                              setDirectLocationlat(locationDetail.lat)
                              setDirectLocationlng(locationDetail.lng)
                            }}
                          >
                            Chỉ đường
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>

              </div>
            </div >
            <Footer colorText='#606060' type="location" />
          </div >

        </div>
        {width > 976 ? (<ButtonBarFooter handleLink={handleLink} />) : ''}

      </div>
      {/* mobile */}

      <div className=' h-full flex lg:hidden flex-col relative'>
        <div className="fixed h-[100vh] w-full top-0 left-0 -z-[1]">
          <img src={bg_mobile_home} className='block lg:hidden h-full w-full' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />

        <div className="fixed top-0 left-0 w-full h-10 md:h-[56px] rounded-b-md overflow-hidden z-999">

          <img src={bg_mobile_home} className=' absolute top-0 left-0 w-full h-full object-top -z-10' alt="hpv" />
          {width > 976 ? '' : (<Header handleCancel={handleCancel} handleLink={handleLink} />)}
        </div>
        {/* <div className="pt-10 md:pt-[56px] pb-14 min-h-[100vh] h-fit px-5 xxl:px-7 flex flex-col justify-between"> */}
        <div className="h-[100vh] px-5 xxl:px-7 overflow-hidden pt-10 md:pt-14 pb-14">
          <div className="lg:hidden flex flex-col !h-full w-full  gap-2" >
            <div className="w-full h-[181px] sm:h-[300px] md:h-[370px] flex-shrink-0 rounded-xl sm:rounded-3xl flex  overflow-hidden">
              {/* <img src={office_mobile} alt="hpv" className='img' /> */}
              {bannerMobile.length === 0 ?
                <img
                  className='img'
                  src={office}
                  onError={(e) => {
                    e.currentTarget.src = office_mobile;
                  }}
                  alt="hpv"
                />
                :
                bannerMobile?.map((item, index) => (
                  index === 0 && (
                    <img
                      key={index}
                      className='img'
                      src={item.imgMobile ? IMAGE_URL + item.imgMobile : office}
                      onError={(e) => {
                        e.currentTarget.src = office_mobile;
                      }}
                      alt="hpv"
                    />
                  )

                ))
              }


            </div>
            <div className="w-full flex-shrink-0 flex flex-col justify-center">
              <div className="w-full h-full flex justify-between items-center bg-[#6CC9AD] rounded-xl overflow-hidden py-2 sm:py-4 px-6 sm:px-6">
                <div className='flex md:hidden w-1/3 text-base sm:text-lg font-[500] text-white uppercase'>LIÊN HỆ <br /> TƯ VẤN</div>
                <div className='hidden md:flex w-1/3 text-base sm:text-lg font-[500] text-white uppercase'>LIÊN HỆ TƯ VẤN</div>
                <div className='w-1/2 text-xs sm:text-base text-white font-Alexandria text-ellipsis line-clamp-2'>Cùng chuyên gia tại Trung tâm Y tế gần nhất!</div>
              </div>

            </div>

            {/* <div className="w-full h-3/5 flex flex-col gap-2"> */}
            <div className="w-full !h-[531px] flex flex-col gap-2">
              <div className="flex  justify-between items-center gap-3">
                <div className="w-1/2 bg-white py-2 px-2 rounded-lg custom-select-border">
                  <Select
                    className="w-full h-7 font-Alexandria select-province-mobile-label"
                    value={String(provinceFilter)}
                    onChange={handleChangeProvinceChoose}
                    id='select-province-mobile-label'
                    aria-label='select-province-mobile-label'
                  >
                    <MenuItem value={0} className="font-Alexandria city-item">
                      Thành phố
                    </MenuItem>
                    {listProvince.map((item, index) => (
                      <MenuItem className='font-Alexandria city-item' key={index} value={item.id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="w-1/2 bg-white py-2 px-2 rounded-lg custom-select-border">
                  <Select
                    className="w-full h-7 font-Alexandria select-district-mobile-label"
                    value={String(districtFilter)}
                    onChange={(e) => setDistrictFilter(Number(e.target.value))}
                    id='select-district-mobile-label'
                    aria-label='select-district-mobile-label'
                  >
                    <MenuItem value={0} className="font-Alexandria district-item">
                      Quận/Huyện
                    </MenuItem>
                    {listDistrictByProvince.map((item, index) => (
                      <MenuItem className='font-Alexandria district-item' key={index} value={item.id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 ">
                <div className="bg-white py-2 px-2 rounded-lg border-none custom-select-border">
                  <input
                    id='address-input-mobile'
                    className='h-7 w-full px-4 border-none focus:outline-none font-Alexandria address-input'
                    placeholder="Địa chỉ"
                    value={addressFilter}
                    onChange={(e) => setAddressFilter(e.target.value)}
                    aria-label='address-mobile-label'
                  />
                </div>
                <div className="w-full h-9 flex items-center justify-center">
                  <button
                    className='px-7 h-full w-[133px] flex items-center justify-center rounded-lg bg-white hover:bg-[#40AFA3] hover:text-white transition-all uppercase text-sm xxl:text-base font-Alexandria btn-search-location'
                    onClick={() => searchLocation(0, 0, limit, 0, false)}
                  >
                    Tìm ngay
                  </button>
                </div>

              </div>
              <div className=" w-full flex flex-col h-full overflow-y-scroll justify-between">
                {/* <div className=" w-full flex flex-col h-full overflow-hidden justify-between"> */}
                <InfiniteScroll
                  dataLength={listLocation.length} //This is important field to render the next data
                  next={() => {
                    searchLocation(latUser, lngUser, limit, offset + limit, true);
                    setOffset(offset + limit)
                  }}
                  hasMore={listLocation.length < total}
                  loader={<h4 style={{ textAlign: 'center' }}>Đang tải...</h4>}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Bạn đã xem tất cả theo bộ lọc</b>
                    </p>
                  }
                  refreshFunction={() => {
                    searchLocation(latUser, lngUser, limit, 0, false);
                    setOffset(0)
                  }}
                  height={'100%'}
                  pullDownToRefresh
                  pullDownToRefreshThreshold={50}
                >
                  {listLocation?.map((item, index) => {
                    return <div key={index} className=" w-full h-[150px] sm:h-[200px] md:h-[230px] pb-2">
                      <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden cursor-pointer"
                        // onClick={() => consultLocationDetail(item.id)}
                        onClick={() => navigator(`/chi-tiet-dia-diem-tu-van/${item.id}`)}
                      >
                        <div className="w-1/2 h-full overflow-hidden custom-tooltip">
                          <img
                            className='img'
                            src={item?.img ? IMAGE_URL + item?.img : office}
                            onError={(e) => {
                              e.currentTarget.src = office;
                            }}
                            alt="hpv"
                          />
                        </div>
                        <div className={`${index % 2 === 0 ? "bg-[#61ADA3]" : "bg-[#235650]"} text-white w-1/2 h-full overflow-hidden px-4 md:px-9 py-3 md:py-6 flex flex-col justify-between`}>
                          <span className='text-[15px] md:text-[18px] font-[500] text-ellipsis line-clamp-2 uppercase'>{item.name}</span>
                          <div className="flex gap-2 items-center">
                            <span className='text-[12px] sm:text-sm md:text-base font-[300] text-ellipsis line-clamp-3 font-Alexandria'>
                              {item.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  })}
                </InfiniteScroll>
                {/* <div className="pt-2">
                  <Footer colorText='#606060' type="location" />
                </div> */}
              </div>

            </div>
            <div className="pt-2 mt-auto">
              <Footer colorText='#606060' type="location" />
            </div>
          </div >
        </div>
        <div className="fixed bottom-0 left-0 w-full h-14 bg-white rounded-t-2xl overflow-hidden z-40">
          <FooterSideBar curPathLink={curPathLink} handleCancel={handleCancel} />
        </div>
        {width > 976 ? '' : (<ButtonBarFooter handleLink={handleLink} />)}
      </div>
    </>

  )
}
export default ScheduleConsultation