define( [	"qlik", 
			"text!./template.html",			
			"./js/DataLineage.controller"],
	function ( qlik, template ) {

		console.log(mainController);
		return {
			template: template,
			support: {
				snapshot: true,
				export: true,
				exportData: false
			},
			paint: function () {
				return qlik.Promise.resolve();
			},
			controller : mainController
		};

	});

