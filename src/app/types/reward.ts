import {Identifiable} from './common';

export enum RewardMode {
  RECURRING = 'RECURRING',
  RANDOM = 'RANDOM'
}

export interface RewardPool extends Identifiable{
  name: string,
  description: string
}
