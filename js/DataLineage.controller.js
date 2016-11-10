var myFunc = function ( $scope ) {
				//add your rendering code here
				$scope.html = "Hello World";
			}

var mainController = ['$scope', myFunc ];

 function getElementContentWidth(element) {

  var style = window.getComputedStyle(element);
  return {'width' : style.width, 'height':style.height};
}


function makeElementPosition(boxDimension, Elements){
	console.log(boxDimension);
	console.log(Elements);

	return 0;
}
