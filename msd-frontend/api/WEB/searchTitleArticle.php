<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

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
  
$key = isset($_GET['key']) ? vn_to_str(trim($_GET['key'])) : "";
$token = isset($_GET['token']) ? $_GET['token'] : "";

$limit = isset($_GET['limit']) ? $_GET['limit'] : 5;
$offset = isset($_GET['offset']) ? $_GET['offset'] : 0;

$ListArticle = array(
    'status' => 0,
    'total' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $stmtCheck = $conn->prepare($getSQL['checkToken']);
    $stmtCheck->bindValue(":token", $token);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->fetch(PDO::FETCH_ASSOC);
    $countCheck = $stmtCheck->rowCount();
    $stmtCheck->closeCursor();

    $param = "";
    if ($key != "" || str_replace(" ", "", $key) != "") {
        $param .= " AND REPLACE(news.title, 'Đ', 'D') LIKE '%$key%' ";
    }
    if ($countCheck > 0) {
        $param .= " AND type_accumulated.token = '$token' ";
    }
    
    $stmt_total = $conn->prepare($getSQL['searchTitleNews'] . $param . " GROUP BY news.title ORDER BY maxColumn DESC");
    $stmt_total->execute();
    $result_total = $stmt_total->fetchAll(PDO::FETCH_ASSOC);
    $count_total = $stmt_total->rowCount();
    $stmt_total->closeCursor();

    $stmt = $conn->prepare($getSQL['searchTitleNews'] . $param . " GROUP BY news.title ORDER BY maxColumn DESC LIMIT $limit OFFSET $offset");
    if ($stmt->execute()) {
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $count = $stmt->rowCount();
        if ($count > 0) {
            $ListArticle = array(
                'status' => 1,
                'total' => $count_total,
                'message' => 'Danh sách bài viết!',
                'data' => $result,
            );
            echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        } else {
            $ListArticle = array(
                'status' => 1,
                'total' => $count_total,
                'message' => 'Không có bài viết nào trùng với từ khoá bạn tìm!',
                'data' => [],
            );
            echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        }
    } else {
        $ListArticle = array(
            'status' => 0,
            'total' => 0,
            'message' => 'Đã xảy ra lỗi. Xin vui lòng thử lại sau.',
            'data' => []
        );
        echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    }
    $stmt->closeCursor();
} else {
    $ListArticle = array(
        'status' => 0,
        'total' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}