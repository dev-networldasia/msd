<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$url = isset($_POST['url']) ? $_POST['url'] : "";
$token = isset($_POST['token']) ? $_POST['token'] : "";

$InsertView = array(
    'status' => 0,
    'total' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($url == null || $url == "" || str_replace(" ", "", $url) == "") {
        $InsertView = array(
            'status' => 0,
            'total' => 0,
            'message' => 'Vui lòng chọn bài viết!',
            'data' => [],
        );
        echo json_encode($InsertView, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmt_update_view = $conn->prepare($getSQL['uViewNewsByUrl']);
        $stmt_update_view->bindValue(":url", $url);
        if ($stmt_update_view->execute()) {

            $stmt = $conn->prepare($getSQL['gNewsByUrl']);
            $stmt->bindValue(":url", $url);
            $stmt->execute();
            $resutl = $stmt->fetch(PDO::FETCH_ASSOC);
            $stmt->closeCursor();

            if ($url != null || $url != "" || str_replace(" ", "", $url) != "") {
                $stmt_insert_token = $conn->prepare($getSQL['iNewsView']);
                $stmt_insert_token->bindValue(":token", $token);
                $stmt_insert_token->bindValue(":newId", $resutl['id']);
                $stmt_insert_token->execute();
                $stmt_insert_token->closeCursor();
             }

            $InsertView = array(
                'status' => 1,
                'total' => 1,
                'message' => 'Đã tăng lượt xem bài viết!',
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
