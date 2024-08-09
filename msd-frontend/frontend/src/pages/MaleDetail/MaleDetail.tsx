
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as NewApi from '../../api/new/newApi';
import * as NewcategoryApi from '../../api/newcategory/newcategoryApi';
import * as AccumulateApi from '../../api/token/accumulateApi';
import { baner_male_detail, male, mobile_post_1 } from '../../components/ImgExport';
import { IMAGE_URL, IMAGE_URL_CATEGORY, META_LOGO, META_URL } from '../../env';
import useLoading from '../../hook/useLoading';
import useToast from '../../hook/useToast';
import Footer from '../../router/Layout/Footer';
import * as Token from '../../services/token';
import { convertHTML } from '../../until';
import './styles.css';

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Slider from "react-slick";
import FooterDesktop from '../../router/Layout/FooterDesktop';

const FemaleDetail: React.FC = () => {
  const { url } = useParams<{ url: string }>();
  const pushToast = useToast();
  const pushLoading = useLoading();
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const [listCategoryByGender, setListCategoryByGender] = useState<NewcategoryApi.InfoCategory[]>([])
  const [category, setCategory] = useState<NewcategoryApi.InfoCategory>()
  const [listNew, setListNew] = useState<NewApi.InfoNew[]>([])
  const [limit, setLimit] = useState<number>(100)
  const [offset, setOffset] = useState<number>(0)
  const [defaultActive, setDefaultActive] = useState<number>(0)
  const [tokenUser, setTokenUser] = useState('')
  const [pageScroll, setPageScroll] = useState(0)


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => <ul>{dots}</ul>,
    customPaging: (i: any) => (
      <div className="ft-slick__dots--custom-male-detail">
      </div>
    )
  };

  const fetchListCategory = async (id: number) => {
    pushLoading(true)
    const result = await NewcategoryApi.articleCategoryByGender(1)
    if (result.status) {
      for (let index = 0; index < result.data.length; index++) {
        if (id === result.data[index].id) {
          setDefaultActive(index)
        }
      }
      setListCategoryByGender(result.data)
    } else {
      setListCategoryByGender([])
    }
    pushLoading(false)
  }

  const fetchDataCategory = async () => {
    pushLoading(true)
    const result = await NewcategoryApi.articleCategoryDetailByUrl(String(url))
    if (result.status) {
      setCategory(result.data)
      fetchListCategory(result.data.id)
      metaHTML(result.data)
    } else {
      setCategory(undefined)
      fetchListCategory(0)
      pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
    }
    pushLoading(false)
  }

  const listArticleByCategory = async (urlParam: string) => {
    pushLoading(true)
    const result = await NewApi.listArticleByUrlCategory(String(urlParam), limit, offset)
    if (result.status) {
      setListNew(result.data)
      setPageScroll(Math.ceil((result.data.length - 3) / 6))
    } else {
      setListNew([])
      pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
    }
    pushLoading(false)
  }

  const getToken = async () => {
    let token = Token.getUser();
    setTokenUser(token)
  }

  const typeAccumulated = async () => {
    const result = await AccumulateApi.typeAccumulated(tokenUser, 0, 0, 0, 0, 0, (category?.id === 4 ? 3 : 0), (category?.id === 5 ? 3 : 0), (category?.id === 6 ? 3 : 0))
  }

  const addViewArticle = async (categoryUrl: string | undefined, url: string) => {
    if (categoryUrl && url) {
      navigate(`/chi-tiet-bai-viet-du-phong-cho-nam/${categoryUrl}/${url}`)
    }
  }

  const slideSlick = (index: number) => {
    listArticleByCategory(String(listCategoryByGender[index].url))
  }

  const resetData = () => {
    setListCategoryByGender([])
  }

  const metaHTMLDefault = () => {
    var urlTitle = document.querySelector('title[class="title-index"]')
    if (urlTitle) {
      urlTitle.innerHTML = `Chi tiết dự phòng cho nam/${String(url)}`;
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
      urlTitle.innerHTML = (data ? data.title : 'Dự phòng cho nam');
    }
    if (urlMeta) {
      urlMeta.setAttribute("content", `${META_URL}chi-tiet-du-phong-cho-nam/${url}`);
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
    resetData()
  }, [])

  useEffect(() => {
    resetData()
    fetchDataCategory()
    listArticleByCategory(String(url))
    getToken()
    // typeAccumulated()
  }, [url])

  useEffect(() => {
    if (tokenUser && category) {
      typeAccumulated();
    }
  }, [tokenUser, category])

  return (
    <>
      {/* <Helmet>
        <title>{category ? category.title : 'Dự phòng cho nam'}</title>
      </Helmet> */}
      {/* tablet - desktop */}
      <div className="hidden lg:flex flex-col h-full overflow-y-auto custom-scroll-male justify-between">
        <div>
          <div className="grid grid-cols-3 w-full lg:gap-3 xl:gap-7 pb-3">
            <div className="lg:h-[170px] xl:h-[200px] xxl:h-[225px] col-span-2   relative">
              <div className="h-full w-full  ">
                <div className="rounded-2xl h-full w-full flex overflow-hidden  transition-all cursor-pointer">
                  <img src={baner_male_detail} alt="hpv" className='img' />
                </div>
              </div>
            </div>
            <div className="lg:h-[170px] xl:h-[200px] xxl:h-[225px] relative flex flex-col">
              <div className=" w-full h-full ">
                <div className="bg-[#045AFA] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"

                >
                  <div className="w-[55%] pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                    <div>
                      <p className="mb-0 text-white text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase" dangerouslySetInnerHTML={convertHTML(category?.titleHtml)}></p>
                    </div>
                    <div className="">
                      <p className="text-white text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 xxl:line-clamp-3 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(category?.description)}></p>
                    </div>
                  </div>
                  <div className=" w-[45%] flex flex-col justify-end px-4 pt-5 xxl:pt-8 relative">
                    <div className="absolute top-4 xxl:top-8 right-2 xxl:right-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                        <path d="M31.3025 0.43C31.3025 0.43 31.2125 0.36 31.1625 0.32C31.1425 0.3 31.1125 0.29 31.0925 0.27C30.9925 0.21 30.8825 0.16 30.7725 0.11C30.7125 0.09 30.6625 0.07 30.6025 0.06C30.4525 0.02 30.3025 0 30.1425 0H20.5325C19.5125 0 18.6125 0.81 18.6125 1.83C18.6125 2.86 19.5025 3.71 20.5225 3.71L25.7125 3.74L20.7025 8.76C15.6125 4.94 8.4025 5.34 3.7925 9.95C-1.2575 15 -1.2675 23.18 3.7825 28.23C8.8325 33.28 17.0225 33.27 22.0725 28.23C26.6825 23.62 27.0325 16.35 23.2825 11.33L28.3025 6.31V11.46C28.3025 12.48 29.1325 13.31 30.1525 13.31C31.1725 13.31 32.0025 12.48 32.0025 11.46V1.86C32.0025 1.29 31.7425 0.77 31.3325 0.43H31.3025ZM19.4325 25.62C15.8325 29.22 9.9625 29.22 6.3625 25.62C2.7625 22.02 2.7625 16.15 6.3625 12.55C9.9625 8.95 15.8325 8.95 19.4325 12.55C23.0325 16.15 23.0325 22.02 19.4325 25.62Z" fill="white" />
                      </svg>
                    </div>
                    <div className="!w-full !h-[90%] !aspect-square flex-shrink-0 overflow-hidden flex items-end">
                      <img
                        className='!h-full !w-full !object-contain mt-auto'
                        src={category?.img ? IMAGE_URL_CATEGORY + category?.img : male}
                        onError={(e) => {
                          e.currentTarget.src = male;
                        }}
                        alt="hpv"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 lg:gap-3 xl:gap-7">
            <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] flex flex-col justify-between gap-2">
              {listNew?.map((item, index) => {
                if (index === 0)
                  return <div className="h-full w-full">
                    <div className="hover-scale-image-male bg-white rounded-2xl h-full w-full flex gap-3 overflow-hidden transition-all cursor-pointer"
                      onClick={() => addViewArticle(category?.url, item.url)}
                    // onClick={() => navigate(`/chi-tiet-bai-viet-du-phong-cho-nu/${category?.id}/${item.id}`)}
                    >
                      <div className="w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                        <div>
                          <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] text-ellipsis line-clamp-3 lg:line-clamp-2 xl:line-clamp-3 leading-6 uppercase pt-1 font-Alexandria">{item.title}</p>
                        </div>
                        <div className="">
                          <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item.description)}>
                          </p>

                        </div>
                      </div>
                      <div className=" w-1/2 h-full pr-5 py-3 xxl:py-5 ">
                        <div className="h-full w-full rounded-2xl overflow-hidden">
                          <img
                            className='img'
                            src={item?.img ? IMAGE_URL + item?.img : male}
                            onError={(e) => {
                              e.currentTarget.src = male;
                            }}
                            alt="hpv"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
              })}
            </div>
            <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] flex flex-col justify-between gap-2">
              {listNew?.map((item, index) => {
                if (index === 1)
                  return <div className="h-full w-full">
                    <div className="hover-scale-image-male bg-white rounded-2xl h-full w-full flex gap-3 overflow-hidden transition-all cursor-pointer"
                      onClick={() => addViewArticle(category?.url, item.url)}
                    >
                      <div className="w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                        <div>
                          <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] text-ellipsis line-clamp-3 lg:line-clamp-2 xl:line-clamp-3 leading-6 uppercase pt-1 font-Alexandria">{item.title}</p>
                        </div>
                        <div className="">
                          <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item.description)}>
                          </p>

                        </div>
                      </div>
                      <div className=" w-1/2 h-full pr-5 py-3 xxl:py-5 ">
                        <div className="h-full w-full rounded-2xl overflow-hidden">
                          <img
                            className='img'
                            src={item?.img ? IMAGE_URL + item?.img : male}
                            onError={(e) => {
                              e.currentTarget.src = male;
                            }}
                            alt="hpv"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
              })}
            </div>
            <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] flex flex-col justify-between gap-2">
              {listNew?.map((item, index) => {
                if (index === 2)
                  return <div className="h-full w-full">
                    <div className="hover-scale-image-male bg-white rounded-2xl h-full w-full flex gap-3 overflow-hidden transition-all cursor-pointer"
                      onClick={() => addViewArticle(category?.url, item.url)}
                    >
                      <div className="w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                        <div>
                          <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] text-ellipsis line-clamp-3 lg:line-clamp-2 xl:line-clamp-3 leading-6 uppercase pt-1 font-Alexandria">{item.title}</p>
                        </div>
                        <div className="">
                          <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item.description)}>
                          </p>

                        </div>
                      </div>
                      <div className=" w-1/2 h-full pr-5 py-3 xxl:py-5 ">
                        <div className="h-full w-full rounded-2xl overflow-hidden">
                          <img
                            className='img'
                            src={item?.img ? IMAGE_URL + item?.img : male}
                            onError={(e) => {
                              e.currentTarget.src = male;
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
          <div className="grid grid-cols-2 llg:grid-cols-3 lg:gap-3 xl:gap-2 pt-2">
            {(() => {
              const options = [];
              for (let i = 1; i <= pageScroll; i++) {
                options.push(
                  <>
                    <div className="w-full flex gap-2 xl:pr-[10px]">
                      {listNew?.map((item, index) => {
                        if (index === (i - 1) * 6 + 3)
                          return <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] w-1/2">
                            <div className="bg-white  hover:bg-[#01ABEA] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria"
                                    dangerouslySetInnerHTML={convertHTML(item.description)}
                                  >
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                      })}
                      {listNew?.map((item, index) => {
                        if (index === (i - 1) * 6 + 4)
                          return <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] w-1/2">
                            <div className="bg-white  hover:bg-[#01ABEA] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria"
                                    dangerouslySetInnerHTML={convertHTML(item.description)}
                                  ></p>
                                </div>
                              </div>
                            </div>
                          </div>
                      })}
                    </div>
                    <div className="w-full flex gap-2 xl:px-[5px]">
                      {listNew?.map((item, index) => {
                        if (index === (i - 1) * 6 + 5)
                          return <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] w-1/2">
                            <div className="bg-white  hover:bg-[#01ABEA] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria"
                                    dangerouslySetInnerHTML={convertHTML(item.description)}
                                  >
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                      })}
                      {listNew?.map((item, index) => {
                        if (index === (i - 1) * 6 + 6)
                          return <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] w-1/2">
                            <div className="bg-white  hover:bg-[#01ABEA] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria"
                                    dangerouslySetInnerHTML={convertHTML(item.description)}
                                  ></p>
                                </div>
                              </div>
                            </div>
                          </div>
                      })}
                    </div>
                    <div className={`w-full flex gap-2 xl:pl-[10px]`}>
                      {listNew?.map((item, index) => {
                        if (index === (i - 1) * 6 + 7)
                          return <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px]  w-1/2">
                            <div className="bg-white  hover:bg-[#01ABEA] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria"
                                    dangerouslySetInnerHTML={convertHTML(item.description)}
                                  >
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                      })}
                      {listNew?.map((item, index) => {
                        if (index === (i - 1) * 6 + 8)
                          return <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px]  w-1/2">
                            <div className="bg-white  hover:bg-[#01ABEA] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria"
                                    dangerouslySetInnerHTML={convertHTML(item.description)}
                                  ></p>
                                </div>
                              </div>
                            </div>
                          </div>
                      })}
                    </div>
                  </>
                );
              }
              return options;
            })()}
          </div>
        </div>
        <Footer colorText='#606060' type='male-detail' />
      </div >
      {/* mobile - tablet dọc */}
      < div className="lg:hidden flex flex-col h-full xxl:pt-3" >
        {/* slick slide */}
        < div className="w-full h-auto flex-shrink-0 bg-[#01A5E4] rounded-2xl transition-all cursor-pointer md:mt-2"
        >
          <Slider {...settings}
            initialSlide={defaultActive}
            beforeChange={(current, next) => slideSlick(next)}
          >
            {listCategoryByGender?.map((row: any, index: any) => {
              if (row.status)
                return <div className={`w-full !h-[135px] sm:!h-[185px] px-6 pt-8 pb-8 !flex !flex-row gap-3`}>
                  <div className='w-[60%] h-full flex items-end'>
                    <p className="text-white text-base sm:text-lg md:text-[20px] font-[700] leading-6 uppercase text-ellipsis line-clamp-3" dangerouslySetInnerHTML={convertHTML(row.titleHtml)}></p>
                  </div>
                  <div className="text-white w-[40%] h-full mt-auto flex flex-col justify-end items-end gap-2">
                    <p className="text-end text-[12px] sm:text-sm md:text-[16px] md:leading-[24px] leading-[15px] line-clamp-3 text-ellipsis font-Alexandria">{row?.description}</p>
                  </div>
                </div>
            })}
          </Slider>
        </div >
        <div className="flex flex-col gap-2 sm:gap-4 w-full pt-2 sm:pt-4">

          {listNew?.map((item, index) => {
            if (index === 0)
              return <div className="w-full h-[144px] sm:h-[169px] relative flex flex-col">
                <div className=" w-full h-full ">
                  <div className="bg-[#01A5E4] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                    onClick={() => addViewArticle(category?.url, item.url)}
                  >
                    <div className="w-1/2 h-full pl-6 py-3 sm:py-5 flex flex-col justify-between">
                      <div>
                        <p className="mb-0 text-white text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                      </div>
                      <div>
                        <p className="mb-0 text-white text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3 text-justify" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                      </div>
                    </div>
                    <div className=" w-1/2 h-full pr-4 py-3 sm:py-5 ">
                      <div className="h-full w-full rounded-2xl overflow-hidden">
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
              </div>
          })}

          <div className="w-full h-[144px] sm:h-[169px] flex gap-2 sm:gap-4">
            {listNew?.map((item, index) => {
              if (index === 1 || index === 2)
                return <div className=" w-1/2 h-full">
                  <div className="bg-[#028AE9] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                    onClick={() => addViewArticle(category?.url, item.url)}
                  >
                    <div className="w-full h-full pl-6 pr-3 py-5 flex flex-col justify-between gap-2 overflow-hidden">
                      <div>
                        <p className="mb-0 text-white text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                      </div>
                      <div>
                        <p className="mb-0 text-white text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3 text-justify" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                      </div>
                    </div>
                  </div>
                </div>
            })}
          </div>
          <div className="w-full  relative flex flex-col gap-2 sm:gap-4">
            {listNew?.map((item, index) => {
              if (index > 2) {
                if (index % 2 === 1) {
                  return <div className=" w-full h-[144px] sm:h-[169px]">
                    <div className="bg-[#045AF4] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                      onClick={() => addViewArticle(category?.url, item.url)}
                    >
                      <div className="w-1/2 h-full pl-6 py-5 flex flex-col justify-between gap-2">
                        <div>
                          <p className="mb-0 text-white text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                        </div>
                        <div>
                          <p className="mb-0 text-white text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3 text-justify" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                        </div>
                      </div>
                      <div className=" w-1/2 h-full pr-4 py-3 ">
                        <div className="h-full w-full rounded-2xl overflow-hidden">
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
                } else {
                  return <div className=" w-full h-[144px] sm:h-[169px]">
                    <div className="bg-[#01A5E4] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                      onClick={() => addViewArticle(category?.url, item.url)}
                    >

                      <div className=" w-1/2 h-full pl-4 py-3 ">
                        <div className="h-full w-full rounded-2xl overflow-hidden">
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
                      <div className="w-1/2 h-full pr-6 py-5 flex flex-col justify-between gap-2">
                        <div>
                          <p className="mb-0 text-white text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                        </div>
                        <div>
                          <p className="mb-0 text-white text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3 text-justify" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                        </div>
                      </div>

                    </div>
                  </div>
                }
              }
            })}
          </div>
          <Footer colorText='#606060' type='male-detail' />
        </div>
      </div >
    </>
  )
}
export default FemaleDetail