<?php

$ticker = $_POST['ticker'];
$currency = $_POST['currency'];
$baseTicker = $_POST['coinId'];
$dataSources  = array(
    array(
        'source' => 'HITBTC',
        'url' => 'https://api.hitbtc.com/api/2/public/symbol'
    ),
    array(
        'source' => 'BITFINEX',
        'url' => 'https://api.bitfinex.com/v1/symbols'
    ),
    array(
        'source' => 'BITFLYER',
        'url' => 'https://api.bitflyer.jp/v1/markets'
    ),
    array(
        'source' => 'BITSTAMP',
        'url' => ''
    ),
    array(
        'source' => 'BITTREX',
        'url' => 'https://bittrex.com/api/v1.1/public/getmarkets'
    ),
    array(
        'source' => 'BINANCE',
        'url' => 'https://api.binance.com/api/v1/exchangeInfo'
    ),
    array(
        'source' => 'POLONIEX',
        'url' => 'https://poloniex.com/public?command=returnTicker'
    )
);

$matchSource = array();
$i = 0;

for($i = 0; $i < count($dataSources); $i++){
    $source = $dataSources[$i]['source'];
    $url = $dataSources[$i]['url'];
    if($url != ''){
        $response = json_decode(getMethod($url), true);
    }
    $foundMatch = false;
    if($source == 'HITBTC'){
        for($x = 0 ; $x < count($response); $x++){
            if($ticker != 'VENUSD' && $ticker != 'TRXUSD'){
                if($ticker == $response[$x]['id']){
                    $foundMatch = true;
                    $matchSource = array(
                        'source' => $source
                    );
                    break;
                }
            }
        }
        if($foundMatch == true){break;}
    }else if($source == 'BITFINEX'){
        for($x = 0 ; $x < count($response); $x++){
            if(strtolower($ticker) == $response[$x]){
                $foundMatch = true;
                $matchSource = array(
                    'source' => $source
                );
                break;
            }

        }
        if($foundMatch == true){break;}
    }else if($source == 'BITFLYER'){
        for($x = 0 ; $x < count($response); $x++){
            if($baseTicker.'_'.$currency == $response[$x]['product_code']){
                $foundMatch = true;
                $matchSource = array(
                    'source' => $source
                );
                break;
            }

        }
        if($foundMatch == true){break;}
    }else if($source == 'BITSTAMP'){
        $bitstampPair = array('btcusd', 'btceur', 'eurusd', 'xrpusd', 'xrpeur', 'xrpbtc', 'ltcusd', 'ltceur', 'ltcbtc', 'ethusd', 'etheur', 'ethbtc', 'bchusd', 'bcheur', 'bchbtc');
        for($x = 0 ; $x < count($bitstampPair); $x++){
            if(strtolower($baseTicker.$currency) == $bitstampPair[$x]){
                $foundMatch = true;
                $matchSource = array(
                    'source' => $source
                );
                break;
            }

        }
        if($foundMatch == true){break;}
    }else if($source == 'BITTREX'){
        for($x = 0 ; $x < count($response['result']); $x++){
            if($baseTicker.'-'.$currency == $response['result'][$x]['MarketName']){
                $foundMatch = true;
                $matchSource = array(
                    'source' => $source
                );
                break;
            }

        }
        if($foundMatch == true){break;}
    }else if($source == 'BINANCE'){
        if($baseTicker == 'VEN' || $baseTicker == 'TRX'){
            $currency = 'BTC';
        }

        for($x = 0 ; $x < count($response['symbols']); $x++){
            if($baseTicker.$currency == $response['symbols'][$x]['symbol']){
                $foundMatch = true;
                $matchSource = array(
                    'source' => $source,
                    'currency' => $currency
                );
                break;
            }
        }
        if($foundMatch == true){break;}
    }else if($source == 'POLONIEX'){
        foreach($response as $pair => $info){
            if($baseTicker.'_'.$currency == $pair){
                $foundMatch = true;
                $matchSource = array(
                    'source' => $source
                );
                break;
            }
        }
        if($foundMatch == true){break;}
    }else{
        $foundMatch = true;
        $matchSource = array(
            'source' => 'COINBASE'
        );
        break;
    }



}

echo json_encode($matchSource);

function getMethod($url){
    $curl = curl_init();
    // Set some options - we are passing in a useragent too here
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $url,
        CURLOPT_HTTPHEADER => array(
            'Accept: application/json',
            'Content-Type: application/json'
        ),
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_VERBOSE => 0
    ));
    // Send the request & save response to $resp
    $resp = curl_exec($curl);
    // Close request to clear up some resources
    curl_close($curl);

    return $resp;
}