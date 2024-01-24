<?php

include '../src/connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $token = $_GET['token'];

    $select = "UPDATE `users` SET `active`='true' WHERE `token`=?";
    $stmt = $dbcon->prepare($select);
    $stmt->bindParam(1, $token);

    if ($stmt->execute()) {
        echo json_encode(['status' => 202]);
    } else {
        echo json_encode(['status' => 500,'message'=>"server Error!"]);
    }
}