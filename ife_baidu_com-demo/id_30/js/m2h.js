function m2h(str) {

    var rows = autoSplit(str);

    var res = '';

    for (var i = 0; i < rows.length; i++) {

        var t = rows[i].match(/^#\s/)
            || rows[i].match(/^##\s/)
            || rows[i].match(/^###\s/)
            || rows[i].match(/^####\s/)
            || rows[i].match(/^#####\s/)
            || rows[i].match(/^######\s/)
            || rows[i].match(/^\*\s/)
            || rows[i].match(/^\d\.\s/)
            || rows[i].match(/^>\s/)
            || rows[i].match(/^```/)
            || rows[i].match(/^!\[.+]\(.*\)/)
            || rows[i].match(/^\*\*\*+/)
            || rows[i].match(/^\|.+\|$/);

        if (t) {

            switch (t[0]) {

                case '# ':

                    res += header(format(rows[i].substring(2)), 1);

                    break;
                case '## ':

                    res += header(format(rows[i].substring(3)), 2);

                    break;
                case '### ':

                    res += header(format(rows[i].substring(4)), 3);

                    break;
                case '#### ':

                    res += header(format(rows[i].substring(5)), 4);

                    break;
                case '##### ':

                    res += header(format(rows[i].substring(6)), 5);

                    break;
                case '###### ':

                    res += header(format(rows[i].substring(7)), 6);

                    break;
                case '* ':

                    var uls = [];

                    while (i < rows.length && rows[i].match(/^\*\s/)){

                        uls.push(format(rows[i].substring(rows[i].match(/^\*\s/)[0].length),'normal'));
                        i++;

                    }

                    res += ul(uls);

                    break;

                case '> ':

                    var bqs = [];

                    while (i < rows.length && rows[i].match(/^>\s/)){

                        bqs.push(format(rows[i].substring(2),'normal'));
                        i++;

                    }

                    res += blockQuote(bqs);

                    break;

                case (rows[i].match(/^```/)) && (rows[i].match(/^```/))[0]:

                    i++;

                    var mc = '\n';

                    while (i < rows.length && isNull(rows[i].match(/^```/))){

                        mc += rows[i] + '\n';
                        i++;
                    }

                    res += multCode(format(mc,'simple'));

                    break;
                case (rows[i].match(/^!\[.+]\(.*\)/)) && (rows[i].match(/^!\[.+]\(.*\)/))[0]:

                    var alt = rows[i].match(/!\[.+]/);
                    var src = rows[i].match(/\(.*\)/);

                    res += img(src[0].substring(1,src[0].length-1),alt[0].substring(2,alt[0].length-1));


                    break;
                case (rows[i].match(/^\d\.\s/)) && (rows[i].match(/^\d\.\s/))[0]:

                    var ols = [];

                    while (i < rows.length && rows[i].match(/^\d\.\s/)){

                        ols.push(format(rows[i].substring(rows[i].match(/^\d\.\s/)[0].length),'normal'));
                        i++;

                    }

                    res += ol(ols);

                    break;
                case (rows[i].match(/^\*\*\*+/)) && (rows[i].match(/^\*\*\*+/))[0]:

                    res += line();

                    break;

                case (rows[i].match(/^\|.+\|$/)) && (rows[i].match(/^\|.+\|$/))[0]:

                    if(rows[i+1].match(/^\|-+\|/)){

                        var th = rows[i].split('|');

                        var length = th.length;

                        var header_t = [];

                        for(var j = 1; j<length-1; j++){

                            header_t.push(format(th[j].trim(),'simple'));

                        }

                        i+=2;

                        var bodies = [];

                        while (i < rows.length && rows[i].match(/^\|.+\|/) && rows[i].split('|').length == length){

                            var tb = rows[i].split('|');

                            var body = [];
                            for(var k = 1; k < tb.length-1; k++){

                                body.push(format(tb[k].trim(),'simple'));
                            }

                            bodies.push(body);

                            i++;

                        }

                        res += table(header_t,bodies);

                    }else {
                        res += row(format(rows[i],'normal'));
                    }

                    break;
                default:
                    break;

            }

        }
        else if(rows[i].length > 0)
            res += row(format(rows[i],'normal'));

    }


    return res;

}


