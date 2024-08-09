<?php
require_once "sysenv.php";
use Kreait\Firebase;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;
use Kreait\Firebase\Factory;
function VerifyToken($token = '')
{
    try {
        $factory = (new Factory)->withServiceAccount('products-8e4fd-firebase-adminsdk-y2blv-4b77962bfd.json');
        $auth = $factory->createAuth();
        $verifiedIdToken = $auth->verifyIdToken($token);
        $uid = $verifiedIdToken->claims()->get('sub');
        // lấy thông tin account firebase
        $user = $auth->getUser($uid);
        $dataEncodeUser = json_encode($user, JSON_PRETTY_PRINT);
        $dataDecodeUser = (array)json_decode($dataEncodeUser);
        $phonenumber =  preg_replace('/^\+?84|\|1|\D/', '0', ($dataDecodeUser['phoneNumber']));
        return $phonenumber;
    } catch (InvalidToken $e) {
        return 0;
//        echo $e->getMessage();
    }
    // lấy thông tin uid của firebase account từ token truyền lên
}

?>