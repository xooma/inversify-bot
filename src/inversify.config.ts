import "reflect-metadata";
import { Container } from "inversify";
import { Client } from "discord.js";
import Types from './types/Types'
import { CorkyBot } from "./CorkyBot";
import { Messages } from "./commands";

let container = new Container();

container.bind<string>(Types.Token).toConstantValue(process.env.TOKEN!);
container.bind<CorkyBot>(Types.CorkyBot).to(CorkyBot).inSingletonScope();
container.bind<Client>(Types.Client).toConstantValue(new Client());
container.bind<Messages>(Types.Messages).to(Messages).inSingletonScope();

export default container;