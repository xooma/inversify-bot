import { throws } from 'assert';
import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { Messages } from './commands';
import Types from './types/Types';

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

  listenToMessages(): Promise<string> {
    this.client.on('message', (message) => {
      this.messages.sendTestMessage(message);
    });

    return this.client.login(this.token);
  }
}
