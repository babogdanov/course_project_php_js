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
        if ($result == false) {
            echo json_encode(["status" => 400, "message" => "email is not correct"]);
        } else {
            if (password_verify($password, $result["password"])) {
                echo json_encode(["status" => 204]);
             } else {
                 echo json_encode(["status" => 400, "message" => "password is not correct"]);
             }
        }
    } catch (Exception $e) {
        echo json_encode(["status" => 500, "message" => $e->getMessage()]); 
    }

 } else {
    echo json_encode(["status" => 400, "message" => "something is not set in request body"]); 
 }

?>
