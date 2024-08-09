
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { background_layout, banner_choice, bg_mobile_quiz, image_question } from '../../../components/ImgExport';
import '../styles.css';

import * as QuestionApi from '../../../api/question/questionApi';
import * as AccumulateApi from '../../../api/token/accumulateApi';
import ButtonBarFooter from '../../../components/ButtonBarFooter';
import FooterSideBar from '../../../components/FooterSideBar';
import { IMAGE_URL, META_LOGO, META_URL } from '../../../env';
import useDebounce from '../../../hook/useDebounce';
import useLoading from '../../../hook/useLoading';
import useToast from '../../../hook/useToast';
import useWindowDimensions from '../../../hook/useWindowDimensions';
import Footer from '../../../router/Layout/Footer';
import FooterDesktop from '../../../router/Layout/FooterDesktop';
import Header from '../../../router/Layout/Header';
import ModalNavigator from '../../../router/Layout/ModalNavigator';
import * as Token from '../../../services/token';
import { convertHTML } from '../../../until';


let timeout: any, n = 5;
const MultipleChoiceQuestion: React.FC = () => {
  const { gender, typeAge } = useParams<{ gender: string, typeAge: string }>();
  const pushToast = useToast();
  const pushLoading = useLoading();
  const navigator = useNavigate()
  const [answer, setAnswer] = useState('')
  const [noteAnswer, setNoteAnswer] = useState('')
  const [showAnser, setShowAnser] = useState(false)
  const [anserQuestion, setAnserQuestion] = useState(-1)
  const [padding, setPadding] = useState(0)
  const [paddingMobile, setPaddingMobile] = useState(0)
  const [space, setSpace] = useState(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [showModal, setShowModal] = useState(true)
  const [end, setEnd] = useState(false)
  const [arrayCart, setArrayCart] = useState<QuestionApi.InfoQuestion[]>([])
  const [arrayLength, setArrayLength] = useState(0)
  const [tokenUser, setTokenUser] = useState('')
  const [quizType, setQuizType] = useState(0)

  const [showNotification, setShowNotification] = useState(false);
  const [countdown, setCountdown] = useState(0);

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

  const metaHTML = () => {
    var urlMeta = document.querySelector('meta[property="og:url"]')
    var urlTitle = document.querySelector('title[class="title-index"]')

    var genderText
    if (Number(gender) === 0) {
      genderText = "Nữ"
    } else {
      genderText = "Nam"
    }

    if (urlTitle) {
      urlTitle.innerHTML = Number(typeAge) === 1 ? "Trắc nghiệm " + genderText + " 9-18 TUỔI" : (Number(typeAge) === 2 ? "Trắc nghiệm " + genderText + " 18-26 TUỔI" : "Trắc nghiệm " + genderText + " 27-45 TUỔI");
    }
    if (urlMeta) {
      urlMeta.setAttribute("content", `${META_URL}cau-hoi-kiem-tra-hpv/${Number(gender)}/${Number(typeAge)}`);
    }
    var typeMeta = document.querySelector('meta[property="og:type"]')
    if (typeMeta) {
      typeMeta.setAttribute("content", "website");
    }
    var titleMeta = document.querySelector('meta[property="og:title"]')
    if (titleMeta) {
      titleMeta.setAttribute("content", `Câu hỏi trắc nghiệm`);
    }
    var imageMeta = document.querySelector('meta[property="og:image"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `${META_LOGO}`);
    }
    var imageMeta = document.querySelector('meta[property="og:description"]')
    if (imageMeta) {
      imageMeta.setAttribute("content", `Câu hỏi trắc nghiệm`);
    }
    var descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", `Câu hỏi trắc nghiệm`);
    }
  }

  useEffect(() => {
    getToken()
    listQuestion()
    metaHTML()
  }, [])

  useEffect(() => {
    if (Number(gender) === 0 && Number(typeAge) === 1) {
      setQuizType(1)
    } else if (Number(gender) === 0 && Number(typeAge) === 2) {
      setQuizType(2)
    } else if (Number(gender) === 0 && Number(typeAge) === 3) {
      setQuizType(3)
    } else if (Number(gender) === 1 && Number(typeAge) === 1) {
      setQuizType(4)
    } else if (Number(gender) === 1 && Number(typeAge) === 2) {
      setQuizType(5)
    } else if (Number(gender) === 1 && Number(typeAge) === 3) {
      setQuizType(6)
    }
  }, [gender, typeAge])

  useEffect(() => {
    addViewStartQuiz()
  }, [tokenUser])

  useEffect(() => {
    if (arrayCart.length > 0) {
      quizReportPause(arrayCart[0].id, quizType)
    }
  }, [arrayCart])

  // responsive card
  // const { width } = useWindowDimensions();
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
  useLayoutEffect(() => {

    const windowWidth = width;

    if (windowWidth < 470) {
      const resultMobile = 28 / (arrayCart.length - 1);
      setPaddingMobile(resultMobile)
    }
    else if (windowWidth < 600) {
      const resultMobile = 64 / (arrayCart.length - 1);
      setPaddingMobile(resultMobile)
    }
    else if (windowWidth < 750) {
      const resultMobile = 186 / (arrayCart.length - 1);
      setPaddingMobile(resultMobile);
    }
    else if (windowWidth < 990) {
      const resultMobile = 286 / (arrayCart.length - 1);
      setPaddingMobile(resultMobile);
      setPadding(resultMobile);
    }
    else if (windowWidth < 1090) {
      const result = 140 / (arrayCart.length - 1);
      setPadding(result);
    }
    else if (windowWidth < 1190) {
      const result = 160 / (arrayCart.length - 1);
      setPadding(result);
    }
    else if (windowWidth < 1290) {
      const result = 168 / (arrayCart.length - 1);
      setPadding(result);
    }
    else if (windowWidth < 1490) {
      const result = 174 / (arrayCart.length - 1);
      setPadding(result);
    }
    else if (windowWidth < 1590) {
      const result = 178 / (arrayCart.length - 1);
      setPadding(result);
    }
    else if (windowWidth < 1690) {
      const result = 190 / (arrayCart.length - 1);
      setPadding(result);
    }
    else if (windowWidth < 1793) {
      const result = 208 / (arrayCart.length - 1);
      setPadding(result);
    }
    else if (windowWidth < 1890) {
      const result = 208 / (arrayCart.length - 1);
      setPadding(result);
    }
    else if (windowWidth < 1990) {
      const result = 218 / (arrayCart.length - 1);
      setPadding(result);
    }
    else {
      const result = 238 / (arrayCart.length - 1);
      setPadding(result);
    }
  }, [arrayCart, width])

  const getToken = async () => {
    let token = Token.getUser();
    setTokenUser(token)
  }

  const addViewStartQuiz = async () => {
    if (tokenUser !== '') {
      var felmale1: number = 0
      var felmale2: number = 0
      var felmale3: number = 0
      var male1: number = 0
      var male2: number = 0
      var male3: number = 0
      if (Number(gender) === 0 && Number(typeAge) === 1) {
        felmale1 = 1
      } else if (Number(gender) === 0 && Number(typeAge) === 2) {
        felmale2 = 1
      } else if (Number(gender) === 0 && Number(typeAge) === 3) {
        felmale3 = 1
      } else if (Number(gender) === 1 && Number(typeAge) === 1) {
        male1 = 1
      } else if (Number(gender) === 1 && Number(typeAge) === 2) {
        male2 = 1
      } else if (Number(gender) === 1 && Number(typeAge) === 3) {
        male3 = 1
      }
      pushLoading(true)
      const result = await QuestionApi.quizReport(tokenUser, felmale1, felmale2, felmale3, male1, male2, male3,)
      pushLoading(false)
    }
  }

  const quizReportPause = useDebounce(async (quizId: number, quizType: number) => {
    if (tokenUser !== '') {
      pushLoading(true)
      const result = await QuestionApi.quizReportPause(tokenUser, quizId, quizType)
      pushLoading(false)
    }
  }, 300000)

  const listQuestion = async () => {
    setShowAnser(false)
    pushLoading(true)
    const result = await QuestionApi.questionByAgeGender(Number(gender), Number(typeAge))
    if (result.status) {
      setArrayCart(result.data)
      setArrayLength(result.data.length)
      scrollToTopContent()
    } else {
      pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
    }
    pushLoading(false)
  }

  const handleAnswersSelect = async (index: any, id: any, answer: any, answerOfUser: any) => {
    setAnserQuestion(id)
    setShowAnser(true)
    var answerStatus: number = 0
    if (answer) {
      answerStatus = 1
      setAnswer('Chính xác!')
    } else {
      answerStatus = 0
      setAnswer('Không chính xác!')
    }
    setNoteAnswer(arrayCart[index].note)
    pushLoading(true)
    const result = await QuestionApi.quizReportAnswer(tokenUser, arrayCart[index].id, quizType, answerStatus, answerOfUser)
    pushLoading(false)
  }

  const handleAnswersYesNo = async (index: number, answer: number, answerOfUser: any) => {
    setAnserQuestion(answer)
    setShowAnser(true)
    var answerStatus: number = 0
    if (arrayCart[index].answer === answer) {
      answerStatus = 1
      setAnswer('Chính xác!')
    } else {
      answerStatus = 0
      setAnswer('Không chính xác!')
    }
    pushLoading(true)
    const result = await QuestionApi.quizReportAnswer(tokenUser, arrayCart[index].id, quizType, answerStatus, answerOfUser)
    pushLoading(false)
    setNoteAnswer(arrayCart[index].note)
  }

  const handleAnswersMobile = async (index: number, answer: number, answerOfUser: any) => {
    setShowAnser(true)
    var answerStatus: number = 0
    if (arrayCart[index].answer === answer) {
      answerStatus = 1
      setAnswer('Chính xác!')
    } else {
      answerStatus = 0
      setAnswer('Không chính xác!')
    }
    pushLoading(true)
    const result = await QuestionApi.quizReportAnswer(tokenUser, arrayCart[index].id, quizType, answerStatus, answerOfUser)
    pushLoading(false)
    setNoteAnswer(arrayCart[index].note)
    setTimeout(() => {
      const elementMobile = document.getElementById('section-mobile');
      if (elementMobile) {
        elementMobile.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 500);
  }

  const nextQuestion = () => {
    setArrayCart(arrayCart.slice(0, -1))
    setShowAnser(false)
    setAnserQuestion(-1)
    if (arrayCart.length < 2) {
      setEnd(true);
    }
  }

  const handleDismiss = () => {
    setShowModal(false)
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

  const scrollToTopContent = () => {
    const elementMobile = document.getElementById('section-mobile');
    if (elementMobile) {
      elementMobile.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const curPath = window.location.pathname;
    setcurPathLink(curPath)

  }, [window.location.pathname]);
  const [scroll, setScroll] = useState(false)
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  return (
    <>
      {/* <Helmet>
        <title>{Number(typeAge) === 1 ? "Trắc nghiệm 9-18 TUỔI" : (Number(typeAge) === 2 ? "Trắc nghiệm 18-26 TUỔI" : "Trắc nghiệm 27-45 TUỔI")}</title>
      </Helmet> */}
      <div className="by-svh-custom w-full hidden lg:flex flex-col justify-between lg:justify-start lg:gap-3 xxl:gap-6 z-40 relative">
        <div className="absolute h-full w-full top-0 left-0 -z-[1]">
          <img src={background_layout} className='lg:block hidden img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        {/* Header */}
        {width > 976 ? (<Header handleCancel={handleCancel} handleLink={handleLink} />) : ''}

        <div className="h-full xl:h-full px-5 xxl:px-7  overflow-y-scroll flex flex-col justify-between">
          <div className={`w-full hidden lg:flex flex-col lg:flex-row ${scroll ? 'h-fit' : 'h-[calc(100%-62px)]'} max-h-[1000px]  homepage z-10 gap-2 sm:gap-4 lg:gap-4 xxl:gap-4`}>
            {/* content */}
            <div className={`w-0 hidden xl:flex xl:w-1/4 ${scroll ? 'min-h-[550px]' : 'h-full'}  relative`}>
              <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />

              <div className="w-full h-full overflow-hidden rounded-2xl">
                <img src={banner_choice} alt='baner' className='img ' />
              </div>
            </div>
            <div className={`w-full xl:w-3/4 content-quiz-xl ${scroll ? 'min-h-[550px]' : 'h-full'}  flex gap-6`}>
              <div className="w-[70%] content-quiz-question-xl xl:w-3/5 h-full flex  ">
                <div className="w-full h-full relative">
                  {end ? (
                    Number(typeAge) === 1 ?
                      (
                        <div className={`absolute w-full h-full flex flex-col justify-between text-white text-base bg-[#015850] rounded-2xl top-0 px-4 xl:px-7 py-6 xl:py-10 transition-all`}>
                          <div className='w-full flex flex-col overflow-y-scroll font-Alexandria'>
                            <div className='w-full text-[20px] font-[500]'>Cảm ơn bạn đã dành thời gian làm khảo sát nhanh về HPV. </div>
                            <div className='w-full text-base pt-4 font-[300] break-words font-Alexandria text-justify'>
                              Như bạn thấy đấy, HPV có hơn 100 týp khác nhau, trong đó có 14 trong số 40 týp lây truyền qua đường tình dục, có nguy cơ cao gây ra các bệnh nguy hiểm như ung thư cổ tử cung, ung thư âm đạo, âm hộ ở nữ, ung thư hậu môn và sùi mào gà ở cả nam lẫn nữ (1).
                              <br />
                              Vì vậy, Tổ chức Y tế Thế giới (WHO) cũng khuyến cáo nên dự phòng cho các trẻ em gái từ 9 đến 14 tuổi, trước khi có hoạt động tình dục để có hiệu quả tốt hơn lứa tuổi lớn hơn(2).
                              <br />
                              *Nội dung này do Hội Y học Dự phòng Việt Nam cung cấp và được MSD tài trợ vì mục đích giáo dục. VN-GSL-00747 22042026
                              <br />
                              <div className='text-[12px] pt-4 font-Alexandria leading-4'>
                                Nguồn:
                                <br />
                                1. https://www.cdc.gov/cancer/hpv/basic_info/index.html
                                <br />
                                2. https://www.who.int/news-room/fact-sheets/detail/cervical-cancer. Accessed on Nov 17 2023
                              </div>
                            </div>
                          </div>
                          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2">
                            <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[15px] font-Alexandria -tracking-[0.3px] cursor-pointer" onClick={() => clickButton('/dia-diem-tu-van')}>
                              TÌM ĐỊA ĐIỂM TƯ VẤN
                            </div>
                            <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[15px] font-Alexandria -tracking-[0.3px] cursor-pointer"
                              onClick={() => clickButton('handleLink')}>
                              ĐẶT LỊCH VỚI TRUNG TÂM Y TẾ GẦN NHẤT
                            </div>
                          </div>
                        </div>
                      )
                      :
                      Number(typeAge) === 2 ?
                        (
                          <div className={`absolute w-full h-full flex flex-col justify-between text-white text-base bg-[#015850] rounded-2xl top-0 px-4 xl:px-7 py-6 xl:py-10 transition-all`}>
                            <div className='w-full flex flex-col overflow-y-scroll'>
                              <div className='w-full text-[20px] font-[500]'>Kết thúc bài trắc nghiệm nhanh, bạn đã tìm được câu trả lời cho chính mình? </div>
                              <div className='w-full text-base pt-4 font-[300] break-words font-Alexandria text-justify'>HPV chẳng chừa ai, để bảo vệ mình khỏi những “red flag”, hãy đến các trung tâm y tế, bệnh viện tư vấn về việc dự phòng HPV ngay hôm nay, để trở thành một “cờ xanh” chính hiệu, bảo vệ mình khỏi những “red flag” ngoài kia nhé! </div>
                            </div>
                            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2">
                              <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[15px] font-Alexandria -tracking-[0.3px] cursor-pointer" onClick={() => clickButton('/dia-diem-tu-van')}>
                                TÌM ĐỊA ĐIỂM TƯ VẤN
                              </div>
                              <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[15px] font-Alexandria -tracking-[0.3px] cursor-pointer"
                                onClick={() => clickButton('handleLink')}>
                                ĐẶT LỊCH VỚI TRUNG TÂM Y TẾ GẦN NHẤT
                              </div>
                            </div>
                          </div>
                        )
                        :
                        <div className={`absolute w-full h-full flex flex-col justify-between text-white text-base bg-[#015850] rounded-2xl top-0 px-4 xl:px-7 py-6 xl:py-10 transition-all`}>
                          <div className='w-full flex flex-col overflow-y-scroll'>
                            <div className='w-full text-[20px] font-[500] font-Alexandria'>Cảm ơn bạn đã dành thời gian làm bài trắc nghiệm kiểm tra kiến thức về HPV. </div>
                            <div className='w-full text-base pt-4 font-[300] break-words font-Alexandria text-justify'>
                              Như bạn thấy đấy, xác suất nhiễm HPV ít nhất một lần trong đời, nếu có 1 bạn tình lên đến 85% ở phụ nữ và 91% ở nam giới (1). Có 15 trong số 40 týp lây truyền qua đường tình dục, có nguy cơ cao gây ra các bệnh nguy hiểm như ung thư ở cả nam và nữ. Vậy nên, hãy chủ động bảo vệ bản thân bằng cách đến các trung tâm y tế, bệnh viện để được tư vấn về việc dự phòng HPV ngay hôm nay nhé!
                              <br />
                              *Nội dung này do Hội Y học Dự phòng Việt Nam cung cấp và được MSD tài trợ vì mục đích giáo dục. VN-GSL-00747 22042026
                              <br />
                              <div className='text-[12px] pt-4 font-Alexandria leading-4'>
                                Nguồn:
                                <br />
                                1. Chesson HW, Dunne EF, Hariri S, Markowitz LE. The estimated lifetime probability of acquiring human papillomavirus in the United States. Sex Transm Dis. 2014 Nov;41(11):660-4. doi: 10.1097/OLQ.0000000000000193. PMID: 25299412; PMCID: PMC6745688.
                              </div>
                            </div>
                          </div>
                          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2">
                            <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[15px] font-Alexandria -tracking-[0.3px] cursor-pointer" onClick={() => clickButton('/dia-diem-tu-van')}>
                              TÌM ĐỊA ĐIỂM TƯ VẤN
                            </div>
                            <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[15px] font-Alexandria -tracking-[0.3px] cursor-pointer"
                              onClick={() => clickButton('handleLink')}>
                              ĐẶT LỊCH VỚI TRUNG TÂM Y TẾ GẦN NHẤT
                            </div>
                          </div>
                        </div>
                  ) :
                    null
                  }
                  {arrayCart.map((item, index) => (
                    <div
                      key={item.id}
                      className={`absolute  h-full ${index % 5 === 4 ? 'bg-[#05C7E4]' : (index % 5 === 3 ? 'bg-[#00AEB7]' : (index % 5 === 2 ? 'bg-[#02A19B]' : (index % 5 === 1 ? 'bg-[#00947E]' : 'bg-[#017B6C]')))} rounded-2xl top-0 transition-all`}
                      style={{
                        right: index * padding,
                        zIndex: index * 10,
                        width: `70%`
                      }}
                    >
                      <div className="w-full h-full pl-14 pt-[12px] flex flex-col pr-10">
                        <div className="w-full flex justify-between items-center">
                          <div className={`text-[21px] font-[500] text-white`}>Câu hỏi</div>
                          <div className=" ml-auto text-white text-[40px] font-[500px] uppercase pr-4">0{arrayLength - index}</div>
                        </div>
                        <div className={index === arrayCart.length - 1 ? 'w-full h-full flex flex-col justify-between pb-4 pr-4 overflow-y-auto' : 'hidden'}>
                          <div className="flex flex-col">
                            {/* <div className={`text-[21px] font-[500] text-white`}>Câu hỏi</div> */}
                            <div className={`text-base font-Alexandria text-white text-justify pb-2`}>{item.title} </div>
                            {/* <div className={`text-base font-Alexandria text-white text-justify pt-3 pb-4`}>{item.title} </div> */}
                            <div className="w-full aspect-[1/1] rounded-2xl overflow-hidden ">
                              <div className="w-full h-full  rounded-2xl overflow-hidden">
                                <img
                                  src={item.img ? IMAGE_URL + item.img : image_question}
                                  onError={(e) => {
                                    e.currentTarget.src = image_question;
                                  }}
                                  alt="hpv" className='img ' />
                              </div>
                            </div>
                          </div>
                          {item.type === 0 ?
                            <div className="flex gap-7 items-center justify-center mt-2">
                              <div
                                className={`${anserQuestion === 1 ? "bg-white text-[#005750]" : "bg-transparent text-white"} w-[112px] flex items-center justify-center py-[10px] rounded-full border border-white hover:bg-white hover:text-[#005750] uppercase cursor-pointer `}
                                onClick={() => { if (!showAnser) handleAnswersYesNo(index, 1, 1) }}
                              >
                                A. Đúng
                              </div>
                              <div
                                className={`${anserQuestion === 0 ? "bg-white text-[#005750]" : "bg-transparent text-white"} w-[112px] flex items-center justify-center py-[10px] rounded-full border border-white hover:bg-white hover:text-[#005750] uppercase cursor-pointer `}
                                onClick={() => { if (!showAnser) handleAnswersYesNo(index, 0, 0) }}
                              >
                                B. Sai
                              </div>
                            </div>
                            :
                            <div className="flex flex-col gap-3 pt-2">
                              {item.questionAnswer?.map((itemAnswer, indexAnswer) => (
                                <div
                                  key={itemAnswer.id}
                                  className={`${anserQuestion === itemAnswer.id ? "bg-white text-[#005750]" : "bg-transparent text-white"} flex items-center justify-center text-center py-[10px] px-[10px] rounded-lg border border-white hover:bg-white hover:text-[#005750] uppercase cursor-pointer font-Alexandria`}
                                  // onClick={() => handleAnswersSelect(index, itemAnswer.id, itemAnswer.answer)}
                                  onClick={() => { if (!showAnser) handleAnswersSelect(index, itemAnswer.id, itemAnswer.answer, itemAnswer.id) }}
                                >
                                  {indexAnswer == 0 ? "A. " : (indexAnswer == 1 ? "B. " : (indexAnswer == 2 ? "C. " : "D. "))}{itemAnswer.content}
                                </div>
                              ))}
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-[30%] content-quiz-question-xl xl:w-2/5 h-full  flex flex-col relative">
                <div className="w-full h-1/5 bg-white rounded-2xl">
                  <div className={`w-full h-full bg-[#005750] rounded-2xl flex justify-between items-center `}>
                    <div className='pl-3 xxl:pl-6'>
                      <span className='text-white text-sm xxl:text-[20px] font-[400] leading-[21px] xxl:leading-[26px]  uppercase'>làm bài <br />
                        trắc nghiệm</span>
                    </div>
                    <div className={`rounded-2xl flex-shrink-0 w-[120px] h-full items-center justify-center xxl:w-[132px] bg-[#40AFA3] p-2 xxl:p-4 flex flex-col gap-2 xxl:gap-4 px-4 xxl:px-6 py-4 xxl:py-7`}>
                      <div className='rounded-full w-[103px] text-xs xxl:text-sm uppercase py-2 !px-3 whitespace-nowrap border-[1px] hover:border-white bg-white cursor-pointer text-[#005750]  flex justify-center items-center font-Alexandria '
                      >
                        {Number(typeAge) === 1 ? "9-18 TUỔI" : (Number(typeAge) === 2 ? "18-26 TUỔI" : "27-45 TUỔI")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-4/5 pt-5 ">
                  <div className={showAnser ? 'w-full h-full flex flex-col bg-white rounded-2xl pt-[38px] pl-10 pr-[15px] pb-[20px]' : 'hidden'} >
                    <div className="h-full w-full pr-5 overflow-y-scroll mb-1 custom-p">
                      <div className="text-[21px] font-[500] uppercase">{answer}</div>
                      {/* CKrexto */}
                      <div className="" dangerouslySetInnerHTML={convertHTML(noteAnswer)}>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-center">
                      <div
                        className={`!w-fit h-[40px] mr-auto px-4  flex items-center justify-center rounded-lg border bg-transparent text-base font-Alexandria text-[#005750] border-[#005750]  uppercase cursor-pointer`}
                        onClick={nextQuestion}
                      >
                        tiếp tục
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer colorText='#606060' type='quiz-question' />
          {width > 976 ? (<ButtonBarFooter handleLink={handleLink} />) : ''}
        </div>
      </div>
      <div className='max-h-[100vh] by-svh-custom flex lg:hidden flex-col relative'>
        <div className="max-h-[100vh] by-svh-custom w-full top-0 left-0 -z-[1]">
          <img src={bg_mobile_quiz} className='block lg:hidden img' alt="hpv" />
        </div>
        <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
        <div className="absolute top-0 left-0 h-full w-full flex lg:hidden flex-col justify-between overflow-hidden">
          <div className=" w-full h-10 md:h-[56px] bg-transparent rounded-b-md overflow-hidden z-40 ">
            {width > 976 ? '' : (<Header handleCancel={handleCancel} handleLink={handleLink} />)}
          </div>
          {/* trong layout */}
          <div className=" h-[calc(100%-92px)] md-h-[calc(100%-108px)] px-5 xxl:px-7 overflow-y-scroll">
            <div className="lg:hidden flex flex-col h-full  gap-2 ">
              <ModalNavigator open={showNotification} dismiss={handleCancel} countDown={countdown} />
              <div className="w-full h-[76px] flex-shrink-0 ">
                <div className="w-full h-full flex justify-between items-center overflow-hidden rounded-2xl p-5 bg-[#005750]">
                  <span className='text-base font-[500] uppercase text-white'>LÀM BÀI <br /> TRẮC NGHIỆM</span>
                  <div className="w-[95px] h-10 flex items-center justify-center rounded-lg bg-white">
                    <span className='text-base font-Alexandria'>{Number(typeAge) === 1 ? "9-18" : (Number(typeAge) === 2 ? "18-26" : "27-45")}</span>
                  </div>
                </div>
              </div>
              {/* card */}
              <div className="w-full min-h-[680px] h-full justify-between gap-2 flex flex-col" id='section-mobile'>
                <div className="w-full min-h-[680px] sm:min-h-[720px] md:h-full flex  ">
                  <div className="w-full h-full relative ">
                    {!end ? '' :
                      (
                        Number(typeAge) === 1 ?
                          (
                            <div className={`absolute w-full h-full flex flex-col justify-between text-white text-[12px] bg-[#015850] rounded-2xl top-0 py-8 px-10 transition-all`}>
                              <div className='w-full flex flex-col overflow-y-scroll'>
                                <div className='w-full text-[16px] font-[500]'>Cảm ơn bạn đã dành thời gian làm khảo sát nhanh về HPV. </div>
                                <div className='w-full text-[12px] pt-4 font-[300] break-words text-justify'>
                                  Như bạn thấy đấy, HPV có hơn 100 chủng khác nhau, trong đó có 15 trong số 40 chủng lây truyền qua đường tình dục, có nguy cơ cao gây ra các bệnh nguy hiểm như ung thư cổ tử cung, ung thư âm đạo, âm hộ ở nữ, ung thư hậu môn và sùi mào gà ở cả nam lẫn nữ (1).
                                  <br />
                                  Vì vậy, Tổ chức Y tế Thế giới (WHO) cũng khuyến cáo nên dự phòng cho các trẻ em gái từ 9 đến 14 tuổi, trước khi có hoạt động tình dục để có hiệu quả tốt hơn lứa tuổi lớn hơn (2).
                                  <br />
                                  <p>

                                  </p>
                                  <div className='text-[8px] pt-4'>
                                    Nguồn:
                                    <br />
                                    https://www.cdc.gov/cancer/hpv/basic_info/index.htm#:~:text=More%20than%2040%20HPV%20types,of%20the%20mouth%20and%20throat
                                    <br />
                                    https://www.who.int/news-room/fact-sheets/detail/cervical-cancer#:~:text=HPV%20and%20cervical%20Cancer,some%20may%20be%20repeatedly%20infected Accessed on Nov 17 2023
                                  </div>
                                </div>
                              </div>
                              <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2 pt-4">
                                <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[12px] font-Alexandria -tracking-[0.3px] cursor-pointer" onClick={() => clickButton('/dia-diem-tu-van')}>
                                  TÌM ĐỊA ĐIỂM TƯ VẤN
                                </div>
                                <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[12px] font-Alexandria -tracking-[0.3px] cursor-pointer"
                                  onClick={() => clickButton('handleLink')}>
                                  ĐẶT LỊCH VỚI TRUNG TÂM Y TẾ GẦN NHẤT
                                </div>
                              </div>
                            </div>
                          )
                          :
                          Number(typeAge) === 2 ?
                            (
                              <div className={`absolute w-full h-full flex flex-col justify-between text-white text-[12px] bg-[#015850] rounded-2xl top-0 py-8 px-10 transition-all`}>
                                <div className='w-full flex flex-col overflow-y-scroll'>
                                  <div className='w-full text-[16px] font-[500]'>Kết thúc bài trắc nghiệm nhanh, bạn đã tìm được câu trả lời cho chính mình? </div>
                                  <div className='w-full text-[12px] pt-4 font-[300] break-words text-justify'>HPV chẳng chừa ai, để bảo vệ mình khỏi những “red flag”, hãy đến các trung tâm y tế, bệnh viện tư vấn về việc dự phòng HPV ngay hôm nay, để trở thành một “cờ xanh” chính hiệu, bảo vệ mình khỏi những “red flag” ngoài kia nhé! </div>

                                </div>
                                <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2 pt-4">
                                  <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[12px] font-Alexandria -tracking-[0.3px] cursor-pointer" onClick={() => clickButton('/dia-diem-tu-van')}>
                                    TÌM ĐỊA ĐIỂM TƯ VẤN
                                  </div>
                                  <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[12px] font-Alexandria -tracking-[0.3px] cursor-pointer"
                                    onClick={() => clickButton('handleLink')}>
                                    ĐẶT LỊCH VỚI TRUNG TÂM Y TẾ GẦN NHẤT
                                  </div>
                                </div>
                              </div>
                            )
                            :
                            <div className={`absolute w-full h-full flex flex-col justify-between text-white text-[12px] bg-[#015850] rounded-2xl top-0 py-8 px-10 transition-all`}>
                              <div className='w-full flex flex-col overflow-y-scroll'>
                                <div className='w-full text-[16px] font-[500]'>Cảm ơn bạn đã dành thời gian làm bài trắc nghiệm, kiểm tra kiến thức về HPV. </div>
                                <div className='w-full text-[12px] pt-4 font-[300] break-words text-justify'>
                                  Như bạn thấy đấy, xác suất nhiễm HPV ít nhất một lần trong đời, nếu có 1 bạn tình ở phụ nữ lên đến 85% HPV (1). Có 15 trong số 40 chủng lây truyền qua đường tình dục có nguy cơ cao gây ra các bệnh nguy hiểm như ung thư cổ tử cung, ung thư âm đạo, âm hộ ở nữ. Vậy nên, bảo vệ bản thân, giữ trọn thiên chức làm mẹ bằng cách đến các trung tâm y tế, bệnh viện để được tư vấn về việc dự phòng HPV ngay hôm nay nhé!
                                  <br />
                                  <div className='text-[8px] pt-4'>
                                    Nguồn:
                                    <br />
                                    Chesson HW, Dunne EF, Hariri S, Markowitz LE. The estimated lifetime probability of acquiring human papillomavirus in the United States. Sex Transm Dis. 2014 Nov;41(11):660-4. doi: 10.1097/OLQ.0000000000000193. PMID: 25299412; PMCID: PMC6745688.
                                  </div>
                                </div>
                              </div>
                              <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2 pt-4">
                                <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[12px] font-Alexandria -tracking-[0.3px] cursor-pointer" onClick={() => clickButton('/dia-diem-tu-van')}>
                                  TÌM ĐỊA ĐIỂM TƯ VẤN
                                </div>
                                <div className="uppercase px-6 py-3 text-center flex items-center justify-center rounded-full bg-[#015850] border-white border hover:bg-white hover:text-[#015850] text-white text-[12px] font-Alexandria -tracking-[0.3px] cursor-pointer"
                                  onClick={() => clickButton('handleLink')}>
                                  ĐẶT LỊCH VỚI TRUNG TÂM Y TẾ GẦN NHẤT
                                </div>
                              </div>
                            </div>
                      )
                    }
                    {arrayCart.map((item, index) => (
                      <div className={`flex flex-col ${arrayCart.length === 1 ? ' items-center ' : ''}  absolute  h-full md:h-full flex-shrink-0`} style={{
                        right: index * paddingMobile,
                        zIndex: index * 9,
                        width: `calc(100% - ${(arrayCart.length - 1) * paddingMobile}px`
                      }} key={item.id}>
                        <div
                          className={` ${index % 5 === 4 ? 'bg-[#05C7E4]' : (index % 5 === 3 ? 'bg-[#00AEB7]' : (index % 5 === 2 ? 'bg-[#02A19B]' : (index % 5 === 1 ? 'bg-[#00947E]' : 'bg-[#017B6C]')))} ${arrayCart.length === 1 ? 'sm:w-[442px]' : ''} rounded-2xl min-h-[680px] h-full top-0 transition-all flex flex-col`}
                        >
                          <div className="w-full h-auto p-4 flex flex-col">
                            <span className=" ml-auto text-[39px] text-white font-[500px] uppercase">0{arrayLength - index}</span>

                            <div className={index === arrayCart.length - 1 ? `${showAnser ? 'w-full aspect-[4/3]' : 'w-full h-auto aspect-square'}  flex-shrink-0 w-full rounded-lg overflow-hidden` : 'hidden'} >
                              <img
                                src={item.img ? IMAGE_URL + item.img : image_question}
                                onError={(e) => {
                                  e.currentTarget.src = image_question;
                                }} alt="hpv" className='h-full w-full object-top' />
                            </div>
                            {showAnser && index === arrayCart.length ? (
                              <div className="flex flex-col max-h-[125px] overflow-y-auto pt-3">
                                <div className={`text-[15px] md:text-lg text-white font-[500] pt-2 uppercase`}>Câu hỏi</div>
                                <div className={`text-xs md:text-sm text-white font-Alexandria text-justify pt-2 pb-8`}>{item.title}</div>
                              </div>
                            ) : (
                              null
                            )}
                          </div>
                          {showAnser ?
                            (
                              <div className={showAnser ? (index === arrayCart.length - 1 ? 'w-full h-full flex flex-col justify-between gap-2 overflow-hidden  px-4 pt-4 pb-2 bg-white rounded-2xl  relative' : 'hidden') : 'hidden'} id='section-mobile'>
                                <span className='text-lg font-[500] uppercase '>{answer}</span>
                                <div className="h-[176px] overflow-y-auto">
                                  <div className="min-h-[150px] flex-shrink-0 w-full text-xs md:text-sm font-Alexandria custom-p" dangerouslySetInnerHTML={convertHTML(noteAnswer)}>
                                  </div>
                                </div>

                                <div className="w-full flex items-center justify-center  bg-white h-12">
                                  <div
                                    className={`px-4 py-[6px] flex items-center justify-center rounded-full border bg-transparent text-base font-Alexandria text-[#005750] border-[#005750]  uppercase cursor-pointer`}
                                    onClick={nextQuestion}
                                  >
                                    tiếp tục
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className={index === arrayCart.length - 1 ? 'w-full h-full flex flex-col justify-between overflow-auto p-4 bg-white rounded-2xl' : 'hidden'}>
                                <div className="flex flex-col">
                                  <div className={`text-[15px] md:text-lg font-[500] pt-2 uppercase`}>Câu hỏi</div>
                                  <div className={`text-[14px] md:text-base font-Alexandria text-justify pt-2 pb-8 font-[300]`}>{item.title}</div>
                                </div>
                                {item.type === 0 ?
                                  <div className="flex gap-7 items-center justify-center">
                                    <div
                                      className={`w-[82px] py-[6px] flex items-center justify-center rounded-full border bg-transparent text-base font-Alexandria text-[#005750] border-[#005750] hover:bg-white  uppercase cursor-pointer hover:text-[#005750] font-Alexandria`}
                                      onClick={() => handleAnswersMobile(index, 0, 1)}
                                    >
                                      A. Đúng
                                    </div>
                                    <div
                                      className={`w-[82px] py-[6px] flex items-center justify-center rounded-full border bg-transparent text-base font-Alexandria text-[#005750] border-[#005750] hover:bg-white  uppercase cursor-pointer hover:text-[#005750] font-Alexandria`}
                                      onClick={() => handleAnswersMobile(index, 0, 0)}
                                    >
                                      B. Sai
                                    </div>
                                  </div>
                                  :
                                  <div className="flex flex-col gap-4">
                                    {item.questionAnswer?.map((itemAnswer, indexAnswer) => (
                                      <div
                                        key={itemAnswer.id}
                                        className={`w-full py-[6px] px-2 flex items-center justify-center rounded-lg border bg-transparent text-base font-Alexandria text-[#005750] text-center border-[#005750] hover:bg-white  uppercase cursor-pointer hover:text-[#005750] font-Alexandria`}
                                        onClick={() => handleAnswersSelect(index, itemAnswer.id, itemAnswer.answer, itemAnswer.id)}
                                      >
                                        {indexAnswer == 0 ? "A. " : (indexAnswer == 1 ? "B. " : (indexAnswer == 2 ? "C. " : "D. "))}{itemAnswer.content}
                                      </div>
                                    ))}
                                  </div>
                                }

                              </div>
                            )
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Footer colorText='606060' type='quiz-question' />
              </div>
            </div>
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
export default MultipleChoiceQuestion