<?php

include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $user = json_decode(file_get_contents('php://input'));

    $select = "SELECT  `email`, `password`, `token`, `active` FROM `users` WHERE `email`=?";
    $email = strtolower($user->email);
    $vlStmt = $dbcon->prepare($select);
    $vlStmt->bindParam(1, $email);
    $vlStmt->execute();
    $account = $vlStmt->fetch(PDO::FETCH_OBJ);

    if ($account) {
        $pwdValid = password_verify($user->password, $account->password);
        if ($pwdValid) {
            if ($account->active == 'false') {
                $code = rand(0, 9999);
                try {
                    include '../src/mail_handeler.php';

                    //Content
                    $mail->addAddress($account->email);
                    $mail->isHTML(true);                                  //Set email format to HTML
                    $mail->Subject = 'Email Verify';
                    $mail->Body = "
                    <span style='font-size:1.1rem;'>
                    Welcome to <b>Mahim Social Media</b>.Reprehenderit reprehenderit id excepteur
                    consectetur exercitation adipisicing nulla culpa culpa in.
                    </span>
                    <br />
                    <div
                      style='
                      display:flex;
                      width:100%;
                      '
                    >
                      <span
                        style='
                          background: #c2e7ff;
                          color: black;
                          padding: 1.6rem 8rem;
                          border: 2px solid silver;
                          border-radius: 1rem;
                          margin: 5rem 0;
                          font-size:2.8rem;
                        '
                        >$code</span
                      >
                    </div>
                    ";

                    $mail->send();

                    echo json_encode(['status' => 200, 'active' => $account->active, 'code' => $code, 'token' => $account->token]);
                } catch (Exception $e) {
                    echo json_encode(['status' => 500, 'message' => 'Server Error!', 'token' => false]);
                }
            } else {
                echo json_encode(['status' => 200, 'active' => $account->active, 'code' => 0000, 'token' => $account->token]);
            }
        } else {
            echo json_encode(['status' => 402, 'message' => 'Wrong Password!']);
        }
    } else {
        echo json_encode(['status' => 404, 'message' => 'Wrong Email!']);
    }
}