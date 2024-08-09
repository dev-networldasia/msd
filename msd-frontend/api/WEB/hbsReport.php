<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$token = isset($_POST['token']) ? $_POST['token'] : "";
$known = isset($_POST['known']) ? $_POST['known'] : 0;
$plan = isset($_POST['plan']) ? $_POST['plan'] : 0;

$ReportHBS = array(
    'status' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($token == null || $token == "" || str_replace(" ", "", $token) == "") {
        $ReportHBS = array(
            'status' => 0,
            'message' => 'Token hiện đang trống!',
            'data' => [],
        );
        echo json_encode($ReportHBS, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {

        $stmt_get_token = $conn->prepare($getSQL['gHsbByToken']);
        $stmt_get_token->bindValue(":token", $token);
        $stmt_get_token->execute();
        $result = $stmt_get_token->fetch(PDO::FETCH_ASSOC);
        $count = $stmt_get_token->rowCount();
        $stmt_get_token->closeCursor();

        if ($count < 1) {
            $stmt_insert = $conn->prepare($getSQL['iHbsReport']);
            $stmt_insert->bindValue(":token", $token);
            $stmt_insert->bindValue(":known", $known);
            $stmt_insert->bindValue(":plan", $plan);
            if ($stmt_insert->execute()) {
                $ReportHBS = array(
                    'status' => 1,
                    'message' => 'Đã thêm report hbs!',
                    'data' => [],
                );
                echo json_encode($ReportHBS, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            } else {
                $ReportHBS = array(
                    'status' => 0,
                    'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                    'data' => [],
                );
                echo json_encode($ReportHBS, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
            $stmt_insert->closeCursor();
        } else {
            $stmt_insert = $conn->prepare($getSQL['uHbsReport']);
            $stmt_insert->bindValue(":token", $token);
            if ($result['known'] == 0) {
                $stmt_insert->bindValue(":known", $known);
            } else {
                $stmt_insert->bindValue(":known", $result['known']);
            }
            if ($result['plan'] == 0) {
                $stmt_insert->bindValue(":plan", $plan);
            } else {
                $stmt_insert->bindValue(":plan", $result['plan']);
            }
            if ($stmt_insert->execute()) {
                $ReportHBS = array(
                    'status' => 1,
                    'message' => 'Đã cập nhập report hbs!',
                    'data' => [],
                );
                echo json_encode($ReportHBS, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            } else {
                $ReportHBS = array(
                    'status' => 0,
                    'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                    'data' => [],
                );
                echo json_encode($ReportHBS, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
            $stmt_insert->closeCursor();
        }
    }
} else {
    $ReportHBS = array(
        'status' => 0,
        'message' => 'Yêu cầu thuộc tính POST.',
        'data' => []
    );
    echo json_encode($ReportHBS, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
