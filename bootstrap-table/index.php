<?php

$offset = intval($_REQUEST['offset']);
$limit = intval($_REQUEST['limit']);
$arr = array();

$page = $offset / $limit;

$end = $offset + $limit;

for ($i=$offset; $i<$end; $i++) {
	$temp = array(
		'Name'       => 'Name '.$i,
		'ParentName' => '<a href="#">ParentName</a> '.$i,
		'Level'      => 'Level '.$i,
		// 'Desc'       => 'Desc '.$i
	);

	array_push($arr, $temp);
}

echo json_encode(array('total' => 100, 'rows' => $arr, 'limit' => $limit, 'offset' => $offset));
?>