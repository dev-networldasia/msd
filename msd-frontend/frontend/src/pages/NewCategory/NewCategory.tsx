
import MaleIcon from '@mui/icons-material/Male';
import { baner, male, male_2 } from '../../components/ImgExport';
import './styles.css';

const NewCategory: React.FC = () => {

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div className="flex h-1/3 pt-4">
          <div className="w-2/3 h-full rounded-2xl overflow-hidden">
            <img src={baner} alt="hpv" className="w-full h-full  object-left-top object-cover" />
          </div>
          <div className="w-1/3 h-full pl-6 flex flex-col">
            <div className=" w-full flex  h-full">
              <div className="w-full flex  h-full rounded-2xl bg-[#2452e9]" >
                <div className="w-2/3 h-full flex flex-col justify-between p-4">
                  <div className="flex flex-col">
                    <span className='text-md uppercase text-white'>DỰ PHÒNG HPV CHO NAM</span>
                    <span className='text-md uppercase text-white'>từ 9 - 18 tuổi</span>
                  </div>
                  <span className='text-[10px] text-white font-[300]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A architecto qui quod enim at non consequuntur expedita odit error, s</span>
                </div>
                <div className="w-1/3 h-full relative">
                  <div className="absolute top-2 right-2">
                    <MaleIcon className='text-white text-lg' />
                  </div>
                  <div className="pt-4 w-full h-full overflow-hidden">
                    <img src={male} alt="hpv" className='h-full w-full object-contain' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-2/3 pt-4">
          <div className="w-2/3 h-full flex ">
            <div className="w-1/2 h-full flex flex-col pr-3">
              <div className=" w-full flex flex-col h-1/2 pb-1">
                <div className="w-full flex h-full rounded-2xl bg-[#5d71e6] overflow-hidden" >
                  <div className="w-1/2 h-full flex flex-col justify-between p-4">
                    <div className="flex flex-col">
                      <span className='text-md uppercase text-white'>tiêu đề <br /> bài viết số 1</span>
                    </div>
                    <span className='text-[10px] text-white font-[300]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur expedita odit error</span>
                  </div>
                  <div className="w-1/2 h-full p-4 ">
                    <div className="w-full h-full overflow-hidden rounded-lg bg-gradient-to-r from-[#ffffff] to-[#94e4e1]">
                      <img src={male_2} alt="hpv" className='h-full w-full object-contain bg-' />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full flex h-1/2 pt-1">
                <div className="pr-1 w-1/2">
                  <div className="w-full flex h-full rounded-2xl bg-[#2452e9] overflow-hidden">
                    <div className="w-full h-full flex flex-col justify-between p-4">
                      <div className="flex flex-col">
                        <span className='text-md uppercase text-white'>tiêu đề <br /> bài viết số 4</span>
                      </div>
                      <span className='text-[10px] text-white font-[300]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur expedita odit error</span>
                    </div>
                  </div>
                </div>
                <div className="pl-1 w-1/2">
                  <div className="w-full flex h-full rounded-2xl bg-[#2452e9] overflow-hidden">
                    <div className="w-full h-full flex flex-col justify-between p-4">
                      <div className="flex flex-col">
                        <span className='text-md uppercase text-white'>tiêu đề <br /> bài viết số 5</span>
                      </div>
                      <span className='text-[10px] text-white font-[300]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A architecto qui quod enim at non consequuntur expedita odit error, s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full flex flex-col pr-3">
              <div className=" w-full flex flex-col h-1/2 pb-1">
                <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden" >
                  <div className="w-1/2 h-full flex flex-col justify-between p-4">
                    <div className="flex flex-col">
                      <span className='text-md uppercase text-black'>tiêu đề <br /> bài viết số 2</span>
                    </div>
                    <span className='text-[10px] text-black font-[300]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur expedita odit error</span>
                  </div>
                  <div className="w-1/2 h-full p-4 ">
                    <div className="w-full h-full overflow-hidden rounded-lg bg-gradient-to-r from-[#dad5d5] to-[#94e4e1]">
                      <img src={male_2} alt="hpv" className='h-full w-full object-contain bg-' />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full flex h-1/2 pt-1">
                <div className="pr-1 w-1/2">
                  <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden">
                    <div className="w-full h-full flex flex-col justify-between p-4">
                      <div className="flex flex-col">
                        <span className='text-md uppercase text-black'>tiêu đề <br /> bài viết số 6</span>
                      </div>
                      <span className='text-[10px] text-black font-[300]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur expedita odit error</span>
                    </div>
                  </div>
                </div>
                <div className="pl-1 w-1/2">
                  <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden">
                    <div className="w-full h-full flex flex-col justify-between p-4">
                      <div className="flex flex-col">
                        <span className='text-md uppercase text-black'>tiêu đề <br /> bài viết số 7</span>
                      </div>
                      <span className='text-[10px] text-black font-[300]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A architecto qui quod enim at non consequuntur expedita odit error, s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3 h-full pl-6 flex flex-col">
            <div className="w-full h-full flex flex-col pr-3">
              <div className=" w-full flex flex-col h-1/2 pb-1">
                <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden" >
                  <div className="w-1/2 h-full flex flex-col justify-between p-4">
                    <div className="flex flex-col">
                      <span className='text-md uppercase text-black'>tiêu đề <br /> bài viết số 3</span>
                    </div>
                    <span className='text-[10px] text-black font-[300]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur expedita odit error</span>
                  </div>
                  <div className="w-1/2 h-full p-4 ">
                    <div className="w-full h-full overflow-hidden rounded-lg bg-gradient-to-r from-[#dad5d5] to-[#94e4e1]">
                      <img src={male_2} alt="hpv" className='h-full w-full object-contain bg-' />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full flex h-1/2 pt-1">
                <div className="pr-1 w-1/2">
                  <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden">
                    <div className="w-full h-full flex flex-col justify-between p-4">
                      <div className="flex flex-col">
                        <span className='text-md uppercase text-black'>tiêu đề <br /> bài viết số 8</span>
                      </div>
                      <span className='text-[10px] text-black font-[300]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur expedita odit error</span>
                    </div>
                  </div>
                </div>
                <div className="pl-1 w-1/2">
                  <div className="w-full flex h-full rounded-2xl bg-white overflow-hidden">
                    <div className="w-full h-full flex flex-col justify-between p-4">
                      <div className="flex flex-col">
                        <span className='text-md uppercase text-black'>tiêu đề <br /> bài viết số 9</span>
                      </div>
                      <span className='text-[10px] text-black font-[300]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A architecto qui quod enim at non consequuntur expedita odit error, s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
export default NewCategory