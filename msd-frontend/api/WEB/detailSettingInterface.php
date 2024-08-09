<?php
include_once "connect.inc.php";
include_once "sysenv.php";
// include_once "class.cryptor.php";
// require __DIR__ . '/vendor/autoload.php';
// require_once "VerifyTokenFirebaseSDK.php";

$InterfaceDetail = array(
    'status' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $conn->prepare($getSQL['gSettingInterface']);
        if ($stmt->execute()) {
            $count = $stmt->rowCount();
            if ($count > 0) {
                $resutl = $stmt->fetch(PDO::FETCH_ASSOC);

                $InterfaceDetail = array(
                    'status' => 1,
                    'message' => 'Chi tiết giao diện',
                    'data' => $resutl,
                );
                echo json_encode($InterfaceDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            } else {
                $InterfaceDetail = array(
                    'status' => 0,
                    'message' => 'Không tồn tại giao diện trên hệ thống!',
                    'data' => [],
                );
                echo json_encode($InterfaceDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
            $stmt->closeCursor();
        } else {
            $InterfaceDetail = array(
                'status' => 0,
                'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                'data' => [],
            );
            echo json_encode($InterfaceDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        }
} else {
    $InterfaceDetail = array(
        'status' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($InterfaceDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}