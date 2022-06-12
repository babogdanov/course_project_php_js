<?php
 require_once("./db/db.php");

 $post = json_decode(file_get_contents("php://input"), true);

 if ($post && isset($post["email"]) && isset($post["password"])) {
    $email = $post["email"];
    $password = $post["password"];
    try {
        $db = new DB();
        $connection = $db->getConnection();
 
        $sql = "SELECT `password` FROM users where email = :email";
        $stmt = $connection->prepare($sql);
        $stmt->execute(["email" => $email]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
 
        if (password_verify($password, $result["password"])) {
           echo '../home-page/home-page.html';
        } else {
            http_response_code(400);
            echo '../login-page/login-page.html'; 
        }

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "ERROR", "message" => $e->getMessage()]); 
    }

 } else {
    http_response_code(400);
    echo json_encode(["status" => "ERROR", "message" => "Некоректни данни!"]); 
 }

?>
