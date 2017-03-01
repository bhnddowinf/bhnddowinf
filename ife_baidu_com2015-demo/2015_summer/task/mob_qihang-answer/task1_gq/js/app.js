function getStyle(elem,styleName){
	var style = elem.currentStyle? elem.currentStyle : window.getComputedStyle(elem, null);
	return style[styleName];
}