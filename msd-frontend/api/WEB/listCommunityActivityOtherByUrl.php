<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$url = isset($_GET['url']) ? $_GET['url'] : "";

$limit = isset($_GET['limit']) ? $_GET['limit'] : 20;
$offset = isset($_GET['offset']) ? $_GET['offset'] : 0;

$ListCommunity = array(
    'status' => 0,
    'total' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $stmt_total = $conn->prepare($getSQL['gAllCommunityOtherByUrl'] . " ORDER BY RAND() DESC");
                $stmt_total->bindValue(":url", $url);
                $stmt_total->execute();
                $result_total = $stmt_total->fetchAll(PDO::FETCH_ASSOC);
                $count_total = $stmt_total->rowCount();
                $stmt_total->closeCursor();

                $stmt = $conn->prepare($getSQL['gAllCommunityOtherByUrl'] . " ORDER BY RAND() DESC" . " LIMIT $limit OFFSET $offset");
                $stmt->bindValue(":url", $url);
                if ($stmt->execute()) {
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $count = $stmt->rowCount();
                    if ($count > 0) {
                        $ListCommunity = array(
                            'status' => 1,
                            'total' => $count_total,
                            'message' => 'Danh sách hoạt động cộng đồng!',
                            'data' => $result,
                        );
                        echo json_encode($ListCommunity, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                        exit();
                    } else {
                        $ListCommunity = array(
                            'status' => 1,
                            'total' => $count_total,
                            'message' => 'Danh sách hoạt động cộng đồng hiện đang trống!',
                            'data' => [],
                        );
                        echo json_encode($ListCommunity, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                        exit();
                    }
                } else {
                    $ListCommunity = array(
                        'status' => 0,
                        'total' => 0,
                        'message' => 'Đã xảy ra lỗi. Xin vui lòng thử lại sau.',
                        'data' => []
                    );
                    echo json_encode($ListCommunity, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmt->closeCursor();
} else {
    $ListCommunity = array(
        'status' => 0,
        'total' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($ListCommunity, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
