define( [	"qlik", 
			"jquery",
			"text!./template.html",
			"text!./css/myStyle.css",
		//	"./js/DataLineage.Services",
			"./js/DataLineage.controller",
			"./js/settings/GeneralSettings",						// Variable with the General settings
			"./js/settings/ImageSettings",
			"./js/getHyperCube",
				// Bootstrap File
			//"./bootstrap-3.3.7-dist/js/bootstrap",
			//"text!./bootstrap-3.3.7-dist/css/bootstrap.min.css"	
						
		],
	function ( qlik, $, template, boot,cssContent ) {
		"use strict";

		$( '<style>' ).html( boot ).appendTo( 'head' ); // Adding scoped bootstrap to head			
		$( '<style>' ).html( cssContent ).appendTo( 'head' ); // Adding scopped style to head					
		$( '<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css">' ).appendTo( 'head' ); // Font Awesome CDN		
		$( '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">' ).appendTo( 'head' ); // Font Awesome CDN		
		$( '<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js">' ).appendTo( 'body' ); // Bootstrap.js CDN

		var AdditionalInfo;
		var me = {
			template: template,
			initialProperties: {
				version: 1.2,
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [{
						qWidth: 8,
						qHeight: 1000
					}]
				}
			},



			definition : {
				type : "items",
				component : "accordion",
				items : {
					dimensions : {
						uses : "dimensions",
						min : 1,
						max : 7
					},
					measures : {
						uses : "measures",
						min : 0
					},
					sorting : {
						uses : "sorting"
					},

					settings : {},
					image : {}
				}
			},

			support: {
				snapshot: true,
				export: true,
				exportData: false
			}


		};	

		// Get Engine API app for Selections
		me.app = qlik.currApp(this);

		me.definition.items.settings = generalSettings;
		me.definition.items.image = imageSettings;


		me.controller = mainController;

		me.paint = function($element,layout) {
			//setup scope.table
			
			var Metadata = splitObject(layout.qHyperCube.qDataPages[0].qMatrix);
			console.log(layout);

			me.app.createCube(myHyperCube,Details);
			var _this=this;

			function Details(reply, app){
				makeAdditionalInfo(reply,function(replay){
				_this.$scope.AdditionalInfo = replay;
				});
			}	


					this.$scope.realSize = getElementContentWidth(document.getElementById("Line"));
					this.$scope.elePosition = makeElementPosition(this.$scope.realSize, Metadata[0], layout.settings,layout.qHyperCube.qDimensionInfo);
					this.$scope.arrowPosition = makeArrowsPosition(Metadata[1],this.$scope.elePosition);
					console.log(this.$scope.arrowPosition);


					if ( !this.$scope.table ) {
						this.$scope.table = qlik.table( this );
					}

					return qlik.Promise.resolve();	

/*
			function setAddInfo(){
				this.$scope.additionalInfo = AdditionalInfo;
				console.log(AdditionalInfo);
				console.log(this.$scope.additionalInfo);
			}
*/
			//this.$scope.settings = layout.settings;
		};

		

		return me;
	});

