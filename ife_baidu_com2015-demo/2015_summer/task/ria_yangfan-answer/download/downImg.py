 # -*- coding: utf-8 -*-
import urllib
import re
import time
import os

    #显示下载进度
def schedule(a,b,c):
    '''''
    a:已经下载的数据块
    b:数据块的大小
    c:远程文件的大小
    '''
    per = 100.0 * a * b / c
    if per > 100 :
        per = 100
    #print '%.2f%%' % per

def getHtml(url):
    page = urllib.urlopen(url)
    html = page.read()

    return html

def downloadImg(html):
    #reg = r'imageUrl"\s+:\s"(http:\/\/[\w\.\/%=-_]+\.jpg)",'
    #thumbLargeUrl
    reg = r'objURL":"(http:\/\/[\w\.\/%=-_]+\.jpg)",'
    imgre = re.compile(reg)
    imglist = re.findall(imgre, html)

# foldername = str(t.__getattribute__("tm_year"))+"-"+str(t.__getattribute__("tm_mon"))+"-"+str(t.__getattribute__("tm_mday"))
# picpath = 'D:\\ImageDownload\\%s' % (foldername) #下载到的本地目录
    picpath = 'ImageDownload'

    if not os.path.exists(picpath):   #路径不存在时创建一个
        os.makedirs(picpath)   
    x = 0
    for imgurl in imglist:
        target = picpath+'\\%s.jpg' % x
        print 'Downloading image to location: ' + target + '\nurl=' + imgurl
        image = urllib.urlretrieve(imgurl, target, schedule)
        x += 1
    return image;

  
if __name__ == '__main__':

    html = getHtml("http://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=travel&fr=&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=小清新&oq=小清新&rsp=-1")

    downloadImg(html)
    print "Download has finished."
