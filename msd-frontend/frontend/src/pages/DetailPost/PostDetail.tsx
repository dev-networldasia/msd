
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { female, mobile_detail_1, mobile_detail_2, mobile_post_1, mobile_post_2, post_1 } from '../../components/ImgExport';
import Footer from '../../router/Layout/Footer';
import './styles.css';

const PostDetail: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const navigator = useNavigate()

  return (
    <>
      <div className={showModal ? 'absolute top-0 left-0 w-[100vw] h-[100vh] bg-black z-30 opacity-70' : 'hidden'} onClick={() => setShowModal(false)}></div>
      {/* tablet - desktop */}
      <div className="hidden md:flex h-full  xxl:pt-3 gap-4 xxl:gap-4">
        <div className="w-2/3 h-full py-4">
          <div className="w-full h-full bg-white flex flex-col gap-7 py-11 px-10 rounded-2xl">
            <div className='w-2/3 h-[70px] overflow-hidden text-[28px] font-[500] uppercase leading-10'>Tiêu đề <br /> bài viết số 1</div>
            <div className="w-full height-content flex gap-8">
              <div className="w-2/3 overflow-y-scroll text-ellipsis text-justify text-sm xxl:text-base font-Alexandria font-[300] pr-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br />
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. <br />
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus,
              </div>
              <div className="w-1/3 gap-4 flex flex-col">
                <div className="w-full h-[232px] rounded-2xl overflow-hidden">
                  <img src={post_1} alt="hpv" className='w-full h-full object-cover' />
                </div>
                <div className="text-sm xxl:text-base font-Alexandria text-justify">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam</div>
              </div>
            </div>
            <div
              className="h-[55px] w-[263px] border-[#005750] hover:text-white hover:bg-[#005750] transition-all border flex justify-center items-center cursor-pointer rounded-full overflow-hidden text-[28px] text-[#005750] font-Alexandria"
              onClick={() => navigator('/dia-diem-tu-van')}
            >Đặt lịch tư vấn</div>
          </div>
        </div>
        <div className="w-1/3 h-full relative flex flex-col xxl:pl-3">
          <div className="h-1/3 w-full py-4 ">
            <div className="bg-[#FDE533] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"
            >
              <div className="w-[55%] pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                <div>
                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase">DỰ PHÒNG HPV CHO NỮ TỪ 9-18 TUỔI</p>
                </div>
                <div className="">
                  <p className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 xxl:line-clamp-3 text-ellipsis font-Alexandria">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolore</p>

                </div>
              </div>
              <div className=" w-[45%] flex flex-col justify-end px-4 pt-5 xxl:pt-8 relative">
                <div className="absolute top-4 xxl:top-8 right-2 xxl:right-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="39" viewBox="0 0 26 39" fill="none">
                    <path d="M25.3 12.67C25.3 5.67 19.63 0 12.63 0C5.63 0 0 5.67 0 12.67C0 19.05 4.75 24.33 10.9 25.21V29.38H7.94C6.94 29.38 6.16 30.15 6.16 31.15C6.16 32.16 6.95 32.98 7.94 32.98H10.9V36.56C10.9 37.56 11.66 38.37 12.66 38.37C13.66 38.37 14.42 37.56 14.42 36.56V32.98H17.36C18.36 32.98 19.17 32.16 19.17 31.17C19.17 30.17 18.36 29.38 17.36 29.38H14.42V25.21C20.66 24.33 25.3 19.05 25.3 12.67ZM12.65 21.72C7.66 21.72 3.6 17.66 3.6 12.67C3.6 7.68 7.65 3.62 12.64 3.62C17.63 3.62 21.69 7.68 21.69 12.67C21.69 17.66 17.63 21.72 12.64 21.72H12.65Z" fill="black" aria-hidden='true' aria-label='svg' aria-labelledby='svg-labelledby' aria-describedby='svg-describedby'/>
                  </svg>
                </div>
                <div className="w-[170px] xxl:w-[204px] h-[143px] xxl:h-[183px] flex-shrink-0 overflow-hidden">
                  <img src={female} alt="hpv" className='w-full h-full object-cover' />
                </div>
              </div>
            </div>
          </div>
          <div className="h-1/3 w-full py-4 ">
            <div className=" bg-[#FFF298] rounded-2xl h-full w-full flex gap-7 overflow-hidden transition-all cursor-pointer"
            >
              <div className="w-1/2 h-full pl-4 xxl:pl-7 py-5 xxl:py-8 flex flex-col justify-between">
                <div>
                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase">tiêu đề <br /> bài viết số 1</p>
                </div>
                <div className="">
                  <p className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 xxl:line-clamp-3 text-ellipsis font-Alexandria">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolore</p>

                </div>
              </div>
              <div className=" w-1/2 h-full pr-7 py-5 xxl:py-8 ">
                <div className="h-full w-full rounded-2xl overflow-hidden">
                  <img src={post_1} alt="hpv" className='w-full h-full object-cover' />

                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 xxl:gap-7 w-full h-1/3 py-4 grid-cols-2">

            <div className="bg-white hover:bg-[#FFF298] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"

            >
              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                <div>
                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase">Bài viết số 2</p>
                </div>
                <div className="">
                  <p className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 xxl:line-clamp-3 text-ellipsis font-Alexandria">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolore</p>

                </div>
              </div>
            </div>
            <div className="bg-white hover:bg-[#FFF298] rounded-2xl h-full w-full flex overflow-hidden transition-all cursor-pointer"

            >
              <div className="px-4 xxl:px-7 py-5 xxl:py-8 flex flex-col justify-between">
                <div>
                  <p className="mb-0 text-black text-[17px] xxl:text-[19px] font-[500] leading-6 uppercase">Bài viết số 3</p>
                </div>
                <div className="">
                  <p className="text-black text-xs xxl:text-sm leading-[17px] mt-2 xxl:mt-5 line-clamp-2 xxl:line-clamp-3 text-ellipsis font-Alexandria">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolore</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="md:hidden flex flex-col h-full  xxl:pt-3  ">
        <div className="flex h-auto w-full ">
          <div className="w-full h-full relative flex flex-col  xxl:pl-3">
            <div className=" w-full h-full ">
              <div className="h-full w-full bg-white rounded-2xl  flex overflow-hidden transition-all cursor-pointer"
              >
                <div className="w-full p-6 flex flex-col gap-[14px]">
                  <div>
                    <p className="mb-0 text-black text-[17px] -tracking-[0.34px] uppercase">DẤU HIỆU SỚM CỦA CÁC BỆNH PHỤ KHOA</p>
                  </div>
                  <div className="">
                    <p className="text-black text-[15px] leading-[17px]   font-Alexandria">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cumque. Eaque, a culpa magnam explicabo ipsum repudiandae sunt quia. Officiis magnam fugit tempora hic? Consectetur aspernatur nisi eveniet fugiat quaerat.</p>

                  </div>
                  <div className=" w-full h-[176px]">
                    <img src={mobile_detail_1} alt="hpv" className='img' />

                  </div>
                  <div className="">
                    <p className="text-black text-[15px] leading-[17px]   font-Alexandria">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,</p>

                  </div>
                  <div className=" w-full h-[176px]">
                    <img src={mobile_detail_2} alt="hpv" className='img' />

                  </div>
                  <div className="">
                    <p className="text-black text-[15px] leading-[17px]   font-Alexandria">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,</p>

                  </div>

                  <div className="w-full flex justify-center">
                    <div className="h-10 w-[186px] flex items-center justify-center rounded-full bg-[#F9E249] text-black text-[15px] font-Alexandria -tracking-[0.3px]">
                      ĐẶT LỊCH TƯ VẤN
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full pt-2">
          <div className="w-full min-h-[144px] relative flex flex-col">
            <div className=" w-full h-full ">
              <div className="hover-scale-image bg-[#FFE982] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"

              >
                <div className="w-1/2 h-full pl-6 py-5 flex flex-col justify-end">
                  <div>
                    <p className="mb-0 text-black text-[15px] font-Alexandria uppercase">DẤU HIỆU SỚM CỦA CÁC BỆNH PHỤ KHOA</p>
                  </div>
                </div>
                <div className=" w-1/2 h-full pr-4 py-3 ">
                  <div className="h-full w-full rounded-2xl overflow-hidden">
                    <img src={mobile_post_1} alt="hpv" className='w-full h-full object-cover' />

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full min-h-[144px] flex gap-2">
            <div className=" w-1/2 h-full ">
              <div className="hover-scale-image bg-[#FFE982] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
              >
                <div className="w-full h-full pl-6 pr-3 py-5 flex flex-col justify-end overflow-hidden">
                  <div>
                    <p className="mb-0 text-black text-[15px] font-Alexandria uppercase line-clamp-4 text-ellipsis">Lợi ích khi phòng
                      ngừa HPV ở 2 phái
                      tiền hôn nhân </p>
                  </div>
                </div>

              </div>
            </div>
            <div className=" w-1/2 h-full ">
              <div className="hover-scale-image bg-[#FFE982] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
              >
                <div className="w-full h-full pl-6 pr-3 py-5 flex flex-col justify-end overflow-hidden">
                  <div>
                    <p className="mb-0 text-black text-[15px] font-Alexandria uppercase line-clamp-4 text-ellipsis">Cộng đồng
                      ngừa HPV,
                      tự tin sống lành</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="w-full min-h-[144px] relative flex flex-col">
            <div className=" w-full h-full ">
              <div className="hover-scale-image bg-[#FFE982] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
              >
                <div className="w-1/2 h-full pl-6 py-5 flex flex-col justify-end">
                  <div>
                    <p className="mb-0 text-black text-[15px] font-Alexandria uppercase line-clamp-4 text-ellipsis">tiêu đề bài viết số 2</p>
                  </div>
                </div>
                <div className=" w-1/2 h-full pr-4 py-3 ">
                  <div className="h-full w-full rounded-2xl overflow-hidden">
                    <img src={mobile_post_2} alt="hpv" className='w-full h-full object-cover' />

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full min-h-[144px] relative flex flex-col">
            <div className=" w-full h-full ">
              <div className="hover-scale-image bg-[#FFE982] rounded-2xl h-full w-full flex gap-4 overflow-hidden transition-all cursor-pointer"
              >
                <div className=" w-1/2 h-full pl-4 py-3 ">
                  <div className="h-full w-full rounded-2xl overflow-hidden">
                    <img src={mobile_post_2} alt="hpv" className='w-full h-full object-cover' />

                  </div>
                </div>
                <div className="w-1/2 h-full pr-6 py-5 flex flex-col justify-end">
                  <div>
                    <p className="mb-0 text-black text-[15px] font-Alexandria uppercase line-clamp-4 text-ellipsis">tiêu đề bài viết số 2</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <Footer colorText='606060' type='female' />
        </div>
      </div>
    </>

  )
}
export default PostDetail