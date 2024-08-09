import { Geolocation } from "@awesome-cordova-plugins/geolocation";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as LocationApi from '../../../api/location/locationApi';
import { location_detail_banner } from '../../../components/ImgExport';
import { META_LOGO, META_URL } from '../../../env';
import useLoading from '../../../hook/useLoading';
import useToast from '../../../hook/useToast';
import Footer from '../../../router/Layout/Footer';
import FooterDesktop from '../../../router/Layout/FooterDesktop';
import ModalNavigator from '../../../router/Layout/ModalNavigator';
import { convertHTML } from '../../../until';
import Map from '../map';

let timeout: any, n = 5;
export default function ScheduleDetail() {
    const { id } = useParams<{ id: string }>();
    const navigator = useNavigate()
    const pushToast = useToast();
    const pushLoading = useLoading();
    const [locationDetail, setlistLocationDetail] = useState<LocationApi.InfoLocation>()

    const [latMap, setLatMap] = useState(0)
    const [lngMap, setLngMap] = useState(0)
    const [listLocation, setListLocation] = useState<LocationApi.InfoLocation[]>([])
    const [latUser, setLatUser] = useState(0)
    const [lngUser, setLngUser] = useState(0)
    const [locationStatus, setLocationStatus] = useState<boolean>(false);
    const [directLocation, setDirectLocation] = useState<boolean>(false);
    const [directLocationlat, setDirectLocationlat] = useState(0);
    const [directLocationlng, setDirectLocationlng] = useState(0);
    const [countdown, setCountdown] = useState(0); // Bắt đầu với giá trị 10, hoặc giá trị tùy chọn khác
    const [showNotification, setShowNotification] = useState(false);

    const getlocation = async () => {
        Geolocation.getCurrentPosition()
            .then((resp) => {
                // if (mylocation === 1) {
                setLatUser(resp.coords.latitude)
                setLngUser(resp.coords.longitude)
                setLocationStatus(true)
            })
            .catch((error) => {
                console.log("không lấy được vị trí")
                setLocationStatus(false)
            });
    }

    const consultLocationDetail = async (id: number) => {
        pushLoading(true)
        const result = await LocationApi.consultLocationDetail(id)
        if (result.status) {
            setLatMap(result.data.lat)
            setLngMap(result.data.lng)
            setlistLocationDetail(result.data)
            setListLocation([result.data])
            // scrollToTopContent()
            scrollToBottom()
            metaHTML(result.data)
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

    const directLicationFunction = () => {
        if (locationStatus) {
            setDirectLocation(true)
            setDirectLocationlat(latMap)
            setDirectLocationlng(lngMap)
            // scrollToTopContent()
            scrollToBottom()
        } else {
            pushToast("Không lấy được vị trí của bạn. Vui lòng cấp phép để lấy vị trí", "warning")
        }
    }

    const scrollToBottom = () => {
        // var objDiv = document.getElementById("section-mobile");
        // if (objDiv) {
        //     objDiv.scrollTop = objDiv.scrollHeight;123
        // }
        var elementMobile = document.getElementById('section-mobile');
        if (elementMobile) {
            var scrollDiv = elementMobile.offsetTop;
            if (window.innerHeight > 250) {
                window.scrollTo({ top: scrollDiv + window.innerHeight, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: scrollDiv + 250, behavior: 'smooth' });
            }

        }
    };

    const scrollToTopContent = () => {
        const elementMobile = document.getElementById('section-mobile');
        if (elementMobile) {
            elementMobile.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const metaHTMLDefault = () => {
        var urlTitle = document.querySelector('title[class="title-index"]')
        if (urlTitle) {
            urlTitle.innerHTML = 'Chi tiết địa điểm tư vấn';
        }
    }

    useEffect(() => {
        metaHTMLDefault()
    }, [window.location.pathname]);


    const metaHTML = (data: any) => {
        var descriptionMetaText = data.description.replace(/<[^>]+>/g, '');
        var urlTitle = document.querySelector('title[class="title-index"]')
        if (urlTitle) {
            urlTitle.innerHTML = (data ? data.name : 'Địa điểm tư vấn');
        }
        var urlMeta = document.querySelector('meta[property="og:url"]')
        if (urlMeta) {
            urlMeta.setAttribute("content", `${META_URL}chi-tiet-dia-diem-tu-van/${Number(id)}`);
        }
        var typeMeta = document.querySelector('meta[property="og:type"]')
        if (typeMeta) {
            typeMeta.setAttribute("content", "website");
        }
        var titleMeta = document.querySelector('meta[property="og:title"]')
        if (titleMeta) {
            titleMeta.setAttribute("content", `${data.name}`);
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

    useEffect(() => {
        consultLocationDetail(Number(id))
    }, [id])

    useEffect(() => {
        getlocation()
    }, [])

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setTimeout(() => {
            ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }, 500)
    }, []);

    return (

        <div className='flex w-full min-h-full flex-col overflow-y-auto justify-between'>
            {/* <Helmet>
                <title>{locationDetail ? locationDetail.name : 'Địa điểm tư vấn'}</title>
            </Helmet> */}
            <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
            <div className="flex flex-col gap-3 md:gap-4">
                <div className="h-[200px] sm:h-[300px] md:h-[440px] w-full rounded-2xl overflow-hidden">
                    <img src={location_detail_banner} alt="hpv" className='img' />
                </div>
                <div className="h-fit sm:h-[250px] md:h-[300px] w-full rounded-2xl bg-[#005750] flex flex-col p-4 sm:p-6 md:p-8 justify-between gap-2">
                    <span className='text-[15px] md:text-[18px] font-[400] uppercase text-ellipsis line-clamp-3 text-white'>{locationDetail?.name}</span>
                    {locationDetail?.description ?
                        <div className="w-full flex items-start gap-2 pt-2">
                            <LocationOnIcon className='text-white !text-lg' />
                            <span className='text-xs sm:text-sm md:text-base text-white text-justify font-Alexandria text-ellipsis line-clamp-2' dangerouslySetInnerHTML={convertHTML(locationDetail?.address)}></span>
                        </div>
                        :
                        ""
                    }
                    <div className="w-full flex justify-between items-center">
                        <div className=" flex items-start gap-2">
                            <CallIcon className='text-white !text-lg' />
                            <span className='text-xs sm:text-sm md:text-base text-white font-Alexandria text-ellipsis line-clamp-1'>{locationDetail?.phone && locationDetail.phone !== "" ? locationDetail.phone : "N/A"}</span>
                        </div>
                        <div className=" flex items-start justify-end gap-2">

                            {locationDetail?.operation && locationDetail?.operation !== "" && (
                                <AccessTimeIcon className='text-white !text-lg' />
                            )}
                            <span className='text-xs sm:text-sm md:text-base text-white font-Alexandria text-ellipsis line-clamp-1'>{locationDetail?.operation}</span>
                        </div>
                    </div>
                    <div className="w-full flex justify-center gap-2 flex-wrap">
                        <div className=" flex justify-center pt-2">
                            <div className="px-4 py-2 bg-white rounded-md flex items-center justify-center text-xs sm:text-sm md:text-base font-Alexandria cursor-pointer uppercase"
                                onClick={() => {
                                    navigator(-1)
                                }}
                            >
                                Quay lại
                            </div>
                        </div>
                        <div className=" flex justify-center pt-2">
                            <div className="px-4 py-2 bg-white rounded-md flex items-center justify-center text-xs sm:text-sm md:text-base font-Alexandria cursor-pointer uppercase btn-direct"
                                onClick={() => {
                                    directLicationFunction()
                                }}
                            >
                                Chỉ đường
                            </div>
                        </div>
                    </div>

                </div>
                <div className="h-[247px] sm:h-[300px] md:h-[350px] w-full rounded-2xl overflow-hidden">
                    {/* <Map lat={latMap} lng={lngMap} listLocation={listLocation} /> */}
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

                    {/* <img src={gg_map} alt='' className='img' /> */}
                </div>
                <div ref={ref} className=""></div>
            </div>

            <Footer colorText='#606060' type='location' />
        </div>
    )
}