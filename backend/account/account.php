<?php

include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $user = json_decode(file_get_contents('php://input'));

    $userName = strtolower(str_replace(" ", "", $user->fname . $user->lname) . bin2hex(random_bytes(3)));
    $rand = random_bytes(11);
    $token = 'ms-' . bin2hex($rand);
    $password = password_hash($user->password, PASSWORD_BCRYPT);

    $emailValid = 'SELECT * FROM `users` WHERE `email`=?';
    $vlStmt = $dbcon->prepare(($emailValid));
    $vlStmt->bindParam(1, $user->email);
    $vlStmt->execute();
    if (!$vlStmt->fetch()) {
        $insert = "INSERT INTO `users`(`username`, `fname`, `lname`, `email`, `password`, `token`) VALUES (?,?,?,?,?,?)";
        $stmt = $dbcon->prepare($insert);
        $stmt->bindParam(1, $userName);
        $stmt->bindParam(2, $user->fname);
        $stmt->bindParam(3, $user->lname);
        $stmt->bindParam(4, $user->email);
        $stmt->bindParam(5, $password);
        $stmt->bindParam(6, $token);

        if ($stmt->execute()) {
            echo json_encode(['status' => 201, 'message' => 'Your account created please login', 'token' => $token]);
        } else {
            echo json_encode(['status' => 500, 'message' => 'Server Error!']);
        }
    } else {
        echo json_encode(['status' => 404, 'message' => 'Email all ready exist!']);
    }
}