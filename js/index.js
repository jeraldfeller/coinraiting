var XMLHttpRequestObject = false;

if (window.XMLHttpRequest)
{
    XMLHttpRequestObject = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
    XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function getFront(url){
    $dfd = $.Deferred();
    if(XMLHttpRequestObject)
    {

        XMLHttpRequestObject.open("GET", url);


        XMLHttpRequestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        XMLHttpRequestObject.onreadystatechange = function()
        {
            if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200)
            {
                var response =  $.parseJSON(XMLHttpRequestObject.responseText);
                $dfd.resolve(response);
            }
            if (XMLHttpRequestObject.status == 408 || XMLHttpRequestObject.status == 503 || XMLHttpRequestObject.status == 500){
                $dfd.resolve(false);
            }


        }


        XMLHttpRequestObject.send("param=1");


    }

    return $dfd.promise();
}

function getExchangeRate(){
    $dfd = $.Deferred();
    if(XMLHttpRequestObject)
    {

        XMLHttpRequestObject.open("GET", "http://coincap.io/exchange_rates");


        XMLHttpRequestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        XMLHttpRequestObject.onreadystatechange = function()
        {
            if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200)
            {
                var response =  $.parseJSON(XMLHttpRequestObject.responseText);
                $dfd.resolve(response);
            }
            if (XMLHttpRequestObject.status == 408 || XMLHttpRequestObject.status == 503 || XMLHttpRequestObject.status == 500){
                $dfd.resolve(false);
            }


        }


        XMLHttpRequestObject.send("param=1");


    }

    return $dfd.promise();
}

function getCoin(url){
    $dfd = $.Deferred();
    if(XMLHttpRequestObject)
    {

        XMLHttpRequestObject.open("GET", url);


        XMLHttpRequestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        XMLHttpRequestObject.onreadystatechange = function()
        {
            if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200)
            {
                var response =  $.parseJSON(XMLHttpRequestObject.responseText);
                $dfd.resolve(response);
            }
            if (XMLHttpRequestObject.status == 408 || XMLHttpRequestObject.status == 503 || XMLHttpRequestObject.status == 500){
                $dfd.resolve(false);
            }


        }


        XMLHttpRequestObject.send("param=1");


    }

    return $dfd.promise();
}

function getCoinHistory(url){
    $dfd = $.Deferred();
    if(XMLHttpRequestObject)
    {

        XMLHttpRequestObject.open("GET", url);


        XMLHttpRequestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        XMLHttpRequestObject.onreadystatechange = function()
        {
            if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200)
            {
                var response =  $.parseJSON(XMLHttpRequestObject.responseText);
                $dfd.resolve(response);
            }
            if (XMLHttpRequestObject.status == 408 || XMLHttpRequestObject.status == 503 || XMLHttpRequestObject.status == 500){
                $dfd.resolve(false);
            }


        }


        XMLHttpRequestObject.send("param=1");


    }

    return $dfd.promise();
}


