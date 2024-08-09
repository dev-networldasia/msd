<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$token = isset($_GET['token']) ? $_GET['token'] : "";
$url = isset($_GET['url']) ? $_GET['url'] : "";

$limit = isset($_GET['limit']) ? $_GET['limit'] : 3;
$offset = isset($_GET['offset']) ? $_GET['offset'] : 0;

$ListArticle = array(
    'status' => 0,
    'total' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt_check = $conn->prepare($getSQL['gTokenSiteCatalyts']);
    $stmt_check->bindValue(":token", $token);
    $stmt_check->execute();
    $result_check = $stmt_check->fetch(PDO::FETCH_ASSOC);
    $count_check = $stmt_check->rowCount();
    $stmt_check->closeCursor();

    if ($count_check > 0) {
        $stmt_check_token = $conn->prepare($getSQL['gPointByTokenSitecatalyst']);
        $stmt_check_token->bindValue(":token", $result_check['token']);
        $stmt_check_token->execute();
        $result_check_token = $stmt_check_token->fetch(PDO::FETCH_ASSOC);
        $stmt_check_token->closeCursor();
        if ($result_check_token['categoryNews'] == 1 || $result_check_token['categoryNews'] == 2 || $result_check_token['categoryNews'] == 3) {

            $stmt_total = $conn->prepare($getSQL['gNewsBySitecatalyst'] . " GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC");
            $stmt_total->bindValue(":category", $result_check_token['categoryNews']);
            $stmt_total->bindValue(":url", $url);
            $stmt_total->execute();
            $result_total = $stmt_total->fetchAll(PDO::FETCH_ASSOC);
            $count_total = $stmt_total->rowCount();
            $stmt_total->closeCursor();


            $stmt = $conn->prepare($getSQL['gNewsBySitecatalyst'] . " GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC" . " LIMIT $limit OFFSET $offset");
            $stmt->bindValue(":category", $result_check_token['categoryNews']);
            $stmt->bindValue(":url", $url);
            if ($stmt->execute()) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $count = $stmt->rowCount();
                if ($count > 0) {
                    $ListArticle = array(
                        'status' => 1,
                        'total' => $count_total,
                        'message' => 'Danh sách bài viết!',
                        'data' => [],
                    );

                    foreach ($result as $key => $value) {
                        $data = array(
                            "id" => $value['id'],
                            "title" => $value['title'],
                            "url" => $value['url'],
                            "categoryTitle" => $value['categoryTitle'],
                            "categoryUrl" => 'chi-tiet-bai-viet-du-phong-cho-nu/' . $value['categoryUrl'],
                            "description" => $value['description'],
                            "content" => $value['content'],
                            "img" => $value['img'],
                            "imgMobile" => $value['imgMobile'],
                            "view" => $value['view'],
                            "delf" => $value['delf'],
                            "timestamp" => $value['timestamp'],
                        );
                        array_push($ListArticle['data'], $data);
                    }

                    echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $ListArticle = array(
                        'status' => 1,
                        'total' => $count_total,
                        'message' => 'Danh sách bài viết không tồn tại trên hệ thống!',
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
            $stmt_total = $conn->prepare($getSQL['gNewsBySitecatalyst'] . " GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC");
            $stmt_total->bindValue(":category", $result_check_token['categoryNews']);
            $stmt_total->bindValue(":url", $url);
            $stmt_total->execute();
            $result_total = $stmt_total->fetchAll(PDO::FETCH_ASSOC);
            $count_total = $stmt_total->rowCount();
            $stmt_total->closeCursor();


            $stmt = $conn->prepare($getSQL['gNewsBySitecatalyst'] . " GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC" . " LIMIT $limit OFFSET $offset");
            $stmt->bindValue(":category", $result_check_token['categoryNews']);
            $stmt->bindValue(":url", $url);
            if ($stmt->execute()) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $count = $stmt->rowCount();
                if ($count > 0) {
                    $ListArticle = array(
                        'status' => 1,
                        'total' => $count_total,
                        'message' => 'Danh sách bài viết!',
                        'data' => [],
                    );

                    foreach ($result as $key => $value) {
                        $data = array(
                            "id" => $value['id'],
                            "title" => $value['title'],
                            "url" => $value['url'],
                            "categoryTitle" => $value['categoryTitle'],
                            "categoryUrl" => 'chi-tiet-bai-viet-du-phong-cho-nam/' . $value['categoryUrl'],
                            "description" => $value['description'],
                            "content" => $value['content'],
                            "img" => $value['img'],
                            "imgMobile" => $value['imgMobile'],
                            "view" => $value['view'],
                            "delf" => $value['delf'],
                            "timestamp" => $value['timestamp'],
                        );
                        array_push($ListArticle['data'], $data);
                    }

                    echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $ListArticle = array(
                        'status' => 1,
                        'total' => $count_total,
                        'message' => 'Danh sách bài viết không tồn tại trên hệ thống!',
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
        }
    } else {
        $ListArticle = array(
            'status' => 0,
            'total' => 0,
            'message' => 'Danh sách bài viết không tồn tại trên hệ thống!',
            'data' => []
        );
        echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    }
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