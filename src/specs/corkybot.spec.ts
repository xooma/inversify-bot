import 'jasmine';
import 'reflect-metadata';
import { CorkyBot } from '../corkybot';
import { Birthday, Messages } from '../commands';
import { Client } from 'discord.js';

describe('CorkyBot', () => {
  let instance: CorkyBot;
  let mockedClient: Client;
  let mockedMessages: Messages;
  let mockedBirthday: Birthday;

  beforeEach(() => {
    instance = new CorkyBot(mockedClient, mockedMessages, mockedBirthday);
  });

  it('should exist', () => {
    expect(instance).toBeTruthy();
  });
});
