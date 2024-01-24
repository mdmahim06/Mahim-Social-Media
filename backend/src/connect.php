<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

try {
	$server = "localhost";
	$userName = "root";
	$password = "";
	$db = "mahim_social";

	$dbcon = new PDO("mysql:host=$server; dbname=$db", $userName, $password);
	$dbcon->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
	echo "Error :" . $e;
}