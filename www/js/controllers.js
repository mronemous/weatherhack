angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {

		var heatmapData = [
	new google.maps.LatLng(37.782, -122.447),
	new google.maps.LatLng(37.782, -122.445),
	new google.maps.LatLng(37.782, -122.443),
	new google.maps.LatLng(37.782, -122.441),
	new google.maps.LatLng(37.782, -122.439),
	new google.maps.LatLng(37.782, -122.437),
	new google.maps.LatLng(37.782, -122.435),
	new google.maps.LatLng(37.785, -122.447),
	new google.maps.LatLng(37.785, -122.445),
	new google.maps.LatLng(37.785, -122.443),
	new google.maps.LatLng(37.785, -122.441),
	new google.maps.LatLng(37.785, -122.439),
	new google.maps.LatLng(37.785, -122.437),
	new google.maps.LatLng(37.785, -122.435)
];


	var myLatlng = new google.maps.LatLng(37.774546, -122.433523);

	var mapOptions = {
		center: myLatlng,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'Uluru (Ayers Rock)'
	});


		var heatmap = new google.maps.visualization.HeatmapLayer({
			data: heatmapData
		});
		heatmap.setMap(map);

	google.maps.event.addListener(marker, 'click', function() {

		//alert("click");
		//infowindow.open(map,marker);

	});

//	//Example of making a http request.
//	$http.get("/data/series.json").then(function(resp) {
//		console.log('Success', resp);
//
//		
//		
//	}, function(err) {
//		console.error('ERR', err);
//		
//	});
//	

	tileNEX = new google.maps.ImageMapType({
				getTileUrl: function(tile, zoom) {

					// convert the tile into a quad key
					var quadKey = "";
					for (var level = zoom; level > 0; level--) {
							var mask = 1 << (level-1);

							var xMask = (tile.x & mask) != 0;
							var yMask = (tile.y & mask) != 0;
							if (xMask && yMask) {
									quadKey += '3';
							} else if (yMask) {
									quadKey += '2';
							}
							else if (xMask) {
									quadKey += '1';
							} else {
									quadKey += '0';
							}

					}

					//NOTE: You have to be zoomed out super far to see these.
					//Hardcoded the date to the latest available from sample set.
					
					return 'http://hackathon.weather.com/Maps/imgs/radar/' + '201506240150' + '/' + quadKey + '.png';
				},
				tileSize: new google.maps.Size(256, 256),
				opacity:0.60,
				name : 'NEXRAD',
				isPng: true,
		});		
	map.overlayMapTypes.push(tileNEX);

	$scope.map = map;
})

.controller('ChatsCtrl', function($scope, Chats) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
		Chats.remove(chat);
	}
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
});
