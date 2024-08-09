<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$id = isset($_POST['id']) ? $_POST['id'] : "";

$InsertView = array(
    'status' => 0,
    'total' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($id == null || $id == "" || str_replace(" ", "", $id) == "" || $id == 0) {
        $InsertView = array(
            'status' => 0,
            'total' => 0,
            'message' => 'Vui lòng chọn bài viết!',
            'data' => [],
        );
        echo json_encode($InsertView, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmt_update_view = $conn->prepare($getSQL['uViewNews']);
        $stmt_update_view->bindValue(":id", $id);
        if ($stmt_update_view->execute()) {
            $stmt = $conn->prepare($getSQL['gNewsById']);
            $stmt->bindValue(":id", $id);
            $stmt->execute();
            $resutl = $stmt->fetch(PDO::FETCH_ASSOC);
            $stmt->closeCursor();

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
