import { readFileSync, writeFileSync } from 'fs';
import { UserMessage } from '../models/Message';

export const getAll = async (): Promise<UserMessage[]> => {
  try {
    const data = await readFileSync('database.json');
    return (JSON.parse(data.toString()) as unknown) as UserMessage[];
  } catch (error) {
    // SAVE ERROR
    throw error;
  }
};

export const insertItem = async (data: UserMessage): Promise<UserMessage> => {
  try {
    const payload: UserMessage[] = await getAll();
    payload.push({...data, timestamp: new Date().toISOString()});
    await writeFileSync('database.json', JSON.stringify(payload));
    return data as UserMessage;
  } catch (error) {
    // SAVE ERROR
    throw error;
  }
};

export const getItemById = async (callId: string): Promise<UserMessage | undefined> => {
  const allMessages = await getAll();
  const payload = allMessages.find((message: UserMessage) => message.call_id === callId);
  return payload;
};

export const updateItem = async (data: UserMessage): Promise<UserMessage> => {
  try {
    const payload: UserMessage[] = await getAll();
    const myItemIndex = payload.findIndex((message: UserMessage) => message.call_id === data.call_id);
    if (myItemIndex !== -1) {
      payload[myItemIndex] = {...data, timestamp: new Date().toISOString()};
      await writeFileSync('database.json', JSON.stringify(payload));
    }
    return data as UserMessage;
  } catch (error) {
    // SAVE ERROR
    throw error;
  }
};

export const getHighestQueue = async (): Promise<number> => {
  const allItems = await getAll();
  return Math.max.apply(
    Math,
    allItems.map(userMessage => {
      return userMessage.queue || 0;
    })
  );
};

export const reduceQueuePosition = async (): Promise<UserMessage[]> => {
  const allItems = await getAll();
  const payload: UserMessage[] = [];
  for (const item of allItems) {
    if (item.queue && item.queue > 0) {
      payload.push({ ...item, queue: item.queue - 1, timestamp: new Date().toISOString() });
    } else {
      payload.push(item);
    }
  }
  await writeFileSync('database.json', JSON.stringify(payload));
  return payload;
};
