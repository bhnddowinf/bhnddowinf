<?php
header("Access-Control-Allow-Origin:*");

function getfile($dirname){
    $fileArr = Array();
    $dir = opendir($dirname);
    while ( ($file = readdir($dir)) !== false){
        if( $file != "." && $file != ".." ){
            array_push($fileArr, $dirname."/".$file);
        }
    }
    closedir($dir);
    //这个排序并没有什么用，键值对并没有改变
    // natsort($fileArr);
    return $fileArr;
}

$cartoon = getfile("image/cartoon");
$photography = getfile("image/photography");
$scenery = getfile("image/scenery");
$importImg = getfile("image/importImg");
$allimage = array_merge($cartoon, $photography, $scenery, $importImg);

$json = '{"allimage":'.json_encode($allimage).',"cartoon":'.json_encode($cartoon)
                    .',"photography":'.json_encode($photography)
                    .',"scenery":'.json_encode($scenery)
                    .',"importImg":'.json_encode($importImg).'}';

echo $json;

?> 