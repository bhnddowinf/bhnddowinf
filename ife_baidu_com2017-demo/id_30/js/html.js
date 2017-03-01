function formatMD(str) {

    var strongs = str.match(/\*\*[^*].*\*\*/g);
    if(strongs){

        for(var j = 0; j < strongs.length; j++)

            str = str.replace(strongs[j],strong(strongs[j].substring(2,strongs[j].length-2)));

    }

    var italics = str.match(/\*[^*].*\*/g);
    if(italics){

        for(var i = 0; i < italics.length; i++)

            str = str.replace(italics[i],italic(italics[i].substring(1,italics[i].length-1)));

    }


    var links = str.match(/\[.+]\(.*\)/g);
    if(links){

        for(var k = 0; k < links.length; k++){

            var title = links[k].match(/\[.+]/);
            var url = links[k].match(/\(.*\)/);

            if(title){
                str = str.replace(links[k],link(url[0].substring(1,url[0].length-1),title[0].substring(1,title[0].length-1)));
            }

        }
    }

    var codes = str.match(/`.+`/g);
    if(codes){

        for(var l = 0; l < codes.length; l++)

            str = str.replace(codes[l],code(codes[l].substring(1,codes[l].length-1)));


    }



    return str;

}


function format(str, level) {

    if(level == 'normal'){


        str = replaceAll(str,'<','&lt;');
        str = replaceAll(str,'>','&gt;');
        str = replaceAll(str,' ','&nbsp;');
        str = formatMD(str);



    }else if(level == 'simple'){

        str = replaceAll(str,'<','&lt;');
        str = replaceAll(str,'>','&gt;');

    } else{

        str = replaceAll(str,'<','&lt;');
        str = replaceAll(str,'>','&gt;');
        str = replaceAll(str,' ','&nbsp;');

    }

    return str;

}

function row(str) {
    return '<p>'+str+'</p>\n';
}

function header(str,opt) {

    if(isNumber(opt))
        if(opt>=1 && opt <=6)
            return '<h'+opt+'>'+str+'</h'+opt+'>\n';
        else
            return '<h1>'+str+'</h1>\n';

}

function line() {
    return '<hr/>\n';
}

function img(src,alt){

    return '<img src="'+ src + '" alt="' + alt + '">\n';

}

function link(url,str) {
    return '<a href="' + url + '">' + str + '</a>';
}

function ol(ls) {

    var res = "<ol>\n";

    for(var i = 0; i < ls.length; i++)
        res += '\t<li>' + ls[i] + '</li>\n';

    res += '</ol>\n';

    return res;
}

function ul(ls) {
    var res = "<ul>\n";

    for(var i = 0; i < ls.length; i++)
        res += '\t<li>' + ls[i] + '</li>\n';

    res += '</ul>\n';

    return res;
}

function code(str) {
    return '<code>' + str + '</code>';
}

function multCode(str) {
    return '<pre>' + str + '</pre>\n';
}

function strong(str) {
    return '<strong>' + str + '</strong>';
}

function blockQuote(bqs) {

    var res = '<blockquote>\n';

    for(var i = 0; i < bqs.length; i++){
        res += row(bqs[i]);
    }

    res += '</blockquote>\n';

    return res;
}

function del(str) {
    return '<del>' + str + '</del>';
}

function italic(str) {
    return '<i>' + str + '</i>';
}

function table(header,bodies) {

    var res = '<table>\n';

    var h = '<thead>\n<tr>\n';
    for (var i = 0; i < header.length; i++){

        h += '<th>' + header[i] + '</th>\n';

    }
    h += '</tr>\n</thead>\n';
    res += h;

    var b = '<tbody>\n';

    for(var j = 0;j < bodies.length; j++){

        var temp = '<tr>\n';

        for(var k = 0; k < bodies[j].length; k++){

            temp += '<td>' + row(bodies[j][k]) + '</td>\n';

        }

        temp += '</tr>\n';

        b += temp;
    }

    b += '</tbody>\n';

    res += b;

    res += '</table>\n';

    return res;

}