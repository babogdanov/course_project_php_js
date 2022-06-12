<?php

require_once("./db/db.php");

$post = json_decode(file_get_contents("php://input"), true);

if($post && isset($post["email"])) {
    $email = $post["email"];

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $userSelectSQL = "SELECT `id` FROM `users` WHERE `email` = :email";
        $stmt = $connection->prepare($userSelectSQL);
        $stmt->execute(["email" => $email]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $tablesSelectSQL = "SELECT `id`, `name` FROM `tables` WHERE `creatorID` = :id";
        $stmt = $connection->prepare($tablesSelectSQL);
        $stmt->execute(["id" => $result["id"]]);

        $result = array();
        while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($result, array(
                "id" => $data["id"],
                "name" => $data["name"]
            ));
        }

        echo json_encode(["status" => 200, "tables" => $result]);
    } catch (PDOException $e){
        echo json_encode(["status" => 500, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => 400, "message" => "something is not set in request body"]);
}

?>