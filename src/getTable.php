<?php

require_once("./db/db.php");

if($_GET) {
    $tableID = $_GET["id"];

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $sql = "SELECT * FROM `table` WHERE `id` = :id";
        $stmt = $connection->prepare($sql);
        $stmt->execute(["id" => $tableID]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode(array(
            "name" => $result["name"],
            "rows" => $result["rows"],
            "columns" => $result["columns"],
            "table" => $result["table"],
        ));
    } catch (PDOException $e){
        http_response_code(500);
        echo json_encode(["status" => "ERROR", "message" => $e]);
    }
}

?>