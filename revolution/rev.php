<?php
$ticker = strtoupper($_POST['ticker']);

$files = scandir('../revolution', 1);
$files = array_diff($files, array('.', '..', 'rev.php'));

if(in_array($ticker, $files)){
    echo json_encode(array(
       'bol' => true,
       'iframe' => '<iframe width="300" height="250" id="ad_1307597_backfill2_frame" src="revolution/'.$ticker.'/slider.html" frameborder="0" class="bsap_adframe" scrolling="no"></iframe>'
    ));
}else{
    echo json_encode(array(
        'bol' => false,
        'iframe' => ''
    ));
}

?>