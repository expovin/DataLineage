


var mainController = ['$scope', function ( $scope ) {

	$scope.Table={};

	$scope.makeASelection = function(){
//		console.log("Click!");
		console.log(this);
		var Field='Lineage Level '+this.ele.Level;

			switch(this.ele.Level){
				case 0:
					Field="libName";					
					break;
				case 1:
					Field="[Document Id]";
					break;	
				case 2:
					Field="[%KeyTable]";
					break;
				case 3:
					Field="[Field Id]";
					break;
				case 4:
					Field="[%KeyLibraryObjectUsage]";
					break;	

				case 5:
					Field="[Sheet Id]";
					break;
				case 6:
					Field="[Sheet Object Id]";
					break;	
				case 7:
					Field="[Story Id]";
					break;					
			}		


		
		console.log("Field : "+Field+" Value : "+this.ele.Name);
		console.log($scope.QlikApp.field(Field));

		$scope.QlikApp.field(Field).selectValues([this.ele.Name], false);

	}


	$scope.writeTable = function(a){
	//	console.log( $scope.arrowPosition);
		$scope.Table.ObjName = $scope.MoreInfo[a.ele.Level][a.ele.Name].Title || "No Title";
		$scope.AddInfo = $scope.MoreInfo[a.ele.Level][a.ele.Name];
		$('#collapseExample').collapse('show');

		$scope.arrowPosition = colorPath(a.ele.Name,$scope.arrowPosition,0);

	}

	$scope.cleanTable = function(a){
		$scope.Table = {};
		$('#collapseExample').collapse('hide');

		for(var arrow in $scope.arrowPosition){
			$scope.arrowPosition[arrow][6]='#afafaf';
		}
	}

}];


var colorPath  = function myself  (elemName,arrowPosition, step){

	if((step>6) || (step == undefined))
		return ;

	for(var arrow in arrowPosition){
		if((arrowPosition[arrow][4] == elemName) || (arrowPosition[arrow][5] == elemName)) {
			arrowPosition[arrow][6]='#6bb344';
			step = step + 1;
			myself(arrowPosition[arrow][4],arrowPosition,step);
		}
	}
	return (arrowPosition);
}


