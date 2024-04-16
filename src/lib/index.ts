// place files you want to import through the `$lib` alias in this folder.

const isDev = true;
export const ws_connection = isDev ? "ws://localhost:3000" : 'wss://whispering-yard-development.up.railway.app';
export const api_endpoint = isDev ? "http://localhost:3000" : 'https://whispering-yard-development.up.railway.app';