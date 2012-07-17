function DetailView() {
	var self = Ti.UI.createView();
	//Design
	var bgColor = '#000'
	//Font
	var customFont = 'Hitchcock'; // use the friendly-name on iOS
	var diceFont = "Art'sPolyhedralDiceD6Pips"; // use the friendly-name on iOS
	if(Ti.Platform.osname=='android') {
   		// on Android, use the "base name" of the file (name without extension)
   		diceFont = "Art'sPolyhedralDiceD6Pips";
	} 
var tabGroup = Titanium.UI.createTabGroup();
var win1 = Titanium.UI.createWindow({
    title:'About',
    backgroundColor:bgColor
});
var tab1 = Titanium.UI.createTab({
    //icon:'tab1icon.png',
    title:'About',
    window:win1
});
var win2 = Titanium.UI.createWindow({
    title:'Relationships',
    backgroundColor:bgColor
});
var tab2 = Titanium.UI.createTab({
    //icon:'tab2icon.png',
    title:'Tab2',
    window:win2
});
var win3 = Titanium.UI.createWindow({
    title:'Needs',
    backgroundColor:bgColor
});
var tab3 = Titanium.UI.createTab({
    //icon:'tab1icon.png',
    title:'Needs',
    window:win3
});
var win4 = Titanium.UI.createWindow({
    title:'Locations',
    backgroundColor:bgColor
});
var tab4 = Titanium.UI.createTab({
    //icon:'tab2icon.png',
    title:'Locations',
    window:win4
});
var win5 = Titanium.UI.createWindow({
    title:'Objects',
    backgroundColor:bgColor
});
var tab5 = Titanium.UI.createTab({
    //icon:'tab1icon.png',
    title:'Objects',
    window:win5
});
//var win6 = Titanium.UI.createWindow({
    //title:'Insta-Setup',
    //backgroundColor:bgColor
//});
//var tab6 = Titanium.UI.createTab({
    //title:'Insta-Setup',
    //window:win6
//});
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);
//tabGroup.addTab(tab6);
// open tab group
tabGroup.open();
	//self.add(lbl);

	self.addEventListener('itemSelected', function(e) {
		//lbl.text = e.name+': $'+e.price;
		var tbl_data = [];
		var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,e.file);
		var xmltext = file.read().text;
		var doc = Ti.XML.parseString(xmltext);
		var playset = doc.getElementsByTagName("playset");
		var title = doc.getElementsByTagName("title").item(0).text;
		var author = doc.getElementsByTagName("author").item(0).text;
		var movies = doc.getElementsByTagName("movies").item(0).text;
		//var title = playset.item(0).getAttributes("title").item(0).text;
		Ti.API.info("XML Info: Title:" + title + " File:" + e.file)
		var lblName = Titanium.UI.createLabel({
			text:title,
			left: 10,
			//textAlign:'left',
			//width:'auto',
			//height:'auto'
		})
		var row = Titanium.UI.createTableViewRow();
		row.add(lblName);
		tbl_data.push(row);
		var lblAuthor = Titanium.UI.createLabel({
			text:author,
			left: 10,
			//textAlign:'left',
			//width:'auto',
			//height:'auto'
		})
		var row = Ti.UI.createTableViewRow();
		row.add(lblAuthor);
		tbl_data.push(row);
		//var lblName = Titanium.UI.createLabel({
			//text:'Test Title'
		//})
		var infoXML = doc.getElementsByTagName("tab").item(0)
		var scoreQuote = doc.getElementsByTagName("quote").item(0)
		var scoreXML = doc.getElementsByTagName("score").item(0)
		var customFont = 'Hitchcock';
		Ti.API.info("Font: " + customFont)
		//Create label
		var row = Ti.UI.createTableViewRow();
		var lblQuote = Titanium.UI.createLabel({
			text:scoreQuote.text,
			left: 10,
			font:{
      				fontSize:15,
      				fontFamily: "Hitchcock",
   				},
   			//textAlign:'left',
			//width:'auto',
			//height:'auto'
		})
		row.add(lblQuote);
		tbl_data.push(row);
		//Add it to the data table

		//Create label
		var row = Ti.UI.createTableViewRow();
		var lblScore = Titanium.UI.createLabel({
			text:scoreXML.text,
			left: 10,
		})
		row.add(lblScore);
		tbl_data.push(row);
		//Add it to the data table
		
		var row = Ti.UI.createTableViewRow();
		var lblMoviesTitle = Titanium.UI.createLabel({
			text:'Movie Night',
			left: 10,
			font:{
      				fontSize:15,
      				fontFamily: customFont
   				},
			//textAlign:'left',
			//width:'auto',
			//height:'auto'
		})
		row.add(lblMoviesTitle);
		tbl_data.push(row);
		
		var row = Ti.UI.createTableViewRow();
		var lblMovies = Titanium.UI.createLabel({
			text:movies,
			left: 10,
			//textAlign:'left',
			//width:'auto',
			//height:'auto'
		})
		row.add(lblMovies);
		tbl_data.push(row);		
		var tblInfo = new Titanium.UI.createTableView({
		/* properties */
			data:tbl_data
		});
		win1.add(tblInfo);
		
		//Tab 2, Read XML for Relationships
		var tab2XML = doc.getElementsByTagName("tab").item(1);
		var RelationshipLabel = tab2XML.getAttributes("text").item(0);
		tab2.setTitle(RelationshipLabel.nodeValue)
		//Todo: for loop group+i, then 1-6 for groups of items.
		var AllTabs = doc.documentElement.getElementsByTagName("tab");
			var currentTab = AllTabs.item(1); 
			var AllGroups = currentTab.getElementsByTagName("group");
			var relationship_data = [];
			
			//Ti.API.info("Node: " + AllGroups + " Attribute Text: " + GroupText.item(0).nodeValue)
			for(var groupNum = 0; groupNum < 6; groupNum++) {
				var currentGroup = AllGroups.item(groupNum);
				var GroupText = currentGroup.getAttributes("text");
				var AllItems = currentGroup.getElementsByTagName("item")
				//Ti.API.info("Attribute Text: " + GroupText.item(0).nodeValue)
				var row = Ti.UI.createTableViewRow();
				var label = Ti.UI.createLabel({
					left: 15,
					font:{
						fontFamily: "Hitchcock",
      					fontSize:20
   					},
					text: (groupNum+1) + " " + GroupText.item(0).nodeValue
				});
				row.add(label);
				relationship_data.push(row)
				for(var itemNum = 0; itemNum < 6; itemNum++) {
					var currentItem = AllItems.item(itemNum)
					var ItemText = currentItem.getAttributes("number").item(0).nodeValue
					//Ti.API.info("Text: " + ItemText)
					var row = Ti.UI.createTableViewRow();
					var image = Ti.UI.createImageView({
						image: ItemText + '.png',
						width: 20,  // <-- Just using an arbitrary number here
        				height:'auto',
        				left: 0,
					});
					var label = Ti.UI.createLabel({
					left: 30,
					text: currentItem.textContent
				});
				//row.add(lblDice);
				row.add(image);
				row.add(label);
				relationship_data.push(row)
					//Ti.API.info("Item Text: " + currentItem.textContent) 
				}
			}
			//var RelationshipGroups = tab2XML.getChildNodes(i)
			//Ti.API.info("First Child? " + RelationshipGroups.getAttributes("text").item(0))
			var tblRelationships = new Titanium.UI.createTableView({
				/* properties */
				data:relationship_data
			});
			
			win2.add(tblRelationships); 
		
		//Tab3
			var currentTab = AllTabs.item(2); 
			var AllGroups = currentTab.getElementsByTagName("group");
			var needs_data = [];
			
			//Ti.API.info("Node: " + AllGroups + " Attribute Text: " + GroupText.item(0).nodeValue)
			for(var groupNum = 0; groupNum < 6; groupNum++) {
				var currentGroup = AllGroups.item(groupNum);
				var GroupText = currentGroup.getAttributes("text");
				var AllItems = currentGroup.getElementsByTagName("item")
				//Ti.API.info("Attribute Text: " + GroupText.item(0).nodeValue)
				var row = Ti.UI.createTableViewRow();
				var label = Ti.UI.createLabel({
					left: 15,
					font:{
						fontFamily: "Hitchcock",
      					fontSize:20
   					},
					text: (groupNum+1) + " " + GroupText.item(0).nodeValue
				});
				row.add(label);
				needs_data.push(row)
				for(var itemNum = 0; itemNum < 6; itemNum++) {
					var currentItem = AllItems.item(itemNum)
					var ItemText = currentItem.getAttributes("number").item(0).nodeValue
					var row = Ti.UI.createTableViewRow();
					var image = Ti.UI.createImageView({
						image: ItemText + '.png',
						width: 20,  // <-- Just using an arbitrary number here
        				height:'auto',
        				left: 0,
					});
					var label = Ti.UI.createLabel({
					left: 30,
					text: currentItem.textContent
				});
				row.add(image);
				row.add(label);
				needs_data.push(row)
					//Ti.API.info("Item Text: " + currentItem.textContent) 
				}
			}
			//var RelationshipGroups = tab2XML.getChildNodes(i)
			//Ti.API.info("First Child? " + RelationshipGroups.getAttributes("text").item(0))
			var tblNeeds = new Titanium.UI.createTableView({
				/* properties */
				data:needs_data
			});
			
			win3.add(tblNeeds); 		

			//Tab4
			var currentTab = AllTabs.item(3); 
			var AllGroups = currentTab.getElementsByTagName("group");
			var locations_data = [];
			
			//Ti.API.info("Node: " + AllGroups + " Attribute Text: " + GroupText.item(0).nodeValue)
			for(var groupNum = 0; groupNum < 6; groupNum++) {
				var currentGroup = AllGroups.item(groupNum);
				var GroupText = currentGroup.getAttributes("text");
				var AllItems = currentGroup.getElementsByTagName("item")
				//Ti.API.info("Attribute Text: " + GroupText.item(0).nodeValue)
				var row = Ti.UI.createTableViewRow();
				var label = Ti.UI.createLabel({
					left: 15,
					font:{
						fontFamily: "Hitchcock",
      					fontSize:20
   					},
					text: (groupNum+1) + " " + GroupText.item(0).nodeValue
				});
				row.add(label);
				locations_data.push(row)
				for(var itemNum = 0; itemNum < 6; itemNum++) {
					var currentItem = AllItems.item(itemNum)
					var ItemText = currentItem.getAttributes("number").item(0).nodeValue
					var row = Ti.UI.createTableViewRow();
					var image = Ti.UI.createImageView({
						image: ItemText + '.png',
						width: 20,  // <-- Just using an arbitrary number here
        				height:'auto',
        				left: 0,
					});
					var label = Ti.UI.createLabel({
					left: 30,
					text: currentItem.textContent
				});
				row.add(image);
				row.add(label);
				locations_data.push(row)
					//Ti.API.info("Item Text: " + currentItem.textContent) 
				}
			}
			//var RelationshipGroups = tab2XML.getChildNodes(i)
			//Ti.API.info("First Child? " + RelationshipGroups.getAttributes("text").item(0))
			var tblLocations = new Titanium.UI.createTableView({
				/* properties */
				data:locations_data
			});
			
			win4.add(tblLocations);
		//Tab5
			var currentTab = AllTabs.item(4); 
			var AllGroups = currentTab.getElementsByTagName("group");
			var object_data = [];
			//Ti.API.info("Node: " + AllGroups + " Attribute Text: " + GroupText.item(0).nodeValue)
			for(var groupNum = 0; groupNum < 6; groupNum++) {
				var currentGroup = AllGroups.item(groupNum);
				var GroupText = currentGroup.getAttributes("text");
				var AllItems = currentGroup.getElementsByTagName("item")
				//Ti.API.info("Attribute Text: " + GroupText.item(0).nodeValue)
				var row = Ti.UI.createTableViewRow();
				var label = Ti.UI.createLabel({
					left: 15,
					font:{
						fontFamily: "Hitchcock",
      					fontSize:20
   					},
					text: (groupNum+1) + " " + GroupText.item(0).nodeValue
				});
				row.add(label);
				object_data.push(row)
				for(var itemNum = 0; itemNum < 6; itemNum++) {
					var currentItem = AllItems.item(itemNum)
					var ItemText = currentItem.getAttributes("number").item(0).nodeValue
					var row = Ti.UI.createTableViewRow();
					var image = Ti.UI.createImageView({
						image: ItemText + '.png',
						width: 20,  // <-- Just using an arbitrary number here
        				height:'auto',
        				left: 0,
					});					
					var label = Ti.UI.createLabel({
					left: 30,
					text: currentItem.textContent
				});
				row.add(image);
				row.add(label);
				object_data.push(row)
					//Ti.API.info("Item Text: " + currentItem.textContent) 
				}
			}
			var tblObjects = new Titanium.UI.createTableView({
				/* properties */
				data:object_data
			});
			win5.add(tblObjects);
		
	});
	
	
	return self;
};

module.exports = DetailView;
