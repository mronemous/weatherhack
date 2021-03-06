angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
				
.factory('Filters', function() {
	var filters = [
		{ name: "Lives Alone", value: false, param: "livesAlone"},
		{ name: "Without Car", value: false, param: "withoutCar"},
		{ name: "Over 65", value: false, param: "over65"},
		{ name: "Poverty", value: false, param: "poverty"},
		{ name: "Chronic Medical", value: false, param: "chronicMedical"},
		{ name: "Requires Electrical", value: false, param: "requiresElectrical"},
		{ name: "Limited Communications", value: false, param: "limitedCommunications"},
		{ name: "Heart Disease", value: false, param: "heartDisease"},
		{ name: "Lung Disease", value: false, param: "lungDisease"},
		{ name: "Physical Disability", value: false, param: "physicalDisability"},
		{ name: "Raising Children", value: false, param: "raisingChildren"}
	];
	
	return {
		all: function() {
      return filters;
    }
	};
})

.factory('Scenarios', function() {
	var scenarios = [
		{ name: "Hurricane", value: false, param: "livesAlone"},
		{ name: "Earthquake", value: false, param: "withoutCar"},
		{ name: "Tornado", value: false, param: "over65"}
	];
	
	return {
		all: function() {
      return scenarios;
    }
	};
});
