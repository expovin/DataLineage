var varLvl5Data = {
	"qInitialDataFetch": [
		{
			"qHeight": 1000,
			"qWidth": 7
		}
	],
	"qDimensions": [
		{
			"qDef": {
				"qFieldDefs": [
					"%KeyLibraryObjectUsage"
				],
			    "qFieldLabels": [
			      "%KeyLibraryObjectUsage"
			    ]
			},
			"qNullSuppression": true
		},
		{
			"qDef": {
				"qFieldDefs": [
					"Library Title"
				],
			    "qFieldLabels": [
			      "Title"
			    ],
			    "qSortCriterias": [
			      {
			        "qSortByAscii": 1
			      }
			    ]
			},
			"qNullSuppression": true
		},
		{
			"qDef": {
				"qFieldDefs": [
					"Library Type"
				]
			}
		},
		{
			"qDef": {
				"qFieldDefs": [
					"Library Description"
				]
			}
		},
		{
			"qDef": {
				"qFieldDefs": [
					"Library Id"
				]
			}
		}
	],
	"qMeasures": [
		{
			"qDef": {
				"qDef": "Count([Field Name])",
				"qLabel": "Number of Fields in Library Item"
			}
		},
		{
			"qDef": {
				"qDef": "Count([Library in Object Used Id])",
				"qLabel": "Number of Times Library Item is Used"
			}
		}
	],
	"qSuppressZero": false,
	"qSuppressMissing": false,
	"qMode": "S",
	"qInterColumnSortOrder": [],
	"qStateName": "$"
}