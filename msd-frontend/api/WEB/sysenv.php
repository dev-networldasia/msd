<?php
$getSQL['gAllNewsCategory'] = "SELECT `id`, `title`, `url`, `description`, `content`, `img`, `img_mobile` as imgMobile, `gender`, `min` as minAge, `max` as maxAge, `delf`, `timestamp` FROM `news_category` WHERE delf = 1";

$getSQL['gNewsCategoryByGender'] = "SELECT `id`, `title`, `title_html` AS titleHtml, `headline`, `url`, `description`, `content`, `img`, `img_mobile` as imgMobile, `gender`, `min` as minAge, `max` as maxAge, `status`, `delf`, `timestamp` FROM `news_category` WHERE delf = 1 AND `gender` = :gender";

$getSQL['gNewsCategoryById'] = "SELECT `id`, `title`, `url`, `description`, `content`, `img`, `img_mobile` as imgMobile, `gender`, `min` as minAge, `max` as maxAge, `delf`, `timestamp` FROM `news_category` WHERE `id` = :id AND delf = 1";

$getSQL['gAllNews'] = "SELECT news.id, news.title, news.url, news.news_category_id as categoryId, news_category.title as categoryTitle, news.description, news.content, news.img, news.img_mobile as imgMobile, news.view, news.delf, news.timestamp FROM `news` LEFT JOIN news_category ON news.news_category_id = news_category.id WHERE news.delf = 1";

// $getSQL['gNewsByNewsCategoryId'] = "SELECT news.id, news.title, news.url, news.news_category_id as categoryId, news_category.title as categoryTitle, news.description, news.content, news.img, news.view, news.delf, news.timestamp FROM `news` LEFT JOIN news_category ON news.news_category_id = news_category.id WHERE news.delf = 1 AND news.news_category_id = :category";

$getSQL['gNewsById'] = "SELECT news.id, news.title, news.url, news.news_category_id as categoryId, news_category.title as categoryTitle, news.description, news.content, news.img, news.img_mobile as imgMobile, news.view, news.delf, news.timestamp FROM `news` LEFT JOIN news_category ON news.news_category_id = news_category.id WHERE news.delf = 1 AND news.id = :id";

$getSQL['gAllHealthy'] = "SELECT id, title, url, description, content, img, img_mobile as imgMobile, view, delf, timestamp FROM `healthy_living` WHERE delf = 1";

$getSQL['gHealthyById'] = "SELECT id, title, url, description, content, img, img_mobile as imgMobile,  view, delf, timestamp FROM `healthy_living` WHERE delf = 1 AND id = :id";

$getSQL['gAllLocation'] = "SELECT cl.id, cl.name, cl.description, cl.address, cl.operation, cl.province, cl.district, cl.ward, cl.phone, cl.img, cl.img_mobile as imgMobile, cl.lat, cl.lng, cl.type, lt.title AS typeText, cl.delf, cl.timestamp FROM `consult_location` cl JOIN location_type lt ON cl.type = lt.id WHERE cl.delf = 1";

$getSQL['gLocationById'] = "SELECT cl.id, cl.name, cl.description, cl.address, cl.operation, cl.province, cl.district, cl.ward, cl.phone, cl.img, cl.img_mobile as imgMobile, cl.lat, cl.lng, cl.type, lt.title AS typeText, cl.delf, cl.timestamp FROM `consult_location` cl JOIN location_type lt ON cl.type = lt.id WHERE cl.delf = 1 AND cl.id = :id";

// $getSQL['gNewsByGenderAge'] = "SELECT news.id, news.title, news.url, news.news_category_id as categoryId, news_category.title as categoryTitle, news.description, news.content, news.img, news.img_mobile as imgMobile, news.view, news.delf, news.timestamp FROM `news` LEFT JOIN news_category ON news.news_category_id = news_category.id WHERE news.delf = 1";

