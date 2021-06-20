require('dotenv').config();
import container from './inversify.config';
import { CorkyBot } from './corkybot';
import TYPES from './constants/types';

const corkyBot = container.get<CorkyBot>(TYPES.CorkyBot);

corkyBot
  .connect()
  .then(() => {
    corkyBot.listenToMessages();
    console.log('Connected !');
  })
  .catch((error) => {
    throw error;
  });
