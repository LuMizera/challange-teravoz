import * as Websocket from 'ws';
import { UserMessage } from './models/Message';
import { getAll } from './database';
import { handleCall } from './handlers/callHandler';

const wss = new Websocket.Server({ port: 5000 });

wss.on('listening', () => console.log('WebSocket running at port 5000'));

wss.on('connection', async (ws: Websocket) => {
  ws.send(JSON.stringify(await getAll()));
  ws.on('message', async (userMessage: string) => {
    let message: UserMessage = {
      type: '',
      call_id: '',
      direction: '',
      our_number: '',
      their_number: '',
      timestamp: ''
    };
    try {
      message = (JSON.parse(userMessage) as unknown) as UserMessage;
    } catch (error) {
      // SAVE ERROR
    }
    message = await handleCall(message, ws);
    ws.send(JSON.stringify(message));
  });
});
