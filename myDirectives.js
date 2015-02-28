var app = angular.module('myDirectives', []);

app.directive('pending', function($q) {

	return {
		restrict: 'AE',
		//template: "<img src='http://a.deviantart.net/avatars/s/c/scwishyfishy.gif?4'></img>",
		scope: {
			waiting: '&'
		},
		link: function(scope, elem, attrs) {
			//console.log(scope);
			//console.log(elem);
			//console.log(attrs);
			elem.bind('click', function(response) {
				//console.log(elem);
				var deferred = $q.defer();
				elem[0].innerHTML = '<img src="http://a.deviantart.net/avatars/s/c/scwishyfishy.gif?4"></img>';
				elem.prop('disabled', true);	
				scope.waiting().then(function(response) {
						elem.text('Submit');
						elem.removeAttr('disabled');
						deferred.resolve(response);
						console.log(response);
				});
				return deferred.promise;
			});

		}
	};

});

app.directive('notify', function($q) {
	return {
		restrict: 'AE',
		scope: {
			inform: '&',
			title: '=',
			body: '=',
			icon: '='
		},
		link: function(scope, elem, attrs) {
			var Notification = window.Notification || window.mozNotification || window.webkitNotification;
    		Notification.requestPermission(function (permission) {
                console.log(permission);
	            if (permission === 'granted') {
	            	var notification = new Notification(scope.title, {scope.body, scope.icon});
		            elem.bind('click', function() {
		            	alert(notification);
	            	});
	            }
            });
		}
	}
});