<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$token = isset($_POST['token']) ? $_POST['token'] : "";
$type = isset($_POST['type']) ? $_POST['type'] : 1;

$TrackingButton = array(
    'status' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($token == null || $token == "" || str_replace(" ", "", $token) == "") {
        $TrackingButton = array(
            'status' => 0,
            'message' => 'Token không được bỏ trống',
            'data' => [],
        );
        echo json_encode($TrackingButton, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmt_update_view = $conn->prepare($getSQL['iTrackingButton']);
        $stmt_update_view->bindValue(":token", $token);
        $stmt_update_view->bindValue(":type", $type);
        if ($stmt_update_view->execute()) {

            $TrackingButton = array(
                'status' => 1,
                'message' => 'Đã thêm tracking button!',
                'data' => [],
            );
            echo json_encode($TrackingButton, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        } else {
            $TrackingButton = array(
                'status' => 0,
                'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                'data' => [],
            );
            echo json_encode($TrackingButton, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        }
        $stmt_update_view->closeCursor();
    }
} else {
    $TrackingButton = array(
        'status' => 0,
        'message' => 'Yêu cầu thuộc tính POST.',
        'data' => []
    );
    echo json_encode($TrackingButton, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