$getSQL['gNewsByGenderAge'] = "SELECT news.id, news.title, news.url, news_category.title AS categoryTitle, news.description, news.content, news.img, news.img_mobile as imgMobile, news.view, news.delf, news.timestamp FROM news_matrix JOIN news ON news_matrix.news_id = news.id JOIN news_category ON news_matrix.news_category_id = news_category.id WHERE news.delf = 1";

$getSQL['uViewNews'] = "UPDATE `news` SET `view` = `view` + 1 WHERE `id` = :id";

$getSQL['gBannerByType'] = "SELECT id, name, img, img_mobile as imgMobile, type, delf, timestamp FROM `banner` WHERE type = :type";

$getSQL['checkToken'] = "SELECT token FROM `type_accumulated` WHERE token = :token";

$getSQL['uPointByToken'] = "UPDATE `type_accumulated` SET `female` = `female` + :female, `male` = `male` + :male, `female_age_1` = `female_age_1` + :femaleAge1, `female_age_2` = `female_age_2` + :femaleAge2, `female_age_3` = `female_age_3` + :femaleAge3, `male_age_1` = `male_age_1` + :maleAge1, `male_age_2` = `male_age_2` + :maleAge2, `male_age_3` = `male_age_3` + :maleAge3 WHERE `token` = :token";

$getSQL['iToken'] = "INSERT INTO `type_accumulated` (`token`, `female`, `male`, `female_age_1`, `female_age_2`, `female_age_3`, `male_age_1`, `male_age_2`, `male_age_3`) VALUES (:token, :female, :male, :femaleAge1, :femaleAge2, :femaleAge3, :maleAge1, :maleAge2, :maleAge3)";

$getSQL['gNewsByNewsCategoryId'] = "SELECT news.id, news.title, news.url, news_category.title AS categoryTitle, news.description, news.content, news.img, news.img_mobile as imgMobile, news.view, news.delf, news.timestamp FROM news_matrix JOIN news ON news_matrix.news_id = news.id JOIN news_category ON news_matrix.news_category_id = news_category.id WHERE news_matrix.news_category_id = :category AND news.delf = 1 GROUP BY news_matrix.news_id, news_matrix.news_category_id";

$getSQL['gNewsByNewsCategoryIdOtherNews'] = "SELECT news.id, news.title, news.url, news_category.title AS categoryTitle, news.description, news.content, news.img, news.img_mobile as imgMobile, news.view, news.delf, news.timestamp FROM news_matrix JOIN news ON news_matrix.news_id = news.id JOIN news_category ON news_matrix.news_category_id = news_category.id WHERE news_matrix.news_category_id = :category AND news_matrix.news_id != :newsId AND news.delf = 1 GROUP BY news_matrix.news_id, news_matrix.news_category_id";

$getSQL['gHealthyByCategory'] = "SELECT hl.id, hl.title, hl.url, hl.description, hl.content, hl.img, hl.img_mobile as imgMobile, hl.view, hl.delf, hl.timestamp FROM `healthy_living` hl LEFT JOIN healthy_matrix hm ON hl.id = hm.healthy_id WHERE hm.category_id = :category AND hl.delf = 1";

$getSQL['uViewHealthy'] = "UPDATE `healthy_living` SET `view` = `view` + 1 WHERE `id` = :id";

$getSQL['gHealthyByCategoryOtherHealthy'] = "SELECT hl.id, hl.title, hl.url, hl.description, hl.content, hl.img, hl.img_mobile as imgMobile, hl.view, hl.delf, hl.timestamp FROM `healthy_living` hl LEFT JOIN healthy_matrix hm ON hl.id = hm.healthy_id WHERE hm.category_id = :category AND hl.id != :healthyId AND hl.delf = 1";

$getSQL['gHealthyDescription'] = "SELECT id, headline, description FROM healthy_description LIMIT 1";

$getSQL['gHomeByType'] = "SELECT id, headline, description, img, img_mobile as imgMobile, type, delf, timestamp FROM `homepage` WHERE type = :type";

$getSQL['gAllProvince'] = "SELECT id, title FROM `province`";

