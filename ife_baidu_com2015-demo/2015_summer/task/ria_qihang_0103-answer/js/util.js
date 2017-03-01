var WY = {};

WY.getStyle = function(elem,styleName){
	var style = elem.currentStyle? elem.currentStyle : window.getComputedStyle(elem, null);
	return style[styleName];
};

WY.replaceClass = function(elem,newClass,oldClass){
	elem.classList.remove(oldClass);
	elem.classList.add(newClass);
};

WY.highLightCode = function(){
	var script = document.getElementById('highLightScript');
	if(!script){
		script = document.createElement('script');
		script.setAttribute('id','highLightScript');
		script.setAttribute('src', 'http://apps.bdimg.com/libs/highlight.js/8.6/highlight.min.js');
		var link = document.createElement('link');
		link.setAttribute('type', 'text/css');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', 'http://apps.bdimg.com/libs/highlight.js/8.6/styles/atelier-cave.dark.min.css');
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(link);
		head.appendChild(script);
		script.addEventListener('load',function(){
			var codeBlock =document.querySelectorAll('pre code');
			for(var i = codeBlock.length-1;i>=0;i--){
				hljs.highlightBlock(codeBlock[i].parentNode);		
			}
		});
	}else{
		var codeBlock =document.querySelectorAll('pre code');
		for(var i = codeBlock.length-1;i>=0;i--){
			hljs.highlightBlock(codeBlock[i].parentNode);		
		}
	}
};

