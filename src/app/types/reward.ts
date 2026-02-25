import {Identifiable} from './common';

export type RewardMode = 'RECURRING'|'RANDOM'
export interface RewardPool extends Identifiable{
  name: string,
  description: string
}
