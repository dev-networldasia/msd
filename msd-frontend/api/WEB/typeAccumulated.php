<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$token = isset($_POST['token']) ? $_POST['token'] : "";
$female = isset($_POST['female']) ? $_POST['female'] : 0;
$male = isset($_POST['male']) ? $_POST['male'] : 0;
$femaleAge1 = isset($_POST['femaleAge1']) ? $_POST['femaleAge1'] : 0;
$femaleAge2 = isset($_POST['femaleAge2']) ? $_POST['femaleAge2'] : 0;
$femaleAge3 = isset($_POST['femaleAge3']) ? $_POST['femaleAge3'] : 0;
$maleAge1 = isset($_POST['maleAge1']) ? $_POST['maleAge1'] : 0;
$maleAge2 = isset($_POST['maleAge2']) ? $_POST['maleAge2'] : 0;
$maleAge3 = isset($_POST['maleAge3']) ? $_POST['maleAge3'] : 0;

$TypeAccumulated = array(
    'status' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($token == null || $token == "" || str_replace(" ", "", $token) == "") {
        $TypeAccumulated = array(
            'status' => 0,
            'message' => 'Token hiện đang trống!',
            'data' => [],
        );
        echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    }else{
        $stmtCheck = $conn->prepare($getSQL['checkToken']);
        $stmtCheck->bindValue(":token", $token);
        $stmtCheck->execute();
        $resultCheck = $stmtCheck->fetch(PDO::FETCH_ASSOC);
        $countCheck = $stmtCheck->rowCount();
        $stmtCheck->closeCursor();

        if ($countCheck > 0) {
            $stmtUpdate = $conn->prepare($getSQL['uPointByToken']);
            $stmtUpdate->bindValue(":female", $female);
            $stmtUpdate->bindValue(":male", $male);
            $stmtUpdate->bindValue(":femaleAge1", $femaleAge1);
            $stmtUpdate->bindValue(":femaleAge2", $femaleAge2);
            $stmtUpdate->bindValue(":femaleAge3", $femaleAge3);
            $stmtUpdate->bindValue(":maleAge1", $maleAge1);
            $stmtUpdate->bindValue(":maleAge2", $maleAge2);
            $stmtUpdate->bindValue(":maleAge3", $maleAge3);
            $stmtUpdate->bindValue(":token", $token);
            if($stmtUpdate->execute()){
                $TypeAccumulated = array(
                    'status' => 1,
                    'message' => 'Đã cập nhập điểm thành công!',
                    'data' => []
                );
                echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }else{
                $TypeAccumulated = array(
                    'status' => 0,
                    'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                    'data' => []
                );
                echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
            $stmtUpdate->closeCursor();
        }else{
            $stmtInsert = $conn->prepare($getSQL['iToken']);
            $stmtInsert->bindValue(":token", $token);
            $stmtInsert->bindValue(":female", $female);
            $stmtInsert->bindValue(":male", $male);
            $stmtInsert->bindValue(":femaleAge1", $femaleAge1);
            $stmtInsert->bindValue(":femaleAge2", $femaleAge2);
            $stmtInsert->bindValue(":femaleAge3", $femaleAge3);
            $stmtInsert->bindValue(":maleAge1", $maleAge1);
            $stmtInsert->bindValue(":maleAge2", $maleAge2);
            $stmtInsert->bindValue(":maleAge3", $maleAge3);
            if($stmtInsert->execute()){
                $TypeAccumulated = array(
                    'status' => 1,
                    'message' => 'Đã thêm điểm thành công!',
                    'data' => []
                );
                echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }else{
                $TypeAccumulated = array(
                    'status' => 0,
                    'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                    'data' => []
                );
                echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
            $stmtInsert->closeCursor();
        }
    }
} else{
    $TypeAccumulated = array(
        'status' => 0,
        'message' => 'Yêu cầu thuộc tính POST.',
        'data' => []
    );
    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}