//Master View Component Constructor
function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	//some dummy data for our table view
	var tableData = [
		{title:'Touring Rock Band', price:'1.25', xml:'jm05.xml', hasChild:true, color: '#000', author:'Jason Morningstar', editor:'Steve Segedy', heading:'I AM A GOLDEN GOD!', summary:'It’s all about the music, man. It’s about becoming famous. It’s about the chicks, the drugs, the fans. It’s about burning bright and dying young, leaving behind a legend! Or maybe it’s about paying for the hotel room once the stupid legend has left the building. Touring Rock Band is an over-the-top collection of iconic rock and roll glories and unwholesome lunacy. It’s about golden gods rising to fame and falling back into addiction, stupidity and squalid failure.', movies:'Almost Famous. Ladies and Gentlemen, the Fabulous Stains. Paanch.', },
		{title:'Gangster London', price:'1.50', hasChild:true, color: '#000'},
		{title:'Last Frontier', price:'2.50', hasChild:true, color: '#000'},
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