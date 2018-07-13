var varLvl7Data = {
	"qInitialDataFetch": [
		{
			"qHeight": 1000,
			"qWidth": 4
		}
	],
	"qDimensions": [
		{
			"qDef": {
				"qFieldDefs": [
					"Sheet Object Id"
				],
			    "qFieldLabels": [
			      "Sheet Object Id"
			    ]
			},
			"qNullSuppression": true
		},
		{
			"qDef": {
				"qFieldDefs": [
					"Sheet Object Title"
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
		}
	],
	"qMeasures": [
		{
			"qDef": {
				"qDef": "[Sheet Object Visualization Type]&': '&[Sheet Object Type]",
				"qLabel": "Sheet Object Type"
			}
		},
		{
			"qDef": {
				"qDef": "Avg([Sheet Object Load Time])",
				"qLabel": "Average Load Time"
			}
		}
	],
	"qSuppressZero": false,
	"qSuppressMissing": false,
	"qMode": "S",
	"qInterColumnSortOrder": [],
	"qStateName": "$"
}