$getSQL['gDistrictByProvince'] = "SELECT id, title FROM `district` WHERE province_id = :provinceId";

$getSQL['gQuestionByAgeGender'] = "SELECT question.id, question.title, question.description, question.note, question.answer, question.img, question.img_mobile as imgMobile, question.type, question.timestamp FROM `question` JOIN `question_matrix` ON question.id = question_matrix.question_id WHERE question_matrix.gender = :gender AND question_matrix.age = :age AND question.delf = 1";

$getSQL['gSettingInterface'] = "SELECT id, page, favicon, index_title as indexTitle, logo, slogan_head as sloganHead, slogan_head_mobile as sloganHeadMobile, facebook, instagram, hotline, slogan_footer as sloganFooter, slogan_footer_mobile as sloganFooterMobile, slogan_footer_homepage as sloganFooterHomepage, slogan_footer_female as sloganFooterFemale, slogan_footer_male as sloganFooterMale, slogan_footer_quiz as sloganFooterQuiz, slogan_footer_healthy as sloganFooterHealthy, slogan_footer_community as sloganFooterCommunity, slogan_footer_location as sloganFooterLocation, script, script_body as scriptBody, slogan_footer_list_female as sloganFooterListFemale, slogan_footer_list_male as sloganFooterListMale, slogan_footer_detail_female as sloganFooterListDetailFemale, slogan_footer_detail_male as sloganFooterListDetailMale, slogan_footer_mind as sloganFooterMind, slogan_footer_body as sloganFooterBody, slogan_footer_collective_spirit as sloganFooterCollectiveSpirit, slogan_footer_detail_mind as sloganFooterDetailMind, slogan_footer_detail_body as sloganFooterDetailBody, slogan_footer_detail_collective_spirit as sloganFooterDetailCollectiveSpirit FROM `setting_interface` LIMIT 1";

$getSQL['gNewsCategoryByUrl'] = "SELECT `id`, `title`, `url`, `title_html` as titleHtml, `headline`, `description`, `content`, `img`, `img_mobile` as imgMobile, `gender`, `min` as minAge, `max` as maxAge, `delf`, `timestamp` FROM `news_category` WHERE `url` = :url AND delf = 1";

$getSQL['gNewsByNewsCategoryUrl'] = "SELECT news.id, news.title, news.url, news_category.title AS categoryTitle, news.description, news.img, news.img_mobile as imgMobile, news.view, news.delf, news.timestamp FROM news_matrix JOIN news ON news_matrix.news_id = news.id JOIN news_category ON news_matrix.news_category_id = news_category.id WHERE news_category.url = :url AND news.delf = 1 GROUP BY news_matrix.news_id, news_matrix.news_category_id";

$getSQL['gNewsByUrl'] = "SELECT news.id, news.title, news.url, news.news_category_id as categoryId, news_category.title as categoryTitle, news.description, news.content, news.img, news.img_mobile as imgMobile, news.view, news.delf, news.timestamp FROM `news` LEFT JOIN news_category ON news.news_category_id = news_category.id WHERE news.delf = 1 AND news.url = :url";

$getSQL['gNewsByUrlNewsCategoryIdOtherNews'] = "SELECT news.id, news.title, news.url, news_category.title AS categoryTitle, news.description, news.content, news.img, news.img_mobile as imgMobile, news.view, news.delf, news.timestamp FROM news_matrix JOIN news ON news_matrix.news_id = news.id JOIN news_category ON news_matrix.news_category_id = news_category.id WHERE news_matrix.news_category_id = :category AND news.url != :url AND news.delf = 1";

$getSQL['uViewNewsByUrl'] = "UPDATE `news` SET `view` = `view` + 1 WHERE `url` = :url";

$getSQL['gHealthyByUrlCategoryOtherHealthy'] = "SELECT hl.id, hl.title, hl.url, hl.description, hl.content, hl.img, hl.img_mobile as imgMobile, hl.view, hl.delf, hl.timestamp FROM `healthy_living` hl LEFT JOIN healthy_matrix hm ON hl.id = hm.healthy_id WHERE hm.category_id = :category AND hl.url != :url AND hl.delf = 1";

