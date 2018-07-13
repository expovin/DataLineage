var varLvl2Data =	{
	"qInitialDataFetch": [
			{
			"qHeight": 1000,
			"qWidth": 8
		}
	],
	"qDimensions": [
		{
			"qDef": {
				"qFieldDefs": [
					"Document Id"
				]
			},
			"qNullSuppression": false
		},
		{
			"qDef": {
				"qFieldDefs": [
					"Document Name"
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
					"Document Owner by UserId"
				]
			}
		},
		{
			"qDef": {
				"qFieldDefs": [
					"Stream Name"
				]
			}
		}
	],
	"qMeasures": [
		{
			"qDef": {
				"qDef": "if([Document Published Date]<>'1/1/1753', [Document Published Date],'Not Published')",
				"qLabel": "Published Date"
			},
			"qSortBy": {
				"qSortByNumeric": 1
			}
		},
		{
			"qDef": {
				"qDef": "num(sum([Document File Size])/1048576,'#,##0.00')&' Mb'",
				"qLabel": "Application Size"
			},
			"qSortBy": {
				"qSortByNumeric": 1
			}
		},
		{
			"qDef": {
				"qDef": "Count(distinct [Application User])",
				"qLabel": "Number of Users with Access"
			},
			"qSortBy": {
				"qSortByNumeric": 1
			}
		},
		{
			"qDef": {
				"qDef": "Sum([Table Number of Rows])",
				"qLabel": "Total Number of Rows"
			}
		}
	],
	"qSuppressZero": false,
	"qSuppressMissing": false,
	"qMode": "S",
	"qInterColumnSortOrder": [],
	"qStateName": "$"
}