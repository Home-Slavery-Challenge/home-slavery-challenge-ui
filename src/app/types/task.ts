import {Identifiable} from './common';

export interface TasksAvailable extends Identifiable{
  name: string,
  defaultsPoints: number
}
