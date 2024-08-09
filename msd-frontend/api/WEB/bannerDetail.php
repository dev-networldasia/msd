<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$type = isset($_GET['type']) ? $_GET['type'] : "";

$BannerDetail = array(
    'status' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($type == null || $type == "" || str_replace(" ", "", $type) == "" || $type == 0) {
        $BannerDetail = array(
            'status' => 0,
            'message' => 'Vui lòng loại banner!',
            'data' => [],
        );
        echo json_encode($BannerDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmt = $conn->prepare($getSQL['gBannerByType']);
        $stmt->bindValue(":type", $type);
        if ($stmt->execute()) {
            $count = $stmt->rowCount();
            if ($count > 0) {
                $resutl = $stmt->fetch(PDO::FETCH_ASSOC);
                $data = array(
                    "id" => $resutl['id'],
                    "name" => $resutl['name'],
                    "img" => array(),
                    "imgMobile" => array(),
                    "type" => $resutl['type'],
                    "delf" => $resutl['delf'],
                    "timestamp" => $resutl['timestamp'],
                );

                $stmtWeb = $conn->prepare($getSQL['gBannerByTypeImg']);
                $stmtWeb->bindValue(":type", $type);
                if ($stmtWeb->execute()){
                    $resultWeb = $stmtWeb->fetchAll(PDO::FETCH_ASSOC);
                    foreach($resultWeb as $keyWeb => $valueWeb){
                        array_push($data['img'], $valueWeb);
                    }
                }
                $stmtWeb->closeCursor();

                $stmtMobile = $conn->prepare($getSQL['gBannerByTypeImgMobile']);
                $stmtMobile->bindValue(":type", $type);
                if ($stmtMobile->execute()){
                    $resultMobile = $stmtMobile->fetchAll(PDO::FETCH_ASSOC);
                    foreach($resultMobile as $keyMobile => $valueMobile){
                        array_push($data['imgMobile'], $valueMobile);
                    }
                }
                $stmtMobile->closeCursor();
                
                $BannerDetail = array(
                    'status' => 1,
                    'message' => 'Chi tiết banner',
                    'data' => $data,
                );
                echo json_encode($BannerDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            } else {
                $BannerDetail = array(
                    'status' => 0,
                    'message' => 'Khồng tồn tại banner trên hệ thống!',
                    'data' => [],
                );
                echo json_encode($BannerDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
            $stmt->closeCursor();
        } else {
            $BannerDetail = array(
                'status' => 0,
                'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                'data' => [],
            );
            echo json_encode($BannerDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        }
    }
} else {
    $BannerDetail = array(
        'status' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($BannerDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}