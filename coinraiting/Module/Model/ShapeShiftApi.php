<?php

class ShapeShiftApi
{
    protected $publicKey = 'd0086115d71c1994223e19e6ea02122ce062b15d7034ebcd3fa9426e05e1ddc109a52b9d7a41892c83914fec72362f853078d9ca2d78247c432fae332bb6653c';
    protected $privateKey = '677885437dfffaa80ef54c9f3b6a71a2ca42b4e62e667646b90ee2fb93372c1f134b64a028e3c04a258f54fcd473a51602d6e0875acac215067ac6370b7beb21';

    public function sendAmount($post){
        $url = 'https://shapeshift.io/sendamount';
        $amount = $post['amount'];
        $withdrawal = $post['withdrawalAddress'];
        $pair = $post['pair'];
        $returnAddress = $post['refundAddress'];

        if($amount == ''){
            $currentMarketInfo = json_decode(file_get_contents('https://shapeshift.io/marketinfo/'.$pair), true);
            $amount = $currentMarketInfo['minimum'];
        }

        $data = json_encode(array(
            'amount' => $amount,
            'withdrawal' => $withdrawal,
            'pair' => $pair,
            'returnAddress' => $returnAddress,
            'apiKey' => $this->publicKey
        ));

        $return = json_decode($this->postMethod($data, $url), true);
        return $return;
        

    }

    public function txbyaddress($post){
        $address = $post['address'];
        $url = 'https://shapeshift.io/txbyaddress/'.$address.'/'.$this->publicKey;

        $return = json_decode($this->getMethod($url));

        return $return;
    }

    public function postMethod($post, $url){
        $curl = curl_init();
        // Set some options - we are passing in a useragent too here
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url,
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => $post,
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

    public function getMethod($url){
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
}