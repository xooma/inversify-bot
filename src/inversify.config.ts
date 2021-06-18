import "reflect-metadata";
import { Container } from "inversify";
import { Client } from "discord.js";
import Types from './types/decorators'
import { CorkyBot } from "./CorkyBot";
import { Messages } from "./commands";
import { Birthday } from "./commands/birthdays/Birthday";
import { BirthdayMessageService } from "./commands/birthdays/BirthdayMessageService";

const container = new Container();

container.bind<string|undefined>(Types.Token).toConstantValue(process.env.TOKEN);
container.bind<CorkyBot>(Types.CorkyBot).to(CorkyBot).inSingletonScope();
container.bind<Client>(Types.Client).toConstantValue(new Client());
container.bind<Messages>(Types.Messages).to(Messages).inSingletonScope();
container.bind<BirthdayMessageService>(Types.BirthdayMessage).to(BirthdayMessageService).inSingletonScope();
container.bind<Birthday>(Types.Birthday).to(Birthday).inSingletonScope();


export default container;