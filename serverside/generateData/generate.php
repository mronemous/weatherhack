<?php
$database = new Mongo();

function insertNeighborhood($population, $coordinates){
	// This function will run once per "neighborhood" so neighborhood factors are decided here
	
	// we'll go through 6 weighted scenarios and 4 purely random/average
	switch(rand(1,10)){
		// Retirement neighborhood/Florida Suburbs
		case 0:
			$factors = [
				'livesAlone' => 40,
				'withoutCar'=> 70,
				'over65' => 90,
				'poverty' => 5,
				'chronicMedical' => 80,
				'requiresElectrical' => 20,
				'limitedCommunications' => 10,
				'heartDisease' => 40,
				'lungDisease' => 35,
				'physicalDisability' => 35,
				'raisingChildren' => 5
			];
			break;
			
		// Neighborhood in Poverty/East of 8 Mile
		case 1:
			$factors = [
				'livesAlone' => 10,
				'withoutCar'=> 40,
				'over65' => 20,
				'poverty' => 80,
				'chronicMedical' => 55,
				'requiresElectrical' => 3,
				'limitedCommunications' => 1,
				'heartDisease' => 30,
				'lungDisease' => 30,
				'physicalDisability' => 30,
				'raisingChildren' => 25
			];
			break;		
		
		// Downtown bigtown USA/Chicago
		case 2:
			$factors = [
				'livesAlone' => 10,
				'withoutCar'=> 80,
				'over65' => 13,
				'poverty' => 5,
				'chronicMedical' => 60,
				'requiresElectrical' => 3,
				'limitedCommunications' => 1,
				'heartDisease' => 40,
				'lungDisease' => 30,
				'physicalDisability' => 10,
				'raisingChildren' => 12
			];
			break;	
		
		// Kids and newlyweds / Cincinnati 
		case 2:
			$factors = [
				'livesAlone' => 5,
				'withoutCar'=> 10,
				'over65' => 20,
				'poverty' => 8,
				'chronicMedical' => 10,
				'requiresElectrical' => 3,
				'limitedCommunications' => 4,
				'heartDisease' => 20,
				'lungDisease' => 30,
				'physicalDisability' => 10,
				'raisingChildren' => 25
			];
			break;	
		
		// Hipsters/yuppies/Brooklyn
		case 2:
			$factors = [
				'livesAlone' => 15,
				'withoutCar'=> 60,
				'over65' => 25,
				'poverty' => 20,
				'chronicMedical' => 10,
				'requiresElectrical' => 3,
				'limitedCommunications' => 2,
				'heartDisease' => 20,
				'lungDisease' => 30,
				'physicalDisability' => 10,
				'raisingChildren' => 11
			];
			break;
			
		// Mansions, big front lawns and garages/ Wayland MA
		case 3:
			$factors = [
				'livesAlone' => 5,
				'withoutCar'=> 7,
				'over65' => 35,
				'poverty' => 2,
				'chronicMedical' => 20,
				'requiresElectrical' => 6,
				'limitedCommunications' => 10,
				'heartDisease' => 20,
				'lungDisease' => 30,
				'physicalDisability' => 10,
				'raisingChildren' => 25
			];
			break;
			
		// Average America
		default:
			$factors = [
				'livesAlone' => 27,
				'withoutCar'=> 10,
				'over65' => 13,
				'poverty' => 15,
				'chronicMedical' => 50,
				'requiresElectrical' => 5,
				'limitedCommunications' => 20,
				'heartDisease' => 20,
				'lungDisease' => 30,
				'physicalDisability' => 19,
				'raisingChildren' => 18
			];
			
			break;
	}
	
	$people = [];
	for(;$population != 0; $population--){
		//$location = $coordinates[array_rand($coordinates)];
		$location = explode(',', $coordinates[array_rand($coordinates)]);
		
		$people[] = [
			'livesAlone' => false,
			'withoutCar' => false,
			'over65' => false,
			'poverty' => false,
			'chronicMedical' => false,
			'requiresElectrical' => false,
			'limitedCommunications' => false,
			'heartDisease' => false,
			'lungDisease' => false,
			'physicalDisability' => false,
			'raisingChildren' => false,
			'location' => [$location[0], $location[1]]
		];
	}

	// Loop through the factors, with specify a max percentage
	foreach($factors as $factorName => $upperBound){
	
		// These factors differ, so anywhere between 3/4 and the max will be chosen
		for($i = rand($upperBound*0.75, $upperBound); $i != 0; $i--){
			// Pick a random person
			$people[array_rand($people)][$factorName] = true;
		}
	}
	
	return $people;
}



// Density.csv says how many people are within each tract of land
$handle = fopen('density.csv', 'r');
while(($data = fgetcsv($handle) ) !== FALSE ){
	$populations[substr($data[1], 13)] = (int) $data[2];
}

// This XML file contains data about the shapes of these tracts
$tracts = simplexml_load_file('2010gztract_13.kml');
foreach($tracts->Document->Placemark as $PUMA){
	// Not great XML design on their part, using regex to pull out the tract ID to match the two datasets
	preg_match('/\<td\>(.+)\<\/td\>/', $PUMA->description[0], $matches);
	$population = $populations[$matches[1]];
	
	// Space-separated list of coordinates within XML object
	$polyline = explode(' ', $PUMA->Polygon[0]->outerBoundaryIs[0]->LinearRing[0]->coordinates);
	
	// Remove the last element which is a " "
	array_pop($polyline);
	
	if(count($polyline) > 1){
	
	$people = insertNeighborhood($population, $polyline);
	
	$database->weatherhack->people->batchInsert($people);
	
	$pplcnt = count($people);
	
	echo "inserted $pplcnt...  ";
	usleep(700); // 6656 & 1220303
	}
}