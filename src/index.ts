require('dotenv').config();
import container from "./inversify.config";
import { CorkyBot } from "./CorkyBot";
import Types from "./types/Types";

let corkyBot = container.get<CorkyBot>(Types.CorkyBot)

corkyBot.listenToMessages()
  .then(() => {
    console.log('Connected !');
  })
  .catch((error) =>{
    throw new Error(error);
  });