$getSQL['gHealthyByUrl'] = "SELECT id, title, url, description, content, img, img_mobile as imgMobile, view, delf, timestamp FROM `healthy_living` WHERE delf = 1 AND url = :url";

$getSQL['uViewHealthyByUrl'] = "UPDATE `healthy_living` SET `view` = `view` + 1 WHERE `url` = :url";

$getSQL['searchTitleNews'] = "SELECT news.id, news.title, news.url, news_category.id as categoryId,news_category.url as categoryUrl, CASE 
    WHEN news_category.id = 1 THEN type_accumulated.female_age_1
    WHEN news_category.id = 2 THEN type_accumulated.female_age_2
    WHEN news_category.id = 3 THEN type_accumulated.female_age_3
    WHEN news_category.id = 4 THEN type_accumulated.male_age_1
    WHEN news_category.id = 5 THEN type_accumulated.male_age_2
    WHEN news_category.id = 6 THEN type_accumulated.male_age_3
END AS maxColumn
FROM `news_matrix` JOIN news ON news_matrix.news_id = news.id JOIN `news_category` ON news_matrix.news_category_id = news_category.id JOIN `type_accumulated` WHERE news.delf = 1";

$getSQL['gAnswerByIdQuestion'] = "SELECT id, question_id as questionId, content, answer FROM `question_answer` WHERE question_id = :questionId";

$getSQL['gAllLocationByLatLng'] = "SELECT cl.id, cl.name, cl.description, cl.address, cl.operation, cl.province, cl.district, cl.ward, cl.phone, cl.img, cl.img_mobile as imgMobile, cl.lat, cl.lng, cl.type, lt.title AS typeText, cl.delf, cl.timestamp FROM `consult_location` cl JOIN location_type lt ON cl.type = lt.id WHERE cl.delf = 1 ORDER BY SQRT(POW(cl.lat - :lat, 2) + POW(cl.lng - :lng, 2)), cl.rating DESC";

$getSQL['checkTokenQuiz'] = "SELECT token, updatetime_female_1, updatetime_female_2,updatetime_female_3, updatetime_male_1, updatetime_male_2, updatetime_male_3, timestamp FROM `quiz_report` WHERE token = :token";

$getSQL['uQuizByToken'] = "UPDATE `quiz_report` SET `female1` = `female1` + :female1, `female2` = `female2` + :female2, `female3` = `female3` + :female3, `male1` = `male1` + :male1, `male2` = `male2` + :male2, `male3` = `male3` + :male3, `timestamp` = :timestamp WHERE `token` = :token";

$getSQL['iTokenQuiz'] = "INSERT INTO `quiz_report` (`token`, `female1`, `female2`, `female3`, `male1`, `male2`, `male3`, `timestamp`) VALUES (:token, :female1, :female2, :female3, :male1, :male2, :male3, :timestamp)";

$getSQL['gTokenQuizReportPause'] = "SELECT id, token, quiz_id, quiz_type, timestamp FROM `quiz_report_pause` WHERE token = :token AND quiz_type = :quizType";

$getSQL['uQuizPauseTime'] = "UPDATE `quiz_report_pause` SET `quiz_id` = :quizId WHERE id = :id";

$getSQL['iTokenQuizPauseTime'] = "INSERT INTO `quiz_report_pause` (`token`, `quiz_id`, `quiz_type`) VALUES (:token, :quizId, :quizType)";

$getSQL['uFemale1QuizByToken'] = "UPDATE `quiz_report` SET `female1` = `female1` + :female1, `updatetime_female_1` = :timestamp WHERE `token` = :token";

$getSQL['uFemale2QuizByToken'] = "UPDATE `quiz_report` SET `female2` = `female2` + :female2, `updatetime_female_2` = :timestamp WHERE `token` = :token";

