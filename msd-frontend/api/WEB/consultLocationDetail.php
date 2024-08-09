<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$id = isset($_GET['id']) ? $_GET['id'] : ""; 

$ConsultLocationDetail = array(
    'status' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($id == "" || $id == 0 || str_replace(" ", "", $id) == "" || $id == null) {
        $ConsultLocationDetail = array(
            'status' => 0,
            'message' => 'Địa điểm tư vấn không tồn tại trên hệ thống!',
            'data' => [],
        );
        echo json_encode($ConsultLocationDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
                $stmt = $conn->prepare($getSQL['gLocationById']);
                $stmt->bindValue(":id", $id);
                if ($stmt->execute()) {
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    $count = $stmt->rowCount();
                    if ($count > 0) {
                        $ConsultLocationDetail = array(
                            'status' => 1,
                            'message' => 'Chi tiết địa điểm tư vấn',
                            'data' => $result,
                        );
                        echo json_encode($ConsultLocationDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                        exit();
                    } else {
                        $ConsultLocationDetail = array(
                            'status' => 1,
                            'message' => 'Địa điểm tư vấn không tồn tại trên hệ thống!',
                            'data' => [],
                        );
                        echo json_encode($ConsultLocationDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                        exit();
                    }
                } else {
                    $ConsultLocationDetail = array(
                        'status' => 0,
                        'message' => 'Đã xảy ra lỗi. Xin vui lòng thử lại sau.',
                        'data' => []
                    );
                    echo json_encode($ConsultLocationDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmt->closeCursor();
            }
} else {
    $ConsultLocationDetail = array(
        'status' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($ConsultLocationDetail, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
