var PhotosJson = null;//照片Json配置对象
//加载照片的Json
function InitPhotosJson() {
	var PostForm = {
		"map" : true
	};
	PostForm["map"] = true;
	//console.log(id);
	$.ajax({
		type : 'POST',
		url : "dataset/index.php",
		data : PostForm,
		success : function (data) {
			console.log(data);
			PhotosJson = JSON.parse(data);
			Init();
		},
		dataType : "text"
	});
}


function Init(){
	initXPos = PhotosJson["initX"];
	initYPos = PhotosJson["initY"];
	//console.log(initXPos,initYPos);
	console.log("初始化系统");
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMapOverlay();//向地图添加覆盖物
	initMapStyle();
	InitMarker();
	InitGallery();
	//InitComponent();
	self.setInterval("Geolocation()",1000);
}

  var initXPos;
  var initYPos;
    //创建和初始化地图函数：
    function InitMap(id){
	
	  InitPhotosJson();//加载配置信息
	  //BaseSetting();
    }
	
	var geolocation = null;
	var tlocation;
	function BaseSetting(){
		document.body.style.overflow='hidden';
		var move=function(e){
			e.preventDefault && e.preventDefault();
			e.returnValue=false;
			e.stopPropagation && e.stopPropagation();
			return false;
		}
		var keyFunc=function(e){
			if(37<=e.keyCode && e.keyCode<=40){
				return move(e);
			}
		}
		document.body.onkeydown=keyFunc;
	}
	function Geolocation(){
		if(geolocation == null){
			geolocation = new BMap.Geolocation();
			tlocation = new BMap.Point(116.403515,39.925154);
			geolocation.enableSDKLocation();
		}
		
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				tlocation = r.point;
				//map.centerAndZoom(r.point,15);
				selfMarker.setPosition(r.point);
				//SetLocationPoint(r.lng,r.lat);
				//alert('您的位置：'+r.point.lng+','+r.point.lat);
			}
			else {
				//alert('failed'+this.getStatus());
			}        
		});
	}
	
	function Clock(){
		var myCity = new BMap.LocalCity();
		myCity.get(function myFun(result){
			var cityName = result.name;
			map.setCenter(cityName);
			var cPoint = map.getCenter();
			SetLocationPoint(cPoint.lng,cPoint.lat);
			console.log();
			console.log("当前定位城市:"+cityName);
		}); 
	}
	
	// 定义一个控件类,即function
	function Btn(offX,offY,w,h,txt,action){
		// 默认停靠位置和偏移量
		this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
		this.defaultOffset = new BMap.Size(offX, offY);
		this.callback = action;
		this.width = w;
		this.height = h;
		this.labelText = txt;
	}
	// 通过JavaScript的prototype属性继承于BMap.Control
	Btn.prototype = new BMap.Control();
	
	// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
	// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
	Btn.prototype.initialize = function(map){
		// 创建一个DOM元素
		var div = document.createElement("div");
		// 添加文字说明
		div.appendChild(document.createTextNode(this.labelText));
		// 设置样式
		div.style.cursor = "pointer";
		div.style.border = "0px solid gray";
		div.style.backgroundColor = "#00a9c6";
		div.style.width = this.width+"px";
		div.style.height = this.height+"px";
		div.style.lineHeight = div.style.height;
		div.style.fontSize = "14px";
		//console.log(div.style);
		div.style.textAlign = "center";
		
		//div.style.height = "80px";
		// 绑定事件,点击一次放大两级
		div.onclick = this.callback;/*function(e){
			console.log("back button");
			window.location.href = "uniwebview://close";
		}*/
		// 添加DOM元素到地图中
		map.getContainer().appendChild(div);
		// 将DOM元素返回
		return div;
	}
	
	function InitComponent(){

		// 创建控件
		var btn_Back = new Btn(30,30,80,30,"返回",function(e){
			console.log("back button");
			window.location.href = "uniwebview://close";
		});
		
		var btn_location = new Btn(30,70,80,30,"我的位置",function(e){
			console.log("location");
			//console.log("back button");
			//window.location.href = "uniwebview://close";
		});
		// 添加到地图当中
		map.addControl(btn_Back);
		map.addControl(btn_location);
	}
    
	function createMap(){ 
      map = new BMap.Map("map",{mapType:
		//BMAP_SATELLITE_MAP
		  BMAP_NORMAL_MAP,
          BMAP_HYBRID_MAP
	  }); 
      map.centerAndZoom(new BMap.Point(initXPos,initYPos),PhotosJson["initLevel"]);
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom();
	 //map.disableDragging();
	 // map.disableScrollWheelZoom();
	 // map.disableDoubleClickZoom();
	//  map.disableKeyboard();
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }
    function addMapOverlay(){
    }
    //向地图添加控件
    function addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
      map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      map.addControl(navControl);
	  //console.log(BMap.MenuItem);
      var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
      map.addControl(overviewControl);
    }
	function initMapStyle(){
		map.setMapStyle({
		  styleJson:styleDef
		});
	}
	
	function SetContent(content){
		$("#con").text(content);
	}
	
	function InitSelf(){
		var pt = new BMap.Point(initXPos,initYPos);
		//var icon01 = new BMap.Icon("img/1.jpg",new BMap.Size(10,10));
		//map.centerAndZoom(pt, 18);    
		selfMarker = new BMap.Marker(pt,{
			  // 初始化方向向上的开放式箭头
			  icon:// icon01
			  new BMap.Symbol(BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW, {
				scale: 2,
				strokeWeight: 1,
				rotation: 0,
				fillColor: "Green",
				fillOpacity: 0.8
			  })
			}
		);
		selfMarker.setAnimation(BMAP_ANIMATION_BOUNCE); 
		map.addOverlay(selfMarker);
	}
	
	function InitMarker(){  
		InitSelf();
		var i = 0;
		$.each(PhotosJson["photos"], function (n, value) {
				AddMarker(i,value['x'],value['y'],value['title'],value['description'],value["src"],value['id']);
			   i++;
           });
	}
	
	function OnTrigger(i){
		//alert(i);
		//OpenGallery(i);
		window.location.href='blog/?article='+i;
	}
	
	function AddMarker(index,x,y,title,description,imgUrl,fileName){
		
		var tPoint = new BMap.Point(x, y);
		var tMarker = new BMap.Marker(tPoint);  // 创建标注
		map.addOverlay(tMarker);               // 将标注添加到地图中
		
		
		var opts = {
		  position : tPoint,    // 指定文本标注所在的地理位置
		  offset   : new BMap.Size(15, -30)    //设置文本偏移量
		}
		var label = new BMap.Label(title, opts);  // 创建文本标注对象
			label.setStyle({
				 color : "black",
				 fontSize : "12px",
				 height : "20px",
				 lineHeight : "20px",
				 fontFamily:"微软雅黑"
			 });
		map.addOverlay(label);  
		
		
		tMarker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
		fileName = '"'+fileName+'"';
		var sContent =
	"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+title+"</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo' onClick = 'OnTrigger("+fileName+")' src='"+imgUrl+"' width='139' height='104' title='"+title+"'/>" + 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+description+"</p>" + 
	"</div>";
	
		var tInfoWindow = new BMapLib.SearchInfoWindow(map, sContent, {
			title: title, //标题
			panel : "panel", //检索结果面板
			enableAutoPan : true, //自动平移
			searchTypes :[
				BMAPLIB_TAB_FROM_HERE, //从这里出发
				BMAPLIB_TAB_TO_HERE, //到这里去
				BMAPLIB_TAB_SEARCH   //周边检索
			]
		});
		
		tMarker.addEventListener("click", function(){          
			tInfoWindow.open(tMarker);
		});
	}
	
	
	var selfMarker;
	
	var styleDef = [
          {
                    "featureType": "land",
                    "elementType": "all",
                    "stylers": {
                              "lightness": 100,
                              "saturation": -100
                    }
          },
          {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                              "lightness": 47
                    }
          },
          {
                    "featureType": "manmade",
                    "elementType": "geometry",
                    "stylers": {
                              "lightness": 28
                    }
          },
          {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "lightness": 82
                    }
          },
          {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": {
                              "lightness": -76
                    }
          },
          {
                    "featureType": "green",
                    "elementType": "all",
                    "stylers": {
                              "lightness": 63,
                              "saturation": -100
                    }
          },
          {
                    "featureType": "boundary",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "lightness": 80,
                              "saturation": 1
                    }
          },
          {
                    "featureType": "boundary",
                    "elementType": "geometry.stroke",
                    "stylers": {
                              "lightness": -75,
                              "saturation": -100
                    }
          }
	];
	
	
	var map;