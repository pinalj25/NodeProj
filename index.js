require('dotenv').config();

var mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Chats-app');
console.log('database successfully connected');

// const router=express.Router()
 
 const app1=require('express')();
//  const app1=express();
 
 const http= require('http').Server(app1)

const userRoutes=require('./routes/userRoutes')
app1.use('/',userRoutes);

const User= require('./models/userModel.js');
const Chat= require('./models/chatModel');




 

const io=require('socket.io')(http);

var usp =io.of('/user-namespace');

usp.on('connection',async function(socket){
    console.log('User Connected');
   
  var userId=socket.handshake.auth.token;
  await User.findByIdAndUpdate({ _id:userId }, {$set:{is_Online:'1' }});
      
        socket.broadcast.emit('getOnlineUser',{user_id:userId});

        socket.on('disconnect',async function(){
          console.log('user Disconnect');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

          var userId=socket.handshake.auth.token;
            await User.findByIdAndUpdate({ _id:userId }, {$set:{is_Online:'0' }});
            
            
        socket.broadcast.emit('getOfflineUser',{user_id:userId});
    });
    // chating implementation
         socket.on('newChat',function(data){
           socket.broadcast.emit('loadNewChat',data);
 });

    //  load old chats
     socket.on('existsChat', async function(data){
            var chats=await Chat.find({$or:[
            {
              sender_id:data.sender_id,receiver_id:data.receiver_id
            },
            {
              sender_id:data.receiver_id,receiver_id:data.sender_id
            }
           ]});

          socket.emit('loadChats',{ chats:chats });

      })

});







 http.listen(3000, ()=>{
    console.log('server is running on port http://localhost:3000')
});

