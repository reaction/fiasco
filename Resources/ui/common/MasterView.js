//Master View Component Constructor
function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	//some dummy data for our table view
	var tableData = [
		{title:'Touring Rock Band', xml:'jm05.xml', hasChild:true, color: '#000' },
		{title:'Gangster London', xml:'gw01.xml', hasChild:true, color: '#000'},
		{title:'Last Frontier', xml:'jm06.xml', hasChild:true, color: '#000'},
	];
	
	var table = Ti.UI.createTableView({
		data:tableData
	});
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			file:e.rowData.xml
			//price:e.rowData.price
		});
	});
	
	return self;
};

module.exports = MasterView;