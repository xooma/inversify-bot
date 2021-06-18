import { Client, Message } from 'discord.js';
import { Messages } from './commands';

export class CorkyBot {

  constructor(private _client: Client, private _messages: Messages) {
    this.startBot();
  }

  private startBot(): void {
    this._client.login(process.env.TOKEN)
      .then(() => {
      this.listenToMessages();
    })
      .catch((error) => {
        throw new Error(error);
      })
  }

  private listenToMessages(): void {
    this._client.on('message', message => {
      this._messages.sendTestMessage(message)
    });
  }
}
