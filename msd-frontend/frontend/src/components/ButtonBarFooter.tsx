import React, { useState } from 'react'
import { location_round, message2 } from './ImgExport'
import { useNavigate } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as Token from '../services/token';
import * as AccumulateApi from '../api/token/accumulateApi';

interface PropsFooterBar {
    handleLink: () => void;
}
let timeout: any, n = 5;
export default function ButtonBarFooter(PropsFooterBar: PropsFooterBar) {
    const [countdown, setCountdown] = useState(0); // Bắt đầu với giá trị 10, hoặc giá trị tùy chọn khác
    const [showNotification, setShowNotification] = useState(false);
    const navigator = useNavigate()

    const clickButton = async (param: string) => {
        let token = Token.getUser();
        if (token) {
            if (param === "messager") {
                const result = await AccumulateApi.trackingButton(token, 2)
                // window.location.href = 'https://m.me/hpvvietnam?ref=botshare'
            } else if (param === "location") {
                const result = await AccumulateApi.trackingButton(token, 1)
                // navigator('/dia-diem-tu-van')
            } else if (param === "location_round") {
                const result = await AccumulateApi.trackingButton(token, 3)
                PropsFooterBar.handleLink()
            }
        } else {
            if (param === "messager") {
                // window.location.href = 'https://m.me/hpvvietnam?ref=botshare'
            } else if (param === "location") {
                // navigator('/dia-diem-tu-van')
            } else if (param === "location_round") {
                PropsFooterBar.handleLink()
            }
        }

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
    return (
        <div className="flex gap-3 flex-col fixed bottom-20 md:bottom-20 lg:bottom-[20px] right-2 z-50" >
            <a href='https://m.me/hpvvietnam?ref=botshare' target='_blank' title='mess' id='btn-mess-id' className="btn-mess relative h-[35px] md:h-[50px] xxl:h-[55px] p-2 xxl:p-0 w-[35px] md:w-[50px] xxl:w-[55px] flex justify-center items-center rounded-[50%] bg-[#00c6e4] shadow-md cursor-pointer hover:bg-[#47a1af] "
                onClick={() => clickButton("messager")}>
                <span className='absolute opacity-0 h-full w-full z-10'>mess</span>
                <img src={message2} alt="message" />
            </a>

            <a href='/dia-diem-tu-van' title='location' id='location-id' className="btn-link-location h-[35px] md:h-[50px] xxl:h-[55px] p-2 xxl:p-0 w-[35px] md:w-[50px] xxl:w-[55px] hidden lg:flex justify-center items-center rounded-[50%] bg-[#00c6e4] shadow-md cursor-pointer hover:bg-[#47a1af]"
                onClick={() => clickButton("location")}>
                <LocationOnIcon className="text-white !text-[25px]" />
            </a>

            <a href='#' title='location-around' id='btn-location-round-id'
                className="btn-link-location-round h-[35px] md:h-[50px] xxl:h-[55px] p-2 xxl:p-0 w-[35px] md:w-[50px] xxl:w-[55px] flex justify-center items-center rounded-[50%] bg-[#00c6e4] shadow-md cursor-pointer hover:bg-[#47a1af]"
                onClick={() => clickButton("location_round")}>
                <img src={location_round} alt="location round" />
            </a>
        </div>
    )
}
