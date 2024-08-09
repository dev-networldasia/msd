<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$type = isset($_GET['type']) ? $_GET['type'] : "";

$HomepageDetail = array(
    'status' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($type == null || $type == "" || str_replace(" ", "", $type) == "" || $type == 0) {
        $HomepageDetail = array(
            'status' => 0,
            'message' => 'Vui lòng loại homepage!',
            'data' => [],
        );
        echo json_encode($HomepageDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmt = $conn->prepare($getSQL['gHomeByType']);
        $stmt->bindValue(":type", $type);
        if ($stmt->execute()) {
            $count = $stmt->rowCount();
            if ($count > 0) {
                $resutl = $stmt->fetch(PDO::FETCH_ASSOC);

                $HomepageDetail = array(
                    'status' => 1,
                    'message' => 'Chi tiết homepage',
                    'data' => $resutl,
                );
                echo json_encode($HomepageDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            } else {
                $HomepageDetail = array(
                    'status' => 0,
                    'message' => 'Không tồn tại homepage trên hệ thống!',
                    'data' => [],
                );
                echo json_encode($HomepageDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
            $stmt->closeCursor();
        } else {
            $HomepageDetail = array(
                'status' => 0,
                'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                'data' => [],
            );
            echo json_encode($HomepageDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        }
    }
} else {
    $HomepageDetail = array(
        'status' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($HomepageDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
