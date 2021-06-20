import { Message } from 'discord.js';
import { injectable } from 'inversify';

@injectable()
export class Messages {
  private desChaussures: string;

  constructor() {
    this.desChaussures = 'Je veux des chaussures ! JE VEUX DES CHAUSSURES !';
  }

  async sendTestMessage(message: Message): Promise<void> {
    if (message.content === 'CorkyBot ?') await message.channel.send(this.desChaussures);
  }
}
