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

	console.log( Elements.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
	var elements=[];
	var element={};

	var height = boxDimension.height.substring(0,boxDimension.height.indexOf("px"));
	var width = boxDimension.width.substring(0,boxDimension.width.indexOf("px"));
	var hDistance = height / Elements.qHyperCube.qDataPages[0].qMatrix.length;

	var count=0;
	for(ele in Elements.qHyperCube.qDataPages[0].qMatrix){
		
		console.log( Elements.qHyperCube.qDataPages[0].qMatrix[ele][0].qText);
		element['Name'] = Elements.qHyperCube.qDataPages[0].qMatrix[ele][0].qText;
		element['hPos'] = count * hDistance;
		elements.push(element);
		element={};
		count +=1;
	}

	console.log(elements);
	return elements;
}
