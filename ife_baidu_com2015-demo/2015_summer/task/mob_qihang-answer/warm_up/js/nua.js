/**
 * 首页内容区根据左侧导航栏的选择，显示不同的内容
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
function getContent (element) {
	var id = element.id;
	var typeClicked = id.substring(0,id.length-1);
	var idClicked = id.charAt(id.length-1);
	if (typeClicked == "list"){
		removeAllListActive();
		addClass(element, 'active');
		var contentChild = document.getElementById("content").childNodes;
		for (var i = 0, len = contentChild.length; i < len; i++) {
			if (contentChild[i].tagName == "DIV") {
				var contentid = contentChild[i].id;
				if(contentid.charAt(contentid.length-1) == idClicked) {
					var contentYes = document.getElementById(contentid);
					contentYes.style.height = 405 + 'px';
				}else {
					var contentNo = document.getElementById(contentid);
					contentNo.style.height = 0 + 'px';
				}
			}
		}
	}else if (typeClicked == "name") {
		removeAllMemberActive();
		addClass(element, 'active');
		var member = document.getElementById("content2").childNodes;
		for (var i = 0, len = member.length; i < len; i++) {
			if( member[i].tagName == "DIV"){
				var memberid = member[i].id;
				if (memberid.charAt(memberid.length-1) == idClicked) {
					var memberYes = document.getElementById(memberid);
					memberYes.style.height = 300 +'px';
				} else {
					var memberNo = document.getElementById(memberid);
					memberNo.style.height = 0 + 'px';
				}
			}
		}
	}	
}

/**
 * 获取滚动条距顶端的距离
 * @return {[type]} [description]
 */
function getScrollTop() {
	var scrollPos;
	if (window.pageYOffset) {
		scrollPos = window.pageYOffset;
	}else if (document.compatMode && document.compatMode != 'BackCompat') {
		scrollPos = document.documentElement.scrollTop;
	}else if (document.body) {
		scrollPos = document.body.scrollTop;
	}
	return scrollPos;
}

document.onscroll= function () {
	var scrollPos = getScrollTop();
	if (scrollPos < 10) {
		document.getElementById("gotopbtn").style.display = 'none';
	}else {
		document.getElementById("gotopbtn").style.display = 'block';
	}
}


function removeAllListActive() {
	var list = document.getElementById("list_left").getElementsByTagName("li");
	for (var i = 0, len = list.length; i < len; i++) {
		removeClass(list[i],"active");
	}
}
function removeAllMemberActive() {
	var member = document.getElementById("name_header").getElementsByTagName("li");
	for (var j = 0, memNum = member.length ; j < memNum; j++) {
		removeClass(member[j], "active");
	}
}