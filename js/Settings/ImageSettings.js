var imageSettings = {
//		uses : "settings",
			type: "items",
			label: "Settings",
			items : {
				image: {
					type: "items",
					label: "Image",
					items : {
						marginLeft: {
							type: "number",
							expression: "optional",
							label: "Image margin Left",
							defaultValue: 20,
							ref: "settings.image.margin.left"
						},

						marginRight: {
							type: "number",
							expression: "optional",
							label: "Image margin Right",
							defaultValue: 20,
							ref: "settings.image.margin.right"
						},

						marginTop: {
							type: "number",
							expression: "optional",
							label: "Image margin Top",
							defaultValue: 20,
							ref: "settings.image.margin.top"
						},

						marginBottom: {
							type: "number",
							expression: "optional",
							label: "Image margin Bottom",
							defaultValue: 20,
							ref: "settings.image.margin.bottom"
						},
						ObjLimits: {
							type: "number",
							expression: "optional",
							label: "Maximum number of objects",
							defaultValue: 500,
							min : 1,
							max : 1000,
							ref: "settings.image.limits.maxObjs"
						},
						warnLimits : {
							component: "text",
							label : "*hard limited to 1000"
						},
						warnTitle: {
							type: "string",
							expression: "optional",
							label: "Warning Title",
							defaultValue: "Please make more selections",
							ref: "settings.image.limits.warnTitle"
						},
						MyTextarea: {
							label:"Warning Text",
							component: "textarea",
							rows: 7,//the amount of rows in the textarea component (default is 3)
							maxlength: 100,//will not allow more than 100 characters
							defaultValue: "Please consider to reduce the number of objects in your selection. A bug number of objects deal to hight hardware resource consumption",
							ref: "settings.image.limits.warnText"
						}
					
					}
				}
			}				
		}