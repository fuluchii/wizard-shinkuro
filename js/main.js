
global.$ = $;
$(document).ready(function(){
	var fileview = require('fileview')
	var mongoclient = require('mongoclient')
	var client = new mongoclient.Mongoclient()

	var fileviewele = $('.fileview')
	var fileview_container = new fileview.FileView(fileviewele)
	fileview_container.init()
	
	var view_btn = $('.view-btn')
	var rootpath_ipt = $('.rootpath')
	view_btn.bind("click",function(e){
		var rootpath = rootpath_ipt.val()
		fileview_container.update_view(rootpath)
	})

	var all_check_btn = $('#all')
	all_check_btn.bind("click",function(e){
		fileview_container.check_all(e.target.checked)
	})

	//dbview
	var dblabel = $('.dbview .db')
	var selector = $('.dbview select')
	selector.change(function(){
		dblabel.text($(".dbview select option:selected").attr('value')+":27017")
	})
	

	var upload_btn = $('.upload-btn')
	upload_btn.bind("click",function(e){
		fileview_container.format_file()
		console.log(fileview_container.formatfiles)	
		$.each(fileview_container.formatfiles,function(key,file){
			client.updatedb($(".dbview select option:selected").attr('value'),key,file)
		})	
		fileview_container.update_config()
		view_btn.click()

	})
})