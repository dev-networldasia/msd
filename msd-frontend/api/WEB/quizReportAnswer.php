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
$answer = isset($_POST['answer']) ? $_POST['answer'] : "";
$answerOfUser = isset($_POST['answerOfUser']) ? $_POST['answerOfUser'] : "";

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
            'message' => 'Chưa xác định được câu hỏi nào!',
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
    } elseif ($answer == null || $answer == "" || str_replace(" ", "", $answer) == "") {
        $QuizReportPause = array(
            'status' => 0,
            'message' => 'Chưa xác định được câu trả lời!',
            'data' => [],
        );
        echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } elseif ($answerOfUser == null || $answerOfUser == "" || str_replace(" ", "", $answerOfUser) == "") {
        $QuizReportPause = array(
            'status' => 0,
            'message' => 'Chưa xác định được câu trả lời của người dùng!',
            'data' => [],
        );
        echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmtCheck = $conn->prepare($getSQL['gTokenQuizReportAnswer']);
        $stmtCheck->bindValue(":token", $token);
        $stmtCheck->bindValue(":quizType", $quizType);
        $stmtCheck->bindValue(":quizId", $quizId);
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
            
            if (count($arrUpdate) > 0) {
                $QuizReportPause = array(
                    'status' => 1,
                    'message' => 'Bạn chỉ được trả lời một câu hỏi một lần trong 24h!',
                    'data' => []
                );
                echo json_encode($QuizReportPause, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            } else{
                $stmtInsert = $conn->prepare($getSQL['iTokenQuizReportAnswer']);
                $stmtInsert->bindValue(":token", $token);
                $stmtInsert->bindValue(":quizId", $quizId);
                $stmtInsert->bindValue(":quizType", $quizType);
                $stmtInsert->bindValue(":answer", $answer);
                $stmtInsert->bindValue(":answerOfUser", $answerOfUser);
                if ($stmtInsert->execute()) {
                    $QuizReportPause = array(
                        'status' => 1,
                        'message' => 'Đã thêm quiz câu trả lời thành công!',
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
        } else {
            $stmtInsert = $conn->prepare($getSQL['iTokenQuizReportAnswer']);
            $stmtInsert->bindValue(":token", $token);
            $stmtInsert->bindValue(":quizId", $quizId);
            $stmtInsert->bindValue(":quizType", $quizType);
            $stmtInsert->bindValue(":answer", $answer);
            $stmtInsert->bindValue(":answerOfUser", $answerOfUser);
            if ($stmtInsert->execute()) {
                $QuizReportPause = array(
                    'status' => 1,
                    'message' => 'Đã thêm quiz câu trả lời thành công!',
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
