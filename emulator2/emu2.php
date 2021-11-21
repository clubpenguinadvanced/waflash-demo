<html>
<body>
<style>
body{margin:0;overflow:hidden;}
body,table,td {font-size:14px; font-family: Arial, Helvetica, sans-serif;}
#waflashStatus{
	position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);
	width:70%;color:white;margin:0px auto;padding:10px;font-size:16px;text-align:center;background-color:rgba(0,0,0,0.3);display:none;
}
#context-menu {
    color: black;
    background-color: #FAFAFA;
    border: 1px solid gray;
    box-shadow: 0px 5px 10px -5px black;
    position: absolute;
    font-size: 14px;
    text-align: left;
    list-style: none;
    padding: 0;
    margin: 0;
}
#context-menu .menu_item {
    padding: 5px 10px;
}
#context-menu .active {
    cursor: pointer;
    color: black;
}
#context-menu .disabled {
    cursor: default;
    color: gray;
}
#context-menu .active:hover {
    background-color: lightgray;
}
#context-menu .menu_separator hr {
    border: none;
    border-bottom: 1px solid lightgray;
    margin: 2px;
}
/*
#right_click_menu {
    color: #FFAD33;
    background-color: #37528c;
    border-radius: 5px;
    box-shadow: 0px 5px 15px -5px #000;
    position: absolute;
    font-size: 16px;
    text-align: left;
    list-style: none;
    padding: 0;
    margin: 0;
}
#right_click_menu .menu_item {
    padding: 5px 10px;
}
#right_click_menu .menu_separator {
    padding: 5px 5px;
}
#right_click_menu .active {
    cursor: pointer;
    color: #FFAD33;
}
#right_click_menu .disabled {
    cursor: default;
    color: #94672F;
}
#right_click_menu .active:hover {
    background-color: #184778;
}
#right_click_menu hr {
    color: #FFAD33;
}
#right_click_menu > :first-child {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}
#right_click_menu > :last-child {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}*/
</style>

<table id="loading" style="position:absolute;left:10px;top:20px;background: white;padding:3px;border:0px solid silver;-webkit-box-shadow: 0 0 10px #999;-moz-box-shadow: 0 0 10px #999; box-shadow: 0 0 10px #999;">
<tr><td><img src="etc/wait.gif">
<td>Loading library... Please wait a moment.
</table>

<div id="waflashContainer" style="width:100%;height:100%;position:relative;border:0px solid black">
<canvas id="canvas" tabindex="1" style="width:100%;height:100%;cursor: default;outline: none;"></canvas>
<div id="waflashStatus" style="display:none;"></div>
</div>
<ul id="context-menu" style="display:none"><li id="menu1" class="menu_item active" style="white-space:nowrap">Enter fullscreen (Emulator 2)</li></ul>

<script>
var gainNode;
function proc_gain(gain){
try{
	if(gain && gain.gain){
		gainNode=gain;		
		setTimeout(function(){
			if(parent && parent.volume1_onchange) parent.volume1_onchange();
			/*var s=parseInt(localStorage['volume1']);
			if(!isNaN(s)){	
				if(s<0) s=0; if(s>100) s=100;
				gainNode.gain.value=s/100;
			}*/
		},100);
	}
}catch(err){}
}
function proc_volume(value){
	if(gainNode) gainNode.gain.value=value;
}
var golddate=Date;
Date = function(){
	var a=new golddate();
	a.setFullYear('2020'); a.setMonth('11'); a.setDate('10');
	return a;
};
Date.now=function(){
	var a=new golddate();
	a.setFullYear('2020'); a.setMonth('11'); a.setDate('10');
	return a.getTime();
}
</script>
<script type="module">
import createWaflashModule from 'https://clubpenguinadvanced.github.io/waflash-demo/emulator2/waflash_latest/waflash.js?t=1';
var WAFLASH_BASE_URL = "https://clubpenguinadvanced.github.io/waflash-demo/emulator2/waflash_latest/";
var loaded=false;

