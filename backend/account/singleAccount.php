<?php

include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $token = $_GET['token'];
        $select = "SELECT `username`,`avatar` FROM `users` WHERE `token`=?";
        $stmt = $dbcon->prepare($select);
        $stmt->bindParam(1, $token);
        $stmt->execute();
        $account = $stmt->fetch(PDO::FETCH_OBJ);

        if ($account) {
            echo json_encode($account);
        } else {
            500;
        }

        break;
}