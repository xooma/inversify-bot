import 'reflect-metadata';
import { Container } from 'inversify';
import { Client } from 'discord.js';
import TYPES from './constants/types';
import { CorkyBot } from './corkybot';
import { Messages } from './commands';
import { Birthday } from './commands/birthdays/birthday';
import { BirthdayMessageService } from './services/birthday-message-service';

const container = new Container();

container.bind<CorkyBot>(TYPES.CorkyBot).to(CorkyBot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<Messages>(TYPES.Messages).to(Messages).inSingletonScope();
container.bind<Birthday>(TYPES.Birthday).to(Birthday).inSingletonScope();
container.bind<BirthdayMessageService>(TYPES.BirthdayMessageService).to(BirthdayMessageService).inSingletonScope();

export default container;
