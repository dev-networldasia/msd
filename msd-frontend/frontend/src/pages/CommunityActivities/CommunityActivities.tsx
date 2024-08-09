
import { useNavigate } from 'react-router-dom';
import { banner_community, mobile_post_2, post_1, team_work } from '../../components/ImgExport';
import Footer from '../../router/Layout/Footer';
import { useEffect, useLayoutEffect, useState } from 'react';
import * as BannerApi from '../../api/banner/bannerApi';
import * as CommunityactivityApi from '../../api/communityactivities/communityactivityApi';
import { IMAGE_URL, META_LOGO, META_URL } from '../../env';
import useLoading from '../../hook/useLoading';
import useToast from '../../hook/useToast';
import useWindowDimensions from '../../hook/useWindowDimensions';
import { convertHTML } from '../../until';
interface CommunityActivitiesProps {
    category: number
}
const CommunityActivities = () => {
    const navigator = useNavigate()
    const pushToast = useToast();
    const [bannerMobile, setBannerMobile] = useState<BannerApi.ImgMobile[]>([])
    const [banner, setBanner] = useState<BannerApi.Img[]>([])
    const pushLoading = useLoading();
    const [listNew, setListNew] = useState<CommunityactivityApi.InfoNewCommunityActivity[]>([])
    const [scroll, setScroll] = useState(false)
    const { width, height } = useWindowDimensions();
    const bannerDetail = async () => {
        pushLoading(true);
        const result = await BannerApi.bannerDetail(7)
        if (result.status) {
            setBanner(result.data.img)
            setBannerMobile(result.data.imgMobile)
        } else {
            setBanner([])
            setBannerMobile([])
        }
        pushLoading(false);
    }
    const fetchListNewHealthy = async () => {
        pushLoading(true)
        const result = await CommunityactivityApi.listCommunityActivity()
        if (result.status) {
            setListNew(result.data)
        } else {
            setListNew([])
            pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
        }
        pushLoading(false)
    }
    const metaHTML = () => {
        var urlMeta = document.querySelector('meta[property="og:url"]')
        var urlTitle = document.querySelector('title[class="title-index"]')
        if (urlTitle) {
            urlTitle.innerHTML = 'Hoạt động cộng đồng';
        }
        if (urlMeta) {
            urlMeta.setAttribute("content", `${META_URL}hoat-dong-cong-dong`);
        }
        var typeMeta = document.querySelector('meta[property="og:type"]')
        if (typeMeta) {
            typeMeta.setAttribute("content", "website");
        }
        var titleMeta = document.querySelector('meta[property="og:title"]')
        if (titleMeta) {
            titleMeta.setAttribute("content", `Hoạt động cộng đồng`);
        }
        var imageMeta = document.querySelector('meta[property="og:image"]')
        if (imageMeta) {
            imageMeta.setAttribute("content", `${META_LOGO}`);
        }
        var imageMeta = document.querySelector('meta[property="og:description"]')
        if (imageMeta) {
            imageMeta.setAttribute("content", `Hoạt động cộng đồng`);
        }
        var descriptionMeta = document.querySelector('meta[name="description"]')
        if (descriptionMeta) {
            descriptionMeta.setAttribute("content", `Hoạt động cộng đồng`);
        }
    }
    useEffect(() => {
        fetchListNewHealthy()
        metaHTML()
        bannerDetail()
    }, [])
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
                <title>Hoạt động cộng đồng</title>
            </Helmet> */}
            {/* tablet - desktop */}
            <div className="hidden h-full lg:flex flex-col justify-between">
                <div className={`flex gap-3 h-[calc(100%-62px)] min-h-[526px] max-h-[1000px] w-full py-0`}>
                    <div className="w-1/3 lg:h-[526px] xxl:h-[616px] flex flex-col ">
                        <div className="w-full h-full flex flex-col gap-[12px]">
                            <div className={` w-full flex h-2/3  flex-col`}>
                                <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden relative cursor-pointer"
                                >
                                    {banner.length === 0 ?
                                        <img src={banner_community} alt="hpv" className='img' />
                                        :
                                        <img
                                            src={banner[0].img ? IMAGE_URL + banner[0].img : banner_community}

                                            alt="hpv" className='img' />
                                    }
                                </div>
                            </div>
                            <div className=" w-full flex flex-col h-1/3 ">
                                <div className="w-full flex items-end h-full rounded-2xl bg-[#40AFA3] overflow-hidden relative" >
                                    <span className='text-white text-[30px] xxl:text-[40px] font-[500]  pl-4 xl:pl-6 pb-3 uppercase'>Hoạt động <br /> Cộng đồng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3 flex flex-col  h-full overflow-y-scroll">
                        <div className="grid grid-cols-2 gap-7">
                            {listNew?.map((item, index) => {
                                if (index === 0 || index === 1)
                                    return <div className="lg:h-[170px] xxl:h-[200px] w-full" key={index}>
                                        <div className="hover-scale-image-healthy bg-white rounded-2xl h-full w-full flex gap-3 overflow-hidden transition-all cursor-pointer"
                                            onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                        >
                                            <div className="w-[45%] xl:w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                                                <div>
                                                    <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] text-ellipsis line-clamp-3 leading-6 uppercase font-Alexandria">{item.title}</p>
                                                </div>
                                                <div className="">
                                                    <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item.description)}>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" w-[55%] xl:w-1/2 h-full flex items-center pr-5 xxl:pr-7 py-5 xxl:py-8 ">
                                                <div className="max-h-full w-full rounded-2xl overflow-hidden">
                                                    <img
                                                        className='h-full w-full'
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
                        <div className="grid grid-cols-2 gap-7 py-2">
                            <div className="lg:h-[170px] xxl:h-[200px]  w-full flex gap-2">
                                {listNew?.map((item, index) => {
                                    if (index === 2 || index === 3)
                                        return <div className="h-full w-1/2" key={index}>
                                            <div className="bg-white hover-scale-image-healthy rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                                                onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                            >
                                                <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                                    <div>
                                                        <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                                    </div>
                                                    <div className="">
                                                        <p className="text-black text-xs xxl:text-sm leading-[17px] line-clamp-2 xxl:line-clamp-2 text-ellipsis font-Alexandria"
                                                            dangerouslySetInnerHTML={convertHTML(item.description)}
                                                        >
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                })}
                            </div>
                            <div className="lg:h-[170px] xxl:h-[200px]  w-full flex gap-2">
                                {listNew?.map((item, index) => {
                                    if (index === 4 || index === 5)
                                        return <div className="h-full w-1/2" key={index}>
                                            <div className="bg-white hover-scale-image-healthy rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                                                onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                            // onClick={() => addViewArticle(category?.url, item.url)}
                                            >
                                                <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                                    <div>
                                                        <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                                    </div>
                                                    <div className="">
                                                        <p className="text-black text-xs xxl:text-sm leading-[17px] line-clamp-2 xxl:line-clamp-2 text-ellipsis font-Alexandria"
                                                            dangerouslySetInnerHTML={convertHTML(item.description)}
                                                        >
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                })}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 ">
                            {listNew?.map((item, index) => {
                                if (index > 5)
                                    return <div key={index} className={`${index % 2 === 0 ? 'pr-[10px]' : 'pl-[10px]'} lg:h-[170px] xxl:h-[200px]  w-full`}>
                                        <div className="hover-scale-image-healthy bg-white rounded-2xl h-full w-full flex gap-3 overflow-hidden transition-all cursor-pointer"
                                            onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                        >
                                            <div className="w-[45%] xl:w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                                                <div>
                                                    <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] text-ellipsis line-clamp-3 leading-6 uppercase font-Alexandria">{item.title}</p>
                                                </div>
                                                <div className="">
                                                    <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item.description)}>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" w-[55%] xl:w-1/2 h-full flex items-center pr-5 xxl:pr-7 py-5 xxl:py-8 ">
                                                <div className="max-h-full  w-full rounded-2xl overflow-hidden">
                                                    <img
                                                        className='w-full h-full'
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

                </div>
                <Footer colorText='#606060' type='community' />
            </div>
            {/* mobile */}
            <div className={`lg:hidden flex flex-col gap-2 w-full overflow-y-scroll ${listNew.length < 4 ? 'h-full' : 'h-fit'} `}>
                <div className={`${scroll ? '!min-h-[310px]' : ''} w-full h-[43%]`}>
                    <div
                        className="w-full flex h-full rounded-2xl bg-white overflow-hidden relative"
                    >
                        {bannerMobile.length === 0 ?
                            <img src={team_work} alt="hpv" className=' img' />
                            :
                            <img
                                src={bannerMobile[0].imgMobile ? IMAGE_URL + bannerMobile[0].imgMobile : team_work}

                                alt="hpv" className=' img' />
                        }
                        <div className="absolute bottom-7 left-5 text-[16px] sm:text-lg md:text-xl font-[500] text-white"></div>
                    </div>
                </div>
                <div className={`${scroll ? '!min-h-[410px]' : ''} w-full ${listNew.length < 4 ? 'h-full' : 'h-fit'} relative flex flex-col`}>
                    <div className="w-full">
                        <div className="bg-[#42AEA1] rounded-lg h-full w-full flex overflow-hidden py-4 px-4 transition-all cursor-default"
                        >
                            <div className="w-full h-full flex justify-between items-center">
                                <span className='w-full flex-shrink-0 text-sm md:text-[20px] md:leading-[28px] font-[500] uppercase text-white'>Hoạt động <br className='md:hidden block' /> cộng đồng</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-4/5 flex flex-col w-full ">
                        {listNew.length > 0 &&
                            <div className="w-full min-h-[144px] h-[144px] sm:!h-[169px] sm:min-h-[169px] pt-2 relative flex flex-col">
                                {listNew?.map((item, index) => {
                                    if (index === 0)
                                        return <div className=" w-full h-full" key={index}>
                                            <div className=" bg-[#005750] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                                                onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                            >
                                                <div className="w-1/2 h-full pl-6 py-5 flex flex-col justify-between gap-2">
                                                    <div>
                                                        <p className="mb-0 text-white text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 text-white text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                                                    </div>
                                                </div>
                                                <div className=" w-1/2 h-full pr-4 py-3 ">
                                                    <div className="h-full w-full rounded-2xl overflow-hidden">
                                                        <img
                                                            className='img'
                                                            src={item?.imgMobile ? IMAGE_URL + item?.imgMobile : post_1}
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
                        }
                        {listNew.length > 1 &&
                            <div className="w-full min-h-[144px] h-[144px] sm:!h-[169px] sm:min-h-[169px] pt-2 flex gap-2">
                                {listNew?.map((item, index) => {
                                    if (index === 1 || index === 2)
                                        return <div className=" w-1/2 h-full" key={index}>
                                            <div className={` ${index === 1 ? 'bg-[#40CDAC]' : 'bg-[#40B0A4]'}  rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer`}
                                                onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
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
                        }
                        {listNew?.map((item, index) => {
                            if (index === 3) {
                                return <div className="w-full min-h-[144px] h-[144px] sm:!h-[169px] sm:min-h-[169px] pt-2 relative flex flex-col" key={index}>
                                    <div className=" w-full h-full ">
                                        <div className=" bg-white rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                                            onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
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
                                                <div className="h-full w-full rounded-2xl overflow-hidden">
                                                    <img
                                                        className='img'
                                                        src={item?.imgMobile ? IMAGE_URL + item?.imgMobile : mobile_post_2}
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
                            }
                        })}
                        {listNew.length > 4 && (
                            <div className="w-full min-h-[144px] h-[144px] sm:!h-[169px] sm:min-h-[169px] pt-2 flex gap-2">
                                {listNew?.map((item, index) => {
                                    if (index === 4 || index === 5)
                                        return <div className=" w-1/2 h-full" key={index}>
                                            <div className={` ${index === 4 ? 'bg-[#40CDAC]' : 'bg-[#40B0A4]'}  rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer`}
                                                onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
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
                        )}
                        {listNew?.map((item, index) => {
                            if (index > 5) {
                                if (index % 2 === 0) {
                                    return <div className="w-full min-h-[144px] h-[144px] sm:!h-[169px] sm:min-h-[169px] pt-2 relative flex flex-col" key={index}>
                                        <div className=" w-full h-full ">
                                            <div className=" bg-white rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                                                onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
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
                                                    <div className="h-full w-full rounded-2xl overflow-hidden">
                                                        <img
                                                            className='img'
                                                            src={item?.imgMobile ? IMAGE_URL + item?.imgMobile : mobile_post_2}
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
                                    return <div className="w-full min-h-[144px] h-[144px] sm:!h-[169px] sm:min-h-[169px] pt-2 relative flex flex-col">
                                        <div className=" w-full h-full ">
                                            <div className=" bg-white rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                                                onClick={() => navigator(`/chi-tiet-bai-viet-hoat-dong-cong-dong/${item.url}`)}
                                            >
                                                <div className=" w-1/2 h-full pl-4 py-3 ">
                                                    <div className="h-full w-full rounded-2xl overflow-hidden">
                                                        <img
                                                            className='img'
                                                            src={item?.imgMobile ? IMAGE_URL + item?.imgMobile : mobile_post_2}
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
                <div className="">
                    <Footer colorText='#606060' type='community' />
                </div>
            </div>
        </>
    )
}
export default CommunityActivities