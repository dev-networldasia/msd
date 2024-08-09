<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$ListArticle = array(
    'status' => 0,
    'total' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $stmt_total = $conn->prepare($getSQL['gAllNews'] . " ORDER BY news.id DESC");
                $stmt_total->execute();
                $result_total = $stmt_total->fetchAll(PDO::FETCH_ASSOC);
                $count_total = $stmt_total->rowCount();
                $stmt_total->closeCursor();

                $stmt = $conn->prepare($getSQL['gAllNews'] . " ORDER BY news.id DESC");
                if ($stmt->execute()) {
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $count = $stmt->rowCount();
                    if ($count > 0) {
                        $ListArticle = array(
                            'status' => 1,
                            'total' => $count_total,
                            'message' => 'Danh sách bài viết!',
                            'data' => $result,
                        );
                        echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                        exit();
                    } else {
                        $ListArticle = array(
                            'status' => 1,
                            'total' => $count_total,
                            'message' => 'Danh sách bài viết trống!',
                            'data' => [],
                        );
                        echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                        exit();
                    }
                } else {
                    $ListArticle = array(
                        'status' => 0,
                        'total' => 0,
                        'message' => 'Đã xảy ra lỗi. Xin vui lòng thử lại sau.',
                        'data' => []
                    );
                    echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmt->closeCursor();
} else {
    $ListArticle = array(
        'status' => 0,
        'total' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
