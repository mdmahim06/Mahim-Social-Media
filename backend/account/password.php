<?php

include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $token = $_GET['token'];
        $pwd = $_GET['pwd'];

        $select = "SELECT  `password` FROM `users` WHERE `token`=?";
        $stmt = $dbcon->prepare($select);
        $stmt->bindParam(1, $token);
        $stmt->execute();
        $sqlPwd = $stmt->fetch(PDO::FETCH_OBJ);

        $verify = password_verify($pwd, $sqlPwd->password);

        if ($verify) {
            echo "true";
        } else {
            echo "false";
        }
        break;
    case 'POST':
        $user = json_decode(file_get_contents('php://input'));
        $password = password_hash($user->password, PASSWORD_BCRYPT);

        $update = "UPDATE `users` SET `password`=? WHERE `token`=?";

        $stmt = $dbcon->prepare($update);
        $stmt->bindParam(1, $password);
        $stmt->bindParam(2, $user->token);
        if ($stmt->execute()) {
            echo 202;
        } else {
            echo 500;
        }
        break;
}

