<?php
include_once "connect.inc.php";
include_once "sysenv.php";
include_once "class.cryptor.php";
require __DIR__ . '/vendor/autoload.php';
require_once "VerifyTokenFirebaseSDK.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$Token = array(
	'status' => 0,
	'message' => "",
	'data' => [],
);

$ip = isset($_POST['ip']) ? $_POST['ip'] : ""; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if ($ip == null || $ip == "" || str_replace(" ", "", $ip) == "") {
		$Token = array(
			'status' => 0,
			'total' => 0,
			'message' => 'Đã xảy ra lỗi. Vui lòng thử lại sau!',
			'data' => [],
		);
		echo json_encode($Token, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
		exit();
	}
	$headers = apache_request_headers();
	if (!(isset($headers['Authorization']) && preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) && !(isset($headers['authorization']) && preg_match('/Bearer\s(\S+)/', $headers['authorization'], $matches))) {
		$issuer_claim = "MSD";
		$audience_claim = "info@path.org";
		$issuedate_claim = time();
		$notbefore_claim = $issuedate_claim;
		$expire_claim = $issuedate_claim + 60*60*24;
		$jwt = null;
		$tokenData = array(
			"iss" => $issuer_claim,
			"aud" => $audience_claim,
			"iat" => $issuedate_claim,
			"nbf" => $notbefore_claim,
			"exp" => $expire_claim,
			"data" => array(
				"ipAddress" => $ip
			)
		);
		$jwt = JWT::encode($tokenData, $secret_key, 'HS256');
		$Token = array(
			'status' => 1,
			'message' => 'Token!',
			'data' => $jwt,
		);
		echo json_encode($Token, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
		exit();
	}else{
		if($matches[1] == null || $matches[1] == "null"){
			$issuer_claim = "MSD";
			$audience_claim = "info@path.org";
			$issuedate_claim = time();
			$notbefore_claim = $issuedate_claim;
			$expire_claim = $issuedate_claim + 60*60*24;
			$jwt = null;
			$tokenData = array(
				"iss" => $issuer_claim,
				"aud" => $audience_claim,
				"iat" => $issuedate_claim,
				"nbf" => $notbefore_claim,
				"exp" => $expire_claim,
				"data" => array(
					"ipAddress" => $ip
				)
			);
			$jwt = JWT::encode($tokenData, $secret_key, 'HS256');
			$Token = array(
				'status' => 0,
				'message' => 'Token!',
				'data' => $jwt,
			);
			echo json_encode($Token, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
			exit();
		}else{
			$jwt_token = $matches[1];
			try {
				$token = JWT::decode($jwt_token, new Key($secret_key, 'HS256'));
				$Token = array(
					'status' => 1,
					'message' => 'Token!',
					'data' => $token,
				);
				echo json_encode($Token, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
				exit();
			}catch (Exception $e){
				$issuer_claim = "MSD";
				$audience_claim = "info@path.org";
				$issuedate_claim = time();
				$notbefore_claim = $issuedate_claim;
				$expire_claim = $issuedate_claim + 60*60*24;
				$jwt = null;
				$tokenData = array(
					"iss" => $issuer_claim,
					"aud" => $audience_claim,
					"iat" => $issuedate_claim,
					"nbf" => $notbefore_claim,
					"exp" => $expire_claim,
					"data" => array(
						"ipAddress" => $ip
					)
				);
				$jwt = JWT::encode($tokenData, $secret_key, 'HS256');
				$Token = array(
					'status' => 0,
					'message' => 'Token!',
					'data' => $jwt,
				);
				echo json_encode($Token, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
				exit();
			}
			if (isset($token->data->userId)) {
				$issuer_claim = "MSD";
				$audience_claim = "info@path.org";
				$issuedate_claim = time();
				$notbefore_claim = $issuedate_claim;
				$expire_claim = $issuedate_claim + 60*60*24;
				$jwt = null;
				$tokenData = array(
					"iss" => $issuer_claim,
					"aud" => $audience_claim,
					"iat" => $issuedate_claim,
					"nbf" => $notbefore_claim,
					"exp" => $expire_claim,
					"data" => array(
						"ipAddress" => $ip
					)
				);
				$jwt = JWT::encode($tokenData, $secret_key, 'HS256');
				$Token = array(
					'status' => 0,
					'message' => 'Token!',
					'data' => $jwt,
				);
				echo json_encode($Token, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
				exit();

			}else{
				$issuer_claim = "MSD";
				$audience_claim = "info@path.org";
				$issuedate_claim = time();
				$notbefore_claim = $issuedate_claim;
				$expire_claim = $issuedate_claim + 60*60*24;
				$jwt = null;
				$tokenData = array(
					"iss" => $issuer_claim,
					"aud" => $audience_claim,
					"iat" => $issuedate_claim,
					"nbf" => $notbefore_claim,
					"exp" => $expire_claim,
					"data" => array(
						"ipAddress" => $ip
					)
				);
				$jwt = JWT::encode($tokenData, $secret_key, 'HS256');
				$Token = array(
					'status' => 0,
					'message' => 'Token!',
					'data' => $jwt,
				);
				echo json_encode($Token, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
				exit();
			}
		}
	}
}else { 
	$Token = array(
		'status' => 0,
		'message' => 'Yêu cầu thuộc tính POST.',
		'data' => []
	);
	echo json_encode($Token, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
	exit();
}