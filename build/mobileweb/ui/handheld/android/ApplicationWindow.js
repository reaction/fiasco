function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');
		
	//create object instance
	var bgColor = "#000000";
	var self = Ti.UI.createWindow({
		title:'Playsets',
		exitOnClose:true,
		navBarHidden:false,
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var masterView = new MasterView();
	self.add(masterView);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		//create detail view container
		var detailView = new DetailView();
		var detailContainerWindow = Ti.UI.createWindow({
			title:'Playset Details',
			navBarHidden:false,
			backgroundColor:bgColor
		});
		detailContainerWindow.add(detailView);
		detailView.fireEvent('itemSelected',e);
		//detailContainerWindow.open();
	});
	
	return self;
};

module.exports = ApplicationWindow;
