import { Message } from "discord.js";

export class Messages {
  private _desChaussures: string;

  constructor() {
    this._desChaussures = 'Je veux des chaussures ! JE VEUX DES CHAUSSURES !';
  }
  
  sendTestMessage = (message: Message): void => {
    if (message.content === 'CorkyBot ?')
    message.channel.send(this._desChaussures);
  }
}

