var app = angular.module('pending', []);

app.directive('pending', function($q) {

	return {
		restrict: 'AE',
		scope: {
			pending: '&'
		},
		link: function(scope, elem, attrs) {
			elem.bind('click', function() {
				var deferred = $q.defer();
				elem.text('Pending...');
				elem.prop('disabled', true);	
				scope.pending().then(function(response) {
					setTimeout(function() {
						elem.text('Success!');
					}, 1000);
					setTimeout(function() {
						elem.text('Submit');
						elem.removeAttr('disabled', false);
						console.log(response);
					}, 1500);
				});
				return deferred.promise;
			});

		}
	};

});