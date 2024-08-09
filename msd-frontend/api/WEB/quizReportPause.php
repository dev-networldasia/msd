<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

date_default_timezone_set("Asia/Ho_Chi_Minh");

$token = isset($_POST['token']) ? $_POST['token'] : "";
$quizId = isset($_POST['quizId']) ? $_POST['quizId'] : "";
$quizType = isset($_POST['quizType']) ? $_POST['quizType'] : "";

$QuizReportPause = array(
    'status' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($token == null || $token == "" || str_replace(" ", "", $token) == "") {
        $QuizReportPause = array(
            'status' => 0,
            'message' => 'Token hiện đang trống!',
            'data' => [],
        );
        echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } elseif ($quizId == null || $quizId == "" || str_replace(" ", "", $quizId) == "") {
        $QuizReportPause = array(
            'status' => 0,
            'message' => 'Chưa xác định đang dừng ngang câu hỏi nào!',
            'data' => [],
        );
        echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } elseif ($quizType == null || $quizType == "" || str_replace(" ", "", $quizType) == "") {
        $QuizReportPause = array(
            'status' => 0,
            'message' => 'Chưa xác định được loại câu hỏi!',
            'data' => [],
        );
        echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmtCheck = $conn->prepare($getSQL['gTokenQuizReportPause']);
        $stmtCheck->bindValue(":token", $token);
        $stmtCheck->bindValue(":quizType", $quizType);
        $stmtCheck->execute();
        $resultCheck = $stmtCheck->fetchAll(PDO::FETCH_ASSOC);
        $countCheck = $stmtCheck->rowCount();
        $stmtCheck->closeCursor();

        if ($countCheck > 0) {
            $arrUpdate = [];
            foreach ($resultCheck as $value) {
                if ((strtotime("now") - strtotime($value['timestamp'])) <= 24 * 3600) {
                    array_push($arrUpdate, $value);
                }
            }
            
            if (count($arrUpdate) > 0 && $arrUpdate[0]['quiz_id'] < $quizId) {
                $stmtUpdate = $conn->prepare($getSQL['uQuizPauseTime']);
                $stmtUpdate->bindValue(":quizId", $quizId);
                $stmtUpdate->bindValue(":id", $arrUpdate[0]['id']);
                if ($stmtUpdate->execute()) {
                    $QuizReportPause = array(
                        'status' => 1,
                        'message' => 'Đã cập nhập quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $QuizReportPause = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtUpdate->closeCursor();
            } elseif (count($arrUpdate) <= 0) {
                $stmtInsert = $conn->prepare($getSQL['iTokenQuizPauseTime']);
                $stmtInsert->bindValue(":token", $token);
                $stmtInsert->bindValue(":quizId", $quizId);
                $stmtInsert->bindValue(":quizType", $quizType);
                if ($stmtInsert->execute()) {
                    $QuizReportPause = array(
                        'status' => 1,
                        'message' => 'Đã thêm quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $QuizReportPause = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtInsert->closeCursor();
            }else{
                $QuizReportPause = array(
                    'status' => 1,
                    'message' => 'Không thể cập nhập quiz khi bạn đã dừng lại ở câu hỏi ít hơn hoặc bằng trước đó 24h!',
                    'data' => []
                );
                echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
        } else {
            $stmtInsert = $conn->prepare($getSQL['iTokenQuizPauseTime']);
            $stmtInsert->bindValue(":token", $token);
            $stmtInsert->bindValue(":quizId", $quizId);
            $stmtInsert->bindValue(":quizType", $quizType);
            if ($stmtInsert->execute()) {
                $QuizReportPause = array(
                    'status' => 1,
                    'message' => 'Đã thêm quiz thành công!',
                    'data' => []
                );
                echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            } else {
                $QuizReportPause = array(
                    'status' => 0,
                    'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                    'data' => []
                );
                echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
            $stmtInsert->closeCursor();
        }
    }
} else {
    $QuizReportPause = array(
        'status' => 0,
        'message' => 'Yêu cầu thuộc tính POST.',
        'data' => []
    );
    echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
