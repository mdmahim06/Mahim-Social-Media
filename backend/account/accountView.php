<?php

include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $username = $_GET['username'];
        $select = "SELECT * FROM `users` WHERE `username`=?";
        $stmt = $dbcon->prepare($select);
        $stmt->bindParam(1, $username);
        $stmt->execute();
        $account = $stmt->fetch(PDO::FETCH_OBJ);

        if ($account) {
            echo json_encode($account);
        } else {
            500;
        }

        break;
}