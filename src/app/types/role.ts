import {DateFields} from './date';
import {Identifiable} from './common';

export type RoleName = 'USER' | 'ADMIN';

export interface Role extends Identifiable, DateFields {
  name: RoleName,
}
