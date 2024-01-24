<?php

include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    // username, token 
    $data = json_decode(file_get_contents('php://input'));

    $update = "UPDATE `users` SET `email`=?, `active`='false' WHERE `token`=?";
    $email = strtolower($data->email);
    $upStmt = $dbcon->prepare($update);
    $upStmt->bindParam(1, $email);
    $upStmt->bindParam(2, $data->token);

    if ($upStmt->execute()) {
        echo 202;
    } else {
        echo 500;
    }


} elseif ($method == 'GET') {
    $email = $_GET['email'];
    $select = "SELECT * FROM `users` WHERE `email`=?";
    $stmt = $dbcon->prepare($select);
    $stmt->bindParam(1, $email);
    $stmt->execute();
    if ($stmt->fetch()) {
        echo 200;
    } else {
        echo 404;
    }

}
