import CloseIcon from '@mui/icons-material/Close';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
// import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import * as InterfaceApi from './api/interface/interfaceApi';
import * as ProfileApi from './api/profile/profileApi';
import * as ReportApi from './api/report/reportApi';
import LoadingGlobal from './components/LoadingGlobal';
import ToastGlobal from './components/ToastGlobal';
// import useLoading from "./hook/useLoading";
// import useToast from "./hook/useToast";
import Router from './router/Router';
import * as Token from './services/token';

function App() {
  // const navigation = useNavigate()
  // const dispatch = useDispatch();
  // const pushToast = useToast();
  // const pushLoading = useLoading();
  const location = useLocation();
  const { url } = useParams<{ url: string }>();
  const utm_source = location.search ? location?.search : "";
  const [utmSource, setUtmSource] = useState<any>("");
  const [utmMedium, setUtmMedium] = useState<any>("");
  const [utmCampaign, setUtmCampaign] = useState<any>("");
  const [utmId, setUtmId] = useState<any>("");
  const [utmContent, setUtmContent] = useState<any>("");
  const [device, setDevice] = useState<any>("");
  const expireDate = new Date(2147483647 * 1000).toUTCString();
  const current = new Date();
  const [locationCode, setLocationCode] = useState<string>("");
  const [locationHash, setLocationHash] = useState<string>("");
  const [ytRemoteDeviceId, setYtRemoteDeviceId] = useState<string>("");
  const [geoIP, setGeoIp] = useState<any>("");
  const [city, setCity] = useState<any>("");
  const [ipAddress, setIPAddress] = useState('')
  const [ipAddressCookie, setIPAddressCookie] = useState('')
  const [showCookie, setShowCookie] = useState(false)
  const [policy, setPolicy] = useState(false);
  const [customCookie, setCustomCookie] = useState(false)
  const [isCheckedMandates, setIsCheckedMandates] = useState(false)
  const [isCheckedPerformance, setIsCheckedPerformance] = useState(false)
  const [isCheckedTarget, setIsCheckedTarget] = useState(false)

  const screenWidth = window.innerWidth;
  useEffect(() => {
    let deviceType;
    if (screenWidth <= 768) {
      deviceType = 'mobile';
    } else if (screenWidth <= 1024) {
      deviceType = 'tablet';
    } else {
      deviceType = 'desktop';
    }
    setDevice(deviceType);
  }, [screenWidth])

  function randomOnlyString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function randomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function randomUpperString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function randomNumber(length: number) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function getBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1) {
      setYtRemoteDeviceId('Opera');
    } else if (navigator.userAgent.indexOf("Edg") !== -1) {
      setYtRemoteDeviceId('Edge');
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
      setYtRemoteDeviceId('Chrome');
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      setYtRemoteDeviceId('Safari');
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      setYtRemoteDeviceId('Firefox');
    } else if ((navigator.userAgent.indexOf("MSIE") !== -1)) //|| (!!document.documentMode === true) IF IE > 10
    {
      setYtRemoteDeviceId('IE');
    } else {
      setYtRemoteDeviceId('');
    }
  }

  const AccessToken = async () => {
    const result = await ProfileApi.getToken(ipAddress)
    if (result.status) {
      if (result.status === 1) {
        const resultCookie = await ReportApi.cookieReport(String(result.data), 1, ipAddressCookie, geoIP, city, [], utmSource, utmMedium, utmCampaign, utmId, utmContent, device)
        document.cookie = `_token=${result.data}; Max-Age=31536000`;
      }
    }
    document.cookie = `WMF-Last-Access=${current}; Max-Age=31536000`;
    document.cookie = `cookietype=all; Max-Age=31536000`;
    document.cookie = `current_language=vi; Max-Age=31536000`;
    if (locationCode !== "") {
      document.cookie = `locationCode=${locationCode}; Max-Age=31536000`;
    }
    if (locationHash !== "") {
      document.cookie = `locationHash=${locationCode}; Max-Age=31536000`;
    }
    if (ytRemoteDeviceId !== "") {
      document.cookie = `yt-remote-device-id=${ytRemoteDeviceId}; Max-Age=31536000`;
    }
    if (geoIP !== "") {
      document.cookie = `GeoIP=${geoIP}; Max-Age=31536000`;
    }
    setShowCookie(false)
    setPolicy(false)
    setCustomCookie(false)
    insertSession(String(result.data))
  }

  const DenyToken = async () => {
    const result = await ProfileApi.getToken(ipAddress)
    if (result.status) {
      const resultCookie = await ReportApi.cookieReport(String(result.data), 2, ipAddressCookie, geoIP, city, [], utmSource, utmMedium, utmCampaign, utmId, utmContent, device)
      if (result.status === 1) {
        document.cookie = `anonymous_id=${result.data}; Max-Age=31536000`;
      }
    }
    document.cookie = `WMF-Last-Access=${current}; Max-Age=31536000`;
    document.cookie = `cookietype=no; Max-Age=31536000`;

    if (geoIP !== "") {
      document.cookie = `GeoIP=${geoIP}; Max-Age=31536000`;
    }
    if (ytRemoteDeviceId !== "") {
      document.cookie = `yt-remote-device-id=${ytRemoteDeviceId}; Max-Age=31536000`;
    }
    if (locationCode !== "") {
      document.cookie = `locationCode=${locationCode}; Max-Age=31536000`;
    }
    if (locationHash !== "") {
      document.cookie = `locationHash=${locationCode}; Max-Age=31536000`;
    }
    setShowCookie(false)
    setPolicy(false)
    setCustomCookie(false)
    insertSession(String(result.data))
  }

  const CustomerToken = async () => {
    const result = await ProfileApi.getToken(ipAddress)
    if (result.status) {
      if (result.status === 1) {
        var customCookie = []
        if (isCheckedMandates) {
          customCookie.push(1)
        }
        if (isCheckedPerformance) {
          customCookie.push(2)
        }
        if (isCheckedTarget) {
          customCookie.push(3)
        }
        const resultCookie = await ReportApi.cookieReport(String(result.data), 3, ipAddressCookie, geoIP, city, customCookie, utmSource, utmMedium, utmCampaign, utmId, utmContent, device)
        document.cookie = `anonymous_id=${result.data}; Max-Age=31536000`;
      }
    }
    document.cookie = `WMF-Last-Access=${current}; Max-Age=2592000`;
    document.cookie = `cookietype=all; Max-Age=31536000`;
    if (isCheckedMandates) {
      document.cookie = `current_language=vi; Max-Age=86400`;
    }
    if (isCheckedPerformance) {
      document.cookie = `_gid=${randomString(25)}; Max-Age=86400`;
      document.cookie = `_gcl_au=1.1.${randomNumber(10)}.${randomNumber(10)}; Max-Age=7776000`;
      document.cookie = `_clck=${randomString(25)}; Max-Age=31536000`;
      document.cookie = `_clsk=${randomString(25)}; Max-Age=31536000`;
      document.cookie = `token=${randomString(25)}; Max-Age=31536000`;
    }
    if (isCheckedTarget) {
      document.cookie = `APISID=${randomOnlyString(4)}_${randomOnlyString(11)}/${randomString(17)}; Max-Age=31536000`;
      document.cookie = `MUID=${randomUpperString(32)}; Max-Age=31536000`;
    }
    if (locationCode !== "") {
      document.cookie = `locationCode=${locationCode}; Max-Age=86400`;
    }
    if (locationHash !== "") {
      document.cookie = `locationHash=${locationCode}; Max-Age=86400`;
    }
    if (ytRemoteDeviceId !== "") {
      document.cookie = `device-id=${ytRemoteDeviceId}; Max-Age=86400`;
    }
    if (geoIP !== "") {
      document.cookie = `GeoIP=${geoIP}; Max-Age=2592000`;
    }
    setShowCookie(false)
    setPolicy(false)
    setCustomCookie(false)
    insertSession(String(result.data))
  }

  const getScript = async () => {
    const result = await InterfaceApi.detailSettingInterface()
    if (result.status) {
      if (result.status === 1) {
        var stringScript: string
        stringScript = result.data.script.toString()
        var script = document.querySelector('script[id="script-header"]')
        if (script) {
          script.innerHTML = `${stringScript}`;
        }

        var stringScriptBody: string
        stringScriptBody = result.data.scriptBody.toString()
        var scriptBody = document.querySelector('script[id="script-body"]')
        if (scriptBody) {
          scriptBody.innerHTML = `${stringScriptBody}`;
        }
      }
    }
  }

  const updateUTM = async (token: string, utmSource: string, utmMedium: string, utmCampaign: string, utmId: string, utmContent: string, device: string) => {
    const resultUpdateCookie = await ReportApi.updateCookie(token, utmSource, utmMedium, utmCampaign, utmId, utmContent, device)
  }

  const insertSession = async (token: string) => {
    const resultInsertSession = await ReportApi.insertSessionCookie(token)
  }

  useEffect(() => {
    if (utm_source !== "") {
      var array = utm_source.split("&")
      var arrayUrl: any = []
      var utmSourceUrl: any
      var utmMediumUrl: any
      var utmCampaignUrl: any
      var utmIdUrl: any
      var utmContentUrl: any
      if (array.length > 0) {
        if (array[0][0] === "?") {
          arrayUrl = [array[0].slice(1), array[1], array[2], array[3]]
        } else {
          arrayUrl = [array[0], array[1], array[2], array[3]]
        }
        if (arrayUrl.length > 0) {
          arrayUrl.map((item: any, index: any) => {
            if (item) {
              if (item.split("=")[0] === "utm_source") {
                utmSourceUrl = item.split("=")[1]
              }
              if (item.split("=")[0] === "utm_medium") {
                utmMediumUrl = item.split("=")[1]
              }
              // if (item.split("=")[0] === "utm_campaign") {
              //   if (
              //     item.split("=")[1].indexOf('YAF') !== -1 ||
              //     item.split("=")[1].indexOf('YAM') !== -1 ||
              //     item.split("=")[1].indexOf('YAP') !== -1 ||
              //     item.split("=")[1].indexOf('MWT') !== -1 ||
              //     item.split("=")[1].indexOf('MAW') !== -1 ||
              //     item.split("=")[1].indexOf('MAM') !== -1 ||
              //     item.split("=")[1].indexOf('MAP') !== -1 ||
              //     item.split("=")[1].indexOf('MF') !== -1 ||
              //     item.split("=")[1].indexOf('MM') !== -1
              //   ) {
              //     utmCampaignUrl = item.split("=")[1]
              //   }

              // }
              if (item.split("=")[0] === "utm_campaign") {
                utmCampaignUrl = item.split("=")[1]
              }
              if (item.split("=")[0] === "utm_content") {
                utmContentUrl = item.split("=")[1]
              }
              if (item.split("=")[0] === "utm_id") {
                utmIdUrl = item.split("=")[1]
              }
            }
          })
          if (utmSourceUrl) {
            setUtmSource(utmSourceUrl)
          }
          if (utmMediumUrl) {
            setUtmMedium(utmMediumUrl)
          }
          if (utmCampaignUrl) {
            setUtmCampaign(utmCampaignUrl)
          }
          if (utmIdUrl) {
            setUtmId(utmIdUrl)
          }
          if (utmContentUrl) {
            setUtmContent(utmContentUrl)
          }
        }
      }
    }
  }, [])

  useEffect(() => {
    if (utmSource !== "" && utmMedium !== "" && utmCampaign !== "" && (utmId !== "" || utmContent !== "")) {
      let token = Token.getUser();
      if (token) {
        updateUTM(token, utmSource, utmMedium, utmCampaign, utmId, utmContent, device)
      }
    }
  }, [utmSource, utmMedium, utmCampaign, utmId])

  useEffect(() => {
    let token = Token.getUser();
    if (token.length > 0) {
      insertSession(token)
      setShowCookie(false)
    } else {
      setShowCookie(true)
    }
    let myDate: any = new Date();
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIPAddress(String(data.ip) + String(myDate))
        setIPAddressCookie(String(data.ip))
      })
      .catch(error => setIPAddress(String(myDate)))
    getBrowser();
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url).then(res => res.json()).then(data => { setCity(data.address.city); setLocationCode(data.address.country_code); setGeoIp(data.address["ISO3166-2-lvl4"]) })
    })
  }, [])

  useEffect(() => {
    getScript()
  }, [])

  // 
  return (
    <>
      <h1 className="hidden absolute h-0 w-0">Cộng Đồng Phòng Vệ HPV & các gánh nặng bệnh tật, nguy cơ ung thư liên quan</h1>
      <LoadingGlobal />
      <ToastGlobal />
      <Router />
      {/* cookie */}
      <div className={`${showCookie ? 'custom-mini-tablet absolute h-fit max-h-[45vh] lg:max-h-[45vh] llg:max-h-[40vh] xl:max-h-[calc(40vh)]  w-full -bottom-2 lg:bottom-0 left-0 bg-white z-999 flex flex-col justify-start lg:justify-start gap-2 py-[20px] xl:py-[20px] lg:py-[16px] px-[27px]  lg:px-[72px] rounded-t-2xl ' : 'hidden'} overflow-hidden`}>
        <div className='flex flex-row'>
          <div
            className="absolute lg:top-7 right-6 z-50 cursor-pointer h-[25px] lg:h-[53px] w-[25px] lg:w-[53px] flex items-center justify-center border-[#40AFA3] hover:bg-[#40AFA3] hover:text-white border rounded-full text-[#40AFA3]"
            onClick={() => DenyToken()}
          >
            <CloseIcon className='!text-xl lg:!text-[30px]' />
          </div>
          <div className="text-xl lg:text-[25px] xl:text-[30px] font-Alexandria">Cookie Settings</div>
        </div>
        <div className="h-fit max-h-[calc(30vh)] md:max-h-[calc(25vh)] lg:max-h-[40vh]  text-[10px] sm:xs md:text-base lg:text-base xl:text-lg font-Alexandria  overflow-y-auto pr-1 text-justify">
          By clicking "Accept All Cookies", you will permit us to analyze data for content improvement, share information with third parties such as advertising partners, and enhance your webpage experience. Cookies are stored for a specific duration to facilitate data analysis and optimize user experience.
          <br />If you prefer not to use cookies on your device, you can select "Reject all Cookies." However, please note that declining to use cookies may affect the functionality of the website and not provide you with the best personalized experiences.
          <br />You can customize individual cookie settings by clicking the "Customize Cookies" button.
          <br />If you want to learn more about cookies and why we use them, you can visit the <span className='font-bold text-[10px] sm:xs md:text-base lg:text-base xl:text-lg font-Alexandria decoration-clone cursor-pointer' onClick={() => {
            setPolicy(true);
            setShowCookie(false)
          }}>Cookie Policy</span> page at any time.
        </div>

        <div className="whitespace-nowrap flex flex-row lg:flex-row w-full justify-center gap-3 lg:gap-11 items-center ">
          <div className="w-1/3 xl:w-[372px] h-[30px] md:h-[35px] lg:h-[45px] xl:h-[55px] border border-[#31948A] text-[#000] hover:bg-[#31948a] hover:text-white flex justify-center items-center rounded-full text-[8px] sm:xs md:text-base lg:text-base xl:text-lg cursor-pointer" onClick={() => {
            setCustomCookie(true);
            setShowCookie(false)
          }}>Customize Cookies</div>
          <div
            className="whitespace-nowrap w-1/3 xl:w-[372px] h-[30px] md:h-[35px] lg:h-[45px] xl:h-[55px] border border-[#31948A] text-[#000] hover:bg-[#31948a] hover:text-white flex justify-center items-center rounded-full text-[8px] sm:xs md:text-base lg:text-base xl:text-lg xl:text-[22px] cursor-pointer"
            onClick={() => DenyToken()}
          >Reject all Cookies</div>
          <div
            className="whitespace-nowrap w-1/3 xl:w-[372px] h-[30px] md:h-[35px] lg:h-[45px] xl:h-[55px] border border-[#31948A] text-[#000] hover:bg-[#31948a] hover:text-white flex justify-center items-center rounded-full text-[8px] sm:xs md:text-base lg:text-base xl:text-lg xl:text-[22px] cursor-pointer"
            onClick={() => AccessToken()}
          >Accept All Cookies</div>
        </div>
      </div>

      {/* Policy */}
      <div className={`${policy ? 'custom-mini-tablet absolute h-fit max-h-[45vh] lg:max-h-[45vh] llg:max-h-[50vh] xl:max-h-[calc(40vh)]  w-full -bottom-2 lg:bottom-0 left-0 bg-white z-999 flex flex-col justify-start lg:justify-start gap-2 py-[20px] xl:py-[20px] lg:py-[16px] px-[27px]  lg:px-[72px] rounded-t-2xl ' : 'hidden'} overflow-hidden`}>
        <div className='flex flex-row'>
          <div
            className="absolute lg:top-7 right-6 z-50 cursor-pointer h-[25px] lg:h-[53px] w-[25px] lg:w-[53px] flex items-center justify-center border-[#40AFA3] hover:bg-[#40AFA3] hover:text-white border rounded-full text-[#40AFA3]"
            onClick={() => {
              setShowCookie(true);
              setPolicy(false)
            }}
          >
            <CloseIcon className='!text-xl lg:!text-[30px]' />
          </div>
          <div className="text-xl lg:text-[25px] xl:text-[30px] font-Alexandria">Cookie Policy</div>
        </div>

        <div className=" flex flex-col gap-2 h-fit overflow-y-scroll">

          <div className="h-full  text-[10px] sm:xs md:text-base lg:text-base xl:text-lg  font-Alexandria  pr-1 text-justify overflow-y-scroll">
            This cookie policy is prepared to provide users accessing our website with detailed information about the types of cookies our website uses and how visitors can control their use on their computers or mobile devices.
            <br />
            <br /><strong>What is tracking technology & Cookies?</strong>
            <br />Tracking technology is a mechanism that allows websites to track and measure user behavior and preferences for various purposes. Some are essential for operating and functioning on the internet, measuring performance, load balancing, or maintenance; others provide services for users to customize context and behavior, while some may be used for necessary educational content marketing purposes on our website.
            <br />The most common form of online tracking technology used today is called "Cookies." Cookies are small data files, often text files consisting of letters and numbers. These cookies are sent to our website from third-party web servers or vice versa. These cookies are stored on your computer or mobile device. Cookies can be used to track the pages you have visited, store information you have entered on search pages, and remember your preferences...
            <br /><strong>Why do we use cookies?</strong>
            <br />We use cookies to provide you with the full functionality of the website, customize your user experience, perform analytics, and improve our services. Cookies are also used to distribute essential, personalized information on our website and through our social media platforms. This allows us to obtain detailed information about how many people click on educational content on our social media to access our website.
            <br /><strong>Who is responsible for placing cookies on our website?</strong>
            <br />All cookies have a publisher that tells you who the cookies belong to. There are two main types:
            <br />-"First-party cookies" are cookies that we set directly on our website.
            <br />-'Third-party cookies" are cookies set on our website by other organizations with our permission.
            The information is archived and copyrighted by the Viet Nam Association of Preventive Medicine and sponsored by MSD for educational purposes
            <br /><i className='text-red-500'>The information is archived and copyrighted by the Viet Nam Association of Preventive Medicine and sponsored by MSD for educational purposes.</i>
            <br /><strong>For how long are cookies stored?</strong>
            <br />Cookies can be stored for different periods on your browser or device, with two main types:
            <br />-Session cookies: Stored on your device until you close your web browser or turn off your computer.
            <br />- Permanent cookies: Stored on your device until they expire, unless you actively delete them before that time.
            <br /><strong>What types of cookies do we use?</strong>
            <br />We use four types of cookies: strictly necessary, functional, performance, and targeting. Only the last three categories require user consent. For essential cookies, user consent is not required because these cookies provide the full and continuous display of website content, allowing you to access the website, receive an online experience, and browse digital content most suitable for you.
            <br /><strong>How can you change your cookie control preferences?</strong>
            <br />You can change your cookie control preferences in the "<strong>Customize Cookies</strong>" section at the end of this website. You can accept all three types of cookies or just one of them if you prefer. By agreeing to a cookie category, you consent to all cookies within that category. You can change your choices and decline cookies at any time in the "<strong>Customize Cookiess</strong>" section.
            <br />If you do not wish to use cookies on your device, you can choose "<strong>Reject all Cookiess</strong>". However, please note that these changes may affect the functionality of the website and may not provide you with the best-personalized experiences.
            <br />Additionally, you can prevent your browser from accepting cookies by adjusting your browser's cookie settings. All major web browsers have cookie management functions. Please check your web browser to learn how to delete or disable cookies.
            <br />If you choose "<strong>Accept all Cookies</strong>", you consent to all cookie categories, and we may share this information with third parties, such as our data analytics and advertising partners. If you choose "Essential Cookies Only," only cookies classified as "essential" will be placed on your device. You can disable non-essential cookies at any time by adjusting your preferences.
            <br /><strong>Cookie categories & Cookie control options</strong>
            <br /><strong>Strictly necessary Cookies</strong>
            <br />These cookies help identify the type of cookie, user device, geographical region code, and the most recent access time.
            <br />These cookies do not store any personally identifiable information.
            <br />Because these cookies are essential for our website to function, our cookie management tools do not allow you to control these cookies. If you set your browser not to accept them, you may not be able to use parts of the website that depend on them.
            <br /><strong>Functional Cookies</strong>
            <br />These cookies enable advanced functionalities and personalization, such as customizing video quality. These features may be set by us or third-party service providers who own the services we've integrated into our website.
            <br />Our website provides you with the option to enable or disable the use of these cookies. If you do not allow these cookies, some or all of the features may not function properly.

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead >
                  <TableRow className='bg-black'>
                    <TableCell className='!text-white font-[500] !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >Cookie</TableCell>
                    <TableCell className='!text-white font-[500] !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >Maximum Lifespan</TableCell>
                    <TableCell className='!text-white font-[500] !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">Cookies Used</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      current_language
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg'>1 day</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      searchType
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >1 day</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      VISITOR_INFO1_LIVE, YSC
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >180 days</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">Third-party</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <br /><strong>Performance Cookies</strong>
            <br />Performance cookies allow us to identify which pages are preferred and how users navigate our website. This helps us evaluate access patterns, user interactions on the website, and analyze key performance indicators to improve its performance. All information collected from these cookies is aggregated and ensures anonymity.
            <br />Our website provides you with the option to enable or disable the use of these cookies. If you do not allow the use of these cookies, we will not be able to track your visits to our website.

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead >
                  <TableRow className='bg-black'>
                    <TableCell className='!text-white font-[500] !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >Cookie</TableCell>
                    <TableCell className='!text-white font-[500] !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >Maximum Lifespan</TableCell>
                    <TableCell className='!text-white font-[500] !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">Cookies Used</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      _ga_xxxxxxxxxx
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >365 days</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      _gid
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >1 day</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      _ga
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >365  days</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      _gcl_au
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >90 days</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      _clck
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >365 days</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      _clck
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >365 days</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      _ga_*
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >365 days</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      token
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >365 days</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">First-party</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <br /><strong>Targeting Cookies</strong>
            <br />These cookies are set by our advertising partners through our website. These companies may use these cookies to build a profile of your preferences and display more relevant advertisements to you. They operate by identifying your internet browser and device.
            <br />Our website provides you with the option to enable or disable the use of these cookies. If you do not allow these cookies, you will not see targeted advertisements on various websites.
            <TableContainer component={Paper}>
              <Table aria-label="simple table" className='!border !border-black'>
                <TableHead >
                  <TableRow className='bg-black'>
                    <TableCell className='!text-white font-[500] !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >Cookie</TableCell>
                    <TableCell className='!text-white font-[500] !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >Maximum Lifespan</TableCell>
                    <TableCell className='!text-white font-[500] !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">Cookies Used</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      _fbp
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >90 days</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">Third-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      APISID
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >365 day</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">Third-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      MUID
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >365  days</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">Third-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' component="th" scope="row">
                      fr
                    </TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' >30 days</TableCell>
                    <TableCell className='!border !border-black !text-[10px] sm:!text-xs md:!text-base lg:!text-base xl:!text-lg' align="right">Third-party</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <br />
          </div>
        </div>
      </div>
      {/* custom cookie */}
      <div className={`${customCookie ? 'custom-mini-tablet absolute h-fit max-h-[45vh] lg:max-h-[45vh] llg:max-h-[40vh] xl:max-h-[calc(40vh)]  w-full -bottom-2 lg:bottom-0 left-0 bg-white z-999 flex flex-col justify-start lg:justify-start gap-2 py-[12px] xl:py-[20px] lg:py-[16px] px-[27px]  lg:px-[72px] rounded-t-2xl ' : 'hidden'} overflow-hidden`}>
        <div className='flex flex-row'>
          <div
            className="absolute lg:top-7 right-6 z-50 cursor-pointer h-[25px] lg:h-[53px] w-[25px] lg:w-[53px] flex items-center justify-center border-[#40AFA3] hover:bg-[#40AFA3] hover:text-white border rounded-full text-[#40AFA3]"
            // onClick={() => DenyToken()}
            onClick={() => {
              console.log('Tùy chỉnh Cookie')
              setShowCookie(true);
              setCustomCookie(false)
            }}
          >
            <CloseIcon className='!text-xl lg:!text-[30px]' />
          </div>
          <div className="text-xl lg:text-[25px] xl:text-[30px] font-Alexandria">Privacy Preference Setting</div>
        </div>
        <div className="h-fit max-h-[calc(30vh)] md:max-h-[calc(30vh)] lg:max-h-[calc(45vh)]  w-full flex flex-col gap-2 overflow-y-auto lg:pr-3">
          <div className="w-full flex flex-col gap-3 border-b border-[#91C6C2] pb-3 text-[10px] sm:xs md:text-base lg:text-base xl:text-lg">
            <span>Strictly Nescessary Cookies</span>
            <div className="w-full flex justify-between items-start lg:items-end">
              <div className="w-4/5 pr-2">These cookies help identify the type of cookie, user device, geog raphic location code, and the most recent access time. These cookies do not store any personally identifiable information. You can configure your browser to block these cookies, but it may affect some website features.</div>
              <div
                className="whitespace-nowrap w-24 min-w-fit px-2 lg:w-44 py-2 border border-[#31948A] text-[#31948A] hover:bg-[#31948a] hover:text-white flex justify-center items-center rounded-full text-[10px] sm:xs md:text-base lg:text-base xl:text-lg cursor-pointer"
              >Always Active</div>

            </div>
          </div>
          <div className="w-full flex flex-col gap-3 border-b border-[#91C6C2] pb-3 text-[10px] sm:xs md:text-base lg:text-base xl:text-lg">
            <span>Functional Cookies</span>
            <div className="w-full flex justify-between items-start lg:items-end">
              <div className="w-4/5 pr-2">​​Functional cookies allow us to provide advanced features and personalization, such as customizing video quality. These features are cither set by us or by third-party service providers that we have added to our pages. If you do not allow these ccokies, some or all features may not work properly.</div>
              <div
                className="whitespace-nowrap w-24 lg:w-44  border border-[#31948A] text-[#31948A]  hover:text-white flex justify-center items-center rounded-full text-[15px] lg:text-[19px] cursor-pointer"
              >
                <div className={`transition-all delay-75 h-full w-1/2 py-1 text-[10px] md:text-[15px] lg:text-base xl:text-lg ${isCheckedMandates ? 'text-[#005750] bg-white ' : 'text-white bg-[#8b8d8c]'}  flex items-center justify-center rounded-full `}
                  onClick={() => setIsCheckedMandates(false)}
                >Off</div>
                <div className={`transition-all delay-75 h-full w-1/2 py-1 text-[10px] md:text-[15px] lg:text-base xl:text-lg ${isCheckedMandates ? 'text-white bg-[#005750]' : 'text-[#005750] bg-white'} flex items-center justify-center rounded-full `}
                  onClick={() => setIsCheckedMandates(true)}
                >On</div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 border-b border-[#91C6C2] pb-3 text-[10px] sm:xs md:text-base lg:text-base xl:text-lg">
            <span>Performance Cookies</span>
            <div className="w-full flex justify-between items-start lg:items-end">
              <div className="w-4/5 pr-2">Performance cookies enable us to identify which pages are most favored and how users navigate the website, helping us assess page visits, interactions on the website, and analyze key performance indicators to improve its performance. All information col lected from these cookies is aggregated and ensures anonymity. If you do not allow the use of these cookies, we will be unable to track your visits to our website.</div>
              <div
                className="whitespace-nowrap w-24 lg:w-44  border border-[#31948A] text-[#31948A]  hover:text-white flex justify-center items-center rounded-full text-[15px] lg:text-[19px] cursor-pointer"
              >
                <div className={`transition-all delay-75 h-full w-1/2 py-1 text-[10px] md:text-[15px] lg:text-base xl:text-lg ${isCheckedPerformance ? 'text-[#005750] bg-white ' : 'text-white bg-[#8b8d8c]'}  flex items-center justify-center rounded-full `}
                  onClick={() => setIsCheckedPerformance(false)}
                >Off</div>
                <div className={`transition-all delay-75 h-full w-1/2 py-1 text-[10px] md:text-[15px] lg:text-base xl:text-lg ${isCheckedPerformance ? 'text-white bg-[#005750]' : 'text-[#005750] bg-white'} flex items-center justify-center rounded-full `}
                  onClick={() => setIsCheckedPerformance(true)}
                >On</div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 border-b border-[#91C6C2] pb-3 text-[10px] sm:xs md:text-base lg:text-base xl:text-lg">
            <span>Targeting Cookies</span>
            <div className="w-full flex justify-between items-start lg:items-end">
              <div className="w-4/5 pr-2">These cookies are set by our advertising partners through our website. These companies may use these cookies to build a profile of your preferences and display more relevant ads to you. They work by identifying your internet browser and device. If you do not allow these cookies, you will not see ads on various websites.</div>
              <div
                className="whitespace-nowrap w-24 lg:w-44  border border-[#31948A] text-[#31948A]  hover:text-white flex justify-center items-center rounded-full text-[15px] lg:text-[19px] cursor-pointer"
              >
                <div className={`transition-all delay-75 h-full w-1/2 py-1 text-[10px] md:text-[15px] lg:text-base xl:text-lg ${isCheckedTarget ? 'text-[#005750] bg-white ' : 'text-white bg-[#8b8d8c]'}  flex items-center justify-center rounded-full `}
                  onClick={() => setIsCheckedTarget(false)}
                >Off</div>
                <div className={`transition-all delay-75 h-full w-1/2 py-1 text-[10px] md:text-[15px] lg:text-base xl:text-lg ${isCheckedTarget ? 'text-white bg-[#005750]' : 'text-[#005750] bg-white'} flex items-center justify-center rounded-full `}
                  onClick={() => setIsCheckedTarget(true)}
                >On</div>
              </div>
            </div>
          </div>

        </div>
        <div className="w-full flex justify-center items-center h-10">
          <div
            className="whitespace-nowrap px-4 md:w-1/3 xl:w-[372px] h-[25px] md:h-[30px] lg:h-[40px] xl:h-[55px] border border-[#31948A] text-[#31948A] hover:bg-[#31948a] hover:text-white flex justify-center items-center rounded-full text-[10px] md:text-[15px] lg:text-base xl:text-lg cursor-pointer"
            onClick={() => CustomerToken()}
          >Confirm my choices</div>
        </div>
      </div >
    </>
  );
}

export default App;
