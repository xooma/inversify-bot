import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { Birthday, Messages } from './commands';
import TYPES from './constants/types';

@injectable()
export class CorkyBot {
  private client: Client;
  private messages: Messages;
  private birthday: Birthday;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Messages) messages: Messages,
    @inject(TYPES.Birthday) birthday: Birthday,
  ) {
    this.client = client;
    this.messages = messages;
    this.birthday = birthday;
  }

  connect(): Promise<string> {
    return this.client.login(process.env.TOKEN);
  }

  listenToMessages(): void {
    this.client.on('ready', async () => {
      await this.birthday.runDateCheck();
    });

    this.client.on('message', async (message: Message) => {
      await this.messages.sendTestMessage(message);
    });
    console.table(this.client.channels.cache);
  }
}
