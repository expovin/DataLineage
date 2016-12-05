
var mainController = ['$scope', function ( $scope ) {

	$scope.Table={};
	$scope.pathColor = "black";

	$scope.writeTable = function(a){
		console.log(a.ele.Name);
		$scope.Table.ObjName = a.ele.Name;
		$scope.AddInfo = $scope.AdditionalInfo[a.ele.Name];
		console.log($scope.AddInfo);
		$('#collapseExample').collapse('show');
		$scope.pathColor = "red";


	}

	$scope.cleanTable = function(a){
		console.log("Mouse Exit");
		$scope.Table = {};
		$('#collapseExample').collapse('hide');
		$scope.pathColor = "black";
	}
	//me.app.createCube(myHyperCube,Details);

}];



function makeAdditionalInfo(reply,callback) {
	var outFields = {};
	for(var fields in reply.qHyperCube.qDataPages[0].qMatrix){
		for(var field in reply.qHyperCube.qDataPages[0].qMatrix[fields]){
		
			if(field == 0){
				var campo = reply.qHyperCube.qDataPages[0].qMatrix[fields][field].qText;
				var outField = {};
			}
			else {
				var FieldName = reply.qHyperCube.qDimensionInfo[field].qFallbackTitle; 
				var FieldValue = reply.qHyperCube.qDataPages[0].qMatrix[fields][field].qText;

				var obj={};
				obj[FieldName] = FieldValue
				/*
				if(!outField[campo])
					outField[campo] = {};
				*/
				outField[FieldName] = FieldValue;

			}
			
		}
		outFields[campo]=outField;
	}
	//return(reply);
	callback(outFields);
}

 function getElementContentWidth(element) {

  var style = window.getComputedStyle(element);
  return {'width' : style.width, 'height':style.height};
}

function splitObject(matrix){

	var nexMatrix=[];
	var arrowsMatrix=[];
	for(var i=0; i<matrix[0].length; i++ )
		nexMatrix.push([]);

	//console.log(matrix);
	for(ele in matrix){
		for (f in matrix[ele]){
			var found = jQuery.inArray(matrix[ele][f].qText, nexMatrix[f]);
			if (found == -1) {
				nexMatrix[f].push(matrix[ele][f].qText);
			}
			if(f>0){
				found = jQuery.inArray(matrix[ele][f-1].qText+"^"+matrix[ele][f].qText, arrowsMatrix);			
				if (found == -1) {
					arrowsMatrix.push(matrix[ele][f-1].qText+"^"+matrix[ele][f].qText);
				}
			}
			
		}
	}
	return [
				nexMatrix,
				arrowsMatrix
			];

}

function calcoloNuovoPuntoFinale(x1, y1, x2, y2){
	var x = x2 - 20;

	var n1 = y2 -y1;
	var n2 = x2 - x1;
	var n3 = (y1*n2)*-1;
	var n4 = (x1*n1)*-1;
	var m = (y2-y1)/(x2-x1);

    if(x1 == x2)
    	y=y1-5;
    else    	
	    y = ((x * m) - (m*x1)) +y1;

	return([x,y]);
}

function makeArrowsPosition(arrows, elements){


	var lookup = {};
	var links = [];
	for (var i = 0, len = elements.length; i < len; i++) {
	    lookup[elements[i].Name] = {'backPoint' : elements[i]['backPoint'], 'forwardPoint':elements[i]['forwardPoint'],Node:elements[i].Name};
	}
//	console.log(lookup);

//	console.log(elements);
	for(arrow in arrows){
		var Ele=arrows[arrow].split("^");
		var EleFrom=Ele[0];
		var EleTo=Ele[1];
		//console.log("From: "+EleFrom+" To: "+ EleTo);

		if((EleTo != '-') && (EleFrom != '-'))
		{
			nuoveCoord = calcoloNuovoPuntoFinale(lookup[EleFrom].forwardPoint.wPos, lookup[EleFrom].forwardPoint.hPos, lookup[EleTo].backPoint.wPos,  lookup[EleTo].backPoint.hPos);
			var x = nuoveCoord[0];
			var y = nuoveCoord[1];

			var link=[lookup[EleFrom].forwardPoint.wPos, lookup[EleFrom].forwardPoint.hPos, x,  y, lookup[EleFrom].Node, lookup[EleTo].Node  ];
			//var link=[lookup[EleFrom].forwardPoint.wPos, lookup[EleFrom].forwardPoint.hPos, lookup[EleTo].backPoint.wPos,  lookup[EleTo].backPoint.hPos];
		//	console.log("Coordinates:");
		//	console.log(link);
			links.push(link);
		}
		
	}
	console.log(links);
	return(links);
}