$getSQL['uFemale3QuizByToken'] = "UPDATE `quiz_report` SET `female3` = `female3` + :female3, `updatetime_female_3` = :timestamp WHERE `token` = :token";

$getSQL['uMale1QuizByToken'] = "UPDATE `quiz_report` SET `male1` = `male1` + :male1, `updatetime_male_1` = :timestamp WHERE `token` = :token";

$getSQL['uMale2QuizByToken'] = "UPDATE `quiz_report` SET `male2` = `male2` + :male2, `updatetime_male_2` = :timestamp WHERE `token` = :token";

$getSQL['uMale3QuizByToken'] = "UPDATE `quiz_report` SET `male3` = `male3` + :male3, `updatetime_male_3` = :timestamp WHERE `token` = :token";

$getSQL['iFemale1TokenQuiz'] = "INSERT INTO `quiz_report` (`token`, `female1`, `updatetime_female_1`) VALUES (:token, :female1, :timestamp)";

$getSQL['iFemale2TokenQuiz'] = "INSERT INTO `quiz_report` (`token`, `female2`, `updatetime_female_2`) VALUES (:token, :female2, :timestamp)";

$getSQL['iFemale3TokenQuiz'] = "INSERT INTO `quiz_report` (`token`, `female3`, `updatetime_female_3`) VALUES (:token, :female3, :timestamp)";

$getSQL['iMale1TokenQuiz'] = "INSERT INTO `quiz_report` (`token`, `male1`, `updatetime_male_1`) VALUES (:token, :male1, :timestamp)";

$getSQL['iMale2TokenQuiz'] = "INSERT INTO `quiz_report` (`token`, `male2`, `updatetime_male_2`) VALUES (:token, :male2, :timestamp)";

$getSQL['iMale3TokenQuiz'] = "INSERT INTO `quiz_report` (`token`, `male3`, `updatetime_male_3`) VALUES (:token, :male3, :timestamp)";

$getSQL['gTokenQuizReportAnswer'] = "SELECT id, token, quiz_id, quiz_type, timestamp FROM `quiz_report_answer` WHERE token = :token AND quiz_type = :quizType AND quiz_id = :quizId";

$getSQL['iTokenQuizReportAnswer'] = "INSERT INTO `quiz_report_answer` (`token`, `quiz_id`, `quiz_type`, `answer`, `answer_of_user`) VALUES (:token, :quizId, :quizType, :answer, :answerOfUser)";

$getSQL['iHbsReport'] = "INSERT INTO `report_hbs` (`token`, `known`, `plan`) VALUES (:token, :known, :plan)";

$getSQL['gHsbByToken'] = "SELECT id, token, known, plan FROM `report_hbs` WHERE token = :token ORDER BY id DESC";

$getSQL['uHbsReport'] = "UPDATE `report_hbs` SET `known` = :known, `plan` = :plan WHERE token = :token";

$getSQL['iCookieReport'] = "INSERT INTO `cookie_report` (`token`, `type`, `ip`, `country`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_id`, `city`, `utm_content`, `device`) VALUES (:token, :type, :ip, :country, :utm_source, :utm_medium, :utm_campaign, :utm_id, :city, :utm_content, :device)";

$getSQL['iCookieReportCustom'] = "INSERT INTO `cookie_report` (`token`, `type`, `ip`, `country`,`custom`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_id`, `city`, `utm_content`, `device`) VALUES (:token, :type, :ip, :country, :custom, :utm_source, :utm_medium, :utm_campaign, :utm_id, :city, :utm_content, :device)";


$getSQL['gTokenSiteCatalyts'] = "SELECT token FROM `type_accumulated` WHERE token = :token";

$getSQL['gFemalePointByTokenSitecatalyst'] = "SELECT CASE WHEN female_age_1 >= female_age_2 AND female_age_1 >= female_age_3 THEN 1 WHEN female_age_2 >= female_age_1 AND female_age_2 >= female_age_3 THEN 2 WHEN female_age_3 >= female_age_1 AND female_age_3 >= female_age_2 THEN 3 END AS femaleAge FROM type_accumulated WHERE token = :token";

