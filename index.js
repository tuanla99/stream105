const io = require('socket.io')(process.env.PORT || 3000);
const arrUerInfo =[] ;
io.on('connection',socket=>{
    socket.on('NGUOI_DUNG_DANG_KY',user =>{
        const isExist = arrUerInfo.some(e => e.ten === user.ten) ;
         socket.peerId = user.peerId;
        if(isExist) return socket.emit('DANG_KY_THAT_BAI');
        arrUerInfo.push(user);

        socket.emit('DANH_SACH_ONLINE',arrUerInfo);
        socket.broadcast.emit('CO_NGUOI_DUNG_MOI',user) ;
    });
    
    socket.on('disconnect',()=>{
        const index = arrUerInfo.findIndex(user =>user.peerId === socket.peerId) ;
        arrUerInfo.splice(index,1);
        io.emit('AI_DO_NGAT_KET_NOI', socket.peerId);
    });
});