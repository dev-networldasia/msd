<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$url = isset($_GET['url']) ? $_GET['url'] : ""; 

$HealthyLivingDetail = array(
    'status' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($url == "" || str_replace(" ", "", $url) == "" || $url == null) {
        $HealthyLivingDetail = array(
            'status' => 0,
            'message' => 'Sống lành chủ động không tồn tại trên hệ thống!',
            'data' => [],
        );
        echo json_encode($HealthyLivingDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
                $stmt = $conn->prepare($getSQL['gHealthyByUrl']);
                $stmt->bindValue(":url", $url);
                if ($stmt->execute()) {
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    $count = $stmt->rowCount();
                    if ($count > 0) {
                        $HealthyLivingDetail = array(
                            'status' => 1,
                            'message' => 'Chi tiết sống lành chủ động',
                            'data' => $result,
                        );
                        echo json_encode($HealthyLivingDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                        exit();
                    } else {
                        $HealthyLivingDetail = array(
                            'status' => 1,
                            'message' => 'Sống lành chủ động không tồn tại trên hệ thống!',
                            'data' => [],
                        );
                        echo json_encode($HealthyLivingDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                        exit();
                    }
                } else {
                    $HealthyLivingDetail = array(
                        'status' => 0,
                        'message' => 'Đã xảy ra lỗi. Xin vui lòng thử lại sau.',
                        'data' => []
                    );
                    echo json_encode($HealthyLivingDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmt->closeCursor();
            }
} else {
    $HealthyLivingDetail = array(
        'status' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($HealthyLivingDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
