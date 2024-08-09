<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$token = isset($_POST['token']) ? $_POST['token'] : "";
$utmSource = isset($_POST['utmSource']) ? $_POST['utmSource'] : null;
$utmMedium = isset($_POST['utmMedium']) ? $_POST['utmMedium'] : null;
$utmCampaign = isset($_POST['utmCampaign']) ? $_POST['utmCampaign'] : null;
$utmId = isset($_POST['utmId']) ? $_POST['utmId'] : null;
$utmContent = isset($_POST['utmContent']) ? $_POST['utmContent'] : null;

$UpdateTokenCookie = array(
    'status' => 0,
    'total' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $stmt_check_token = $conn->prepare($getSQL['gTokenCookie']);
    $stmt_check_token->bindValue(":token", $token);
    $stmt_check_token->execute();
    $result_check = $stmt_check_token->fetch(PDO::FETCH_ASSOC);
    $count_check = $stmt_check_token->rowCount();
    $stmt_check_token->closeCursor();

    if ($token == null || $token == "" || str_replace(" ", "", $token) == "" || $count_check < 1) {
        $UpdateTokenCookie = array(
            'status' => 0,
            'total' => 0,
            'message' => 'Token không tồn tại trên hệ thống!',
            'data' => [],
        );
        echo json_encode($UpdateTokenCookie, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmt_update_view = $conn->prepare($getSQL['uCookie']);
        $stmt_update_view->bindValue(":token", $token);
        $stmt_update_view->bindValue(":utm_source", $utmSource);
        $stmt_update_view->bindValue(":utm_medium", $utmMedium);
        $stmt_update_view->bindValue(":utm_campaign", $utmCampaign);
        $stmt_update_view->bindValue(":utm_id", $utmId);
        $stmt_update_view->bindValue(":utm_content", $utmContent);
        if ($stmt_update_view->execute()) {

            $UpdateTokenCookie = array(
                'status' => 1,
                'total' => 1,
                'message' => 'Đã cập nhập token!',
                'data' => [],
            );
            echo json_encode($UpdateTokenCookie, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        } else {
            $UpdateTokenCookie = array(
                'status' => 0,
                'total' => 0,
                'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                'data' => [],
            );
            echo json_encode($UpdateTokenCookie, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        }
        $stmt_update_view->closeCursor();
    }
} else {
    $UpdateTokenCookie = array(
        'status' => 0,
        'total' => 0,
        'message' => 'Yêu cầu thuộc tính POST.',
        'data' => []
    );
    echo json_encode($UpdateTokenCookie, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}