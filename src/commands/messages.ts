import { Message } from "discord.js";
import { injectable } from "inversify";

@injectable()
export class Messages {
  private _desChaussures: string;

  constructor() {
    this._desChaussures = 'Je veux des chaussures ! JE VEUX DES CHAUSSURES !';
  }
  
  sendTestMessage = async (message: Message): Promise<void> => {
    if (message.content === 'CorkyBot ?')
      await message.channel.send(this._desChaussures);
  }
}

