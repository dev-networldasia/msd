<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

$token = isset($_POST['token']) ? $_POST['token'] : "";
$type = isset($_POST['type']) ? $_POST['type'] : 1;
$custom = (isset($_POST['custom']) && $_POST['custom'] != "") ? implode(",", $_POST['custom']) : null;
$ip = isset($_POST['ip']) ? $_POST['ip'] : null;
$country = isset($_POST['country']) ? $_POST['country'] : null;
$utmSource = isset($_POST['utmSource']) ? $_POST['utmSource'] : null;
$utmMedium = isset($_POST['utmMedium']) ? $_POST['utmMedium'] : null;
$utmCampaign = isset($_POST['utmCampaign']) ? $_POST['utmCampaign'] : null;
$utmId = isset($_POST['utmId']) ? $_POST['utmId'] : null;
$utmContent = isset($_POST['utmContent']) ? $_POST['utmContent'] : null;
$city = isset($_POST['city']) ? $_POST['city'] : null;
$device = isset($_POST['device']) ? $_POST['device'] : null;

$CookieReport = array(
    'status' => 0,
    'message' => "",
    'data' => [],
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($token == null || $token == "" || str_replace(" ", "", $token) == "") {
        $CookieReport = array(
            'status' => 0,
            'message' => 'Token hiện đang trống!',
            'data' => [],
        );
        echo json_encode($CookieReport, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    } else {
        if ($type == 3) {
            $stmt_insert = $conn->prepare($getSQL['iCookieReportCustom']);
            $stmt_insert->bindValue(":token", $token);
            $stmt_insert->bindValue(":type", $type);
            $stmt_insert->bindValue(":ip", $ip);
            $stmt_insert->bindValue(":country", $country);
            $stmt_insert->bindValue(":custom", $custom);
            $stmt_insert->bindValue(":utm_source", $utmSource);
            $stmt_insert->bindValue(":utm_medium", $utmMedium);
            $stmt_insert->bindValue(":utm_campaign", $utmCampaign);
            $stmt_insert->bindValue(":utm_id", $utmId);
            $stmt_insert->bindValue(":city", $city);
            $stmt_insert->bindValue(":utm_content", $utmContent);
            $stmt_insert->bindValue(":device", $device);
            if ($stmt_insert->execute()) {
                $CookieReport = array(
                    'status' => 1,
                    'message' => 'Đã thêm report cookie!',
                    'data' => [],
                );
                echo json_encode($CookieReport, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            } else {
                $CookieReport = array(
                    'status' => 0,
                    'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                    'data' => [],
                );
                echo json_encode($CookieReport, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
            $stmt_insert->closeCursor();
        } else {
            $stmt_insert = $conn->prepare($getSQL['iCookieReport']);
            $stmt_insert->bindValue(":token", $token);
            $stmt_insert->bindValue(":type", $type);
            $stmt_insert->bindValue(":ip", $ip);
            $stmt_insert->bindValue(":country", $country);
            $stmt_insert->bindValue(":utm_source", $utmSource);
            $stmt_insert->bindValue(":utm_medium", $utmMedium);
            $stmt_insert->bindValue(":utm_campaign", $utmCampaign);
            $stmt_insert->bindValue(":utm_id", $utmId);
            $stmt_insert->bindValue(":city", $city);
            $stmt_insert->bindValue(":utm_content", $utmContent);
            $stmt_insert->bindValue(":device", $device);
            if ($stmt_insert->execute()) {
                $CookieReport = array(
                    'status' => 1,
                    'message' => 'Đã thêm report cookie!',
                    'data' => [],
                );
                echo json_encode($CookieReport, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            } else {
                $CookieReport = array(
                    'status' => 0,
                    'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
                    'data' => [],
                );
                echo json_encode($CookieReport, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit();
            }
            $stmt_insert->closeCursor();
        }
    }
} else {
    $CookieReport = array(
        'status' => 0,
        'message' => 'Yêu cầu thuộc tính POST.',
        'data' => []
    );
    echo json_encode($CookieReport, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
