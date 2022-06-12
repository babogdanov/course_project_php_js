<?php

require_once("./db/db.php");

if($_GET) {
    $username = $_GET["username"];

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $sql = "SELECT `id`, `name` FROM `table` WHERE `username` = :username";
        $stmt = $connection->prepare($sql);
        $stmt->execute(["username" => $username]);

        $result = array();
        while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($result, array(
                "id" => data["id"],
                "name" => data["name"]
            ));
        }

        echo json_encode($result);
    } catch (PDOException $e){
        http_response_code(500);
        echo json_encode(["status" => "ERROR", "message" => $e]);
    }
}

?>