import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SocketioService {
  socket:any;
  SOCKET_ENDPOINT = ['http://localhost:4001', 'http://localhost:4002', 'http://localhost:4003']
  constructor() { }

  setSocketConncetion(userId:string, userName:string,i:number){
    console.log("i is: ",i)
    let user = {
      userId:userId,
      userName:userName
    }
    this.socket = io(this.SOCKET_ENDPOINT[i], {
      auth: {
        user: user
      }
    });
  }

  subscribeToMessages = (cb:any):any => { 
    if (!this.socket) return(true);
    this.socket.on('message', (msg:any) => {
      console.log('Room event received!');
      return cb(null, msg);
    });
  }

  sendToUser = ({message,userId}:{message:any,userId:any},cb:any)=>{
    if(this.socket) this.socket.emit('msg',{message,userId},cb)
  }

  sendMessage = ({message, roomName}:{message:any,roomName:any}, cb:any) => {
    if (this.socket) this.socket.emit('message1', { message, roomName }, cb);
  }

  joinRoom = (roomName:any) => {
    this.socket.emit('join', roomName);
  }
  
  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
  }
}
}
