<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if ($_POST) {
		// set response code - 200 OK
		http_response_code(200);
		$name = $_POST['name'];
		$email = $_POST['email'];
		if (!$name || !$email) {
			echo json_encode(["sent" => false, "error" => "Fields required"]);
			return;
		}
		echo json_encode(["sent" => true, "name" => $name]);
	}
else {
	echo json_encode(["sent" => false, "error" => "Something went wrong"]);
}

?>