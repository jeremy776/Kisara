import io from 'socket.io-client';

export const socket = io('ws://whispering-yard-development.up.railway.app', {
  forceNew: true,
  transports: ['websocket'],
})
export const verifConnection = () => {
  const isConnected = socket.connected && socket.id;
  console.log(`Connected to socket.\nID: ${socket.id}`);
  return isConnected ? Promise.resolve() : new Promise<void>((resolve) => socket.on('connect', () => resolve));
}