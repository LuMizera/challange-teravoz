import { UserMessage } from '../models/Message';
import { insertItem, getItemById, updateItem, getHighestQueue, reduceQueuePosition, getAll } from '../database';
import * as WebSocket from 'ws';

export const newCall = async (message: UserMessage): Promise<UserMessage> => {
  message.call_id = Date.now().toString();
  if (message.direction === 'inbound') {
    if (message.their_number.length === 11) {
      message.their_number_type = 'mobile';
    } else {
      message.their_number_type = 'not mobile';
    }
  }
  const postedMessage = await insertItem(message);

  return postedMessage;
  //   {
  //   "type": "call.new",
  //   "direction": "inbound",
  //   "their_number": "11963335753"
  //  }
};

export const standbyCall = async (message: UserMessage): Promise<UserMessage> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'call.standby' };
    await updateItem(modifiedObject);

    return modifiedObject;
  } else {
    return message;
  }
  // {
  //  "their_number": "11963335753",
  //  "call_id": "1569617319524"
  // }

  // Rola post /actions
};

export const waitingCall = async (message: UserMessage): Promise<UserMessage> => {
  const myObject = await getItemById(message.call_id);
  const highestQueue = await getHighestQueue();
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'call.waiting', queue: highestQueue + 1 };
    await updateItem(modifiedObject);
    return modifiedObject;
  } else {
    return message;
  }
};

export const actorEnted = async (message: UserMessage): Promise<UserMessage> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'actor.entered' };
    await updateItem(modifiedObject);
    return modifiedObject;
  } else {
    return message;
  }
  // adiciona tudo referente ao user
};

export const ongoingCall = async (message: UserMessage, ws: WebSocket): Promise<UserMessage> => {
  const myObject = await getItemById(message.call_id);
  let modifiedObject: UserMessage | null = null;
  if (myObject) {
    modifiedObject = { ...myObject, type: 'actor.entered', queue: 0 };
    await updateItem(modifiedObject);
  }
  await reduceQueuePosition();
  const allItems = await getAll();
  if (allItems) {
    ws.send(JSON.stringify(allItems));
    return modifiedObject || message;
  } else {
    return modifiedObject || message;
  }
};

export const actorLeft = async (message: UserMessage): Promise<UserMessage> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'actor.left' };
    await updateItem(modifiedObject);
    return modifiedObject;
  } else {
    return message;
  }
};

export const finishedCall = async (message: UserMessage): Promise<UserMessage> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'call.finished' };
    await updateItem(modifiedObject);
    return modifiedObject;
  } else {
    return message;
  }
};

export const handleCall = async (message: UserMessage, ws: WebSocket): Promise<UserMessage> => {
  message.timestamp = new Date().toISOString();
  switch (message.type) {
    case 'call.new':
      return (message = await newCall(message));
    case 'call.standby':
      return (message = await standbyCall(message));
    case 'call.waiting':
      return (message = await waitingCall(message));
    case 'actor.entered':
      return (message = await actorEnted(message));
    case 'call.ongoing':
      return (message = await ongoingCall(message, ws));
    case 'actor.left':
      return (message = await actorLeft(message));
    case 'call.finished':
      return (message = await finishedCall(message));
    default:
      return message;
  }
};
