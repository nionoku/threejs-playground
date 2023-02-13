import { Message } from '../models/message';

export class MessagesController {
  addMessagesListener(listener: (event: MessageEvent<Message>) => void) {
    window.addEventListener('message', listener);
  }

  postMessage(message: Message) {
    window.postMessage(message);
    // window.top?.postMessage(event, import.meta.env.VITE_APP_TOP_ORIGIN)
  }
}