$getSQL['gMalePointByTokenSitecatalyst'] = "SELECT CASE WHEN male_age_1 >= male_age_2 AND male_age_1 >= male_age_3 THEN 4 WHEN male_age_2 >= male_age_1 AND male_age_2 >= male_age_3 THEN 5 WHEN male_age_3 >= male_age_1 AND male_age_3 >= male_age_2 THEN 6 END AS maleAge FROM type_accumulated WHERE token = :token";

$getSQL['gBannerByTypeImg'] = "SELECT id, img FROM `bannner_matrix` WHERE type = :type";

$getSQL['gBannerByTypeImgMobile'] = "SELECT id, img_mobile as imgMobile FROM `banner_mobile_matrix` WHERE type = :type";

$getSQL['gAllCommunity'] = "SELECT id, title, url, description, content, img, img_mobile as imgMobile, view, timestamp FROM `community_activity` WHERE delf = 1";

$getSQL['gCommunityByUrl'] = "SELECT id, title, url, description, content, img, img_mobile as imgMobile, view, timestamp FROM `community_activity` WHERE delf = 1 AND url = :url";

$getSQL['uViewCommunityByUrl'] = "UPDATE `community_activity` SET `view` = `view` + 1 WHERE `url` = :url";

$getSQL['gAllCommunityOtherByUrl'] = "SELECT id, title, url, description, content, img, img_mobile as imgMobile, view, timestamp FROM `community_activity` WHERE delf = 1 AND url != :url";

$getSQL['gPointByTokenSitecatalyst'] = "SELECT 
CASE
  WHEN GREATEST(female_age_1, female_age_2, female_age_3, male_age_1, male_age_2, male_age_3) = female_age_1
    THEN 1
  WHEN GREATEST(female_age_1, female_age_2, female_age_3, male_age_1, male_age_2, male_age_3) = female_age_2
    THEN 2
  WHEN GREATEST(female_age_1, female_age_2, female_age_3, male_age_1, male_age_2, male_age_3) = female_age_3
    THEN 3
  WHEN GREATEST(female_age_1, female_age_2, female_age_3, male_age_1, male_age_2, male_age_3) = male_age_1
    THEN 4
  WHEN GREATEST(female_age_1, female_age_2, female_age_3, male_age_1, male_age_2, male_age_3) = male_age_2
    THEN 5
  WHEN GREATEST(female_age_1, female_age_2, female_age_3, male_age_1, male_age_2, male_age_3) = male_age_3
    THEN 6
END AS categoryNews
FROM type_accumulated 
WHERE token = :token
";

$getSQL['gNewsBySitecatalyst'] = "SELECT news.id, news.title, news.url, news_category.title AS categoryTitle, news_category.url as categoryUrl, news.description, news.content, news.img, news.img_mobile as imgMobile, news.view, news.delf, news.timestamp FROM news_matrix JOIN news ON news_matrix.news_id = news.id JOIN news_category ON news_matrix.news_category_id = news_category.id WHERE news_matrix.news_category_id = :category AND news.url != :url AND news.delf = 1";

$getSQL['gTokenCookie'] = "SELECT token FROM `cookie_report` WHERE token = :token";

$getSQL['uCookie'] = "UPDATE `cookie_report` SET `utm_source` = :utm_source, `utm_medium` = :utm_medium, `utm_campaign` = :utm_campaign, `utm_id` = :utm_id, `utm_content` = :utm_content WHERE `token` = :token";

$getSQL['iTrackingButton'] = "INSERT INTO `tracking_button` (`token`, `type`) VALUES (:token, :type)";

$getSQL['iNewsView'] = "INSERT INTO `news_view` (`token`, `news_id`) VALUES (:token, :newId)";

$getSQL['iSessionToken'] = "UPDATE `cookie_report` SET `session` = `session` + 1 WHERE `token` = :token";

?>