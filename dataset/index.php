<?php
function read_all ($dir){
	$files=array();
    if(!is_dir($dir)) return $files;
    $handle = opendir($dir);
    if($handle){
        while(($fl = readdir($handle)) !== false){
            $temp = iconv('GBK','utf-8',$dir.DIRECTORY_SEPARATOR.$fl);
			if(is_dir($temp) && $fl!='.' && $fl != '..'){
				continue;
            }else{
                if($fl!='.' && $fl != '..'){
                    //echo $fl.'<br>';
					array_push($files,$fl);
                }
            }
        }
    }
	return $files;
}

function getMapJson(){
	$files = read_all('.\\');
	$result = array();
	$confJson = file_get_contents('conf.json');
	$confArr = json_decode($confJson,true);
	$confArr['photos'] = array();
	
	foreach($files as $value){
		if($value == 'conf.json' || $value == 'index.php'){
			continue;
		}
		$arr = json_decode(file_get_contents($value),true);
		$src = str_replace('../','', $arr['content'][0]['src']);
		$arr['src'] =$src;
		$arr['id'] =str_replace('.json','',  $value);
		$arr['content'] = array();
		array_push($result,$arr);
	}
	$confArr['photos'] = $result;
	return json_encode($confArr);
}

function getArticleJson($id){
	$path = $id.'.json';
	$json = file_get_contents($path);
	return $json;
}
if(isset($_REQUEST['map'])){
	echo getMapJson();
}
if(isset($_REQUEST['article'])){
	echo getArticleJson($_REQUEST['article']);
}
?>