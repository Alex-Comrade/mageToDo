<?php

header('Content-Type: application/json');

define('ADD_TASK', 'data.json');

$data =
	[
		'next_id' => 1,
	];

if (file_exists(ADD_TASK)) {
	$content = file_get_contents(ADD_TASK);
	$data = json_decode($content, true);
	if (!is_array($data)) {
		$data = [];
	}
}

$output = ['status' => false];

if (
	!isset($_GET['api-name']) ||
	!is_string($_GET['api-name'])
) {
	$output['message'] = 'api-name not specified';
	echo json_encode($output, JSON_PRETTY_PRINT);
	exit;
}

switch ($_GET['api-name']) {
	case 'addTask':

		if (
			!isset($_POST['task']) ||
			!is_string($_POST['task'])
		) {
			$output['message'] = 'task not specified';
			echo json_encode($output, JSON_PRETTY_PRINT);
			exit;
		}

		if (in_array($_POST['task'], $data)) {
			$output['message'] = 'task already exists';
			$output['debug'] = $POST['task'];
			echo json_encode($output, JSON_PRETTY_PRINT);
			exit;
		}

		$data[] = $_POST['task'];

		$content = json_encode($data);
		file_put_contents(ADD_TASK, $content);


		$output = [
			'status' => true,
			'message' => 'task added',
		];
		break;

	case 'getTasks':

		$output = [
			'status' => true,
			'message' => 'tasks retrieved',
			'tasks' => $data,
		];
		break;

	case 'removeTask':
		$delete = $_GET['removeTask'];
		$i = 0;
		foreach ($data as $element) {
			if ($data == $element) {
				unset($data[$i]);
			}
			$i++;
		}
}




echo json_encode($output, JSON_PRETTY_PRINT);
