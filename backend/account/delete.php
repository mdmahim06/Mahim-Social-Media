<?php

include '../src/connect.php';


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $token = $_GET['token'];
    $delete = "DELETE FROM `users` WHERE `token`=?";
    $stmt = $dbcon->prepare($delete);
    $stmt->bindParam(1, $token);
    $stmt->execute();
    if ($stmt->execute()) {
        echo 202;
    } else {
        echo 500;
    }
}