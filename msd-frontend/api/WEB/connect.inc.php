<?php
	header("Content-type: application/json; charset=utf-8");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key, Authorization");
	header("Access-Control-Allow-Origin: *");
	$SECURE_SECRET = "6D0870CDE5F24F34F3915FB0045120DB";
	$secret_key = "AAAAGrJJsOI:APA91bFa-i8qJ3O-NZqMC_Zb6O9Jmyl1BW0DOelsiXdw4aL9Vo2LSAdjIQNOwJDf9AxjWAZs0ZcezKdnxTkrmwJDHnW0qCwVe6u8GMuorMw6OE2TvrU50N5gwE8RIxUZtCmqzWD2FpOH";

	$host = 'mysql';
	$port = '3306';
	$db = 'admin_hpv';
	$user = 'root';
	$pass = 'xLrhS8US4QfAt24Qr88J';
	$charset = 'utf8mb4';
	$dsn = "mysql:host=$host; port=$port; dbname=$db;charset=$charset";
	$opt = [
	    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
	    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	    PDO::ATTR_EMULATE_PREPARES   => false,
	];
	try {
	    $conn = new PDO($dsn, $user, $pass);
	} catch (\PDOException $e) {
	    throw new \PDOException($e->getMessage(), (int)$e->getCode());
	}
?>