function _getid(id){
	return document.getElementById(id);
}
function init(){
    var waflash = {
        arguments: [''],
        preRun: [],
        postRun: [],
        locateFile(path, prefix) {
            return WAFLASH_BASE_URL + path;
        },
        print(text) {
            //console.log(text);
        },
        printErr(text) {
            //console.error(text);
        },
        canvas: (function () {
            var canvas = _getid("canvas");
            canvas.addEventListener("webglcontextlost", function (e){
				waflash.setStatus('WebGL context lost. Reload the Flash file, or Open the another Flash file.');
				e.preventDefault(); 
			}, false);
            return canvas;
        })(),
        statusElement: (function(){
			return _getid('waflashStatus');
		})(),
        setStatus: function(text){
            if(!text || !loaded) return;
			if(/(Reload the page)/.test(text)){
				text='An error occurred. Reload the Flash file, or Open the another Flash file.';
			}
            waflash.statusElement.innerHTML = text;
            waflash.showStatus();
        },
        showStatus(){
            waflash.statusElement.style.display = 'block';
        },
        hideStatus(){ 
            waflash.statusElement.style.display = 'none';
        },
        unload(){},
    };	

    window.onerror = function(message, url, line){
        waflash.setStatus('An error occurred. Reload the Flash file, or Open the another Flash file.');
    };

    _getid('canvas').addEventListener("keydown", function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    });
    _getid('canvas').addEventListener("mousedown", function(ev) {
		//console.log(ev);
		if(ev.button==0){
			_getid('context-menu').style.display='none';
		}
    });
	function contextmenu_event(ev) {
        ev.preventDefault();
        ev.stopPropagation();
		if(loaded){
			var a=_getid('context-menu');
			var b=_getid('canvas');
			a.style.display='block';
			var x=ev.pageX || ev.clientX;
			var y=ev.pageY || ev.clientY;
			if(x+a.offsetWidth>b.offsetWidth) x=b.offsetWidth-a.offsetWidth;
			if(y+a.offsetHeight>b.offsetHeight) y=b.offsetHeight-a.offsetHeight;
			a.style.left=x+'px';
			a.style.top=y+'px';			
		}
    }
    _getid('canvas').addEventListener("contextmenu", contextmenu_event);
    _getid('context-menu').addEventListener("contextmenu", contextmenu_event);
	_getid('menu1').addEventListener("contextmenu", contextmenu_event);

    document.onmousedown = function(ev) {
        var a=_getid('canvas');
        if(ev.target == a){
			a.focus();
		}
	};

	createWaflashModule(waflash).then(function(o){
		loaded=true;
		_getid('loading').style.display='none';
		_getid('menu1').onclick=function(){
			proc_fullscreen();
			_getid('context-menu').style.display='none';
		}
		loadswf(waflash);
    });
}

function proc_resize(){
	if(typeof(Event) === 'function'){
		window.dispatchEvent(new Event('resize'));
	}else{
		var evt = window.document.createEvent('UIEvents'); 
		evt.initUIEvent('resize', true, false, window, 0); 
		window.dispatchEvent(evt);
	}
}
function exitHandler(){
	if(!loaded)return;
	var a=_getid('canvas');
	var b=_getid('menu1');
	if(isfullscreen()){
		b.innerHTML='Exit fullscreen (Emulator 2)';
	}else{
		b.innerHTML='Enter fullscreen (Emulator 2)';
		a.style.width='100%';
		a.style.height='100%';
	}
	setTimeout(function(){
		proc_resize();
	},100);
	a.focus();
}
document.addEventListener('webkitfullscreenchange', exitHandler, false);
document.addEventListener('mozfullscreenchange', exitHandler, false);
document.addEventListener('fullscreenchange', exitHandler, false);
document.addEventListener('MSFullscreenChange', exitHandler, false);

function isfullscreen(){
	var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
		(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
		(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
		(document.msFullscreenElement && document.msFullscreenElement !== null);
	return isInFullScreen;
}
function proc_fullscreen(){
	if(!isfullscreen() && screen.width>0 && screen.height>0){
		var a=_getid('canvas');
		a.style.width = screen.width+'px';
		a.style.height = screen.height+'px';
		setTimeout(function(){
			proc_resize();
			setTimeout(function(){
				proc_fullscreen2();
			},100);
		},100);
	}else{
		proc_fullscreen2();
	}
}
function proc_fullscreen2(){
	try{		
		var elem=document.documentElement;			
		if(!isfullscreen()){
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) { 
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) { 
				elem.msRequestFullscreen();
			}			
		}else{
			if(document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	}catch(err){
		alert(err+'');
	}
}

function loadswf(waflash){
	if(!(parent && parent.gbloburl))return;

	var xhr = new XMLHttpRequest();
	xhr.open('GET', parent.gbloburl);
	xhr.responseType = 'arraybuffer';
    xhr.onload = function(){
		if(this.status == 200){
			var uint8Array = new Uint8Array(this.response);
			var buf = waflash._malloc(uint8Array.length);
			waflash.HEAP8.set(uint8Array, buf);
			var res = waflash.ccall('reopenBuffer', 'int', ['string', 'number', 'number'], ['input.swf', buf, uint8Array.length]);
			waflash._free(buf);
			if(res == 0){
				waflash.setStatus('Error. Failed to laod the Flash file.');
            }
		}else{
			waflash.setStatus('Error. Can not get a file data.');
		}
	};
	xhr.onerror = function(){
		waflash.setStatus('Error. Can not get a file data.');
	};
	xhr.send();
}
init();
</script>
</body>
</html>