function makeAdditionalInfo(reply,callback) {
	var outFields = {};


	var numDimensioni = reply.qHyperCube.qDimensionInfo.length;
	var numMisure = reply.qHyperCube.qMeasureInfo.length;

	for(var fields in reply.qHyperCube.qDataPages[0].qMatrix){
		for(var field in reply.qHyperCube.qDataPages[0].qMatrix[fields]){
		
			if(field == 0){
				var campo = reply.qHyperCube.qDataPages[0].qMatrix[fields][field].qText;
				var outField = {};
			}
			else {
				if(field<numDimensioni){
					var FieldName = reply.qHyperCube.qDimensionInfo[field].qFallbackTitle; 
					var FieldValue = reply.qHyperCube.qDataPages[0].qMatrix[fields][field].qText;
					if( (FieldName.indexOf("Name")>0) || (FieldName.indexOf("Title")>0))
						var Title = FieldValue;
				}
				else {
					var FieldName = reply.qHyperCube.qMeasureInfo[field-numDimensioni].qFallbackTitle; 
					var FieldValue = reply.qHyperCube.qDataPages[0].qMatrix[fields][field].qText;
				}

				var obj={};
				obj[FieldName] = FieldValue;
				/*
				if(!outField[campo])
					outField[campo] = {};
				*/
				outField[FieldName] = FieldValue;
				outField['Title'] = Title;

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
				if ((found == -1) && ((matrix[ele][f-1].qText != "-") || (matrix[ele][f].qText != "-")) ) {
				//	console.log(matrix[ele][f-1].qText+" <<< ---- >>>>"+matrix[ele][f].qText);
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
	//	console.log(elements[i]);
	    lookup[elements[i].Name] = {'backPoint' : elements[i]['backPoint'], 'forwardPoint':elements[i]['forwardPoint'],'Node':elements[i].Name,'Level':elements[i].Level};
	}
//	console.log("Lookup");
//	console.log(lookup);

//	console.log(arrows);
	for(arrow in arrows){
		var Ele=arrows[arrow].split("^");
		var EleFrom=Ele[0];
		var EleTo=Ele[1];
		


		if((EleTo != '-') && (EleFrom != '-'))
		{

			var key =  EleFrom+"^"+EleTo;
			var hash = key.hashCode().toString(16);
			var coords=[];
		}
		else if(arrow == 3)
		{

				EleTo=arrows[4].split("^")[1];
		//		console.log('EleFrom : '+EleFrom+" - ElementTo :"+EleTo+" idx :"+arrow);
		}
		if(((EleTo != '-') && (EleFrom != '-')) || (arrow == 3)) {
		//	console.log('EleFrom : '+EleFrom+" - ElementTo :"+EleTo+" idx :"+arrow);
			nuoveCoord = calcoloNuovoPuntoFinale(lookup[EleFrom].forwardPoint.wPos, lookup[EleFrom].forwardPoint.hPos, lookup[EleTo].backPoint.wPos,  lookup[EleTo].backPoint.hPos);
			var x = nuoveCoord[0];
			var y = nuoveCoord[1];

			var link=[lookup[EleFrom].forwardPoint.wPos, lookup[EleFrom].forwardPoint.hPos, x,  y, lookup[EleFrom].Node, lookup[EleTo].Node,'#afafaf'];
			links.push(link);
		}


	}
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

//	console.log(Elements);

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
			if(Elements[ele][field] == '-'){
				console.log("Trovato Elemento nullo :");

			}
			else
			{
				element['Name'] = Elements[ele][field];

				
				switch(qDimensionInfo[ele].qFallbackTitle){
					case "Lineage Level 1":
						element['icon'] = "/extensions/datalineage/img/Source.PNG";
						element['Level'] = 0;
						break;
					case "Lineage Level 2":
						element['icon'] = "/extensions/datalineage/img/QlikSenseApp.PNG";
						element['Level'] = 1;
						break;	
					case "Lineage Level 3":
						element['icon'] = "/extensions/datalineage/img/Table.PNG";
						element['Level'] = 2;
						break;
					case "Lineage Level 4":
						element['icon'] = "/extensions/datalineage/img/Field.PNG";
						element['Level'] = 3;
						break;
					case "Lineage Level 5":
					//	console.log("RVR look!", element['Name'].substring(0,1));
						element['Level'] = 4;
					    if(element['Name'].substring(0,1)=="D") 
							{
								element['icon'] = "/extensions/datalineage/img/Dimension.PNG";
							//	console.log("should pain dim");
							}
						else if (element['Name'].substring(0,1)=="M") 
							{
								element['icon'] = "/extensions/datalineage/img/Expression.PNG";
							//	console.log("should pain measure");
							}
						else// (element['Name'].substring(0,1)=="V") 
							{
								element['icon'] = "/extensions/datalineage/img/ItemLibrary.PNG";
							//	console.log("should pain viz");
							}
						break;	

					case "Lineage Level 6":
						element['icon'] = "/extensions/datalineage/img/Sheet.PNG";
						element['Level'] = 5;
						break;
					case "Lineage Level 7":
						element['icon'] = "/extensions/datalineage/img/Visualization.PNG";
						element['Level'] = 6;
						break;	
					case "Lineage Level 8":
						element['icon'] = "/extensions/datalineage/img/StoryVisualization.PNG";
						element['Level'] = 7;
						break;					
				}			

			

				element['hPos'] = (countH * hDistance[ele])+marginTop;
				element['wPos'] = ((countW * wDistance) + marginLeft);
				

				// BackPoint attach
				backPoint['hPos'] = element['hPos']+15;
				backPoint['wPos'] = element['wPos'];
				element['backPoint']=backPoint;

				//forwardPoint
				forwardPoint['hPos'] = element['hPos']+15
				forwardPoint['wPos'] = element['wPos']+35;
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
	return elements;
}
