require('dotenv').config();
import container from "./inversify.config";
import { CorkyBot } from "./CorkyBot";
import Types from "./types/decorators";

const corkyBot = container.get<CorkyBot>(Types.CorkyBot)

corkyBot.connect()
  .then(() => {
    corkyBot.listenToMessages();
    console.log('Connected !');
  })
  .catch((error) =>{
    throw error;
  });