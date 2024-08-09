
import { useNavigate, useParams } from 'react-router-dom';
import { body, mind, mobile_post_1, mobile_post_2, post_1, post_3, team_work } from '../../../components/ImgExport';
import './styles.css';
import Footer from '../../../router/Layout/Footer';

import * as HealthyApi from '../../../api/healthy/healthyApi';
import { useEffect, useState } from 'react';
import useToast from '../../../hook/useToast';
import useLoading from '../../../hook/useLoading';
import { convertHTML } from '../../../until';
import { IMAGE_URL, META_LOGO, META_URL } from '../../../env';
import FooterDesktop from '../../../router/Layout/FooterDesktop';

interface HealthyAndProactiveProps {
  category: number
}
const HealthyAndProactive: React.FC<HealthyAndProactiveProps> = ({ category }) => {
  const navigator = useNavigate()
  const pushToast = useToast();
  const pushLoading = useLoading();
  // const { category } = useParams<{ category: string }>();
  const [listNew, setListNew] = useState<HealthyApi.InfoNewHealthy[]>([])
  const [categorUrl, setCategorUrl] = useState('')
  const [pageScroll, setPageScroll] = useState(0)

  const metaHTML = () => {
    var urlMeta = document.querySelector('meta[property="og:url"]')
    var urlTitle = document.querySelector('title[class="title-index"]')
    if (urlTitle) {
      urlTitle.innerHTML = categorUrl === 'tri-sang' ? 'Sống lành chủ động - trí sáng' : (categorUrl === 'than-khoe' ? 'Sống lành chủ động - thân khỏe' : 'Sống lành chủ động - tâm an');
    }
    if (urlMeta) {
      urlMeta.setAttribute("content", `${META_URL}chi-tiet-song-lanh-chu-dong/${categorUrl}`);
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
      imageMeta.setAttribute("content", `Sống lành chủ động`);
    }
    var descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", `Sống lành chủ động`);
    }
  }

  const fetchListNewHealthy = async () => {
    pushLoading(true)
    const result = await HealthyApi.listHealthyLivingByCategory(Number(category))
    if (result.status) {
      setListNew(result.data)
      setPageScroll(Math.ceil((result.data.length - 2) / 4))
    } else {
      setListNew([])
      pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
    }
    pushLoading(false)
  }

  useEffect(() => {
    if (category) {
      fetchListNewHealthy()
    }

    if (category === 1) {
      setCategorUrl('tri-sang')
    } else if (category === 2) {
      setCategorUrl('than-khoe')
    } else {
      setCategorUrl('tam-an')
    }

  }, [category])

  useEffect(() => {
    if (categorUrl) {
      metaHTML()
    }
  }, [categorUrl])

  return (
    <>
      {/* <Helmet>
        <title>{categorUrl === 'tri-sang' ? 'Sống lành chủ động - trí sáng' : (categorUrl === 'than-khoe' ? 'Sống lành chủ động - thân khỏe' : 'Sống lành chủ động - tâm an')} </title>
      </Helmet> */}
      {/* tablet - desktop */}
      <div className="hidden h-full lg:flex flex-col justify-between">
        <div className="flex gap-7 h-[calc(100%-62px)] min-h-[526px] max-h-[1000px] w-full py-0  ">

          <div className="w-1/3 lg:h-[526px] xxl:h-[616px] flex flex-col ">
            <div className="w-full h-full flex flex-col gap-[12px]">
              <div className=" w-full flex h-1/3 gap-3">
                <div className="h-full w-1/2 xl:w-3/5">
                  <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden relative cursor-pointer"
                  // onClick={() => navigator('/chi-tiet-song-lanh-chu-dong/tri-sang')}
                  >
                    <img src={mind} alt="hpv" className={`img ${categorUrl === 'tri-sang' ? "" : "brightness-[0.4]"}`} />
                    <div className="absolute bottom-2 xl:bottom-5 xxl:bottom-7 left-2 xl:left-4 text-lg xl:text-[22px] font-[500] text-white capitalize">Trí Sáng</div>
                  </div>
                </div>
                <div className="h-full w-1/2 xl:w-2/5">
                  <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden relative cursor-pointer"
                    onClick={() => navigator('/chi-tiet-song-lanh-chu-dong/than-khoe')}
                  >
                    <img src={body} alt="hpv" className={`img ${categorUrl === 'than-khoe' ? "" : "brightness-[0.4]"}`} />
                    <div className="absolute bottom-2 xl:bottom-5 xxl:bottom-7 left-2 xl:left-4 text-lg xl:text-[22px] font-[500] text-white capitalize">Thân khỏe</div>
                  </div>
                </div>
              </div>
              <div className=" w-full flex h-1/3 flex-col">
                <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden relative cursor-pointer"
                // onClick={() => navigator('/chi-tiet-song-lanh-chu-dong/tam-an')}
                >
                  <img src={team_work} alt="hpv" className={`img ${categorUrl === 'tam-an' ? "" : "brightness-[0.4]"}`} />
                  <div className="absolute bottom-2 xl:bottom-5 xxl:bottom-7 left-2 xl:left-4 text-lg xl:text-[22px] font-[500] text-white capitalize">Tâm an</div>
                </div>
              </div>
              <div className=" w-full flex flex-col h-1/3">
                <div className="w-full flex items-end  h-full rounded-2xl bg-[#40AFA3] overflow-hidden relative" >
                  <span className='text-white text-[30px] xxl:text-[40px] font-[500]  pl-2 xl:pl-4 pb-3 uppercase'>Sống lành <br /> chủ động</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/3 flex flex-col  h-full overflow-y-scroll">

            <div className="grid grid-cols-2 gap-7">
              {listNew?.map((item, index) => {
                if (index === 0 || index === 1)
                  return <div className="lg:h-[170px] xxl:h-[200px] w-full" key={index}>
                    <div className="hover-scale-image-healthy bg-white rounded-2xl h-full w-full flex gap-7 overflow-hidden transition-all cursor-pointer"
                      onClick={() => navigator(`/chi-tiet-bai-viet-song-lanh-chu-dong/${categorUrl}/${item.url}`)}
                    // onClick={() => navigate(`/chi-tiet-bai-viet-du-phong-cho-nu/${category?.id}/${item.id}`)}
                    >
                      <div className="w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                        <div>
                          <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] text-ellipsis line-clamp-3 leading-6 uppercase font-Alexandria">{item.title}</p>
                        </div>
                        <div className="">
                          <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item.description)}>
                          </p>

                        </div>
                      </div>
                      <div className=" w-1/2 h-full pr-5 xxl:pr-7 py-5 xxl:py-8 ">
                        <div className="h-full w-full rounded-2xl overflow-hidden">
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
            <div className="grid grid-cols-2 gap-7 py-2">
              <div className="lg:h-[170px] xxl:h-[200px]  w-full flex gap-2">
                {listNew?.map((item, index) => {
                  if (index === 2 || index === 3)
                    return <div className="h-full w-1/2" key={index}>
                      <div className="bg-white hover-scale-image-healthy rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                        onClick={() => navigator(`/chi-tiet-bai-viet-song-lanh-chu-dong/${categorUrl}/${item.url}`)}
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
              <div className="lg:h-[170px] xxl:h-[200px]  w-full flex gap-2">
                {listNew?.map((item, index) => {
                  if (index === 4 || index === 5)
                    return <div className="h-full w-1/2" key={index}>
                      <div className="bg-white hover-scale-image-healthy rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
                        onClick={() => navigator(`/chi-tiet-bai-viet-song-lanh-chu-dong/${categorUrl}/${item.url}`)}
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
                    <div className="hover-scale-image-healthy bg-white rounded-2xl h-full w-full flex gap-7 overflow-hidden transition-all cursor-pointer"
                      onClick={() => navigator(`/chi-tiet-bai-viet-song-lanh-chu-dong/${categorUrl}/${item.url}`)}
                    // onClick={() => navigate(`/chi-tiet-bai-viet-du-phong-cho-nu/${category?.id}/${item.id}`)}
                    >
                      <div className="w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                        <div>
                          <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] text-ellipsis line-clamp-3 leading-6 uppercase font-Alexandria">{item.title}</p>
                        </div>
                        <div className="">
                          <p className="text-black text-xs xxl:text-sm leading-[17px]  line-clamp-2 text-ellipsis font-Alexandria" dangerouslySetInnerHTML={convertHTML(item.description)}>
                          </p>

                        </div>
                      </div>
                      <div className=" w-1/2 h-full pr-5 xxl:pr-7 py-5 xxl:py-8 ">
                        <div className="h-full w-full rounded-2xl overflow-hidden">
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
        </div>
        <Footer colorText='#606060' type={categorUrl === 'tri-sang' ? 'healthy-mind' : (categorUrl === 'than-khoe' ? 'healthy-body' : 'healthy-collective-spirit')} />
      </div>
      {/* mobile */}
      <div className={`lg:hidden flex flex-col gap-2 w-full  justify-between ${listNew.length < 4 ? 'h-full' : ''} `}>
        {/* <div className="h-[43%] w-full"> */}
        <div className="h-[150px] sm:h-[180px] md:h-[43vh] w-full">
          <div
            className="w-full flex h-full rounded-2xl bg-white overflow-hidden relative"
          >
            <img src={Number(category) === 1 ? mind : (Number(category) === 2 ? body : team_work)} alt="hpv" className='brightness-[0.7] img !object-top' />
            <div className="absolute bottom-7 left-5 text-[16px] sm:text-lg md:text-xl font-[500] text-white">{Number(category) === 1 ? `Trí sáng` : (Number(category) === 2 ? `Thân khỏe` : `Tâm an`)}</div>
            <div className="absolute w-[40%] bottom-7 right-5 text-end text-[12px] sm:text-sm md:text-[16px] md:leading-[24px] leading-[15px] line-clamp-3 text-ellipsis font-Alexandria font-[300] text-white">{Number(category) === 1 ? `Sáng suốt và thông tuệ khi phòng vệ HPV!` : (Number(category) === 2 ? `Sức khoẻ thực chiến, chặn liền HPV!` : `Tâm trí hanh thông, chủ động dự phòng HPV`)}</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full ">
          <div className="w-full h-[144px] sm:h-[169px] relative flex flex-col">
            {listNew?.map((item, index) => {
              if (index === 0)
                return <div className=" w-full h-full" key={index}>
                  <div className="hover-scale-image-healthy bg-[#005750] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                    onClick={() => navigator(`/chi-tiet-bai-viet-song-lanh-chu-dong/${categorUrl}/${item.url}`)}
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
          <div className="w-full h-[144px] sm:h-[169px] flex gap-2">
            {listNew?.map((item, index) => {
              if (index === 1 || index === 2)
                return <div className=" w-1/2 h-full" key={index}>
                  <div className={`hover-scale-image-healthy ${index === 1 ? 'bg-[#40CDAC]' : 'bg-[#40B0A4]'}  rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer`}
                    onClick={() => navigator(`/chi-tiet-bai-viet-song-lanh-chu-dong/${categorUrl}/${item.url}`)}
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
          {listNew?.map((item, index) => {
            if (index === 3) {
              return <div className="w-full h-[144px] sm:h-[169px] relative flex flex-col" key={index}>
                <div className=" w-full h-full ">
                  <div className="hover-scale-image-healthy bg-white rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                    onClick={() => navigator(`/chi-tiet-bai-viet-song-lanh-chu-dong/${categorUrl}/${item.url}`)}
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
          {listNew?.map((item, index) => {
            if (index === 4 || index === 5)
              return <div className="w-full h-[144px] sm:h-[169px] flex gap-2" key={index}>
                <div className=" w-1/2 h-full">
                  <div className={`hover-scale-image-healthy ${index === 4 ? 'bg-[#40CDAC]' : 'bg-[#40B0A4]'}  rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer`}
                    onClick={() => navigator(`/chi-tiet-bai-viet-song-lanh-chu-dong/${categorUrl}/${item.url}`)}
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
              </div>
          })}
          {listNew?.map((item, index) => {
            if (index > 5) {
              if (index % 2 === 0) {
                return <div className="w-full h-[144px] sm:h-[169px] relative flex flex-col" key={index}>
                  <div className=" w-full h-full ">
                    <div className="hover-scale-image-healthy bg-white rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                      onClick={() => navigator(`/chi-tiet-bai-viet-song-lanh-chu-dong/${categorUrl}/${item.url}`)}
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
                return <div className="w-full h-[144px] sm:h-[169px] relative flex flex-col">
                  <div className=" w-full h-full ">
                    <div className="hover-scale-image-healthy bg-white rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
                      onClick={() => navigator(`/chi-tiet-bai-viet-song-lanh-chu-dong/${categorUrl}/${item.url}`)}
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
        <Footer colorText='#606060' type={categorUrl === 'tri-sang' ? 'healthy-mind' : (categorUrl === 'than-khoe' ? 'healthy-body' : 'healthy-collective-spirit')} />
      </div>
    </>

  )
}
export default HealthyAndProactive