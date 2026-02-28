import {Role} from './role';
import {Identifiable} from './common';
import {DateFields} from './date';

export class UserClass {
  id?: number;
  username?: string;
  password?: string;
  roles?: string[];
  email?:string;
  enabled?:boolean;
}
export type UserLite = { id: number; username: string };

export interface User extends Identifiable, DateFields{
  username: string,
  enabled: true,
  email: string,
  roles:Role [],
}
