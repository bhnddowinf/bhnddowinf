function trim(str) {
    if (str.length != -1) {
        return str.replace(/^\s+|\s+$/g, '');
        //匹配开头和结尾的空白字符，并全局匹配
    }
}
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var oldClassName = element.className; //获取旧的样式类
    element.className = oldClassName === "" ? newClassName : oldClassName + " " + newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var originClassName = element.className; //获取原先的样式类
    var pattern = new RegExp("\\b" + oldClassName + "\\b"); //使用构造函数构造动态的正则表达式
    element.className = trim(originClassName.replace(pattern, ''));
}
