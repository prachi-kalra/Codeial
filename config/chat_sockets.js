console.log("entering");
const {Server}=require('socket.io');

module.exports.chatSockets=function(socketServer){
   console.log("checkingError");
    // let io=require('socket.io')(socketServer,{
    //     cors:{origin:'http://localhost:8000',
    //            credentials:true}
    // });
    const io=new Server(socketServer,{
        cors:{origin:'http://localhost:8000',
        credentials:true}
    });
    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);
        // socket.on('disconnect',function(){
        //     console.log('socket disconnected !');
        // });
        socket.on('join_room',function(data){
            console.log('joining req received',data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);
        });
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        });
    });
}