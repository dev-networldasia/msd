import { bg_community, bg_community_mb, mobile_post_1, mobile_post_2, post_1 } from '../../components/ImgExport';
import Footer from '../../router/Layout/Footer';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as CommunityactivityApi from '../../api/communityactivities/communityactivityApi';
import * as AccumulateApi from '../../api/token/accumulateApi';
import * as NewApi from '../../api/new/newApi';
import ButtonBarFooter from '../../components/ButtonBarFooter';
import FooterSideBar from '../../components/FooterSideBar';
import { IMAGE_URL, META_URL } from '../../env';
import useDebounce from '../../hook/useDebounce';
import useLoading from '../../hook/useLoading';
import useToast from '../../hook/useToast';
import useWindowDimensions from '../../hook/useWindowDimensions';
import FooterDesktop from '../../router/Layout/FooterDesktop';
import Header from '../../router/Layout/Header';
import ModalNavigator from '../../router/Layout/ModalNavigator';
import * as Token from '../../services/token';
import { convertHTML } from '../../until';
let timeout: any, n = 5;

var ckeditorWeb: any
var ckeditorMobile: any
export default function CommunityActivitiesDetail() {
    // healthyLivingDetail
    const navigator = useNavigate()
    const pushToast = useToast();
    const pushLoading = useLoading();
    const { url } = useParams<{ url: string }>();
    const [showNotification, setShowNotification] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [newDetail, setNewDetail] = useState<CommunityactivityApi.InfoNewCommunityActivity>()
    const [listHealthyOther, setListHealthyOther] = useState<CommunityactivityApi.InfoNewCommunityActivity[]>([])
    const [createCkeditor, setCreateCkeditor] = useState(true);
    const [editorData, setEditorData] = useState<any>();
    const [listNewOther, setListNewOther] = useState<NewApi.InfoNewOther[]>([])
    const [tokenUser, setTokenUser] = useState('')

    const clickButton = async (param: string) => {
        let token = Token.getUser();
        if (token) {
            if (param === "/dia-diem-tu-van") {
                const result = await AccumulateApi.trackingButton(token, 4)
                navigator('/dia-diem-tu-van')
            } else if (param === "handleLink") {
                const result = await AccumulateApi.trackingButton(token, 5)
                handleLink()
            }
        } else {
            if (param === "/dia-diem-tu-van") {
                navigator('/dia-diem-tu-van')
            } else if (param === "handleLink") {
                handleLink()
            }
        }
    }

    // Bắt đầu với giá trị 10, hoặc giá trị tùy chọn khác
    const ckeditorEdit = useDebounce((data: any) => {
        if (createCkeditor) {
            setCreateCkeditor(false)
            ckeditorWeb = document.getElementById('content') || ''
            ckeditorMobile = document.getElementById('contentMobile') || ''
            ClassicEditor
                .create(ckeditorWeb, {
                    mediaEmbed: {
                        previewsInData: true
                    },
                }
                )
                .then(editor => {
                    const toolbarElement = editor.ui.view.toolbar.element;
                    if (toolbarElement) {
                        toolbarElement.style.display = 'none';
                    }
                    editor.enableReadOnlyMode('my-feature-id');
                })
                .catch(error => {
                    console.error(error);
                });

            ClassicEditor
                .create(ckeditorMobile, {
                    mediaEmbed: {
                        previewsInData: true
                    },
                }
                )
                .then(editor => {
                    const toolbarElement = editor.ui.view.toolbar.element;
                    if (toolbarElement) {
                        toolbarElement.style.display = 'none';
                    }
                    editor.enableReadOnlyMode('my-feature-id');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            editorData.setData(`${data}`)
        }
    }, 1000)

    const communityDetail = async () => {
        pushLoading(true)
        const result = await CommunityactivityApi.communityActivityDetail(String(url))
        if (result.status) {
            setNewDetail(result.data)
            metaHTML(result.data)
            // ckeditorEdit(result.data.content)
        } else {
            setNewDetail(undefined)
            pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
        }
        pushLoading(false)
    }

    const getListHealthyOther = async () => {
        pushLoading(true)
        const result = await CommunityactivityApi.listCommunityActivityOtherByUrl(String(url), 5, 0)
        if (result.status) {
            setListHealthyOther(result.data)
        } else {
            setListHealthyOther([])
            pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
        }
        pushLoading(false)
    }

    const addViewNew = async (url: string) => {
        pushLoading(true)
        const result = await CommunityactivityApi.insertViewCommunityActivity(String(url))
        if (result.status) {
        } else {
            pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
        }
        pushLoading(false)
    }

    const scrollToTopContent = () => {
        const elementMobile = document.getElementById('section-mobile');
        if (elementMobile) {
            elementMobile.scrollIntoView({ behavior: 'smooth' });
        }
        const elementWebsite = document.getElementById('section-website');
        if (elementWebsite) {
            elementWebsite.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const metaHTMLDefault = () => {
        var urlTitle = document.querySelector('title[class="title-index"]')
        if (urlTitle) {
            urlTitle.innerHTML = `Chi tiết hoạt động cộng đồng/${String(url)}`;
        }
    }

    useEffect(() => {
        metaHTMLDefault()
    }, [window.location.pathname]);

    const metaHTML = (data: any) => {
        var descriptionMetaText = data.description.replace(/<[^>]+>/g, '');
        var urlTitle = document.querySelector('title[class="title-index"]')
        if (urlTitle) {
            urlTitle.innerHTML = `Chi tiết hoạt động cộng đồng/${data ? data.title : 'Hoạt động cộng đồng'}`;
        }
        var urlMeta = document.querySelector('meta[property="og:url"]')
        if (urlMeta) {
            urlMeta.setAttribute("content", `${META_URL}chi-tiet-bai-viet-hoat-dong-cong-dong/${String(url)}`);
        }
        var typeMeta = document.querySelector('meta[property="og:type"]')
        if (typeMeta) {
            typeMeta.setAttribute("content", "website");
        }
        var titleMeta = document.querySelector('meta[property="og:title"]')
        if (titleMeta) {
            titleMeta.setAttribute("content", `${data.title}`);
        }
        var imageMeta = document.querySelector('meta[property="og:image"]')
        if (imageMeta) {
            imageMeta.setAttribute("content", `${IMAGE_URL}${data.img}`);
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

    const getToken = async () => {
        let token = Token.getUser();
        setTokenUser(token)
        listArticleByCategoryOtherArticle(token)
    }

    const listArticleByCategoryOtherArticle = async (token: string) => {
        if (token) {
            pushLoading(true)
            const result = await NewApi.listArticleBySitecatalystNoCategory(token, String(url), 0, 2, 0)
            if (result.status) {
                setListNewOther(result.data)
            } else {
                setListNewOther([])
                pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
            }
            pushLoading(false)
        }
    }

    useEffect(() => {
        if (url) {
            getToken()
            getListHealthyOther()
            addViewNew(String(url))
        }
    }, [url])

    useEffect(() => {
        getToken()
        scrollToTopContent()
    }, [])

    useEffect(() => {
        scrollToTopContent()
    }, [url])

    useEffect(() => {
        communityDetail()
    }, [url])


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
            {/* tablet - desktop */}
            {/* <Helmet>
                <title>{newDetail ? newDetail.title : 'Hoạt động cộng đồng'}</title>
            </Helmet> */}
            <div className="by-svh-custom w-full hidden lg:flex flex-col justify-between lg:justify-start lg:gap-3 xxl:gap-6 z-40 relative">
                <div className="absolute h-full w-full top-0 left-0 -z-[1]">
                    <img src={bg_community} className='img' alt="hpv" />
                </div>
                <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
                {/* Header */}
                {width > 976 ? (<Header handleCancel={handleCancel} handleLink={handleLink} />) : ''}
                <div className="h-full xl:h-full px-5 xxl:px-7 overflow-y-scroll flex flex-col justify-between">
                    <div className={`hidden lg:flex  ${scroll ? '!h-[537px]' : 'h-[calc(100%-62px)] xl:h-[calc(100%-62px)]'} max-h-[1000px]  gap-4 xxl:gap-4`}>
                        <div className={`w-2/3 ${scroll ? '!h-[537px]' : 'h-full'} `}>
                            <div className="w-full h-full bg-white flex flex-col justify-between pt-8 pb-5 pl-8 pr-6 rounded-3xl custom-padding-think">
                                <h1 className='w-full h-fit overflow-hidden text-[28px] font-[500] uppercase leading-10 leading-res-detail  line-clamp-2 pt-1 title-fs-res'>{newDetail?.title}</h1>
                                <div className="w-full height-content-male flex gap-4 mt-auto">
                                    <div className='w-2/3 x  overflow-y-scroll'>
                                        <div id='section-website'></div>
                                        <div
                                            id='content'
                                            className="ckeditor-content text-ellipsis text-justify text-sm xxl:text-base font-Alexandria font-[300] pr-3"
                                            dangerouslySetInnerHTML={convertHTML(newDetail?.content)}>
                                        </div>
                                    </div>

                                    <div className="w-1/3 gap-4 flex flex-col">
                                        <div className="w-full aspect-[3/2] rounded-3xl overflow-hidden flex-shrink-0">
                                            <img
                                                className='img'
                                                src={newDetail?.img ? IMAGE_URL + newDetail?.img : post_1}
                                                onError={(e) => {
                                                    e.currentTarget.src = post_1;
                                                }}
                                                alt="hpv"
                                            />
                                        </div>
                                        <div
                                            className="text-sm xxl:text-base font-Alexandria text-justify overflow-y-scroll"
                                            dangerouslySetInnerHTML={convertHTML(newDetail?.description)}>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex gap-5 py-5 items-center padding-top-button-res'>
                                    <div
                                        className="py-1 xxl:py-3 px-4 border-[#005750] hover:text-white hover:bg-[#005750] transition-all border flex justify-center items-center cursor-pointer rounded-full overflow-hidden text-sm xl:text-[18px] text-[#005750] font-Alexandria"
                                        onClick={() => clickButton('/dia-diem-tu-van')}
                                    >
                                        TÌM ĐỊA ĐIỂM TƯ VẤN
                                    </div>
                                    <div
                                        className="py-1 xxl:py-3 px-4 border-[#005750] hover:text-white hover:bg-[#005750] transition-all border flex justify-center items-center cursor-pointer rounded-full overflow-hidden text-sm xl:text-[18px] text-[#005750] font-Alexandria"
                                        // onClick={() => navigator('/dia-diem-tu-van', { state: { mylocation: 1 } })}
                                        onClick={() => clickButton('handleLink')}
                                    >
                                        ĐẶT LỊCH VỚI TRUNG TÂM Y TẾ GẦN NHẤT
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`w-1/3 ${scroll ? '!h-[537px]' : 'h-full'} relative grid grid-rows-3 gap-2 xxl:pl-3 `}>
                            {listNewOther?.map((item, index) => {
                                if (index === 0)
                                    return <div className="w-full" key={index}>
                                        <div className=" bg-white hover-scale-image-healthy rounded-3xl h-full w-full flex gap-7 overflow-hidden transition-all cursor-pointer"
                                            onClick={() => navigator(`/${item.categoryUrl}/${item.url}`)}
                                        >
                                            <div className="w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                                                <div>
                                                    <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-3 pt-1 font-Alexandria title-line-clamp-2">{item.title}</p>
                                                </div>
                                                <div className="">
                                                    <p className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5  lg:line-clamp-2 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item?.description)}></p>

                                                </div>
                                            </div>
                                            <div className=" w-1/2 h-full pr-5 xxl:pr-7 py-5 xxl:py-8 ">
                                                <div className="h-full w-full rounded-3xl overflow-hidden">
                                                    <img
                                                        className='img'
                                                        src={item?.img ? IMAGE_URL + item?.img : post_1}
                                                        onError={(e) => {
                                                            e.currentTarget.src = post_1;
                                                        }}
                                                        alt="hpv"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            })}
                            {listNewOther.length <= 0 && listHealthyOther?.map((item, index) => {
                                if (index === 0)
                                    return <div className="w-full" key={index}>
                                        <div className=" bg-white hover-scale-image-healthy rounded-3xl h-full w-full flex gap-7 overflow-hidden transition-all cursor-pointer"
                                            onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                        >
                                            <div className="w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                                                <div>
                                                    <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-3 pt-1 font-Alexandria">{item.title}</p>
                                                </div>
                                                <div className="">
                                                    <p className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5  lg:line-clamp-2 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item?.description)}></p>

                                                </div>
                                            </div>
                                            <div className=" w-1/2 h-full pr-5 xxl:pr-7 py-5 xxl:py-8 ">
                                                <div className="h-full w-full rounded-3xl overflow-hidden">
                                                    <img
                                                        className='img'
                                                        src={item?.img ? IMAGE_URL + item?.img : post_1}
                                                        onError={(e) => {
                                                            e.currentTarget.src = post_1;
                                                        }}
                                                        alt="hpv"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            })}

                            <div className="grid gap-2 w-full grid-cols-2">
                                {listHealthyOther?.map((item, index) => {
                                    if ((index + (listNewOther.length > 0 ? 1 : 0) === 1) || (index + (listNewOther.length > 0 ? 1 : 0) === 2))
                                        return <div key={index} className="bg-white hover-scale-image-healthy rounded-3xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                                            onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                        >
                                            <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                                <div>
                                                    <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                                </div>
                                                <div className="">
                                                    <p className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5  lg:line-clamp-2 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item?.description)}></p>

                                                </div>
                                            </div>
                                        </div>
                                })}
                            </div>
                            {listHealthyOther?.map((item, index) => {
                                if (index + (listNewOther.length > 0 ? 1 : 0) === 3)
                                    return <div key={index} className="w-full ">
                                        <div className=" bg-white hover-scale-image-healthy rounded-3xl h-full w-full flex gap-7 overflow-hidden transition-all cursor-pointer"
                                            onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                        >
                                            <div className="w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                                                <div>
                                                    <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-3 pt-1 font-Alexandria title-line-clamp-2">{item.title}</p>
                                                </div>
                                                <div className="">
                                                    <p className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5  lg:line-clamp-2 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item?.description)}></p>

                                                </div>
                                            </div>
                                            <div className=" w-1/2 h-full pr-5 xxl:pr-7 py-5 xxl:py-8 ">
                                                <div className="h-full w-full rounded-3xl overflow-hidden">
                                                    <img
                                                        className='img'
                                                        src={item?.img ? IMAGE_URL + item?.img : post_1}
                                                        onError={(e) => {
                                                            e.currentTarget.src = post_1;
                                                        }}
                                                        alt="hpv"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            })}
                        </div>
                    </div>
                    <Footer colorText='#606060' type='community-post' />

                </div>
                {width > 976 ? (<ButtonBarFooter handleLink={handleLink} />) : ''}
            </div>
            {/* mobile */}
            <div className=' h-full flex lg:hidden flex-col overflow-y-scroll relative'>
                <div className="fixed h-[100vh] w-full top-0 left-0 -z-[1]">
                    <img src={bg_community_mb} className='block lg:hidden h-full w-full' alt="hpv" />
                </div>
                <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />

                <div className="fixed top-0 left-0 w-full h-10 md:h-[56px] rounded-b-md overflow-hidden z-999">

                    <img src={bg_community_mb} className='absolute top-0 left-0 w-full h-full object-top -z-10' alt="hpv" />
                    {width > 976 ? '' : (<Header handleCancel={handleCancel} handleLink={handleLink} />)}
                </div>
                <div className="pt-10 pb-14 by-svh-custom md:pt-[56px] px-5 xxl:px-7 overflow-scroll">
                    {/* mobile */}
                    <div className={`lg:hidden flex flex-col justify-between ${listHealthyOther.length < 4 ? 'h-full' : ''} gap-2 `}>
                        <div className="flex flex-col  gap-2">
                            <div className="flex h-auto w-full ">
                                <div className="w-full h-full relative flex flex-col  xxl:pl-3">
                                    <div className=" w-full h-full ">
                                        <div className="h-full w-full bg-white rounded-3xl  flex overflow-hidden transition-all cursor-pointer"
                                        >
                                            <div className="w-full p-6 flex flex-col gap-[14px]">
                                                <div className='w-full  gap-2'>
                                                    <div className=" flex flex-col gap-1">
                                                        <div className="text-sm text-left">
                                                            <figure className=" image image-style-side rounded-3xl overflow-hidden !mt-0">
                                                                <img
                                                                    className='img '
                                                                    src={newDetail?.img ? IMAGE_URL + newDetail?.img : post_1}
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = post_1;
                                                                    }}
                                                                    alt="hpv"
                                                                />
                                                            </figure>
                                                            <p className=" text-black text-[17px] md:text-[26px] -tracking-[0.34px] md:leading-9 uppercase mb-[25px] text-left font-Alexandria" id='section-mobile'>{newDetail?.title}</p>
                                                            <div
                                                                className='font-[300] text-sm md:text-[18px] font-Alexandria'
                                                                dangerouslySetInnerHTML={convertHTML(newDetail?.description)}

                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    id='contentMobile'
                                                    className="ckeditor-content text-black text-[15px] leading-6 font-[300] font-Alexandria box-content"
                                                    dangerouslySetInnerHTML={convertHTML(newDetail?.content)}
                                                >
                                                </div>
                                                <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2">
                                                    <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#00A8AE] text-white text-[15px] font-Alexandria -tracking-[0.3px] cursor-pointer" onClick={() => clickButton('/dia-diem-tu-van')}>
                                                        TÌM ĐỊA ĐIỂM TƯ VẤN
                                                    </div>
                                                    <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#00A8AE] text-white text-[15px] font-Alexandria -tracking-[0.3px] cursor-pointer"
                                                        // onClick={() => navigator('/dia-diem-tu-van', { state: { mylocation: 1 } })}
                                                        onClick={() => clickButton('handleLink')}
                                                    >
                                                        ĐẶT LỊCH VỚI TRUNG TÂM Y TẾ GẦN NHẤT
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full ">
                                <div className="w-full  flex gap-2">
                                    {listNewOther.length > 0 && listNewOther?.map((item, index) => {
                                        if (index === 0 || index === 1)
                                            return <div key={index} className=" w-1/2 h-[144px] sm:h-[169px] 1231233123"
                                                onClick={() => navigator(`/${item.categoryUrl}/${item.url}`)}
                                            >
                                                <div className={`${index === 1 ? 'bg-[#42B1A5]' : ' bg-[#40CDAB]'} rounded-3xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer`}
                                                >
                                                    <div className="w-full h-full pl-6 pr-3 py-5 flex flex-col justify-between overflow-hidden">
                                                        <div>
                                                            <p className="mb-0 text-white text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                                                        </div>
                                                        <div>
                                                            <p className="mb-0 text-white text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    })}
                                    {listNewOther.length <= 0 && listHealthyOther.length > 0 && listHealthyOther?.map((item, index) => {
                                        if (index === 0 || index === 1)
                                            return <div key={index} className=" w-1/2 h-[144px] sm:h-[169px]"
                                                onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                            >
                                                <div className={`${index === 1 ? 'bg-[#42B1A5]' : ' bg-[#40CDAB]'} rounded-3xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer`}
                                                >
                                                    <div className="w-full h-full pl-6 pr-3 py-5 flex flex-col justify-between overflow-hidden">
                                                        <div>
                                                            <p className="mb-0 text-white text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                                                        </div>
                                                        <div>
                                                            <p className="mb-0 text-white text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    })}
                                </div>
                                <div className="w-full  relative flex flex-col">
                                    {listHealthyOther?.map((item, index) => {
                                        if (index + (listNewOther.length) === 2)
                                            return <div key={index} className=" w-full h-[144px] sm:h-[169px]"
                                                onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                            >
                                                <div className="bg-white rounded-3xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                                                >
                                                    <div className="w-1/2 h-full pl-6 py-5 flex flex-col justify-between gap-2">
                                                        <div>
                                                            <p className="mb-0 text-black text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                                                        </div>
                                                        <div>
                                                            <p className="mb-0 text-black text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                                                        </div>
                                                    </div>
                                                    <div className=" w-1/2 h-full pr-4 py-3 ">
                                                        <div className="h-full w-full rounded-3xl overflow-hidden">
                                                            <img
                                                                className='img'
                                                                src={item?.imgMobile ? IMAGE_URL + item?.imgMobile : mobile_post_1}
                                                                onError={(e) => {
                                                                    e.currentTarget.src = mobile_post_1;
                                                                }}
                                                                alt="hpv"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    })}

                                </div>

                                {listHealthyOther.length + listNewOther.length > 3 && listHealthyOther?.map((item, index) => {
                                    if (index + (listNewOther.length) > 2) {
                                        if (index % 2 === 0) {
                                            return <div key={index} className="w-full h-[144px] sm:h-[169px] relative flex flex-col"
                                                onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                            >
                                                <div className=" w-full h-full ">
                                                    <div className="bg-white rounded-3xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                                                    >
                                                        <div className="w-1/2 h-full pl-6 py-5 flex flex-col justify-between gap-2">
                                                            <div>
                                                                <p className="mb-0 text-black text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 text-black text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                                                            </div>
                                                        </div>
                                                        <div className=" w-1/2 h-full pr-4 py-3 ">
                                                            <div className="h-full w-full rounded-3xl overflow-hidden">
                                                                <img
                                                                    className='img'
                                                                    src={item?.imgMobile ? IMAGE_URL + item?.imgMobile : mobile_post_1}
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = mobile_post_2;
                                                                    }}
                                                                    alt="hpv"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        } else {
                                            return <div className="w-full h-[144px] sm:h-[169px] relative flex flex-col"
                                                onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                            >
                                                <div className=" w-full h-full ">
                                                    <div className=" bg-white rounded-3xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                                                    >
                                                        <div className=" w-1/2 h-full pl-4 py-3 ">
                                                            <div className="h-full w-full rounded-3xl overflow-hidden">
                                                                <img
                                                                    className='img'
                                                                    src={item?.imgMobile ? IMAGE_URL + item?.imgMobile : mobile_post_1}
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = mobile_post_2;
                                                                    }}
                                                                    alt="hpv"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-1/2 h-full pr-6 py-5 flex flex-col justify-between gap-2">
                                                            <div>
                                                                <p className="mb-0 text-black text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 text-black text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    }
                                })}

                            </div>
                        </div>
                        <Footer colorText='606060' type='community-post' />
                    </div >
                </div>
                <div className="fixed bottom-0 left-0 w-full h-14 bg-white rounded-t-2xl overflow-hidden z-40">
                    <FooterSideBar curPathLink={curPathLink} handleCancel={handleCancel} />
                </div>
                {width > 976 ? '' : (<ButtonBarFooter handleLink={handleLink} />)}

                {/* <div className="flex gap-3 flex-col fixed bottom-20 md:bottom-20 right-2 md:right-[30px] z-50" >
                    <div className="h-[35px] md:h-[50px] xxl:h-[55px] p-2 xxl:p-0 w-[35px] md:w-[50px] xxl:w-[55px] flex justify-center items-center rounded-[50%] bg-[#00c6e4] shadow-md cursor-pointer hover:bg-[#47a1af]"
                        onClick={() => window.location.href = 'https://m.me/hpvvietnam?ref=botshare'}

                    >
                        <img src={message2} alt="hpv" />
                    </div>
                    <div className="h-[35px] md:h-[50px] xxl:h-[55px] p-2 xxl:p-0 w-[35px] md:w-[50px] xxl:w-[55px] hidden lg:flex justify-center items-center rounded-[50%] bg-[#00c6e4] shadow-md cursor-pointer hover:bg-[#47a1af]"
                        onClick={() => clickButton('/dia-diem-tu-van')}
                    >
                        <LocationOnIcon className="text-white !text-[25px]" />
                    </div>
                    <div
                        className="h-[35px] md:h-[50px] xxl:h-[55px] p-2 xxl:p-0 w-[35px] md:w-[50px] xxl:w-[55px] flex justify-center items-center rounded-[50%] bg-[#00c6e4] shadow-md cursor-pointer hover:bg-[#47a1af]"
                        onClick={() => clickButton('handleLink')}
                    >
                        <img src={location_round} alt="hpv" />

                    </div>
                </div> */}
            </div>


        </>
    )
}
