import { Route, Routes } from 'react-router-dom'
import CommunityActivities from '../pages/CommunityActivities/CommunityActivities'
import CommunityActivitiesDetail from '../pages/CommunityActivities/CommunityActivitiesDetail'
import DetailPostFemale from '../pages/DetailPostFemale/DetailPostFemale'
import DetailPostMale from '../pages/DetailPostMale/DetailPostMale'
import FemaleDetail from '../pages/FemaleDetail/FemaleDetail'
import Female from '../pages/Female/Female'
import HealthyAndProactive from '../pages/HealthyAndProactive/Component/HealthyAndProactive'
import HealthyDetail from '../pages/HealthyAndProactive/Component/HealthyDetail'
import Healthy from '../pages/HealthyAndProactive/Component/Healthy'
import HomePage from '../pages/HomePage/HomePage'
import Male from '../pages/Male/Male'
import MaleDetail from '../pages/MaleDetail/MaleDetail'
import MultipleChoiceQuestion from '../pages/MultipleChoice/Component/MultipleChoiceQuestion'
import MultipleChoice from '../pages/MultipleChoice/MultipleChoice'
import ScheduleDetail from '../pages/ScheduleConsultation/Component/ScheduleDetail'
import ScheduleConsultation from '../pages/ScheduleConsultation/ScheduleConsultation'
import AppLayout from './Layout/AppLayOut'
import AppLayoutFemale from './Layout/AppLayOutFemale'
import AppLayoutMale from './Layout/AppLayOutMale'

export default function Router() {
  return (
    <Routes>
      <Route index element={<HomePage />} /> 
      <Route path='/du-phong-cho-nu' element={<Female />} />
      <Route path='/du-phong-cho-nam' element={<Male />} />
      <Route path='/song-lanh-chu-dong' element={<Healthy />} />
      <Route path='/chi-tiet-bai-viet-du-phong-cho-nam/:categoryUrl/:url' element={<DetailPostMale />} />
      <Route path='/chi-tiet-bai-viet-song-lanh-chu-dong/:categoryUrl/:url' element={<HealthyDetail />} />
      <Route path='/chi-tiet-bai-viet-du-phong-cho-nu/:categoryUrl/:url' element={<DetailPostFemale />} />
      <Route path='/kiem-tra-hpv' element={<MultipleChoice />} />
      <Route path='/cau-hoi-kiem-tra-hpv/:gender/:typeAge' element={<MultipleChoiceQuestion />} />
      <Route path='/dia-diem-tu-van' element={<ScheduleConsultation />} />
      <Route path='/chi-tiet-bai-viet-hoat-dong-cong-dong/:url' element={<CommunityActivitiesDetail />} />
      <Route path='/' element={<AppLayoutFemale />}>
        <Route path='/chi-tiet-du-phong-cho-nu/:url' element={<FemaleDetail />} />
      </Route>
      <Route path='/' element={<AppLayoutMale />}>
        <Route path='/chi-tiet-du-phong-cho-nam/:url' element={<MaleDetail />} />
      </Route>
      <Route path='/' element={<AppLayout />}>
        <Route path='/chi-tiet-dia-diem-tu-van/:id' element={<ScheduleDetail />} />
        <Route path='/chi-tiet-song-lanh-chu-dong/tri-sang' element={<HealthyAndProactive category={1} />} />
        <Route path='/chi-tiet-song-lanh-chu-dong/than-khoe' element={<HealthyAndProactive category={2} />} />
        <Route path='/chi-tiet-song-lanh-chu-dong/tam-an' element={<HealthyAndProactive category={3} />} />
        <Route path='/hoat-dong-cong-dong' element={<CommunityActivities />} />
      </Route>
    </Routes>
  )
}
