<?
$db = new Mongo();

$filters = [
	'livesAlone',
	'withoutCar',
	'over65',
	'poverty',
	'chronicMedical',
	'requiresElectrical',
	'limitedCommunications',
	'heartDisease',
	'lungDisease',
	'physicalDisability',
	'raisingChildren'
];

$query = [];

foreach($filters as $filter){
	if(isset($_GET[$filter]) && $_GET[$filter] == "true"){
		$query[][$filter] = true;
	}
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(count($query) == 0){
	echo '[]';
}else{
	$data = $db->weatherhack->people->find(['$and' => $query], ['location']);
	
	$new = [];
	foreach($data as $point){
		if(isset($point['location'])){
			$new[] = [$point['location']['coordinates'][0], $point['location']['coordinates'][1]];
		}
	}
	
	echo json_encode($new);
}
