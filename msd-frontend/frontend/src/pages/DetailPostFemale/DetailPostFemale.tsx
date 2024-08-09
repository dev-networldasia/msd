
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as NewApi from '../../api/new/newApi';
import * as NewcategoryApi from '../../api/newcategory/newcategoryApi';
import * as AccumulateApi from '../../api/token/accumulateApi';
import ButtonBarFooter from '../../components/ButtonBarFooter';
import FooterSideBar from '../../components/FooterSideBar';
import { bg_female, bg_female_detail_mobile, female, mobile_post_2, post_1 } from '../../components/ImgExport';
import { IMAGE_URL, IMAGE_URL_CATEGORY, META_URL } from '../../env';
import useDebounce from '../../hook/useDebounce';
import useLoading from '../../hook/useLoading';
import useToast from '../../hook/useToast';
import useWindowDimensions from '../../hook/useWindowDimensions';
import Footer from '../../router/Layout/Footer';
import Header from '../../router/Layout/Header';
import ModalNavigator from '../../router/Layout/ModalNavigator';
import * as Token from '../../services/token';
import { convertHTML } from '../../until';
import './styles.css';

var ckeditorWeb: any
var ckeditorMobile: any
let timeout: any, n = 5;
const DetailPostFemale: React.FC = () => {
  const param = useLocation();
  const keysearch = param.state ? param?.state.keysearch : "";
  const { categoryUrl, url } = useParams<{ categoryUrl: string, url: string }>();
  const pushToast = useToast();
  const pushLoading = useLoading();
  useEffect(() => {
    return () => {
      clearInterval(timeout)
      n = 5
    }
  }, [])

  const [categoryDetail, setCategoryDetail] = useState<NewcategoryApi.InfoCategory>()
  const [newDetail, setNewDetail] = useState<NewApi.InfoNew>()
  const [listNewOther, setListNewOther] = useState<NewApi.InfoNew[]>([])
  const [showModal, setShowModal] = useState(false)
  const [tokenUser, setTokenUser] = useState('')
  const navigator = useNavigate()
  const [showNotification, setShowNotification] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [createCkeditor, setCreateCkeditor] = useState(true);
  const [editorData, setEditorData] = useState<any>();
  const [scroll, setScroll] = useState(false)
  const { width, height } = useWindowDimensions();

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
          if (width >= 976) {
            setEditorData(editor)
          }
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
          if (width < 976) {
            setEditorData(editor)
          }
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

  const fetchDataCategory = async () => {
    pushLoading(true)
    const result = await NewcategoryApi.articleCategoryDetailByUrl(String(categoryUrl))
    if (result.status) {
      setCategoryDetail(result.data)
    } else {
      setCategoryDetail(undefined)
      pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
    }
    pushLoading(false)
  }

  const articleDetail = async () => {
    pushLoading(true)
    const result = await NewApi.articleDetailByUrl(String(url))
    if (result.status) {
      setNewDetail(result.data)
      listArticleByCategoryOtherArticle()
      scrollToTopContent()
      scrollToTop()
      ckeditorEdit(result.data.content)
      metaHTML(result.data)
    } else {
      setNewDetail(undefined)
      pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
    }
    pushLoading(false)
  }

  const listArticleByCategoryOtherArticle = async () => {
    if (Number(categoryDetail?.id)) {
      pushLoading(true)
      const result = await NewApi.listArticleBySiteCatalytsOtherArticle(tokenUser, Number(categoryDetail?.id), String(url), 0, 5, 0, keysearch)
      if (result.status) {
        setListNewOther(result.data)
      } else {
        setListNewOther([])
        pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
      }
      pushLoading(false)
    }
  }

  const getToken = async (categoryId: number, url: string) => {
    let token = Token.getUser();
    setTokenUser(token)
    if (categoryDetail?.id && url) {
      addViewNew(token, Number(categoryDetail?.id), String(url))
    }
  }

  const typeAccumulated = async () => {
    const result = await AccumulateApi.typeAccumulated(tokenUser, 0, 0, (categoryDetail?.id === 1 ? 3 : 0), (categoryDetail?.id === 2 ? 3 : 0), (categoryDetail?.id === 3 ? 3 : 0), (categoryDetail?.id === 4 ? 3 : 0), (categoryDetail?.id === 5 ? 3 : 0), (categoryDetail?.id === 6 ? 3 : 0))
    if (result.status) {
      timeout = setInterval(async () => {
        const resultRead = await AccumulateApi.typeAccumulated(tokenUser, 0, 0, 0, 0, 0, (categoryDetail?.id === 4 ? 3 : 0), (categoryDetail?.id === 5 ? 3 : 0), (categoryDetail?.id === 6 ? 3 : 0))
      }, 30000);
    }
  }

  const addViewNew = async (token: string, categoryId: number, url: string) => {
    pushLoading(true)
    const result = await NewApi.insertViewArticleByUrl(token, url)
    if (result.status) {
    } else {
      pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
    }
    pushLoading(false)
  }

  const addViewArticle = async (categoryUrl: string | undefined, url: string) => {
    if (categoryUrl && url) {
      navigator(`/chi-tiet-bai-viet-du-phong-cho-nu/${categoryUrl}/${url}`, { state: { keysearch: keysearch } })
    }
  }

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };

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
      urlTitle.innerHTML = `Chi tiết bài viết dự phòng cho nữ/${String(url)}`;
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
      var category
      if (categoryUrl == "du-phong-hpv-cho-nu-tu-9-18-tuoi") {
        category = " từ 9-18 tuổi"
      } else if (categoryUrl == "du-phong-hpv-cho-nu-tu-18-26-tuoi") {
        category = " từ 18-26 tuổi"
      } else if (categoryUrl == "du-phong-hpv-cho-nu-tu-27-45-tuoi") {
        category = " từ 27-45 tuổi"
      } else {
        category = ""
      }
      urlTitle.innerHTML = `Chi tiết bài viết dự phòng cho nữ${category}/${data ? data.title : 'Dự phòng cho nữ'}`;
    }
    if (urlMeta) {
      urlMeta.setAttribute("content", `${META_URL}chi-tiet-bai-viet-du-phong-cho-nu/${String(url)}`);
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

  useEffect(() => {
    fetchDataCategory()
  }, [categoryUrl])

  useEffect(() => {
    articleDetail()
  }, [url])

  useEffect(() => {
    scrollToTopContent()
  }, [])
  useEffect(() => {
    scrollToTopContent()
  }, [categoryUrl, url])

  useEffect(() => {
    listArticleByCategoryOtherArticle()
  }, [categoryDetail, url])

  useEffect(() => {
    if (categoryDetail?.id) {
      getToken(Number(categoryDetail?.id), String(url))
    }
  }, [categoryDetail])

  useEffect(() => {
    if (tokenUser && categoryDetail) {
      typeAccumulated();
    }
  }, [tokenUser, categoryDetail, url])


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
        <title>{newDetail ? newDetail.title : 'Dự phòng cho nữ'}</title>
      </Helmet> */}
      <div className={showModal ? 'absolute top-0 left-0 w-[100vw] h-[100vh] bg-black z-30 opacity-70' : 'hidden'} onClick={() => setShowModal(false)}></div>
      {/* desktop */}
      <div className="by-svh-custom w-full  hidden lg:flex flex-col justify-between lg:justify-start lg:gap-3 xxl:gap-6 z-40 relative">
        <div className="absolute h-full w-full top-0 left-0 -z-[1]">
          <img src={bg_female} className='lg:block hidden img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        {width > 976 ? (<Header handleCancel={handleCancel} handleLink={handleLink} />) : ''}
        <div className="by-svh-custom px-5 xxl:px-7 flex flex-col justify-between overflow-y-scroll ">
          <div className={`flex ${scroll ? '!h-[531px]' : 'h-[calc(100%-62px)] xl:h-[calc(100%-62px)]'} max-h-[1000px] gap-3 xxl:gap-4`}>
            <div className={`w-2/3 ${scroll ? '!h-[537px]' : 'h-full'} relative`}>
              <div className="w-full h-full bg-white flex flex-col justify-between pt-8 pb-5 pl-8 pr-6 rounded-3xl custom-padding-think">
                <h1 className='w-full h-fit overflow-hidden text-[28px] font-[500] uppercase leading-10 leading-res-detail  line-clamp-2 pt-1 title-fs-res'>{newDetail?.title} </h1>
                <div className="w-full height-content-male flex gap-4 mt-auto">
                  <div className="w-2/3 overflow-y-scroll custom-scroll-female">
                    <div id='section-website'></div>
                    <div
                      id='content'
                      className="ckeditor-content text-ellipsis text-justify text-sm xxl:text-base font-Alexandria font-[300] pr-3 custom-p"
                      dangerouslySetInnerHTML={convertHTML(newDetail?.content)}
                    >
                    </div>
                  </div>
                  <div className="w-1/3 gap-4 flex flex-col pr-2 ">
                    <div className="pr-2">
                      <div className="w-full aspect-[3/2] rounded-3xl overflow-hidden">
                        <img
                          className='img'
                          src={newDetail?.img ? IMAGE_URL + newDetail?.img : post_1}
                          onError={(e) => {
                            e.currentTarget.src = post_1;
                          }}
                          alt="hpv"
                        />
                      </div>
                    </div>
                    <div
                      className="text-xs xxl:text-base font-Alexandria text-justify pr-2 overflow-y-scroll custom-scroll-female"
                      dangerouslySetInnerHTML={convertHTML(newDetail?.description)}
                    >
                    </div>
                  </div>
                </div>
                <div className='flex gap-5 py-5 items-center padding-top-button-res'>
                  <a
                    className="py-1 xxl:py-3 px-4 border-[#005750] hover:text-white hover:bg-[#005750] transition-all border flex justify-center items-center cursor-pointer rounded-full overflow-hidden text-sm xl:text-[18px] text-[#005750] font-Alexandria"
                    onClick={() => clickButton('/dia-diem-tu-van')}

                  >
                    TÌM ĐỊA ĐIỂM TƯ VẤN
                  </a>
                  <a
                    className="py-1 xxl:py-3 px-4 border-[#005750] hover:text-white hover:bg-[#005750] transition-all border flex justify-center items-center cursor-pointer rounded-full overflow-hidden text-sm xl:text-[18px] text-[#005750] font-Alexandria"
                    // onClick={() => navigator('/dia-diem-tu-van', { state: { mylocation: 1 } })}
                    // onClick={handleLink}
                    onClick={() => clickButton('handleLink')}
                  >
                    ĐẶT LỊCH VỚI TRUNG TÂM Y TẾ GẦN NHẤT
                  </a>
                </div>
              </div>
            </div>
            <div className={`w-1/3 ${scroll ? '!h-[537px]' : 'h-full'} relative flex xl:py-0 flex-col xxl:pl-3`}>
              <div className="h-1/3 w-full pb-2 xl:pb-4 ">
                <div className="bg-[#FDE533] rounded-3xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                >
                  <div className="w-[55%] pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                    <div>
                      <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-3">{categoryDetail?.title}</p>
                    </div>
                    <div className="">
                      <p
                        className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 xxl:line-clamp-3 text-ellipsis font-Alexandria"
                        dangerouslySetInnerHTML={convertHTML(categoryDetail?.description)}
                      >
                      </p>
                    </div>
                  </div>
                  <div className=" w-[45%] flex flex-col justify-end px-4 pt-5 xxl:pt-8 relative">
                    <div className="absolute top-4 xxl:top-8 right-2 xxl:right-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                        <path d="M31.3025 0.43C31.3025 0.43 31.2125 0.36 31.1625 0.32C31.1425 0.3 31.1125 0.29 31.0925 0.27C30.9925 0.21 30.8825 0.16 30.7725 0.11C30.7125 0.09 30.6625 0.07 30.6025 0.06C30.4525 0.02 30.3025 0 30.1425 0H20.5325C19.5125 0 18.6125 0.81 18.6125 1.83C18.6125 2.86 19.5025 3.71 20.5225 3.71L25.7125 3.74L20.7025 8.76C15.6125 4.94 8.4025 5.34 3.7925 9.95C-1.2575 15 -1.2675 23.18 3.7825 28.23C8.8325 33.28 17.0225 33.27 22.0725 28.23C26.6825 23.62 27.0325 16.35 23.2825 11.33L28.3025 6.31V11.46C28.3025 12.48 29.1325 13.31 30.1525 13.31C31.1725 13.31 32.0025 12.48 32.0025 11.46V1.86C32.0025 1.29 31.7425 0.77 31.3325 0.43H31.3025ZM19.4325 25.62C15.8325 29.22 9.9625 29.22 6.3625 25.62C2.7625 22.02 2.7625 16.15 6.3625 12.55C9.9625 8.95 15.8325 8.95 19.4325 12.55C23.0325 16.15 23.0325 22.02 19.4325 25.62Z" fill="black" />
                      </svg>
                    </div>
                    <div className="w-full h-auto flex-shrink-0 overflow-hidden">
                      {/* <img src={male} alt="hpv" className='img' /> */}
                      <img
                        className='img'
                        src={categoryDetail?.img ? IMAGE_URL_CATEGORY + categoryDetail?.img : female}
                        onError={(e) => {
                          e.currentTarget.src = female;
                        }}
                        alt="hpv"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {listNewOther?.map((item, index) => {
                if (index === 0)
                  return <div
                    key={index}
                    className="h-1/3 w-full py-2"
                    onClick={() => addViewArticle(categoryUrl, item.url)}
                  >
                    <div className=" bg-[#FFF298] rounded-3xl h-full w-full flex gap-7 overflow-hidden transition-all cursor-pointer"
                    >
                      <div className="w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                        <div>
                          <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-3 pt-1 font-Alexandria title-line-clamp-2">{item.title}</p>
                        </div>
                        <div className="">
                          <p
                            className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 text-ellipsis font-Alexandria"
                            dangerouslySetInnerHTML={convertHTML(item?.description)}
                          >
                          </p>
                        </div>
                      </div>
                      <div className=" w-1/2 h-full pr-2 py-2 xl:pr-5 xl:py-4 xxl:py-8 ">
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
              <div className="grid gap-2 w-full h-1/3  grid-cols-2">
                {listNewOther?.map((item, index) => {
                  if (index === 1 || index === 2)
                    return <div
                      className="bg-white hover:bg-[#FFF298] rounded-3xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                      key={item.id}
                      onClick={() => addViewArticle(categoryUrl, item.url)}
                    >
                      <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                        <div>
                          <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase text-ellipsis line-clamp-2 pt-1 font-Alexandria">{item.title}</p>
                        </div>
                        <div className="">
                          <p
                            className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 text-ellipsis font-Alexandria"
                            dangerouslySetInnerHTML={convertHTML(item?.description)}
                          >
                          </p>
                        </div>
                      </div>
                    </div>
                })}
              </div>
            </div>
          </div>
          <Footer colorText='#606060' type='female-post' />
        </div>
        {width > 976 ? (<ButtonBarFooter handleLink={handleLink} />) : ''}

      </div>
      {/* mobile */}
      <div className=' h-full flex lg:hidden flex-col overflow-y-scroll relative'>
        <div className="fixed h-[100vh] w-full top-0 left-0 -z-[1]">
          <img src={bg_female_detail_mobile} className='block lg:hidden h-full w-full' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />

        <div className="fixed top-0 left-0 w-full h-10 md:h-[56px] rounded-b-md overflow-hidden z-40 ">

          <img src={bg_female_detail_mobile} className='absolute top-0 left-0 w-full h-full object-top -z-10' alt="hpv" />
          {width > 976 ? '' : (<Header handleCancel={handleCancel} handleLink={handleLink} />)}
        </div>
        <div className="pt-12 pb-14 min-h-[100vh] md:pt-16 px-5 xxl:px-7">
          {/* mobile */}
          <div className="lg:hidden flex flex-col h-full">
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
                                src={newDetail?.img ? IMAGE_URL + newDetail?.img : female}
                                onError={(e) => {
                                  e.currentTarget.src = female;
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
                        id="contentMobile"
                        className="ckeditor-content text-black text-sm md:!text-[15px] font-[300] leading-[17px] font-Alexandria custom-p text-justify"
                        dangerouslySetInnerHTML={convertHTML(newDetail?.content)}
                      >
                      </div>
                      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2">
                        <a className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#F7E566] text-black text-[15px] font-Alexandria -tracking-[0.3px] cursor-pointer"
                          onClick={() => clickButton('/dia-diem-tu-van')}
                        >
                          TÌM ĐỊA ĐIỂM TƯ VẤN
                        </a>
                        <a className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#F7E566] text-black text-[15px] font-Alexandria -tracking-[0.3px] cursor-pointer"
                          onClick={() => clickButton('handleLink')}
                        >
                          ĐẶT LỊCH VỚI TRUNG TÂM Y TẾ GẦN NHẤT
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full pt-2">
              <div className="w-full min-h-[144px] flex gap-2">
                {listNewOther.length > 0 && listNewOther?.map((item, index) => {
                  if (index === 0 || index === 1)
                    return <div
                      key={item.id}
                      className=" w-1/2 h-[144px] sm:h-[169px]"
                      onClick={() => addViewArticle(categoryUrl, item.url)}
                    >
                      <div className=" bg-[#FFF2C5] rounded-3xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
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
              <div className="w-full min-h-[144px] relative flex flex-col gap-2">
                {listNewOther?.map((item, index) => {
                  if (index > 2) {
                    if (index % 2 === 0) {
                      return <div
                        key={item.id}
                        className="w-full h-[144px] sm:h-[169px]"
                        onClick={() => addViewArticle(categoryUrl, item.url)}
                      >
                        <div className=" bg-[#FFE982] rounded-3xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
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
                            <div className="h-full w-full rounded-3xl overflow-hidden">
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
                    } else {
                      return <div
                        className="w-full h-[144px] sm:h-[169px]"
                        onClick={() => addViewArticle(categoryUrl, item.url)}
                      >
                        <div className=" bg-[#FFE982] rounded-3xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                        >
                          <div className=" w-1/2 h-full pl-4 py-3 ">
                            <div className="h-full w-full rounded-3xl overflow-hidden">
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
                              <p className="mb-0 text-black text-[12px] md:text-[14px] font-Alexandria  text-ellipsis line-clamp-3 text-justify" dangerouslySetInnerHTML={convertHTML(item.description)}></p>
                            </div>
                          </div>

                        </div>
                      </div>
                    }
                  }
                })}
              </div>
            </div>
            <div className="pt-2">
              <Footer colorText='#606060' type='female-post' />
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
export default DetailPostFemale