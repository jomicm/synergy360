/* global SOCKET_HOST */
import io from 'socket.io-client';
// console.log('io', io());
// const SOCKET_HOST = JSON.stringify(`http://192.168.0.101:5000`);
// const SOCKET_HOST = 'http://192.168.0.101:5000';
// const SOCKET_HOST = 'ws://172.46.3.245:5000';
const SOCKET_HOST = 'https://ws.synergizer360.com';

// console.log('SOCKET_HOST', SOCKET_HOST);
const socket = io(SOCKET_HOST);
export default socket;
