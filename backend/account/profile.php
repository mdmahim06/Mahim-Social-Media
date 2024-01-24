<?php

include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method = 'GET') {
    $token = $_GET['token'];

    $select = "SELECT * FROM `users` WHERE `token`=?";

    $stmt = $dbcon->prepare($select);
    $stmt->bindParam(1, $token);
    $stmt->execute();
    $account = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($account) {
        echo json_encode(['status'=>200,'data'=>$account]);
    } else {
        echo 500;
    }
}