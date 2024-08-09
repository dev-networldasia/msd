import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { female_icon, home_icon, location_icon, male_icon, quiz_icon } from './ImgExport';
import './styles.css'

interface Info {
    handleCancel: () => void;
    curPathLink: string;
}
export default function FooterSideBar(Info: Info) {
    const { handleCancel, curPathLink } = Info;

    const navigator = useNavigate()

    const sidebarNavOwnerItemsMobile = [
        {
            id: '1',
            name: 'Trang chủ',
            class: 'btn-link-home',
            icon: home_icon,
            link: '/',
            linkActive: ['', ''],
            bgActive: '005750',
            idItem: 'btn-home-id',
        },
        {
            id: '2',
            name: 'Nữ giới',
            class: 'btn-link-female',
            icon: female_icon,
            link: '/du-phong-cho-nu',
            linkActive: ['/chi-tiet-du-phong-cho-nu', 'chi-tiet-bai-viet-du-phong-cho-nu'],
            bgActive: 'F9E249',
            idItem: 'btn-female-id',
        },
        {
            id: '3',
            name: 'Nam giới',
            class: 'btn-link-male',
            icon: male_icon,
            link: '/du-phong-cho-nam',
            linkActive: ['/chi-tiet-du-phong-cho-nam', 'chi-tiet-bai-viet-du-phong-cho-nam'],
            bgActive: '005CFB ',
            idItem: 'btn-male-id',
        },
        {
            id: '4',
            name: 'Trắc Nghiệm',
            class: 'btn-link-quiz',
            icon: quiz_icon,
            link: '/kiem-tra-hpv',
            linkActive: ['cau-hoi-kiem-tra-hpv', ''],
            bgActive: '005750',
            idItem: 'btn-quiz-id',
        },
        {
            id: '5',
            name: 'Địa điểm tư vấn',
            class: 'btn-link-location',
            icon: location_icon,
            link: '/dia-diem-tu-van',
            linkActive: ['chi-tiet-dia-diem-tu-van', ''],
            bgActive: '005750',
            idItem: 'btn-location-id',
        },
    ]

    return (
        <div className="w-full h-[54px] flex lg:hidden px-7 py-3 items-center justify-between sm:justify-center sm:gap-[45px] bg-white z-50">
            {sidebarNavOwnerItemsMobile.map((item, index) => (
                <a
                    key={index}
                    href='#'
                    title='hpv'
                    id={item.idItem}
                    className={`${curPathLink === item.link || (curPathLink.includes(item?.linkActive[0]) && item.linkActive[0] !== '') || (curPathLink.includes(item?.linkActive[1]) && item.linkActive[1] !== '') ? `bg-${item.bgActive}` : 'bg-[#00A8AE]'} ${item.class} w-[37px] h-[37px] flex items-center justify-center rounded-full  `}
                    onClick={() => {
                        handleCancel();
                        navigator(item.link)
                    }}
                >
                    <img src={item.icon} className='h-2/5 w-2/5 object-cover' alt="hpv" />
                </a>
            ))}

        </div>
    )
}