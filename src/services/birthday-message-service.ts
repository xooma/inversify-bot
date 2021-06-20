import { Channel, Client, TextChannel } from 'discord.js';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { Channels } from '../types/Channels';
import { MembersBirthday } from '../types/MembersBirthday';

@injectable()
export class BirthdayMessageService {
  birthdayChannel: Channel | undefined;
  client: Client;

  constructor(@inject(TYPES.Client) client: Client) {
    this.client = client;
  }

  getBirthdayChannel(): void {
    this.birthdayChannel = this.client.channels.cache.get(Channels.Birthday);
  }

  sendBirthdayMessage(membersBirthday: Array<MembersBirthday>): void {
    this.getBirthdayChannel();
    if (this.birthdayChannel)
      for (const member of membersBirthday) (this.birthdayChannel as TextChannel).send(`HB ${member.name}`);
  }
}
