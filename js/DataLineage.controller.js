
var mainController = ['$scope', function ( $scope ) {

	$scope.Table={};


	$scope.writeTable = function(a){
		console.log(a.ele.Name);
		$scope.Table.ObjName = a.ele.Name;
		$scope.AddInfo = $scope.AdditionalInfo[a.ele.Name];
		console.log($scope.AddInfo);
		$('#collapseExample').collapse('show');

		for(var arrow in $scope.arrowPosition){
			$scope.arrowPosition[arrow][6]='#333';
		}

		$scope.arrowPosition = colorPath(a.ele.Name,$scope.arrowPosition,0);

	}

	$scope.cleanTable = function(a){
		console.log("Mouse Exit");
		$scope.Table = {};
		$('#collapseExample').collapse('hide');

		for(var arrow in $scope.arrowPosition){
			$scope.arrowPosition[arrow][6]='black';
		}

	}
	//me.app.createCube(myHyperCube,Details);

}];


var colorPath  = function myself  (elemName,arrowPosition, step){

	if((step>6) || (step == undefined))
		return ;

	for(var arrow in arrowPosition){
		if((arrowPosition[arrow][4] == elemName) || (arrowPosition[arrow][5] == elemName)) {
			arrowPosition[arrow][6]='red';
			step = step + 1;
			myself(arrowPosition[arrow][4],arrowPosition,step);
		}
	}
	return (arrowPosition);
}


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


String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


function makeArrowsPosition(arrows, elements){


	var lookup = {};
	var links = [];
	for (var i = 0, len = elements.length; i < len; i++) {
	    lookup[elements[i].Name] = {'backPoint' : elements[i]['backPoint'], 'forwardPoint':elements[i]['forwardPoint'],Node:elements[i].Name};
	}
//	console.log("Lookup");
//	console.log(lookup);

//	console.log(elements);
	for(arrow in arrows){
		var Ele=arrows[arrow].split("^");
		var EleFrom=Ele[0];
		var EleTo=Ele[1];
		//console.log("From: "+EleFrom+" To: "+ EleTo);


		if((EleTo != '-') && (EleFrom != '-'))
		{
			var key =  EleFrom+"^"+EleTo;
			var hash = key.hashCode().toString(16);
			var coords=[];


				nuoveCoord = calcoloNuovoPuntoFinale(lookup[EleFrom].forwardPoint.wPos, lookup[EleFrom].forwardPoint.hPos, lookup[EleTo].backPoint.wPos,  lookup[EleTo].backPoint.hPos);
				var x = nuoveCoord[0];
				var y = nuoveCoord[1];

				var link=[lookup[EleFrom].forwardPoint.wPos, lookup[EleFrom].forwardPoint.hPos, x,  y, lookup[EleFrom].Node, lookup[EleTo].Node,'black'];

				//coords[hash] = link
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
					element['icon'] = "http://localhost:4848/extensions/DataLineage/img//Source.PNG";
					break;
				case "L1":
					element['icon'] = "http://localhost:4848/extensions/DataLineage/img//QlikSenseApp.PNG";
					break;	
				case "L2":
					element['icon'] = "http://localhost:4848/extensions/DataLineage/img//Table.PNG";
					break;
				case "L3":
					element['icon'] = "http://localhost:4848/extensions/DataLineage/img//Field.PNG";
					break;
				case "L4":
					console.log(element['Name'].substring(0,1));
				    if(element['Name'].substring(0,1)=="D") 
						element['icon'] = "http://localhost:4848/extensions/DataLineage/img/Dimension.PNG";
					else
						element['icon'] = "http://localhost:4848/extensions/DataLineage/img/Expressions.PNG";
					break;	

				case "L5":
					element['icon'] = "http://localhost:4848/extensions/DataLineage/img/Sheet.PNG";
					break;	
				case "L6":
					element['icon'] = "http://localhost:4848/extensions/DataLineage/img/Stories.PNG";
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
