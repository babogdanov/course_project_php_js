<?php

require_once("./db/db.php");

if($_GET && isset($_GET["id"])) {
    $tableID = $_GET["id"];

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $sql = "SELECT * FROM `tables` WHERE `id` = :id";
        $stmt = $connection->prepare($sql);
        $stmt->execute(["id" => $tableID]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result == false) {
            echo json_encode(["status" => 404]);
        } else {
            echo json_encode(["status" => 200, "table" => array(
                "name" => $result["name"],
                "rows" => $result["rows"],
                "columns" => $result["columns"],
                "table" => $result["table"],
            )]);
        }
    } catch (PDOException $e){
        echo json_encode(["status" => 500, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => 400, "message" => "something is not set in request body"]);
}

?>