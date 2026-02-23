export class UserClass {
  id?: number;
  username?: string;
  password?: string;
  roles?: string[];
  email?:string;
  enabled?:boolean;
}
export type UserLite = { id: number; username: string };
