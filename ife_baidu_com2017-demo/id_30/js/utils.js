function replaceAll(str,oldStr,newStr) {
    var rep = new RegExp(oldStr,'g');
    return str.replace(rep,newStr);
}

function autoSplit(str) {

    return str.split('\n');

}

function isNumber(obj) {
    return typeof(obj) === "number";
}

function isNull(obj) {
    return obj === null;
}
