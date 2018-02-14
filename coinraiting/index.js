var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

var history = {};
//var users = {};
io.on('connection', function(socket){
    $userData = {ticker: 'BTC', info: {nickname: 'Guest'}};
    // get user
    socket.on('user', function(user){

        $ticker = user.ticker;
        /*
        if(typeof users[$ticker] == 'undefined'){
            users[$ticker] = [];
        }
        if(users[$ticker].indexOf(user.info.nickname) == -1){
            $user = user.info.nickname;
            users[$ticker].push($user);
        }else{
            $user = user.info.nickname+'_'+Math.floor(Math.random() * 100);
            users[$ticker].push($user);
        }
        */
        $userData.ticker = user.ticker;
        $userData.info.nickname = user.info.nickname;

        console.log('Room: ' + user.ticker + ' Nickname: ' + user.info.nickname);
        // send chat history on connect
        if(typeof history[$ticker] == 'undefined'){
            history[$ticker] = [];
        }

        io.emit('history', history[$ticker]);
    });

    //on chat message
    socket.on('chat message', function(msg){
        console.log(msg.ticker);
        history[msg.ticker].push({nickname: msg.info.nickname, message: msg.message});
        $userData.message = msg.message;
        $userData.info.nickname = msg.info.nickname;
        io.emit('chat message', $userData);

    });


    socket.on('disconnect', function(){
       console.log('user disconnected');
    });


});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
