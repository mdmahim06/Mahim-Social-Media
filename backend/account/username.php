<?php


include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];


if ($method == 'POST') {
    // username, token 
    $data = json_decode(file_get_contents('php://input'));
    $update = "UPDATE `users` SET `username`=? WHERE `token`=?";
    $username = strtolower($data->username);

    $upStmt = $dbcon->prepare($update);
    $upStmt->bindParam(1, $username);
    $upStmt->bindParam(2, $data->token);

    if ($upStmt->execute()) {
        echo 202;
    } else {
        echo 500;
    }


} elseif ($method == 'GET') {
    $username = $_GET['usrnm'];
    $select = "SELECT * FROM `users` WHERE `username`=?";
    $stmt = $dbcon->prepare($select);
    $stmt->bindParam(1, $username);
    $stmt->execute();
    if ($stmt->fetch()) {
        echo 200;
    } else {
        echo 404;
    }

}
