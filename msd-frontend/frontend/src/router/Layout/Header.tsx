import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { logo, logo_vi, menu_icon } from "../../components/ImgExport";
import ModalSearch from '../../components/ModalSurvey/ModalSearch';
import useToast from '../../hook/useToast';
import "./styles.css";
import useWindowDimensions from '../../hook/useWindowDimensions';



interface InfoHeader {
    handleCancel: () => void;
    handleLink: () => void;
}

export default function Header(Info: InfoHeader) {
    const { handleCancel, handleLink } = Info
    const navigator = useNavigate()
    const [curPathLink, setcurPathLink] = useState('')
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const pushToast = useToast();


    const [searchModal, setSearchModal] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { width } = useWindowDimensions();

    const sidebarNavOwnerItems = [
        {
            id: '1',
            name: 'Nữ giới',
            class: 'btn-link-female',
            link: '/du-phong-cho-nu',
            linkActive: ['/chi-tiet-du-phong-cho-nu', 'chi-tiet-bai-viet-du-phong-cho-nu'],
            textColorActive: '005750',
            bgActive: 'FDE533',
            idItem: 'btn-female-id-desktop',
            idItemMobile: 'btn-female-id-mobile',
        },
        {
            id: '2',
            name: 'Nam giới',
            class: 'btn-link-male',
            link: '/du-phong-cho-nam',
            linkActive: ['/chi-tiet-du-phong-cho-nam', 'chi-tiet-bai-viet-du-phong-cho-nam'],
            textColorActive: 'ffffff',
            bgActive: '045AFA',
            idItem: 'btn-male-id-desktop',
            idItemMobile: 'btn-male-id-mobile',

        },
        {
            id: '3',
            name: 'Trắc Nghiệm',
            class: 'btn-link-quiz',
            link: '/kiem-tra-hpv',
            linkActive: ['cau-hoi-kiem-tra-hpv', ''],
            textColorActive: 'ffffff',
            bgActive: '005750',
            idItem: 'btn-quiz-id-desktop',
            idItemMobile: 'btn-quiz-id-mobile',
        },
        {
            id: '4',
            name: 'Sống lành chủ động',
            link: '/song-lanh-chu-dong',
            class: 'btn-link-healthy',
            linkActive: ['chi-tiet-song-lanh-chu-dong', 'chi-tiet-bai-viet-song-lanh-chu-dong'],
            textColorActive: 'ffffff',
            bgActive: '005750',
            idItem: 'btn-healthy-id-desktop',
            idItemMobile: 'btn-healthy-id-mobile',
        },

        {
            id: '5',
            name: 'Hoạt động cộng đồng',
            class: 'btn-link-activities',
            link: '/hoat-dong-cong-dong',
            linkActive: ['hoat-dong-cong-dong', 'chi-tiet-bai-viet-hoat-dong-cong-dong'],
            textColorActive: 'ffffff',
            bgActive: '005750',
            idItem: 'btn-activities-id-desktop',
            idItemMobile: 'btn-activities-id-mobile',
        },
        {
            id: '6',
            name: 'Địa điểm tư vấn',
            link: '/dia-diem-tu-van',
            class: 'btn-link-location    ',
            // link: '/link',
            linkActive: ['', ''],
            textColorActive: 'ffffff',
            bgActive: '005750',
            idItem: 'btn-location-id-desktop',
            idItemMobile: 'btn-location-id-mobile',
        },
    ]

    useEffect(() => {
        const curPath = window.location.pathname;
        setcurPathLink(curPath)

    }, [window.location.pathname]);

    return (
        <>
            <div className="hidden lg:block px-5 xxl:px-7 z-10 ">
                <div className=" h-16 xxl:h-[100px]  bg-white w-full hidden lg:flex items-center justify-between px-1 lg:px-2 xxl:pr-6 py-1 rounded-full shadow-lg">
                    <ModalSearch show={searchModal} dismiss={() => setSearchModal(false)} />

                    <a href='#' title='hpv' id='btn-home-id-desktop' className="btn-link-home h-full flex items-center gap-4 cursor-pointer" onClick={() => { navigator('/'); handleCancel(); }}>
                        <img src={logo} alt="hpv" className='!h-full aspect-square  xxl:!h-[80px]' />
                        <div className="h-full flex items-center w-[190px] xxl:w-[223px] xxl:h-[60px]">
                            {/* <img src={logoTextBlue} alt="hpv" className="img" /> */}
                            <img src={logo_vi} alt="hpv" className="h-full object-cover w-[90%] xxl:w-auto" />
                        </div>
                    </a>
                    <div className="hidden h-full lg:flex gap-3 xxl:gap-5 items-center">
                        {sidebarNavOwnerItems.map((item, index) => (
                            <a
                                href='#'
                                // target='blank'
                                title='hpv'
                                key={index}
                                id={item.idItem}
                                className={`${curPathLink === item.link || (curPathLink.includes(item?.linkActive[0]) && item.linkActive[0] !== '') || (curPathLink.includes(item?.linkActive[1]) && item.linkActive[1] !== '') ?
                                    `border-${item.bgActive} bg-[#${item.bgActive}] text-${item.textColorActive} `
                                    :
                                    `text-[#005750] border border-[#005750]  hover-text-${item.textColorActive}
                                      hover-bg-${item.bgActive} hover-border-${item.bgActive} b-white `}
                                      ${item.class}
                                       transition-all flex items-center justify-center text-[11px] xxl:text-[14px]  xxl:line-height-[20px] xxxl:text-base font-[400] h-9 xxl:h-11 min:w-40 px-3 lg:px-2 lg:gap-2 lg:text-[10px] xxl:px-5 rounded-3xl  whitespace-nowrap  cursor-pointer overflow-hidden text-ellipsis`}
                                onClick={() => {
                                    if (item.link === '/link') {
                                        handleLink()
                                    }
                                    else {
                                        navigator(item.link);
                                        handleCancel()
                                    }
                                }}
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="" onClick={() => setSearchModal(true)}>
                            <SearchIcon className="text-[#005750] lg:!text-3xl xxl:!text-5xl font-bold cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className=" h-[40px] md:h-[56px] bg-transparent w-full pl-2 pr-3  flex flex-col lg:hidden justify-center z-[999]">
                <div className="h-[25px] w-full flex justify-between items-center">
                    <div>
                        <Button
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <img src={menu_icon} className='h-6 w-6 -ml-4' alt="hpv" />
                        </Button>
                        <Menu
                            id="demo-positioned-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {sidebarNavOwnerItems.map((item, index) => (
                                <MenuItem key={index}
                                >
                                    <a
                                        href='#'
                                        title='hpv'
                                        id={item.idItemMobile}
                                        className={`${item.class} p-0 text-base text-custom-header-mobile md:!text-xl text-[#005750] font-Alexandria`}
                                        onClick={() => {
                                            if (item.link === '/link') {
                                                handleLink()
                                            }
                                            else {
                                                navigator(item.link);
                                                handleCancel()
                                            }
                                        }}>{item.name}</a>
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                    <a href='#' id='btn-home-id-mobile' className="btn-link-home flex items-center justify-center gap-2">
                        <div className="w-[35px] md:w-[45px] h-[35px] md:h-[45px]">
                            <img src={logo} alt="hpv" className='img' />
                        </div>
                        <div className='h-[10px] flex items-center justify-center gap-1'>
                            {/* <img src={Isolation_Mode} alt="hpv" className='w-[24px] h-[24px] object-cover' onClick={() => navigator('/')} /> */}
                            <img src={logo_vi} alt="hpv" className='!h-[30px] !md:h-[40px] object-cover' onClick={() => navigator('/')} />
                        </div>
                    </a>
                    <ModalSearch show={searchModal} dismiss={() => setSearchModal(false)} />
                    <div className="relative" onClick={() => setSearchModal(true)}>
                        <SearchIcon className="text-[#005750]  !text-[30px]" />

                    </div>
                </div>
            </div>
        </>
    )
}
