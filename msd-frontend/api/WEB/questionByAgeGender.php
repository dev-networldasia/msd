<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$gender = isset($_GET['gender']) ? $_GET['gender'] : "";
$age = isset($_GET['age']) ? $_GET['age'] : "";

$ListQuestion = array(
    'status' => 0,
    'total' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($gender == "" || $gender == null) {
        $ListQuestion = array(
            'status' => 1,
            'total' => 0,
            'message' => 'Vui lòng chọn giới tính',
            'data' => [],
        );
        echo json_encode($ListQuestion, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } elseif ($age == "" || $age == null) {
        $ListQuestion = array(
            'status' => 1,
            'total' => 0,
            'message' => 'Vui lòng chọn độ tuổi',
            'data' => [],
        );
        echo json_encode($ListQuestion, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        $stmt = $conn->prepare($getSQL['gQuestionByAgeGender']);
        $stmt->bindValue(":gender", $gender);
        $stmt->bindValue(":age", $age);
        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $count = $stmt->rowCount();
            if ($count > 0) {
                $ListQuestion = array(
                    'status' => 1,
                    'total' => $count,
                    'message' => 'Danh sách câu hỏi',
                    'data' => [],
                );
                foreach ($result as $key => $value1) {
                    $stmtAnswer = $conn->prepare($getSQL['gAnswerByIdQuestion']);
                    $stmtAnswer->bindValue(":questionId", $value1['id']);
                    $stmtAnswer->execute();
                    $resultAnswer = $stmtAnswer->fetchAll(PDO::FETCH_ASSOC);
                    $stmtAnswer->closeCursor();
                    $data = array(
                        "id" => $value1['id'],
                        "title" => $value1['title'],
                        "description" => $value1['description'],
                        "note" => $value1['note'],
                        "img" => $value1['img'],
                        "imgMobile" => $value1['imgMobile'],
                        "type" => $value1['type'],
                        "answer" => $value1['answer'],
                        "type" => $value1['type'],
                        "timestamp" => $value1['timestamp'],
                        "questionAnswer" => array(),
                    );
                    foreach ($resultAnswer as $key => $value) {
                        $dataAnswer = array(
                            "id" => $value['id'],
                            "content" => $value['content'],
                            "answer" => $value['answer'],
                        );
                        array_push($data['questionAnswer'], $dataAnswer);
                    }
                    array_push($ListQuestion['data'], $data);
                }
                // $ListQuestion['data'] = $data;

                echo json_encode($ListQuestion, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            } else {
                $ListQuestion = array(
                    'status' => 1,
                    'total' => $count,
                    'message' => 'Danh sách câu hỏi hiện đang trống!',
                    'data' => [],
                );
                echo json_encode($ListQuestion, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
        } else {
            $ListQuestion = array(
                'status' => 0,
                'total' => 0,
                'message' => 'Đã xảy ra lỗi. Xin vui lòng thử lại sau.',
                'data' => []
            );
            echo json_encode($ListQuestion, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit();
        }
        $stmt->closeCursor();
    }
} else {
    $ListQuestion = array(
        'status' => 0,
        'total' => 0,
        'message' => 'Yêu cầu thuộc tính GET.',
        'data' => []
    );
    echo json_encode($ListQuestion, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
