var myFunc = function ( $scope ) {
				//add your rendering code here
				$scope.html = "Ciao Mondo";
				console.log("Sono nel controller!");
				console.log($scope.table);
			}

var mainController = ['$scope', myFunc ];
