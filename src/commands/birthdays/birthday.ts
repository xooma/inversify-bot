import fs from 'fs';
import { inject, injectable } from 'inversify';
import schedule, { RecurrenceRule } from 'node-schedule';
import { MembersBirthday } from '../../types/MembersBirthday';
import { BirthdayMessageService } from '../../services/birthday-message-service';
import TYPES from '../../constants/types';

@injectable()
export class Birthday {
  private checkDateRule!: RecurrenceRule;
  private birthdayList: Array<MembersBirthday>;
  private membersBirthday!: Array<MembersBirthday>;
  private birthdayMessageService: BirthdayMessageService;

  constructor(@inject(TYPES.BirthdayMessageService) birthdayMessageService: BirthdayMessageService) {
    this.birthdayMessageService = birthdayMessageService;
    this.birthdayList = this.parseJsonBirthdayList();
    this.setupScheduleRuleSettings();
  }

  setupScheduleRuleSettings(): void {
    this.checkDateRule = new schedule.RecurrenceRule();
    this.checkDateRule.hour = 6;
    this.checkDateRule.tz = 'Etc/UTC';
  }

  runDateCheck(): void {
    schedule.scheduleJob(this.checkDateRule, async () => {
      await this.checkBirthday()
        .then((noBirthdayFound: boolean) => {
          if (!noBirthdayFound) {
            this.birthdayMessageService.sendBirthdayMessage(this.membersBirthday);
          }
        })
        .catch((error: Error) => {
          throw error;
        });
    });
  }

  private async checkBirthday(): Promise<boolean> {
    const result: Array<MembersBirthday> = [];

    const today: string = new Date().toLocaleDateString('fr-FR');

    await Promise.all(
      this.birthdayList.map((member: MembersBirthday) => {
        if (today === member.birthdate) result.push(member);
      }),
    );

    this.membersBirthday = result;

    return !result;
  }

  parseJsonBirthdayList(): Array<MembersBirthday> {
    return JSON.parse(fs.readFileSync('src/data/birthdays.json', 'utf8'));
  }
}
