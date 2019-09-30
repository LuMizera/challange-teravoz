import { createServer } from 'http';
import * as Websocket from 'ws';
import { UserMessage } from './models/Message';
import { getAll } from './database';
import { handleCall } from './handlers/callHandler';

const server = createServer();

const wss = new Websocket.Server({ server });

const clients: any[] = [];

wss.on('connection', async (ws: Websocket) => {
  const clientId = Date.now();
  clients.push({ clientId, ws });
  ws.send(JSON.stringify(await getAll()));

  ws.on('message', async (userMessage: string) => {
    let message: UserMessage = {
      type: '',
      call_id: '',
      their_number: '',
      timestamp: ''
    };
    try {
      message = (JSON.parse(userMessage) as unknown) as UserMessage;
      await handleCall(message, clients);
    } catch (error) {
      for (let client of clients) {
        client.ws.send(JSON.stringify(await getAll()));
      }
    }
  });

  ws.on('close', () => {
    const index = clients.findIndex(client => client.clientId === clientId);
    if (index !== -1) {
      const remove = clients.splice(index, 1);
    }
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
