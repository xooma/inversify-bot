import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { Messages } from './commands';
import Types from './types/decorators';

@injectable()
export class CorkyBot {
  private client: Client;
  private messages: Messages;
  private readonly token: string;

  constructor(
    @inject(Types.Client) client: Client,
    @inject(Types.Token) token: string,
    @inject(Types.Messages) messages: Messages
  ) {
    this.client = client;
    this.messages = messages;
    this.token = token;
  }

  connect(): Promise<string> {
    return this.client.login(this.token);
  }

  listenToMessages(): void {
    console.table(this.client.channels.cache)
    this.client.on('message', async (message: Message) => {
      await this.messages.sendTestMessage(message);
    });

  }
}
