import style from "./sass/index.scss";

import io from 'socket.io-client';
import Pong from './js/pong';



const socket = io.connect('http://localhost:3000/studio');
// console.log(socket);
// socket.emit('studio', {data : 'data'})
// socket.on('news', (data) => {
//     console.log(data);
// });


const game = new Pong(document.getElementById('game'), socket);