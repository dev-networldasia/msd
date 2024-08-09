<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$token = isset($_POST['token']) ? $_POST['token'] : "";

$InsertView = array(
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
        $InsertView = array(
            'status' => 0,
            'total' => 0,
            'message' => 'Token không tồn tại trên hệ thống!',
            'data' => [],
        );
        echo json_encode($InsertView, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmt_update_view = $conn->prepare($getSQL['iSessionToken']);
        $stmt_update_view->bindValue(":token", $token);
        if ($stmt_update_view->execute()) {
            $InsertView = array(
                'status' => 1,
                'total' => 1,
                'message' => 'Đã tăng lượt truy cập!',
                'data' => $resutl,
            );
            echo json_encode($InsertView, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        } else {
            $InsertView = array(
                'status' => 0,
                'total' => 0,
                'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                'data' => [],
            );
            echo json_encode($InsertView, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        }
        $stmt_update_view->closeCursor();
    }
} else {
    $InsertView = array(
        'status' => 0,
        'total' => 0,
        'message' => 'Yêu cầu thuộc tính POST.',
        'data' => []
    );
    echo json_encode($InsertView, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
