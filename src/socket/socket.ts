// Socket.io client - connects to backend when available
// In production, replace URL with your Express server
// import { io } from 'socket.io-client';
// const socket = io('http://localhost:5000');

type SocketCallback = (data: any) => void;
const listeners: Record<string, SocketCallback[]> = {};

export const socketEvents = {
  PRODUCT_COMPLETED: 'product_completed',
  PRODUCT_ASSIGNED: 'product_assigned',
  BASKET_UPDATED: 'basket_updated',
};

export const onSocketEvent = (event: string, callback: SocketCallback) => {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(callback);
};

export const emitSocketEvent = (event: string, data: any) => {
  console.log(`[Socket] Emitting: ${event}`, data);
  // In production: socket.emit(event, data);
  // For now, trigger local listeners (simulating)
  if (listeners[event]) {
    listeners[event].forEach((cb) => cb(data));
  }
};

export const removeSocketListener = (event: string, callback: SocketCallback) => {
  if (listeners[event]) {
    listeners[event] = listeners[event].filter((cb) => cb !== callback);
  }
};
