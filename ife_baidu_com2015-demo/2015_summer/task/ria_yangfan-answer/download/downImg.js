var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var mkdirp = require('mkdirp');

var url = 'http://image.baidu.com/';
var dir = './image';

mkdirp(dir, function(err) {
    if (err){
        console.log(err);
    }
});

request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var imgArr = [];
        var num = 0;
        var src = "";
        var imgRegex = /http:\/\/[\w\.\/%=-_]+(jpg|png|gif|bmp)/gim;
        //以下针对直接用img标签添加的图片
        var $ = cheerio.load(body);     //用cheerio来解析dom
        $('img').each(function(){       //$(xxx)内部的规则xxx可根据实际情况修改
            src = $(this).attr("src");
            //若src为相对路径 /xxx/xxx.jpg的形式，则加上域名(根目录)
            if(!src.match(/^http/)){
                src = /http:\/\/[\w\.]+/.exec(url)[0] + src;
            }
            imgArr.push(src);
        });
        //以下针对通过js动态添加的图片，如百度图片
        while((src = imgRegex.exec(body)) !== null) {
            imgArr.push(src[0]);
        }
        // 数组去重
        imgArr.sort();
        for(var j = 0;j < imgArr.length;j++){
            if(imgArr[j+1] == imgArr[j]){
                imgArr.splice(j+1,1);
                j--;
            }
        }
        //开始下载
        for(var i = 0; i < imgArr.length; i++){
            request({ url: imgArr[i], timeout: 1000 * 3600})
            .on('error', function(err) {
                console.log(err);
            })
            .pipe(fs.createWriteStream(dir +"/"+ (num++) + imgArr[i].substr(-4,4)));
            console.log('已下载：', imgArr[i]);
        }
    }
});