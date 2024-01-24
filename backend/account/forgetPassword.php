<?php

include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $email = $_GET['email'];

        $code = rand(0, 9999);
        try {
            include '../src/mail_handeler.php';

            //Content
            $mail->addAddress($email);
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'forget Password';
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

            echo json_encode(['status' => 200, 'code' => $code]);
        } catch (Exception $e) {
            echo 500;
        }
        break;
    case 'POST':
        $password = json_decode(file_get_contents('php://input'));

        $update = "UPDATE `users` SET `password`=? WHERE `token`=?";

        $stmt = $dbcon->prepare($update);
        $stmt->bindParam(1, $password->password);
        $stmt->bindParam(2, $password->token);
        if ($stmt->execute()) {
            echo 202;
        } else {
            echo 500;
        }

        break;
}