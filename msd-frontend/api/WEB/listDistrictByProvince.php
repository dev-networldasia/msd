<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$provinceId = isset($_GET['provinceId']) ? $_GET['provinceId'] : "";

$ListDistrict = array(
    'status' => 0,
    'total' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($provinceId == "" || $provinceId == 0 || $provinceId == null) {
        $ListDistrict = array(
            'status' => 0,
            'total' => 0,
            'message' => 'Vui lòng chọn Tỉnh/Thành phố',
            'data' => [],
        );
        echo json_encode($ListDistrict, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmt = $conn->prepare($getSQL['gDistrictByProvince']);
        $stmt->bindValue(":provinceId", $provinceId);
        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $count = $stmt->rowCount();
            if ($count > 0) {
                $ListDistrict = array(
                    'status' => 1,
                    'total' => $count,
                    'message' => 'Danh sách quận/huyện',
                    'data' => $result,
                );
                echo json_encode($ListDistrict, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            } else {
                $ListDistrict = array(
                    'status' => 1,
                    'total' => $count,
                    'message' => 'Danh sách quận/huyện hiện đang trống!',
                    'data' => [],
                );
                echo json_encode($ListDistrict, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
        } else {
            $ListDistrict = array(
                'status' => 0,
                'total' => 0,
                'message' => 'Đã xảy ra lỗi. Xin vui lòng thử lại sau.',
                'data' => []
            );
            echo json_encode($ListDistrict, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        }
        $stmt->closeCursor();
    }
} else {
    $ListDistrict = array(
        'status' => 0,
        'total' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($ListDistrict, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
