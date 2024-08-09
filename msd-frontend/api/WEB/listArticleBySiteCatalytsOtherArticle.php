<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$gender = isset($_GET['gender']) ? $_GET['gender'] : 0;
$token = isset($_GET['token']) ? $_GET['token'] : "";
$category = isset($_GET['category']) ? $_GET['category'] : "";
$url = isset($_GET['url']) ? $_GET['url'] : "";
$keySearch = isset($_GET['keySearch']) ? $_GET['keySearch'] : "";

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

    $param = "";

    if (isset($keySearch) && $keySearch !== "") {
        $param .= " AND news.title LIKE '%$keySearch%' ";
    }

    if ($count_check > 0) {
        if ($gender == 0) {
            $stmt_check_token = $conn->prepare($getSQL['gFemalePointByTokenSitecatalyst']);
            $stmt_check_token->bindValue(":token", $result_check['token']);
            $stmt_check_token->execute();
            $result_check_token = $stmt_check_token->fetch(PDO::FETCH_ASSOC);
            $stmt_check_token->closeCursor();

            $stmt_total = $conn->prepare($getSQL['gNewsByUrlNewsCategoryIdOtherNews'] . $param . " GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC");
            $stmt_total->bindValue(":category", $result_check_token['femaleAge']);
            $stmt_total->bindValue(":url", $url);
            $stmt_total->execute();
            $result_total = $stmt_total->fetchAll(PDO::FETCH_ASSOC);
            $count_total = $stmt_total->rowCount();
            $stmt_total->closeCursor();


            $stmt = $conn->prepare($getSQL['gNewsByUrlNewsCategoryIdOtherNews'] . $param . " GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC" . " LIMIT $limit OFFSET $offset");
            $stmt->bindValue(":category", $result_check_token['femaleAge']);
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

                    $arrayData = array();
                    foreach ($result as $key => $value) {
                        if ($value != $url) {
                            array_push($ListArticle['data'], $value);
                        }
                        array_push($arrayData, $value['id']);
                    }
                    $stringData = implode(",", $arrayData);
                    if ($count_total < $limit) {
                        $stmt_push = $conn->prepare($getSQL['gNewsByUrlNewsCategoryIdOtherNews'] . " AND news.id NOT IN (" . $stringData . ") GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC"  . " LIMIT " . $limit - $count_total);
                        $stmt_push->bindValue(":category", $result_check_token['femaleAge']);
                        $stmt_push->bindValue(":url", $url);
                        $stmt_push->execute();
                        $result_push = $stmt_push->fetchAll(PDO::FETCH_ASSOC);
                        $count_push = $stmt_push->rowCount();
                        $stmt_push->closeCursor();
                        foreach ($result_push as $key1 => $value1) {
                            array_push($ListArticle['data'], $value1);
                        }
                        $ListArticle['total'] = $count_total + $count_push;
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
            $stmt_check_token = $conn->prepare($getSQL['gMalePointByTokenSitecatalyst']);
            $stmt_check_token->bindValue(":token", $result_check['token']);
            $stmt_check_token->execute();
            $result_check_token = $stmt_check_token->fetch(PDO::FETCH_ASSOC);
            $stmt_check_token->closeCursor();

            $stmt_total = $conn->prepare($getSQL['gNewsByUrlNewsCategoryIdOtherNews'] . $param . " GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC");
            $stmt_total->bindValue(":category", $result_check_token['maleAge']);
            $stmt_total->bindValue(":url", $url);
            $stmt_total->execute();
            $result_total = $stmt_total->fetchAll(PDO::FETCH_ASSOC);
            $count_total = $stmt_total->rowCount();
            $stmt_total->closeCursor();

            $stmt = $conn->prepare($getSQL['gNewsByUrlNewsCategoryIdOtherNews'] . $param . " GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC" . " LIMIT $limit OFFSET $offset");
            $stmt->bindValue(":category", $result_check_token['maleAge']);
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
                    $arrayData = array();
                    foreach ($result as $key => $value) {
                        if ($value != $url) {
                            array_push($ListArticle['data'], $value);
                        }
                        array_push($arrayData, $value['id']);
                    }
                    $stringData = implode(",", $arrayData);
                    if ($count_total < $limit) {
                        $stmt_push = $conn->prepare($getSQL['gNewsByUrlNewsCategoryIdOtherNews'] . " AND news.id NOT IN (" . $stringData . ") GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC"  . " LIMIT " . $limit - $count_total);
                        $stmt_push->bindValue(":category", $result_check_token['maleAge']);
                        $stmt_push->bindValue(":url", $url);
                        $stmt_push->execute();
                        $result_push = $stmt_push->fetchAll(PDO::FETCH_ASSOC);
                        $count_push = $stmt_push->rowCount();
                        $stmt_push->closeCursor();
                        foreach ($result_push as $key1 => $value1) {
                            array_push($ListArticle['data'], $value1);
                        }
                        $ListArticle['total'] = $count_total + $count_push;
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
        $stmt_total = $conn->prepare($getSQL['gNewsByUrlNewsCategoryIdOtherNews'] . $param . " GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC");
        $stmt_total->bindValue(":category", $category);
        $stmt_total->bindValue(":url", $url);
        $stmt_total->execute();
        $result_total = $stmt_total->fetchAll(PDO::FETCH_ASSOC);
        $count_total = $stmt_total->rowCount();
        $stmt_total->closeCursor();

        $stmt = $conn->prepare($getSQL['gNewsByUrlNewsCategoryIdOtherNews'] . $param . " GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC" . " LIMIT $limit OFFSET $offset");
        $stmt->bindValue(":category", $category);
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
                $arrayData = array();
                    foreach ($result as $key => $value) {
                        if ($value != $url) {
                            array_push($ListArticle['data'], $value);
                        }
                        array_push($arrayData, $value['id']);
                    }
                    $stringData = implode(",", $arrayData);
                    if ($count_total < $limit) {
                        $stmt_push = $conn->prepare($getSQL['gNewsByUrlNewsCategoryIdOtherNews'] . " AND news.id NOT IN (" . $stringData . ") GROUP BY news_matrix.news_id, news_matrix.news_category_id ORDER BY RAND() DESC"  . " LIMIT " . $limit - $count_total);
                        $stmt_push->bindValue(":category", $category);
                        $stmt_push->bindValue(":url", $url);
                        $stmt_push->execute();
                        $result_push = $stmt_push->fetchAll(PDO::FETCH_ASSOC);
                        $count_push = $stmt_push->rowCount();
                        $stmt_push->closeCursor();
                        foreach ($result_push as $key1 => $value1) {
                            array_push($ListArticle['data'], $value1);
                        }
                        $ListArticle['total'] = $count_total + $count_push;
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
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($ListArticle, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
