import { Client } from "discord.js";
import { Messages } from "./commands";
import { CorkyBot } from "./CorkyBot";
import dotenv from 'dotenv';

dotenv.config()
new CorkyBot(new Client(), new Messages());