function makeElementPosition(boxDimension, Elements, settings, qDimensionInfo){

	var elements=[];
	var element={};
	var hDistance=[];

	var marginRight=settings.image.margin.right;
	var marginLeft=settings.image.margin.left;
	var marginTop=settings.image.margin.top;
	var marginBottom=settings.image.margin.bottom;


	var height = boxDimension.height.substring(0,boxDimension.height.indexOf("px"));
	var width = boxDimension.width.substring(0,boxDimension.width.indexOf("px"));

	var imgHeight = height - marginTop - marginBottom;
	var imgWidth = width - marginRight - marginLeft;

	//console.log("width :"+width+" width:"+width+" marginRight:"+marginRight+" marginLeft"+marginLeft);


	wDistance = imgWidth / Elements.length;

	//console.log("wDistance = "+wDistance+" imgWidth : "+imgWidth+" Elements.length :"+Elements.length);
	//console.log("marginRight : "+marginRight);
	for(ele in Elements){
		hDistance[ele] = imgHeight / Elements[ele].length;
	}


	var countW=0;
	
	for(ele in Elements){
		var countH=0;


		for(var field in Elements[ele]) {
			backPoint=[];
			forwardPoint=[];
			if(Elements[ele][field] == '-')
				console.log("Trovato Elemento nullo :"+Elements[ele][field]);
			else
			{
			element['Name'] = Elements[ele][field];

			
			switch(qDimensionInfo[ele].qFallbackTitle){
				case "L0":
					element['icon'] = "http://localhost:4848/extensions/test/Source.PNG";
					break;
				case "L1":
					element['icon'] = "http://localhost:4848/extensions/test/QlikSenseApp.PNG";
					break;	
				case "L2":
					element['icon'] = "http://localhost:4848/extensions/test/Table.PNG";
					break;
				case "L3":
					element['icon'] = "http://localhost:4848/extensions/test/Field.PNG";
					break;
				case "L4":
					console.log(element['Name'].substring(0,1));
				    if(element['Name'].substring(0,1)=="D") 
						element['icon'] = "http://localhost:4848/extensions/test/Dimension.PNG";
					else
						element['icon'] = "http://localhost:4848/extensions/test/Expressions.PNG";
					break;	

				case "L5":
					element['icon'] = "http://localhost:4848/extensions/test/Sheet.PNG";
					break;	
				case "L6":
					element['icon'] = "http://localhost:4848/extensions/test/Stories.PNG";
					break;					
			}			

			

			element['hPos'] = (countH * hDistance[ele])+marginTop;
			element['wPos'] = ((countW * wDistance) + marginLeft);

			// BackPoint attach
			backPoint['hPos'] = element['hPos']+25;
			backPoint['wPos'] = element['wPos'];
			element['backPoint']=backPoint;

			//forwardPoint
			forwardPoint['hPos'] = element['hPos']+25
			forwardPoint['wPos'] = element['wPos']+50;
			element['forwardPoint']=forwardPoint;

			elements.push(element);
			
			
			//console.log('countH :'+countH+' countW:'+countW);
			//console.log(element);
			element={};
			countH +=1;
		}
		
	}
		countW +=1;

	}
	//console.log(elements);
	return elements;
}
