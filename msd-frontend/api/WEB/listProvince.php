<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$ListProvince = array(
    'status' => 0,
    'total' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $stmt = $conn->prepare($getSQL['gAllProvince']);
                if ($stmt->execute()) {
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $count = $stmt->rowCount();
                    if ($count > 0) {
                        $ListProvince = array(
                            'status' => 1,
                            'total' => $count,
                            'message' => 'Danh sách Tỉnh/Thành phố',
                            'data' => $result,
                        );
                        echo json_encode($ListProvince, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                        exit();
                    } else {
                        $ListProvince = array(
                            'status' => 1,
                            'total' => $count,
                            'message' => 'Danh sách Tỉnh/Thành phố hiện đang trống!',
                            'data' => [],
                        );
                        echo json_encode($ListProvince, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                        exit();
                    }
                } else {
                    $ListProvince = array(
                        'status' => 0,
                        'total' => 0,
                        'message' => 'Đã xảy ra lỗi. Xin vui lòng thử lại sau.',
                        'data' => []
                    );
                    echo json_encode($ListProvince, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmt->closeCursor();
} else {
    $ListProvince = array(
        'status' => 0,
        'total' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($ListProvince, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
