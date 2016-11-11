var myFunc = function ( $scope ) {
				//add your rendering code here
				$scope.html = "Hello World";
			}

var mainController = ['$scope', myFunc ];

 function getElementContentWidth(element) {

  var style = window.getComputedStyle(element);
  return {'width' : style.width, 'height':style.height};
}

function splitObject(matrix){

	var nexMatrix=[];
	for(var i=0; i<matrix[0].length; i++ )
		nexMatrix.push([]);

	for(ele in matrix){
		for (f in matrix[ele]){
			var found = jQuery.inArray(matrix[ele][f].qText, nexMatrix[f]);
			if (found == -1) {
				nexMatrix[f].push(matrix[ele][f].qText);
			}

		}
	}
	return nexMatrix;

}

function makeElementPosition(boxDimension, Elements, settings){

	var elements=[];
	var element={};
	var hDistance=[];

	console.log(settings);

	var marginRight=settings.image.margin.right;
	var marginLeft=settings.image.margin.left;
	var marginTop=settings.image.margin.top;
	var marginBottom=settings.image.margin.bottom;


	var height = boxDimension.height.substring(0,boxDimension.height.indexOf("px"));
	var width = boxDimension.width.substring(0,boxDimension.width.indexOf("px"));

	var imgHeight = height - marginTop - marginBottom;
	var imgWidth = width - marginRight - marginLeft;

	console.log("width :"+width+" width:"+width+" marginRight:"+marginRight+" marginLeft"+marginLeft);


	wDistance = imgWidth / Elements.length;

	console.log("wDistance = "+wDistance+" imgWidth : "+imgWidth+" Elements.length :"+Elements.length);
	console.log("marginRight : "+marginRight);
	for(ele in Elements){
		hDistance[ele] = imgHeight / Elements[ele].length;
	}


	var countW=0;
	for(ele in Elements){
		var countH=0;
		for(field in Elements[ele]) {

			element['Name'] = Elements[ele][field];
			element['hPos'] = (countH * hDistance[ele])+marginTop;
			element['wPos'] = (countW * wDistance) + marginLeft;
			elements.push(element);
			element={};
			countH +=1;
		}
		countW +=1;
	}
	console.log(elements);
	return elements;
}
