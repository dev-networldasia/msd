<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$url = isset($_POST['url']) ? $_POST['url'] : "";

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
            'message' => 'Vui lòng chọn hoạt động cộng đồng!',
            'data' => [],
        );
        echo json_encode($InsertView, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmt_update_view = $conn->prepare($getSQL['uViewCommunityByUrl']);
        $stmt_update_view->bindValue(":url", $url);
        if ($stmt_update_view->execute()) {
            $stmt = $conn->prepare($getSQL['gCommunityByUrl']);
            $stmt->bindValue(":url", $url);
            $stmt->execute();
            $resutl = $stmt->fetch(PDO::FETCH_ASSOC);
            $stmt->closeCursor();

            $InsertView = array(
                'status' => 1,
                'total' => 1,
                'message' => 'Đã tăng lượt xem hoạt động cộng đồng!',
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
