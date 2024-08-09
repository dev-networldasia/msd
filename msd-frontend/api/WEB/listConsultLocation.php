<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function vn_to_str ($str){
 
    $unicode = array(
     
    'a'=>'á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ',
     
    'd'=>'đ',
     
    'e'=>'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
     
    'i'=>'í|ì|ỉ|ĩ|ị',
     
    'o'=>'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
     
    'u'=>'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
     
    'y'=>'ý|ỳ|ỷ|ỹ|ỵ',
     
    'A'=>'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ',
     
    'D'=>'Đ',
     
    'E'=>'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ',
     
    'I'=>'Í|Ì|Ỉ|Ĩ|Ị',
     
    'O'=>'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ',
     
    'U'=>'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự',
     
    'Y'=>'Ý|Ỳ|Ỷ|Ỹ|Ỵ',
     
    );
     
    foreach($unicode as $nonUnicode=>$uni){
     
    $str = preg_replace("/($uni)/i", $nonUnicode, $str);
     
    }
    $str = str_replace(' ','_',$str);
     
    return $str;
     
  }

$province = isset($_GET['province']) ? $_GET['province'] : "";
$district = isset($_GET['district']) ? $_GET['district'] : "";
$nameOrAddress = isset($_GET['nameOrAddress']) ? vn_to_str(trim($_GET['nameOrAddress'])): "";
$lat = isset($_GET['lat']) ? $_GET['lat'] : 0;
$lng = isset($_GET['lng']) ? $_GET['lng'] : 0;

$limit = isset($_GET['limit']) ? $_GET['limit'] : 20;
$offset = isset($_GET['offset']) ? $_GET['offset'] : 0;

$ListConsultLocation = array(
    'status' => 0,
    'total' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $param = "";
    if ($province != "" && $province != 0) {
        $param .= " AND cl.province = $province";
    }

    if ($district != "" && $district != 0) {
        $param .= " AND cl.district = $district";
    }

    if ($nameOrAddress != "") {
        $param .= " AND (REPLACE(cl.name, 'Đ', 'D') LIKE '%$nameOrAddress%' OR REPLACE(cl.address, 'Đ', 'D') LIKE '%$nameOrAddress%')";
    }

    if ($lat != 0 || $lng != 0) {
        $stmt_total = $conn->prepare($getSQL['gAllLocationByLatLng']);
        $stmt_total->bindValue(":lat", $lat);
        $stmt_total->bindValue(":lng", $lng);
    } else {
        $stmt_total = $conn->prepare($getSQL['gAllLocation'] . $param . " ORDER BY cl.rating DESC");
    }
    $stmt_total->execute();
    $result_total = $stmt_total->fetchAll(PDO::FETCH_ASSOC);
    $count_total = $stmt_total->rowCount();
    $stmt_total->closeCursor();

    if ($lat != 0 || $lng != 0) {
        $stmt = $conn->prepare($getSQL['gAllLocationByLatLng'] . " LIMIT $limit OFFSET $offset");
        $stmt->bindValue(":lat", $lat);
        $stmt->bindValue(":lng", $lng);
    } else {
        $stmt = $conn->prepare($getSQL['gAllLocation'] . $param . " ORDER BY cl.rating DESC" . " LIMIT $limit OFFSET $offset");
    }
    if ($stmt->execute()) {
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $count = $stmt->rowCount();
        if ($count > 0) {
            $ListConsultLocation = array(
                'status' => 1,
                'total' => $count_total,
                'message' => 'Danh sách địa điểm tư vấn!',
                'data' => $result,
            );
            echo json_encode($ListConsultLocation, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        } else {
            $ListConsultLocation = array(
                'status' => 1,
                'total' => $count_total,
                'message' => 'Không tìm thấy địa điểm tư vấn!',
                'data' => [],
            );
            echo json_encode($ListConsultLocation, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        }
    } else {
        $ListConsultLocation = array(
            'status' => 0,
            'total' => 0,
            'message' => 'Đã xảy ra lỗi. Xin vui lòng thử lại sau.',
            'data' => []
        );
        echo json_encode($ListConsultLocation, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    }
    $stmt->closeCursor();
} else {
    $ListConsultLocation = array(
        'status' => 0,
        'total' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($ListConsultLocation, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}