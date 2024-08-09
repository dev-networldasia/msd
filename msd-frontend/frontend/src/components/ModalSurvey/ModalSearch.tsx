import React, { useEffect, useState } from 'react'
import '../styles.css'
import { useNavigate } from 'react-router-dom'
import * as Token from '../../services/token';
import * as NewApi from '../../api/new/newApi';
import useToast from '../../hook/useToast';
import useLoading from '../../hook/useLoading';
import useDebounce from "../../hook/useDebounce";

interface ModalSearchProps {
    // gender: string
    show: boolean
    dismiss: () => void
}
export default function ModalSearch(modal: ModalSearchProps) {
    const navigator = useNavigate()
    const pushToast = useToast();
    const pushLoading = useLoading();

    const [searchKey, setSearchKey] = useState('')
    const [listNew, setListNew] = useState<NewApi.InfoNewSearch[]>([])
    const [tokenUser, setTokenUser] = useState('')
    const getToken = () => {
        const token = Token.getUser();
        setTokenUser(token)
    }

    const getListNewSearch = useDebounce(async () => {
        pushLoading(true)
        const result = await NewApi.searchTitleArticle(searchKey, tokenUser, 5, 0)
        if (result.status) {
            setListNew(result.data)
        } else {
            setListNew([])
            pushToast(result?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau!", "warning");
        }
        pushLoading(false)
    }, 1000)

    useEffect(() => {
        getToken()
    }, [])

    useEffect(() => {
        if (tokenUser) {
            getListNewSearch()
        }
    }, [searchKey])

    const handleClickNew = (categoryId: number, categoryUrl: string, url: string) => {
        modal.dismiss()
        if (categoryId <= 3) {
            navigator(`/chi-tiet-bai-viet-du-phong-cho-nu/${categoryUrl}/${url}`, { state: { keysearch: searchKey } })
        } else {
            navigator(`/chi-tiet-bai-viet-du-phong-cho-nam/${categoryUrl}/${url}`, { state: { keysearch: searchKey } })
        }
    }

    return (
        <>
            {modal.show ? (
                <>
                    <div
                        className=" fixed  overflow-x-hidden overflow-y-auto  inset-0 z-[400] outline-none focus:outline-none "
                    >
                        <div className=' absolute top-10 lg:top-20 right-6 md:right-20 z-[400] pl-3 flex  transition ease-in-out delay-150 mt-auto' >
                            <div className='min-w-[330px] min-h-[100px] transition ease-in-out bg-white delay-150 rounded-2xl relative flex flex-col justify-between z-[400] mt-auto p-5'>
                                <div className="w-full h-9 border border-[#c6c6c6] rounded-lg px-4 flex items-center">
                                    <input type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder='Tìm kiếm...' className='outline-none focus-visible:outline-none' />
                                </div>
                                <div className="flex flex-col gap-2 overflow-y-auto w-full max-w-[300px] pt-4 h-fit">
                                    {listNew.map((item, index) => (
                                        <span
                                            key={item.id}
                                            className='text-base text-[#005750] font-Alexandria cursor-pointer'
                                            onClick={() => handleClickNew(item.categoryId, item.categoryUrl, item.url)}
                                        >
                                            {item.title}
                                        </span>
                                    ))}

                                    {listNew.length === 0 && searchKey !=='' && (
                                        <span className='text-base text-[#005750] font-Alexandria cursor-pointer'>Không tìm thấy kết quả!</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-[90] bg-black"
                            onClick={() => modal.dismiss()}
                        ></div>
                    </div>
                </>
            ) : null}
        </>
    )
}
