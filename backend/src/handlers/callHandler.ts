import { UserMessage } from '../models/Message';
import { insertItem, getItemById, updateItem, getHighestQueue, reduceQueuePosition, getAll } from '../database';
import * as WebSocket from 'ws';

export const newCall = async (message: UserMessage): Promise<void> => {
  message.call_id = Date.now().toString();
  message.queue = 0;
  if (message.their_number.length === 11) {
    message.their_number_type = 'mobile';
  } else {
    message.their_number_type = 'not mobile';
  }
  await insertItem(message);
  return;
};

export const standbyCall = async (message: UserMessage, clients: any[]): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'call.standby' };
    await updateItem(modifiedObject);
    setTimeout(async () => {
      await waitingCall(modifiedObject, clients);
    }, 10000);
  }
  return;

  // Rola post /actions
};

export const waitingCall = async (message: UserMessage, clients: any[]): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  const highestQueue = await getHighestQueue();
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'call.waiting', queue: highestQueue + 1 };
    await updateItem(modifiedObject);
    const all = await getAll();
    for (let client of clients) {
      client.ws.send(JSON.stringify(all));
    }
  }
  return;
};

export const actorEnted = async (message: UserMessage): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'actor.entered', actor: message.actor };
    await updateItem(modifiedObject);
    setTimeout(async () => {
      await ongoingCall(modifiedObject);
    }, 10000);
  }
  return;
};

export const ongoingCall = async (message: UserMessage): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  let modifiedObject: UserMessage | null = null;
  if (myObject) {
    modifiedObject = { ...myObject, type: 'call.ongoing', queue: 0 };
    await updateItem(modifiedObject);
  }
  await reduceQueuePosition();
  return;
  // number nasce aqui junto a validação de se é retorno ou 1 contato;
};

export const actorLeft = async (message: UserMessage): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'actor.left' };
    await updateItem(modifiedObject);
  }
  return;
};

export const finishedCall = async (message: UserMessage): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'call.finished' };
    await updateItem(modifiedObject);
  }
};

export const handleCall = async (message: UserMessage, clients: any[]): Promise<void> => {
  message.timestamp = new Date().toISOString();
  switch (message.type) {
    case 'call.new':
      await newCall(message);
      break;
    case 'call.standby':
      await standbyCall(message, clients);
      break;
    case 'call.waiting':
      await waitingCall(message, clients);
      break;
    case 'actor.entered':
      await actorEnted(message);
      break;
    case 'call.ongoing':
      await ongoingCall(message);
      break;
    case 'actor.left':
      await actorLeft(message);
      break;
    case 'call.finished':
      await finishedCall(message);
      break;
    default:
      break;
  }
};
