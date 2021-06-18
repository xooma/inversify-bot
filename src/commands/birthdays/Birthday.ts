import fs from 'fs';
import { inject, injectable } from 'inversify';
import schedule, { RecurrenceRule } from 'node-schedule';
import Types from '../../types/decorators';
import { MembersBirthday } from '../../types/MembersBirthday';
import { BirthdayMessageService } from './BirthdayMessageService';

@injectable()
export class Birthday {
  private checkDateRule!: RecurrenceRule;
  private birthdayList: Array<MembersBirthday>;
  private membersBirthday!: Array<MembersBirthday>;
  private birthdayMessageService!: BirthdayMessageService;

  constructor(@inject(Types.Birthday) birthdayMessageService: BirthdayMessageService) {
    this.birthdayMessageService = birthdayMessageService;
    this.birthdayList = this.parseJsonBirthdayList();
    this.setupScheduleRuleSettings()
  }
  
  setupScheduleRuleSettings(): void {
    this.checkDateRule = new schedule.RecurrenceRule();
    this.checkDateRule.hour = 4;
    this.checkDateRule.tz = 'Etc/UTC'
  }

  checkDate(): void {
    schedule.scheduleJob(this.checkDateRule, () => {
      this.checkBirthday()
        .then((noBirthdayFound: boolean) => {
          if (!noBirthdayFound) {
            // this.birthdayMessageService.sendBirthdayMessage(this.membersBirthday);
          }
        })
        .catch((error: Error) => {
          throw error;
        })
    })
  }

  private async checkBirthday(): Promise<boolean> {
    let result!: Array<MembersBirthday>;

    const today: Date = new Date(Date.now());
    
    await Promise.all(this.birthdayList.map((member: MembersBirthday) => {
      if (today === member.birthdate) result.push(member);
    }));

    this.membersBirthday = result;

    return !result;
  }

  parseJsonBirthdayList(): Array<MembersBirthday> {
    return JSON.parse(fs.readFileSync('../../data/birthdays.json', 'utf8'));
  }

}