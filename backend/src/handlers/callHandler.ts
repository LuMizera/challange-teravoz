import { UserMessage } from '../models/Message';
import {
  insertItem,
  getItemById,
  updateItem,
  getHighestQueue,
  reduceQueuePosition,
  getAll,
  checkReturning
} from '../database';

export const newCall = async (message: UserMessage, clients: any[]): Promise<void> => {
  message.call_id = Date.now().toString();
  message.queue = 0;
  if (message.their_number.length === 11) {
    message.their_number_type = 'mobile';
  } else {
    message.their_number_type = 'notMobile';
  }
  await insertItem(message);

  const all = await getAll();
  for (let client of clients) {
    client.ws.send(JSON.stringify(all));
  }
};

export const standbyCall = async (message: UserMessage, clients: any[]): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    // the code below will be were should occur the post to /actions

    const isReturningCall = await checkReturning(myObject.their_number, myObject.call_id);
    const branchLine = isReturningCall ? '2901' : '2900';
    const modifiedObject: UserMessage = {
      ...myObject,
      type: 'call.standby',
      returningCall: isReturningCall,
      our_branch_line: branchLine
    };
    await updateItem(modifiedObject);
    setTimeout(async () => {
      await waitingCall(modifiedObject, clients);
    }, 10000);
  }
  const all = await getAll();
  for (let client of clients) {
    client.ws.send(JSON.stringify(all));
  }
};

export const waitingCall = async (message: UserMessage, clients: any[]): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  const highestQueue = await getHighestQueue();
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'call.waiting', queue: highestQueue + 1 };
    await updateItem(modifiedObject);
  }
  const all = await getAll();
  for (let client of clients) {
    client.ws.send(JSON.stringify(all));
  }
};

export const actorEnted = async (message: UserMessage, clients: any[]): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'actor.entered', actor: message.actor };
    await updateItem(modifiedObject);
    setTimeout(async () => {
      await ongoingCall(modifiedObject, clients);
    }, 10000);
  }
  const all = await getAll();
  for (let client of clients) {
    client.ws.send(JSON.stringify(all));
  }
};

export const ongoingCall = async (message: UserMessage, clients: any[]): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  let modifiedObject: UserMessage | null = null;
  if (myObject) {
    modifiedObject = { ...myObject, type: 'call.ongoing', queue: 0 };
    await updateItem(modifiedObject);
    await reduceQueuePosition();
  }
  const all = await getAll();
  for (let client of clients) {
    client.ws.send(JSON.stringify(all));
  }
};

export const actorLeft = async (message: UserMessage, clients: any[]): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'actor.left' };
    await updateItem(modifiedObject);
    setTimeout(async () => {
      await finishedCall(modifiedObject, clients);
    }, 10000);
  }
  const all = await getAll();
  for (let client of clients) {
    client.ws.send(JSON.stringify(all));
  }
};

export const finishedCall = async (message: UserMessage, clients: any[]): Promise<void> => {
  const myObject = await getItemById(message.call_id);
  if (myObject) {
    const modifiedObject: UserMessage = { ...myObject, type: 'call.finished' };
    await updateItem(modifiedObject);
  }
  const all = await getAll();
  for (let client of clients) {
    client.ws.send(JSON.stringify(all));
  }
};

export const handleCall = async (message: UserMessage, clients: any[]): Promise<void> => {
  message.timestamp = new Date().toISOString();
  switch (message.type) {
    case 'call.new':
      await newCall(message, clients);
      break;
    case 'call.standby':
      await standbyCall(message, clients);
      break;
    case 'call.waiting':
      await waitingCall(message, clients);
      break;
    case 'actor.entered':
      await actorEnted(message, clients);
      break;
    case 'call.ongoing':
      await ongoingCall(message, clients);
      break;
    case 'actor.left':
      await actorLeft(message, clients);
      break;
    case 'call.finished':
      await finishedCall(message, clients);
      break;
    default:
      const all = await getAll();
      for (let client of clients) {
        client.ws.send(JSON.stringify(all));
      }
      break;
  }
};
