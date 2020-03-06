import { createContext } from 'react';
import socketClient from 'socket.io-client';

const SocketContext = createContext({
  socket: socketClient('http://localhost:3000'),
});

export default SocketContext;
