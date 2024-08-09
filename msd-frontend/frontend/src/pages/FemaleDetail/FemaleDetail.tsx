
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import * as NewApi from '../../api/new/newApi';
import * as NewcategoryApi from '../../api/newcategory/newcategoryApi';
import * as AccumulateApi from '../../api/token/accumulateApi';
import { female, female_baner_detail, mobile_post_1 } from '../../components/ImgExport';
import { IMAGE_URL, IMAGE_URL_CATEGORY, META_LOGO, META_URL } from '../../env';
import useLoading from '../../hook/useLoading';
import useToast from '../../hook/useToast';
import Footer from '../../router/Layout/Footer';
import * as Token from '../../services/token';
import { convertHTML } from '../../until';
import './styles.css';

import Slider from "react-slick";
import FooterDesktop from '../../router/Layout/FooterDesktop';

const FemaleDetail: React.FC = () => {
  const { url } = useParams<{ url: string }>();
  const pushToast = useToast();
  const pushLoading = useLoading();
  const navigate = useNavigate()
  const [listCategoryByGender, setListCategoryByGender] = useState<NewcategoryApi.InfoCategory[]>([])
  const [category, setCategory] = useState<NewcategoryApi.InfoCategory>()
  const [listNew, setListNew] = useState<NewApi.InfoNew[]>([])
  const [limit, setLimit] = useState<number>(100)
  const [offset, setOffset] = useState<number>(0)
  const [defaultActive, setDefaultActive] = useState<number>(0)
  const [tokenUser, setTokenUser] = useState('')
  const [pageScroll, setPageScroll] = useState(0)
  const [pageScrollTablet, setPageScrollTablet] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => <ul>{dots}</ul>,
    customPaging: (i: any) => (
      <div className="ft-slick__dots--custom-female-detail">
      </div>
    )
  };

  const fetchListCategory = async (id: number) => {
    pushLoading(true)
    const result = await NewcategoryApi.articleCategoryByGender(0)
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
      setPageScrollTablet(Math.ceil((result.data.length - 3) / 4))
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
    const result = await AccumulateApi.typeAccumulated(tokenUser, 0, 0, (category?.id === 1 ? 3 : 0), (category?.id === 2 ? 3 : 0), (category?.id === 3 ? 3 : 0), 0, 0, 0)
  }

  const addViewArticle = async (categoryUrl: string | undefined, url: string) => {
    if (categoryUrl && url) {
      navigate(`/chi-tiet-bai-viet-du-phong-cho-nu/${categoryUrl}/${url}`)
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
      urlTitle.innerHTML = `Chi tiết dự phòng cho nữ/${String(url)}`;
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
      urlTitle.innerHTML = (data ? data.title : 'Dự phòng cho nữ');
    }
    if (urlMeta) {
      urlMeta.setAttribute("content", `${META_URL}chi-tiet-du-phong-cho-nu/${url}`);
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
  // const test = () => {
  //   var srcHeatmap = document.querySelector('script[id="hmsas-22-domain-name"]')
  //   if (srcHeatmap) {
  //     srcHeatmap.setAttribute("src", `https://heatmap.bdata.asia/analytics/script-loader/1878791705046600-1`);
  //   }
  // }
  useEffect(() => {
    // test()
    resetData()
  }, [])
  const script1111111111 = `console.log('This is a script');`;
  useEffect(() => {
    resetData()
    fetchDataCategory()
    // metaHTML(category)
    listArticleByCategory(String(url))
    getToken()
    // typeAccumulated()
  }, [url])
  // }, [id])

  useEffect(() => {
    if (tokenUser && category) {
      typeAccumulated();
    }
  }, [tokenUser, category])

  return (
    <>
      {/* <Helmet>
        <title>{category ? category.title : 'Dự phòng cho nữ'}</title>
      </Helmet> */}
      {/* tablet ngang - desktop */}
      <div className="hidden lg:flex flex-col h-full overflow-y-auto custom-scroll-female justify-between">
        <div>
          <div className="grid grid-cols-3 w-full lg:gap-3 xl:gap-7 ">
            <div className=" lg:h-[170px] xl:h-[200px] xxl:h-[225px] col-span-2 pb-2 relative">
              <div className="h-full w-full  ">
                <div className="rounded-2xl h-full w-full flex overflow-hidden  transition-all cursor-pointer relative">
                  <span className='text-xl xxl:text-xl uppercase absolute bottom-6 left-6 font-[700] z-10'>Phòng vệ HPV</span>
                  <span className='text-xl xxl:text-xl absolute bottom-6 right-6 font-[500] z-10'>Cộng Đồng Phòng Vệ HPV</span>
                  <img src={female_baner_detail} alt="hpv" className='img' />
                </div>
              </div>
            </div>
            <div className=" lg:h-[170px] xl:h-[200px] xxl:h-[225px] relative flex flex-col pb-2 ">
              <div className=" w-full h-full ">
                <div className="bg-[#FDE533] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                >
                  <div className="w-[55%] pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                    <div>
                      <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase" dangerouslySetInnerHTML={convertHTML(category?.titleHtml)}></p>
                    </div>
                    <div className="">
                      <p className="text-black text-xs xxl:text-sm leading-[17px] line-clamp-2 xxl:line-clamp-3 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(category?.description)}></p>
                    </div>
                  </div>
                  <div className=" w-[45%] flex flex-col justify-end px-4 pt-5 xxl:pt-8 relative">
                    <div className="absolute top-4 xxl:top-8 right-2 xxl:right-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="39" viewBox="0 0 26 39" fill="none">
                        <path d="M25.3 12.67C25.3 5.67 19.63 0 12.63 0C5.63 0 0 5.67 0 12.67C0 19.05 4.75 24.33 10.9 25.21V29.38H7.94C6.94 29.38 6.16 30.15 6.16 31.15C6.16 32.16 6.95 32.98 7.94 32.98H10.9V36.56C10.9 37.56 11.66 38.37 12.66 38.37C13.66 38.37 14.42 37.56 14.42 36.56V32.98H17.36C18.36 32.98 19.17 32.16 19.17 31.17C19.17 30.17 18.36 29.38 17.36 29.38H14.42V25.21C20.66 24.33 25.3 19.05 25.3 12.67ZM12.65 21.72C7.66 21.72 3.6 17.66 3.6 12.67C3.6 7.68 7.65 3.62 12.64 3.62C17.63 3.62 21.69 7.68 21.69 12.67C21.69 17.66 17.63 21.72 12.64 21.72H12.65Z " fill="black" aria-hidden='true' aria-label='svg' aria-labelledby='svg-labelledby' aria-describedby='svg-describedby' />
                      </svg>
                    </div>
                    <div className="!w-full !h-[90%] !aspect-square flex-shrink-0 overflow-hidden flex items-end">
                      <img
                        className='!h-full !w-full !object-contain mt-auto'
                        src={category?.img ? IMAGE_URL_CATEGORY + category?.img : female}
                        onError={(e) => {
                          e.currentTarget.src = female;
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
                  return <div className="h-full w-full" key={index}>
                    <div className="hover-scale-image bg-white rounded-2xl h-full w-full flex gap-3 overflow-hidden transition-all cursor-pointer"
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
                      <div className=" w-1/2 h-full pr-5 py-3 xxl:py-8 ">
                        <div className="h-full w-full rounded-2xl overflow-hidden">
                          <img
                            className='img'
                            src={item?.img ? IMAGE_URL + item?.img : female}
                            onError={(e) => {
                              e.currentTarget.src = female;
                            }}
                            alt="hpv"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
              })}
            </div>
            {listNew?.map((item, index) => {
              if (index === 1)
                return <div key={index} className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] flex flex-col justify-between gap-2">
                  <div className="h-full w-full" >
                    <div className="hover-scale-image bg-white rounded-2xl h-full w-full flex gap-3 overflow-hidden transition-all cursor-pointer"
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
                      <div className=" w-1/2 h-full pr-5 py-3 xxl:py-8 ">
                        <div className="h-full w-full rounded-2xl overflow-hidden">
                          <img
                            className='img'
                            src={item?.img ? IMAGE_URL + item?.img : female}
                            onError={(e) => {
                              e.currentTarget.src = female;
                            }}
                            alt="hpv"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            })}

            {listNew.length > 0 && listNew?.map((item, index) => {
              if (index === 2)
                return (
                  <div key={item.id} className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] flex flex-col justify-between gap-2">
                    <div className="h-full w-full" >
                      <div className="hover-scale-image bg-white rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
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
                        <div className=" w-1/2 h-full pr-5 py-3 xxl:py-8 ">
                          <div className="h-full w-full rounded-2xl overflow-hidden">
                            <img
                              className='img'
                              src={item?.img ? IMAGE_URL + item?.img : female}
                              onError={(e) => {
                                e.currentTarget.src = female;
                              }}
                              alt="hpv"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            })}
          </div>
          <div className='grid grid-cols-2 llg:grid-cols-3 lg:gap-3 xl:gap-2 pt-2'>
            {(() => {
              const options = [];
              for (let i = 1; i <= pageScroll; i++) {
                options.push(
                  <>
                    <div className="w-full flex gap-2 xl:pr-[10px]">
                      {listNew?.map((item, index) => {
                        if (index === (i - 1) * 6 + 3)
                          return <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] w-1/2" key={index}>
                            <div className="bg-white  hover:bg-[#FFF298] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 xxl:line-clamp-2 text-ellipsis font-Alexandria"
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
                          return <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] w-1/2" key={index}>
                            <div className="bg-white  hover:bg-[#FFF298] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 xxl:line-clamp-2 text-ellipsis font-Alexandria"
                                    dangerouslySetInnerHTML={convertHTML(item.description)}
                                  ></p>
                                </div>
                              </div>
                            </div>
                          </div>
                      })}
                    </div>
                    <div className=" w-full flex gap-2 xl:px-[5px]">
                      {listNew?.map((item, index) => {
                        if (index === (i - 1) * 6 + 5)
                          return <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] w-1/2" key={index}>
                            <div className="bg-white  hover:bg-[#FFF298] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 xxl:line-clamp-2 text-ellipsis font-Alexandria"
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
                          return <div className="lg:h-[140px] xl:h-[180px] xxl:h-[225px] w-1/2" key={index}>
                            <div className="bg-white  hover:bg-[#FFF298] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 xxl:line-clamp-2 text-ellipsis font-Alexandria"
                                    dangerouslySetInnerHTML={convertHTML(item.description)}
                                  ></p>
                                </div>
                              </div>
                            </div>
                          </div>
                      })}
                    </div>
                    <div className="w-full flex gap-2 xl:pl-[10px]">
                      {listNew?.map((item, index) => {
                        if (index === (i - 1) * 6 + 7)
                          return <div className="flex lg:h-[140px] xl:h-[180px] xxl:h-[225px] w-1/2" key={index}>
                            <div className="bg-white  hover:bg-[#FFF298] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 xxl:line-clamp-2 text-ellipsis font-Alexandria"
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
                          return <div className="flex lg:h-[140px] xl:h-[180px] xxl:h-[225px] w-1/2" key={index}>
                            <div className="bg-white  hover:bg-[#FFF298] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                              onClick={() => addViewArticle(category?.url, item.url)}
                            >
                              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                                <div>
                                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                                </div>
                                <div className="">
                                  <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 xxl:line-clamp-2 text-ellipsis font-Alexandria"
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
        <Footer colorText='#606060' type='female-detail' />
      </div >
      {/* mobile - tablet dọc*/}
      <div className="lg:hidden flex flex-col h-full w-full xxl:pt-3" >
        {/* slick slide */}
        <div className=" w-full flex-shrink-0 bg-[#FFF1C4] rounded-2xl transition-all cursor-pointer md:mt-2"
        >
          {listCategoryByGender.length > 0 && (
            <Slider {...settings}
              initialSlide={defaultActive}
              beforeChange={(current, next) => slideSlick(next)}
            >
              {listCategoryByGender?.map((row: any, index: any) => {
                if (row.status)
                  return <div key={index} className={`w-full !h-[135px] sm:!h-[185px] px-6 pt-8 pb-8 !flex !flex-row gap-3`}>
                    <div className='w-[60%] h-full flex items-end'>
                      <p className="text-black text-base sm:text-lg md:text-[20px] font-[700] leading-6 uppercase text-ellipsis line-clamp-3" dangerouslySetInnerHTML={convertHTML(row.titleHtml)}></p>
                    </div>
                    <div className=" w-[40%] h-full flex flex-col justify-end items-end gap-2 mt-auto">
                      {/* <div className="text-sm sm:text-base text-end text-ellipsis line-clamp-2">{row?.headline}</div> */}
                      <p className="text-end text-[12px] sm:text-sm md:text-[16px] md:leading-[24px] leading-[15px]  line-clamp-3 text-ellipsis font-Alexandria">{row?.description}</p>
                    </div>
                  </div>
              })}
            </Slider>
          )}
        </div >

        <div className="flex flex-col h-full gap-2 sm:gap-4  w-full pt-2 sm:pt-4">

          {listNew?.map((item, index) => {
            if (index === 0)
              return <div key={index} className="w-full h-[144px] sm:h-[169px] flex-shrink-0 relative flex flex-col">
                <div className=" w-full h-full flex-shrink-0 ">
                  <div className="bg-[#f3e57b] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                    onClick={() => addViewArticle(category?.url, item.url)}
                  >
                    <div className="w-1/2 h-full pl-6 py-3 sm:py-5 flex flex-col justify-between">
                      <div>
                        <p className="mb-0 text-black text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                      </div>
                      <div>
                        <p className="mb-0 text-black text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3 text-justify" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                      </div>
                    </div>
                    <div className=" w-1/2 h-full pr-4 py-3 sm:py-5 overflow-hidden flex-shrink-0">
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

          <div className="w-full flex-shrink-0 h-auto flex gap-2 sm:gap-4">
            {listNew?.map((item, index) => {
              if (index === 1 || index === 2)
                return <div className=" w-1/2 h-[144px] sm:h-[169px]" key={index}>
                  <div className="bg-[#FFEB91] #FFEB91 rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                    onClick={() => addViewArticle(category?.url, item.url)}
                  >
                    <div className="w-full h-full pl-6 pr-3 py-5 flex flex-col justify-between gap-2 overflow-hidden">
                      <div>
                        <p className="mb-0 text-black text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                      </div>
                      <div>
                        <p className="mb-0 text-black text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3 text-justify" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                      </div>
                    </div>
                  </div>
                </div>
            })}
          </div>
          <div className="w-full  flex-shrink-0 flex flex-col gap-2 sm:gap-4">
            {listNew?.map((item, index) => {
              if (index > 2) {
                if (index % 2 === 1) {
                  return <div className=" w-full h-[144px] sm:h-[169px] flex-shrink-0 flex" key={index}>
                    <div className=" bg-[#FFEB91] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                      onClick={() => addViewArticle(category?.url, item.url)}
                    >
                      <div className="w-1/2 h-full pl-6 py-5 flex flex-col justify-between gap-2">
                        <div>
                          <p className="mb-0 text-black text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                        </div>
                        <div>
                          <p className="mb-0 text-black text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3 text-justify" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
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
                  return <div className=" w-full h-[144px] sm:h-[169px] ">
                    <div className=" bg-[#f6e466] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
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
                          <p className="mb-0 text-black text-[15px] md:text-[18px] font-[500] uppercase text-ellipsis line-clamp-2 font-Alexandria">{item.title}</p>
                        </div>
                        <div>
                          <p className="mb-0 text-black text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3 text-justify" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              }
            })}
          </div>
          <Footer colorText='606060' type='female-detail' />
        </div>
      </div >
    </>
  )
}
export default FemaleDetail