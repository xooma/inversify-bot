import { Channel, Client } from "discord.js";
import { inject, injectable } from "inversify";
import { Channels } from "../../types/Channels";
import Types from "../../types/decorators";

@injectable()
export class BirthdayMessageService {
  client: Client;

  constructor(@inject(Types.Client) client: Client) {
    this.client = client;
  }
  sendBirthdayMessage(): void {
    // const channel: Channel = this.client.channels.cache.get(Channels.Birthday)
  }
}