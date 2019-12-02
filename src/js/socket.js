/* global SOCKET_HOST */
import io from 'socket.io-client';
// console.log('io', io());
// const SOCKET_HOST = JSON.stringify(`http://192.168.0.101:5000`);
const SOCKET_HOST = 'http://192.168.0.101:5000';

// console.log('SOCKET_HOST', SOCKET_HOST);
const socket = io(SOCKET_HOST);
export default socket;
