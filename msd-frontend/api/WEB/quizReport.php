<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

date_default_timezone_set("Asia/Ho_Chi_Minh");
$token = isset($_POST['token']) ? $_POST['token'] : "";
$female1 = isset($_POST['female1']) ? $_POST['female1'] : 0;
$female2 = isset($_POST['female2']) ? $_POST['female2'] : 0;
$female3 = isset($_POST['female3']) ? $_POST['female3'] : 0;
$male1 = isset($_POST['male1']) ? $_POST['male1'] : 0;
$male2 = isset($_POST['male2']) ? $_POST['male2'] : 0;
$male3 = isset($_POST['male3']) ? $_POST['male3'] : 0;

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
    } else {
        $stmtCheck = $conn->prepare($getSQL['checkTokenQuiz']);
        $stmtCheck->bindValue(":token", $token);
        $stmtCheck->execute();
        $resultCheck = $stmtCheck->fetch(PDO::FETCH_ASSOC);
        $countCheck = $stmtCheck->rowCount();
        $stmtCheck->closeCursor();
        // var_dump($resultCheck);
        // exit;

        if ($countCheck > 0) {
            $checkTimeFemale1 = strtotime("now") - strtotime($resultCheck['updatetime_female_1']);
            $checkTimeFemale2 = strtotime("now") - strtotime($resultCheck['updatetime_female_2']);
            $checkTimeFemale3 = strtotime("now") - strtotime($resultCheck['updatetime_female_3']);
            $checkTimeMale1 = strtotime("now") - strtotime($resultCheck['updatetime_male_1']);
            $checkTimeMale2 = strtotime("now") - strtotime($resultCheck['updatetime_male_2']);
            $checkTimeMale3 = strtotime("now") - strtotime($resultCheck['updatetime_male_3']);

            $updatePerformed = false;

            if (($checkTimeFemale1 >= 24 * 3600 || empty($resultCheck['updatetime_female_1'])) && $female1 > 0) {
                $stmtUpdate = $conn->prepare($getSQL['uFemale1QuizByToken']);
                $stmtUpdate->bindValue(":female1", $female1);
                $stmtUpdate->bindValue(":token", $token);
                $stmtUpdate->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtUpdate->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã cập nhập quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $TypeAccumulated = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtUpdate->closeCursor();
                $updatePerformed = true;
            } elseif (($checkTimeFemale2 >= 24 * 3600 || empty($resultCheck['updatetime_female_2'])) && $female2 > 0) {
                $stmtUpdate = $conn->prepare($getSQL['uFemale2QuizByToken']);
                $stmtUpdate->bindValue(":female2", $female2);
                $stmtUpdate->bindValue(":token", $token);
                $stmtUpdate->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtUpdate->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã cập nhập quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $TypeAccumulated = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtUpdate->closeCursor();
                $updatePerformed = true;
            } elseif (($checkTimeFemale3 >= 24 * 3600 || empty($resultCheck['updatetime_female_3'])) && $female3 > 0) {
                $stmtUpdate = $conn->prepare($getSQL['uFemale3QuizByToken']);
                $stmtUpdate->bindValue(":female3", $female3);
                $stmtUpdate->bindValue(":token", $token);
                $stmtUpdate->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtUpdate->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã cập nhập quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $TypeAccumulated = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtUpdate->closeCursor();
                $updatePerformed = true;
            } elseif (($checkTimeMale1 >= 24 * 3600 || empty($resultCheck['updatetime_male_1'])) && $male1 > 0) {
                $stmtUpdate = $conn->prepare($getSQL['uMale1QuizByToken']);
                $stmtUpdate->bindValue(":male1", $male1);
                $stmtUpdate->bindValue(":token", $token);
                $stmtUpdate->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtUpdate->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã cập nhập quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $TypeAccumulated = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtUpdate->closeCursor();
                $updatePerformed = true;
            } elseif (($checkTimeMale2 >= 24 * 3600 || empty($resultCheck['updatetime_male_2'])) && $male2 > 0) {
                $stmtUpdate = $conn->prepare($getSQL['uMale2QuizByToken']);
                $stmtUpdate->bindValue(":male2", $male2);
                $stmtUpdate->bindValue(":token", $token);
                $stmtUpdate->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtUpdate->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã cập nhập quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $TypeAccumulated = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtUpdate->closeCursor();
                $updatePerformed = true;
            } elseif (($checkTimeFemale3 >= 24 * 3600 || empty($resultCheck['updatetime_male_3'])) && $male3 > 0) {
                $stmtUpdate = $conn->prepare($getSQL['uMale3QuizByToken']);
                $stmtUpdate->bindValue(":male3", $male3);
                $stmtUpdate->bindValue(":token", $token);
                $stmtUpdate->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtUpdate->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã cập nhập quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $TypeAccumulated = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtUpdate->closeCursor();
                $updatePerformed = true;
            }
            if (!$updatePerformed) {
                $TypeAccumulated = array(
                    'status' => 1,
                    'message' => 'Điểm quiz chỉ cập nhập 24h một lần!',
                    'data' => []
                );
                echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
            $stmtUpdate->closeCursor();
        } else {
            if ($female1 > 0) {
                $stmtInsert = $conn->prepare($getSQL['iFemale1TokenQuiz']);
                $stmtInsert->bindValue(":token", $token);
                $stmtInsert->bindValue(":female1", $female1);
                $stmtInsert->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtInsert->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã thêm quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $TypeAccumulated = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtInsert->closeCursor();
            } elseif ($female2 > 0) {
                $stmtInsert = $conn->prepare($getSQL['iFemale2TokenQuiz']);
                $stmtInsert->bindValue(":token", $token);
                $stmtInsert->bindValue(":female2", $female2);
                $stmtInsert->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtInsert->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã thêm quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $TypeAccumulated = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtInsert->closeCursor();
            } elseif ($female3 > 0) {
                $stmtInsert = $conn->prepare($getSQL['iFemale3TokenQuiz']);
                $stmtInsert->bindValue(":token", $token);
                $stmtInsert->bindValue(":female3", $female3);
                $stmtInsert->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtInsert->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã thêm quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $TypeAccumulated = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtInsert->closeCursor();
            } elseif ($male1 > 0) {
                $stmtInsert = $conn->prepare($getSQL['iMale1TokenQuiz']);
                $stmtInsert->bindValue(":token", $token);
                $stmtInsert->bindValue(":male1", $male1);
                $stmtInsert->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtInsert->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã thêm quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $TypeAccumulated = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtInsert->closeCursor();
            } elseif ($male2 > 0) {
                $stmtInsert = $conn->prepare($getSQL['iMale2TokenQuiz']);
                $stmtInsert->bindValue(":token", $token);
                $stmtInsert->bindValue(":male2", $male2);
                $stmtInsert->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtInsert->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã thêm quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
                    $TypeAccumulated = array(
                        'status' => 0,
                        'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                }
                $stmtInsert->closeCursor();
            } elseif ($male3 > 0) {
                $stmtInsert = $conn->prepare($getSQL['iMale3TokenQuiz']);
                $stmtInsert->bindValue(":token", $token);
                $stmtInsert->bindValue(":male3", $male3);
                $stmtInsert->bindValue(":timestamp", date("Y-m-d H:i:s"));
                if ($stmtInsert->execute()) {
                    $TypeAccumulated = array(
                        'status' => 1,
                        'message' => 'Đã thêm quiz thành công!',
                        'data' => []
                    );
                    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    exit();
                } else {
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
    }
} else {
    $TypeAccumulated = array(
        'status' => 0,
        'message' => 'Yêu cầu thuộc tính POST.',
        'data' => []
    );
    echo json_encode($TypeAccumulated, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
