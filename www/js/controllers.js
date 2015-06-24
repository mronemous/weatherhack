angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, Filters) {

    $scope.$on('$ionicView.enter', function(e) {
        loadData();
    });


    var heatmap = null;
    //    // start PloyLine sample
    //    var polyLineData = [
    //        new google.maps.LatLng(37.773379, -122.440542),
    //        new google.maps.LatLng(37.769308, -122.408098),
    //        new google.maps.LatLng(37.754516, -122.409299),
    //        new google.maps.LatLng(37.752208, -122.44758),
    //        new google.maps.LatLng(37.773379, -122.440542)
    //    ];
    //    var polyPath = new google.maps.Polyline({
    //        path: polyLineData,
    //        strokeColor: "#000000",
    //        strokeOpacity: 0.8,
    //        strokeWeight: 2
    //    });
    //
    //    polyPath.setMap(map);
    //    // end PloyLine sample

    //    google.maps.event.addListener(marker, 'click', function() {
    //
    //
    //    });


    function loadData(bounds) {

        //alert(JSON.stringify(bounds));			
			
        var filters = Filters.all();

				$scope.title = getTitle(filters);
			
        $http({
            url: CONFIG.peopleApi + '/index.php',
            method: "GET",
            params: getParams(filters)
        }).then(function(resp) {
            console.log('Success', resp);

            refreshMap(resp.data);

        }, function(err) {
            console.error('ERR', err);

        });
    }					
	
		function getParams(filters) {
			var params = {};
			for(var i=0; i < filters.length; i++) {
				if(filters[i].value) {
					params[filters[i].param] = filters[i].value;
				}
			}
			return params;
		}
	
		function getTitle(filters) {
		
				var title = [];

				for(var i=0; i < filters.length; i++) {
					if(filters[i].value) { 
						title.push(filters[i].name); 
					}
				}

				if(title.length == 0) { title.push("Map");}
				return title.join(", ");
		}
	
    function refreshMap(data) {

        var heatData = [];
        for (var i = 0; i < data.length; i++) {
            heatData.push(new google.maps.LatLng(data[i][1], data[i][0]));
        }

        if (heatmap != null) {
            heatmap.setMap(null);
		}
		
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatData,
            radius: 20,
            opacity: 0.4
        });
        heatmap.setMap(map);
    }

	//33.862100, Longitude = -84.687900
	
    var atlanta = new google.maps.LatLng(33.862100, -84.687900);
    var mapOptions = {
        center: atlanta,
        zoom: 5,
        scaleControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	google.maps.event.addListener(map, 'idle', (function() {
        //loadData(map.getBounds());	
    }));


	// --------------
	// Only do this when in scenario mode
	
	var drawingManager = new google.maps.drawing.DrawingManager({
			// drawingMode: google.maps.drawing.OverlayType.POLYGON,
			// Set this when user is expected to draw
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER,
			drawingModes: [
				google.maps.drawing.OverlayType.POLYGON,
			]
			},
		});
		drawingManager.setMap(map);
		
		google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
			var points = [];
			console.log(polygon);
			polygon.getPath().forEach(function(x){
				points.push([x.lng(), x.lat()]);
			});
			console.log(JSON.stringify(points));
		});
	// 
	// ------------

    var marker = new google.maps.Marker({
        position: atlanta,
        map: map,
        title: 'Uluru (Ayers Rock)'
    });

    var radarLayer = new google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {

            //				// convert the tile into a quad key
            //				var quadKey = "";
            //				for (var level = zoom; level > 0; level--) {
            //						var mask = 1 << (level-1);
            //
            //						var xMask = (tile.x & mask) != 0;
            //						var yMask = (tile.y & mask) != 0;
            //						if (xMask && yMask) {
            //								quadKey += '3';
            //						} else if (yMask) {
            //								quadKey += '2';
            //						}
            //						else if (xMask) {
            //								quadKey += '1';
            //						} else {
            //								quadKey += '0';
            //						}
            //
            //				}

            //return 'http://hackathon.weather.com/Maps/imgs/radar/' + '201506240150' + '/' + quadKey + '.png';
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/" + zoom + "/" + tile.x + "/" + tile.y + ".png?" + (new Date()).getTime();

        },
        tileSize: new google.maps.Size(256, 256),
        opacity: 0.60,
        name: 'NEXRAD',
        isPng: true,
    });
    map.overlayMapTypes.push(radarLayer);

    $scope.map = map;

})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FilterCtrl', function($scope, Filters) {
    $scope.filters = Filters.all();
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});