import {Role, RoleName} from './role';
import {RewardMode, RewardPool} from './reward';
import {TasksAvailable} from './task';
import {User} from './user';
import {Period} from './period';

export interface Challenge {
  id: number,
  name: string,
  owner: User,
  participants: User[],
  periods: Period[]
  availableTasks: TasksAvailable[],
  rewardPool: RewardPool[],
  rewardMode: RewardMode
}


export interface ChallengeCreate {
  name: string,
  owner: string,
  participants: number[],
  rewards: string[],
  tasks: string[],
}

export interface ChallengeLite {
  id: number;
  owner: {
    username: string
  },
  name: string;
}
