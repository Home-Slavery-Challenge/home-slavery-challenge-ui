import {Identifiable} from './common';
import {DateFields} from './date';
import {User} from './user';

export interface Period extends Identifiable, DateFields{
  startDate: string;
  endDate: string;
  // ChallengeGroup group;
  // List<ChallengeDay> days;
  // reward: Reward ;
  rewardHonored: boolean
  winner: User;
}
