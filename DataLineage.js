define( [	"qlik", 
			"jquery",
			"text!./template.html",
			"text!./css/myStyle.css",
			"./js/DataLineage.controller",
			"./js/DataLineage.Services",
			"./js/settings/GeneralSettings"						// Variable with the General settings
						
		],
	function ( qlik, $, template, cssContent ) {
		"use strict";

		var me = {
			template: template,
			initialProperties: {
				version: 1.2,
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [{
						qWidth: 4,
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
						min : 1
					},
					measures : {
						uses : "measures",
						min : 1
					},
					sorting : {
						uses : "sorting"
					},
					settings : {}
				}
			},

			support: {
				snapshot: true,
				export: true,
				exportData: false
			}


		};	

		// Get Engine API app for Selections
	//	me.app = qlik.currApp(this);

		me.definition.items.settings = generalSettings;


		me.paint = function($element,layout) {
			//setup scope.table

			this.$scope.settings = layout.settings;
			this.$scope.realSize = getElementContentWidth(document.getElementById(Line));
		//	this.$scope.elePosition = makeElementPosition(this.$scope.realSize, qlik.table( this ));

			if ( !this.$scope.table ) {
				this.$scope.table = qlik.table( this );
			}

			return qlik.Promise.resolve();			
			
		};

		me.controller = mainController;

		return me;
	});

