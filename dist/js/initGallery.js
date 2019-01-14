
//需要引用的文件
var Quotes = 
{
	"css":[
		"dist/css/lightgallery.css",
	],
	"javascript":[
		"dist/js/picturefill.min.js",
		"dist/js/lightgallery.js",
		"dist/js/lg-fullscreen.js",
		"dist/js/lg-thumbnail.js",
		"dist/js/lg-video.js",
		"dist/js/lg-autoplay.js",
		"dist/js/lg-zoom.js",
		"dist/js/lg-hash.js",
		"dist/js/lg-pager.js",
	],
	"bodyHtml":[
		'<div class="demo-gallery" style="display:none"><ul id="lightgallery" class="list-unstyled row" ></ul></div>'
	]
};
//<link href="dist/css/lightgallery.css" rel="stylesheet">


//向页面加入LightGallery的js及css的引用
function LightGalleryQuote(config){
	//console.log(config);
	config['javascript'].forEach(function(js){  
		$("body").append('<script language="javascript" src="'+js+'"></script>');
	});
	
	config['css'].forEach(function(css){  
		$("head").append('<link href="'+css+'" rel="stylesheet">');
	});
	
	config['bodyHtml'].forEach(function(bhtm){  
		$("body").append(bhtm);
	});
	//document.write('<script language="javascript" src="js/jquery-1.3.1.min.js"></script>');
}
//初始化入口
function InitGallery() {
	LightGalleryQuote(Quotes);
	//console.log("Add Gallery Plugins");
	$('body').attr("onunload","onrefreash()");//unload(onrefreash);
}

function onrefreash(){
	console.log("On Refreash",$('#lightgallery').data("lightGallery").modules);
   // $('#lightgallery').data("lightGallery").modules.autoplay.destroy();
    $('#lightgallery').data("lightGallery").destroy();
	$('#lightgallery').data("lightGallery",null);		
}

function OpenGallery(id) {
    //console.log($('#lightgallery').data("lightGallery"));
    //$('#lightgallery').data("lightGallery").modules.autoplay.destroy();
    if($('#lightgallery').data("lightGallery")!=null){
        console.log("destroy on trigger",$('#lightgallery').data("lightGallery"));
     //   $('#lightgallery').data("lightGallery").destroy();
    }
	$('#lightgallery').data("lightGallery", null);
	//alert("成功");
	//console.log(PhotosJson['photos'][id]);

	var options = PhotosJson['photos'][id];

	$('#lightgallery').lightGallery(options);
}