function getFrontA() {

    if (XMLHttpRequestObject) {

        XMLHttpRequestObject.open("GET", "http://coincap.io/front");


        XMLHttpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        XMLHttpRequestObject.onreadystatechange = function () {
            if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200) {
                var response = $.parseJSON(XMLHttpRequestObject.responseText);

                $isLoaded = $('#isLoaded').val();
                $.each(response, function(index, key){
                    $index = index + 1;
                    $long = key.long;
                    $short = key.short;
                    $mktcap = key.mktcap.toLocaleString(undefined, {minimumFractionDigits: 0});
                    $price = key.price.toLocaleString(undefined, {minimumFractionDigits: 4});
                    $vwapData = key.vwapData.toLocaleString(undefined, {minimumFractionDigits: 4});
                    $vwapDataBTC = key.vwapDataBTC.toLocaleString(undefined, {minimumFractionDigits: 4});
                    $supply = key.supply.toLocaleString(undefined, {minimumFractionDigits: 0});
                    $usdVolumn = key.usdVolume.toLocaleString(undefined, {minimumFractionDigits: 0});
                    $volume = key.volume.toLocaleString(undefined, {minimumFractionDigits: 0});
                    $perc = key.perc;
                    $iconName = $long.toLowerCase().replace(/ /g, '');

                    if($perc >= 0){
                        $percColor = 'style="color: rgb(108, 168, 46);"';
                    }else{
                        $percColor = 'style="color: rgb(206, 92, 92);"';
                    }
                    if($index <= $defaultViewCount){
                        if($isLoaded != 1){
                            $('#coins_table tr:last').after(
                                '    <tr class="coin_row" data-index="'+$index+'" data-coin="'+$long+'" data-price="'+key.price+'"> ' +
                                '         <td class="coin_cell align_right">'+$index+'</td> ' +
                                '         <td class="coin_cell">' +
                                '         <div class="coin_cell_name">' +
                                '         <span style="color: rgb(108, 108, 46); float: right;"></span>' +
                                '         <span class="sprite sprite-'+$iconName+' small_coin_logo"></span>' +
                                '         <a style="padding-left: 8px; white-space: nowrap; vertical-align: middle;">'+ $long + ' ' + $short +'</a>' +
                                '     </div>' +
                                '     </td>' +
                                '     <td class="coin_cell align_right">$'+$mktcap+'</td>' +
                                '     <td class="coin_cell align_right">' +
                                '         <span class="">$'+$price+'</span><span class="pump_color_light">0000</span>' +
                                '         <span class=""></span>' +
                                '         </td>' +
                                '         <td class="coin_cell align_right">' +
                                '         <span class="">$'+$vwapData+'</span>' +
                                '     <span class="pump_color_light"></span>' +
                                '         <span class="pump_color_dark"></span>' +
                                '         </td>' +
                                '         <td class="coin_cell align_right">'+$supply+'</td>' +
                                '     <td class="coin_cell align_right">$'+$volume+'</td>' +
                                '     <td class="coin_cell align_right" '+$percColor+'>'+$perc+'%</td>' +
                                ' </tr>'
                            );
                        }else{
                            $row = $('#coins_table tr:eq('+$index+')');
                            $rowIndex = $row.data('index');
                            $rowCoin = $row.data('coin');
                            $rowPrice = $row.data('price');

                            if(typeof $rowIndex == 'undefined'){

                                $('#coins_table tr:last').after(
                                    '    <tr class="coin_row" data-index="'+$index+'" data-coin="'+$long+'" data-price="'+key.price+'"> ' +
                                    '         <td class="coin_cell align_right">'+$index+'</td> ' +
                                    '         <td class="coin_cell">' +
                                    '         <div class="coin_cell_name">' +
                                    '         <span style="color: rgb(108, 108, 46); float: right;"></span>' +
                                    '         <span class="sprite sprite-'+$iconName+' small_coin_logo"></span>' +
                                    '         <a style="padding-left: 8px; white-space: nowrap; vertical-align: middle;">'+ $long + ' ' + $short +'</a>' +
                                    '     </div>' +
                                    '     </td>' +
                                    '     <td class="coin_cell align_right">$'+$mktcap+'</td>' +
                                    '     <td class="coin_cell align_right">' +
                                    '         <span class="">$'+$price+'</span><span class="pump_color_light">0000</span>' +
                                    '         <span class=""></span>' +
                                    '         </td>' +
                                    '         <td class="coin_cell align_right">' +
                                    '         <span class="">$'+$vwapData+'</span>' +
                                    '     <span class="pump_color_light"></span>' +
                                    '         <span class="pump_color_dark"></span>' +
                                    '         </td>' +
                                    '         <td class="coin_cell align_right">'+$supply+'</td>' +
                                    '     <td class="coin_cell align_right">$'+$volume+'</td>' +
                                    '     <td class="coin_cell align_right" '+$percColor+'>'+$perc+'%</td>' +
                                    ' </tr>'
                                );


                            }

                            if($rowIndex == $index && $rowCoin == $long){
                                $row.attr('data-index', $index);
                                $row.attr('data-price', $long);
                                $row.attr('data-price', key.price);
                                if(key.price > $rowPrice){
                                    $row.removeClass('coin_pump');
                                    $row.removeClass('coin_dump');
                                    $row.removeClass('coin_dump_now');
                                    $row.find('td:eq(3) span:eq(0)').removeClass('dump_color_dark');
                                    $row.find('td:eq(3) span:eq(1)').removeClass('dump_color_light');
                                    $row.find('td:eq(4) span:eq(0)').removeClass('dump_color_dark');
                                    $row.find('td:eq(4) span:eq(1)').removeClass('dump_color_light');

                                    $row.find('td:eq(2)').text('$'+$mktcap);
                                    $row.find('td:eq(3) span:eq(0)').text('$'+$price);
                                    $row.find('td:eq(4) span:eq(0)').text('$'+$vwapData);
                                    $row.find('td:eq(5)').text($supply);
                                    $row.find('td:eq(6)').text('$'+$volume);
                                    $row.find('td:eq(7)').text($perc+'%');


                                    $row.find('td:eq(3) span:eq(0)').addClass('pump_color_dark');
                                    $row.find('td:eq(3) span:eq(1)').addClass('pump_color_light');
                                    $row.find('td:eq(4) span:eq(0)').addClass('pump_color_dark');
                                    $row.find('td:eq(4) span:eq(1)').addClass('pump_color_light');



                                }else if(key.price > $rowPrice){
                                    $row.removeClass('coin_dump');
                                    $row.removeClass('coin_pump');
                                    $row.removeClass('coin_pump_now');
                                    $row.find('td:eq(3) span:eq(0)').removeClass('pump_color_dark');
                                    $row.find('td:eq(3) span:eq(1)').removeClass('pump_color_light');
                                    $row.find('td:eq(4) span:eq(0)').removeClass('pump_color_dark');
                                    $row.find('td:eq(4) span:eq(1)').removeClass('pump_color_light');

                                    $row.addClass('coin_dump_now');

                                    $row.find('td:eq(2)').text('$'+$mktcap);
                                    $row.find('td:eq(3) span:eq(0)').text('$'+$price);
                                    $row.find('td:eq(4) span:eq(0)').text('$'+$vwapData);
                                    $row.find('td:eq(5)').text($supply);
                                    $row.find('td:eq(6)').text('$'+$volume);
                                    $row.find('td:eq(7)').text($perc+'%');


                                    $row.find('td:eq(3) span:eq(0)').addClass('dump_color_dark');
                                    $row.find('td:eq(3) span:eq(1)').addClass('dump_color_light');
                                    $row.find('td:eq(4) span:eq(0)').addClass('dump_color_dark');
                                    $row.find('td:eq(4) span:eq(1)').addClass('dump_color_light');


                                }else{
                                    $row.find('td:eq(2)').text('$'+$mktcap);
                                    $row.find('td:eq(3) span:eq(0)').text('$'+$price);
                                    $row.find('td:eq(4) span:eq(0)').text('$'+$vwapData);
                                    $row.find('td:eq(5)').text($supply);
                                    $row.find('td:eq(6)').text('$'+$volume);
                                    $row.find('td:eq(7)').text($perc+'%');



                                }


                            }else{
                                $row.attr('data-index', $index);
                                $row.attr('data-price', $long);
                                $row.attr('data-price', key.price);

                                $row.find('td:eq(1) .coin_cell_name').html(
                                    '         <span style="color: rgb(108, 108, 46); float: right;"></span>' +
                                    '         <span class="sprite sprite-'+$iconName+' small_coin_logo"></span>' +
                                    '         <a style="padding-left: 8px; white-space: nowrap; vertical-align: middle;">'+ $long + ' ' + $short +'</a>'
                                )
                                $row.find('td:eq(2)').text('$'+$mktcap);
                                $row.find('td:eq(3) span:eq(0)').text('$'+$price);
                                $row.find('td:eq(4) span:eq(0)').text('$'+$vwapData);
                                $row.find('td:eq(5)').text($supply);
                                $row.find('td:eq(6)').text('$'+$volume);
                                $row.find('td:eq(7)').text($perc+'%');

                                $row.removeClass('coin_dump');
                                $row.find('td:eq(3) span:eq(0)').removeClass('dump_color_dark');
                                $row.find('td:eq(3) span:eq(1)').removeClass('dump_color_light');
                                $row.find('td:eq(4) span:eq(0)').removeClass('dump_color_dark');
                                $row.find('td:eq(4) span:eq(1)').removeClass('dump_color_light');

                                $row.removeClass('coin_pump');
                                $row.find('td:eq(3) span:eq(0)').removeClass('pump_color_dark');
                                $row.find('td:eq(3) span:eq(1)').removeClass('pump_color_light');
                                $row.find('td:eq(4) span:eq(0)').removeClass('pump_color_dark');
                                $row.find('td:eq(4) span:eq(1)').removeClass('pump_color_light');

                            }
                        }
                    }

                });

                $('#isLoaded').val(1);

            }
            if (XMLHttpRequestObject.status == 408 || XMLHttpRequestObject.status == 503 || XMLHttpRequestObject.status == 500) {

            }


        }


        XMLHttpRequestObject.send("param=1");


    }

    return false;
}


